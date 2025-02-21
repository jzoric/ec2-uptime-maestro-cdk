import { execSync } from 'child_process';
import { ILocalBundling } from 'aws-cdk-lib/core';

interface BinaryProps {
  url: string;
  checksum: string;
}

export class LocalBinaryBundling implements ILocalBundling {
  constructor(private readonly props: BinaryProps) { }

  private downloadAndVerifyBinary(binaryPath: string): boolean {
    try {
      execSync(`
        curl -L -o ${binaryPath} ${this.props.url} && \
        echo "${this.props.checksum}  ${binaryPath}" | sha256sum -c - && \
        chmod +x ${binaryPath}
      `, { stdio: 'inherit' });
      return true;
    } catch (err) {
      return false;
    }
  }

  public tryBundle(outputDir: string): boolean {
    const binaryPath = `${outputDir}/bootstrap`;

    if (!this.downloadAndVerifyBinary(binaryPath)) {
      throw new BundlerError("Can't download and verify ec2-uptime-maestro binary! Stopping bundle phase...");
    }

    return true;
  }
}

class BundlerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BundlerError";
  }
}
