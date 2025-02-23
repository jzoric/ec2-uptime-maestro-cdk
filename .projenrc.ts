import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Jovica Zoric',
  authorAddress: '11492884+jzoric@users.noreply.github.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.7.0',
  name: 'ec2-uptime-maestro-cdk',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/jzoric/ec2-uptime-maestro-cdk.git',
});

project.addBundledDeps('sync-request');
project.synth();
