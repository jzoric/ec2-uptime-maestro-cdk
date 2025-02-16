# EC2 uptime maestro construct

CDK Construct creates a Lambda function that can manage EC2 instances (start/stop) based on a schedule.

## Features

- Create IAM role and policy for Lambda function
- Downloads and packages a custom binary for the Lambda function
- Configures EventBridge rules for triggering the lambda function

## Prerequisites

EC2 instances need to have the tag: `ec2maestro:yes`

## Usage

Install package: `npm i ec2-uptime-maestro-cdk` from npm `https://www.npmjs.com/package/ec2-uptime-maestro-cdk`

```typescript
const MAESTRO_CONFIG = {
  version: "v1.0.0",
  checksum: "6579469e52ec933130f7fa8646c4780d29eceedb6cf51cc3d68f45540fc24389",
  url: `https://github.com/jzoric/ec2-uptime-maestro-lambda/releases/download/v1.0.0/bootstrap`,
};

export class Ec2UptimeMaestroAwscdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Ec2Maestro(this, "ec2-maestro", {
      version: MAESTRO_CONFIG.version,
      checksum: MAESTRO_CONFIG.checksum,
      url: MAESTRO_CONFIG.url,
      tags: {
        Name: "Maestro",
      },
    });
  }
}
```

## Links

- Lambda repository: https://github.com/jzoric/ec2-uptime-maestro-lambda
