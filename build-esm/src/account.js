import { assert } from 'ethers';
import { EIP712Signer } from './signer';
import axios from 'axios';
export class Account {
    ethSigner;
    bundler;
    eip712;
    constructor(bundler, ethSigner) {
        this.ethSigner = ethSigner;
        this.bundler = bundler;
        this.eip712 = new EIP712Signer(ethSigner);
    }
    async sendUserOperation(userOperationField) {
        try {
            const { userOperation, signature } = await this.eip712.sign(userOperationField);
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
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
    async getUserAccount(account) {
        const response = await axios.post(this.bundler, {
            jsonrpc: '2.0',
            method: 'eth_getUserAccount',
            params: [account],
            id: 1,
        });
        assert(!!response.data.result[0], 'failed to find UserAccount', 'UNKNOWN_ERROR', {});
        return response.data.result[0];
    }
    async getAccountInfo(account, accountContract, chainId) {
        const response = await axios.post(this.bundler, {
            jsonrpc: '2.0',
            method: 'eth_getAccountInfo',
            params: [account, accountContract, parseInt(chainId, 10)],
            id: 1,
        });
        assert(!!response.data.result, 'failed to find account info', 'UNKNOWN_ERROR', {});
        const res = {
            balance: response.data.result.Balance,
            nonce: response.data.result.Nonce,
            history: response.data.result.UserOperations,
        };
        return res;
    }
}
//# sourceMappingURL=account.js.map