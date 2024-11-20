import {ethers, assert} from 'ethers';
import {EIP712Signer} from './signer';
import {
  AccountDetails,
  Address,
  UserOperation,
  UserOperationField,
} from './types';
import axios from 'axios';

export class Account {
  bundler!: string;
  public eip712!: EIP712Signer;

  constructor(
    bundler: string,
    private ethSigner: ethers.Signer,
  ) {
    this.bundler = bundler;
    this.eip712 = new EIP712Signer(ethSigner);
  }

  async sendUserOperation(userOperationField: UserOperationField) {
    try {
      const {userOperation, signature} =
        await this.eip712.sign(userOperationField);

      const signUserOperation = {
        ...userOperation.formattedUserOperation(),
        signature,
      };

      const response = await axios.post(this.bundler, {
        jsonrpc: '2.0',
        method: 'eth_sendUserOperation',
        params: [signUserOperation],
        id: 1,
      });

      if (response.data.error) {
        return {
          success: false,
          error: response.data.error.message || 'Business logic error',
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getUserAccount(account: Address): Promise<Address> {
    const response = await axios.post(this.bundler, {
      jsonrpc: '2.0',
      method: 'eth_getUserAccount',
      params: [account],
      id: 1,
    });

    assert(
      !!response.data.result[0],
      'failed to find UserAccount',
      'UNKNOWN_ERROR',
      {},
    );
    return response.data.result[0];
  }

  async getAccountInfo(
    account: Address,
    accountContract: Address,
    chainId: string,
  ): Promise<AccountDetails> {
    const response = await axios.post(this.bundler, {
      jsonrpc: '2.0',
      method: 'eth_getAccountInfo',
      params: [account, accountContract, parseInt(chainId, 10)],
      id: 1,
    });

    assert(
      !!response.data.result,
      'failed to find account info',
      'UNKNOWN_ERROR',
      {},
    );
    const res: AccountDetails = {
      balance: response.data.result.Balance,
      nonce: response.data.result.Nonce,
      history: response.data.result.UserOperations,
    };
    return res;
  }
}
