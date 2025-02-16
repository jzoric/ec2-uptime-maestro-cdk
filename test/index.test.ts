import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Ec2Maestro } from '../src';

jest.mock('aws-cdk-lib/aws-lambda', () => {
  const original = jest.requireActual('aws-cdk-lib/aws-lambda');
  return {
    ...original,
    Code: {
      fromAsset: jest.fn(() => ({
        bind: jest.fn().mockReturnValue({
          s3Location: {
            bucketName: 'mock-bucket',
            objectKey: 'mock-key',
          },
        }),
        bindToResource: jest.fn(),
      })),
    },
  };
});

describe('Ec2Maestro', () => {
  const mockProps = {
    version: '1.0.0',
    checksum: 'mock-checksum-123',
    url: 'https://example.com/binary',
    tags: {
      Name: 'test',
    },
  };
  describe('Role', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');

    new Ec2Maestro(stack, 'maestro', mockProps);

    const template = Template.fromStack(stack);

    it('create lambda role', () => {
      template.resourceCountIs('AWS::IAM::Role', 1);
    });
  });
});
