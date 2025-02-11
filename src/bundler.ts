import { execSync } from 'child_process';
import { ILocalBundling } from 'aws-cdk-lib/core';

interface BinaryProps {
  url: string;
  checksum: string;
}

export class LocalBinaryBundling implements ILocalBundling {
  constructor(private readonly props: BinaryProps) { }

  private verifyExistingBinary(binaryPath: string): boolean {
    try {
      const existingHash = execSync(`sha256sum ${binaryPath}`)
        .toString()
        .split(' ')[0];
      return existingHash === this.props.checksum;
    } catch (err) {
      return false;
    }
  }

  private downloadAndVerifyBinary(binaryPath: string): boolean {
    console.log(this.props);
    try {
      execSync(`
        curl -L -o ${binaryPath} ${this.props.url} && \
        echo "${this.props.checksum}  ${binaryPath}" | sha256sum -c && \
        chmod +x ${binaryPath}
      `, { stdio: 'inherit' });
      return true;
    } catch (err) {
      return false;
    }
  }

  public tryBundle(outputDir: string): boolean {
    const binaryPath = `${outputDir}/bootstrap`;

    if (this.verifyExistingBinary(binaryPath)) {
      console.log('Binary already exists with correct hash');
      return true;
    }

    return this.downloadAndVerifyBinary(binaryPath);
  }
}
