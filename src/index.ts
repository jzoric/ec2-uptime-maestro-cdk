import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { LocalBinaryBundling } from './bundler';


export interface IEc2MaestroProps {
  version: string;
  checksum: string;
  url: string;

  startRuleName?: string;
  startSchedule?: string;

  stopRuleName?: string;
  stopSchedule?: string;

  tags?: { [key: string]: string };

}

const DEFAULT_SCHEDULE_PROPS = {
  startSchedule: 'cron(0 8 ? * MON-FRI *)',
  startRuleName: 'start-ec2-instances',
  stopSchedule: 'cron(0 18 ? * MON-FRI *)',
  stopRuleName: 'stop-ec2-instances',
};

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

    const lambdaMaestro = new Function(this, 'lambda-function', {
      runtime: Runtime.PROVIDED_AL2,
      handler: 'main',
      memorySize: 128,
      timeout: cdk.Duration.seconds(20),
      role: lambdaRole,
      code: Code.fromAsset(path.join(__dirname, '../binary'), {
        assetHash: `${props.version}-${props.checksum}`,
        assetHashType: cdk.AssetHashType.CUSTOM,
        bundling: {
          image: cdk.DockerImage.fromRegistry('none'),
          local: localBundling,
        },
      }),
    });

    const startInstancesRule = new events.Rule(this, 'start-instances-rule', {
      ruleName: props.startRuleName || DEFAULT_SCHEDULE_PROPS.startRuleName,
      description: 'Start EC2 instances on schedule',
      schedule: events.Schedule.expression(props.startSchedule || DEFAULT_SCHEDULE_PROPS.startSchedule),
    });

    const stopInstancesRule = new events.Rule(this, 'stop-instances-rule', {
      ruleName: props.stopRuleName || DEFAULT_SCHEDULE_PROPS.stopRuleName,
      description: 'Stop EC2 instances on schedule',
      schedule: events.Schedule.expression(props.stopSchedule || DEFAULT_SCHEDULE_PROPS.stopSchedule),
    });

    startInstancesRule.addTarget(new targets.LambdaFunction(lambdaMaestro, {
      event: events.RuleTargetInput.fromObject({
        'detail-type': 'start',
      }),
    }));

    stopInstancesRule.addTarget(new targets.LambdaFunction(lambdaMaestro, {
      event: events.RuleTargetInput.fromObject({
        'detail-type': 'stop',
      }),
    }));

    Object.entries(props.tags as { [key: string]: string }).forEach(([key, value]) => {
      cdk.Tags.of(this).add(key, value);
    });
  }
}
