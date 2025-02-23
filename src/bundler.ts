import { execSync } from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { ILocalBundling } from 'aws-cdk-lib/core';
import request from 'sync-request';

class BundlerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BundlerError';
  }
}

interface BinaryProps {
  url: string;
  checksum: string;
}

export class LocalBinaryBundling implements ILocalBundling {
  constructor(private readonly props: BinaryProps) { }

  private downloadBinary(binaryPath: string): boolean {
    try {
      const response = request('GET', this.props.url);

      if (response.statusCode !== 200) {
        throw new BundlerError(
          `Download failed with status: ${response.statusCode}`,
        );
      }

      fs.writeFileSync(binaryPath, response.getBody());

      return true;
    } catch (error) {
      throw new BundlerError(`Failed to download binary: ${error}`);
    }
  }

  private verifyChecksum(binaryPath: string): boolean {
    try {
      const fileBuffer = fs.readFileSync(binaryPath);
      const hash = crypto.createHash('sha256');
      hash.update(fileBuffer);
      const calculatedChecksum = hash.digest('hex');

      if (calculatedChecksum !== this.props.checksum) {
        throw new BundlerError(
          `Checksum verification failed!\nExpected: ${this.props.checksum}\nGot: ${calculatedChecksum}`,
        );
      }

      return true;
    } catch (error) {
      if (error instanceof BundlerError) throw error;
      throw new BundlerError(`Checksum verification failed: ${error}`);
    }
  }

  public tryBundle(outputDir: string): boolean {
    const binaryPath = `${outputDir}/bootstrap`;

    this.downloadBinary(binaryPath);

    this.verifyChecksum(binaryPath);

    if (process.platform === 'win32') {
      // TODO not sure about this.
      execSync(`icacls "${binaryPath}" /grant Everyone:RX`, {
        stdio: 'inherit',
      });
    } else {
      fs.chmodSync(binaryPath, 0o755);
    }
    return true;
  }
}
