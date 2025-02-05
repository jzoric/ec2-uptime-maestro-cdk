import { Construct } from "constructs";

import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { execSync } from 'child_process';

export interface IEc2MaestroProps {
  version: string;
  checksum: string;
  url: string;
}

export class Ec2Maestro extends Construct {

  constructor(scope: Construct, id: string, props: IEc2MaestroProps) {
    super(scope, id);

    const lambdaRole = new iam.Role(this, 'lambda-role', {
      roleName: 'ec2-uptime-maestro-lambda-role',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'ec2:DescribeInstances',
        'ec2:StartInstances',
        'ec2:StopInstances'
      ],
      resources: ['*']
    }));

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'logs:CreateLogGroup',
        'logs:CreateLogStream',
        'logs:PutLogEvents'
      ],
      resources: ['arn:aws:logs:*:*:*']
    }));

    new Function(this, 'lambda-function', {
      runtime: Runtime.PROVIDED_AL2,
      handler: "main",
      memorySize: 128,
      timeout: cdk.Duration.seconds(20),
      role: lambdaRole,
      code: Code.fromAsset(path.join(__dirname, '../binary'), {
        assetHash: `${props.version}-${props.checksum}}`,
        assetHashType: cdk.AssetHashType.CUSTOM,
        bundling: {
          image: Runtime.PROVIDED_AL2.bundlingImage,
          local: {
            tryBundle(outputDir: string) {
              const binaryPath = `${outputDir}/bootstrap`;

              try {
                const existingHash = execSync(`sha256sum ${binaryPath}`).toString().split(' ')[0];
                if (existingHash === props.checksum) {
                  console.log('Binary already exists with correct hash');
                  return true;
                }
              } catch (err) {
                // NOOP
              }

              try {
                execSync(`
                  curl -L -o ${binaryPath} ${props.url} && \
                  echo "${props.checksum}  ${binaryPath}" | sha256sum -c && \
                  chmod +x ${binaryPath}
                `, { stdio: 'inherit' });
                return true;
              } catch (err) {
                return false;
              }
            }
          }
        }
      }
      )
    })
  }
}
