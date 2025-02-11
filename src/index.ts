import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { LocalBinaryBundling } from './bundler';


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
        'ec2:StopInstances',
      ],
      resources: ['*'],
    }));

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'logs:CreateLogGroup',
        'logs:CreateLogStream',
        'logs:PutLogEvents',
      ],
      resources: ['arn:aws:logs:*:*:*'],
    }));

    const localBundling = new LocalBinaryBundling({
      url: props.url,
      checksum: props.checksum,
    });

    new Function(this, 'lambda-function', {
      runtime: Runtime.PROVIDED_AL2,
      handler: 'main',
      memorySize: 128,
      timeout: cdk.Duration.seconds(20),
      role: lambdaRole,
      code: Code.fromAsset(path.join(__dirname, '../binary'), {
        assetHash: `${props.version}-${props.checksum}`,
        assetHashType: cdk.AssetHashType.CUSTOM,
        bundling: {
          image: Runtime.PROVIDED_AL2.bundlingImage,
          local: localBundling,
        },
      }),
    });
  }
}
