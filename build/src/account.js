"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const ethers_1 = require("ethers");
const signer_1 = require("./signer");
const axios_1 = __importDefault(require("axios"));
class Account {
    ethSigner;
    bundler;
    eip712;
    constructor(bundler, ethSigner) {
        this.ethSigner = ethSigner;
        this.bundler = bundler;
        this.eip712 = new signer_1.EIP712Signer(ethSigner);
    }
    async sendUserOperation(userOperationField) {
        try {
            const { userOperation, signature } = await this.eip712.sign(userOperationField);
            const signUserOperation = {
                ...userOperation.formattedUserOperation(),
                signature,
            };
            const response = await axios_1.default.post(this.bundler, {
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
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
    async getUserAccount(account) {
        const response = await axios_1.default.post(this.bundler, {
            jsonrpc: '2.0',
            method: 'eth_getUserAccount',
            params: [account],
            id: 1,
        });
        (0, ethers_1.assert)(!!response.data.result[0], 'failed to find UserAccount', 'UNKNOWN_ERROR', {});
        return response.data.result[0];
    }
    async getAccountInfo(account, accountContract, chainId) {
        const response = await axios_1.default.post(this.bundler, {
            jsonrpc: '2.0',
            method: 'eth_getAccountInfo',
            params: [account, accountContract, parseInt(chainId, 10)],
            id: 1,
        });
        (0, ethers_1.assert)(!!response.data.result, 'failed to find account info', 'UNKNOWN_ERROR', {});
        const res = {
            balance: response.data.result.Balance,
            nonce: response.data.result.Nonce,
            history: response.data.result.UserOperations,
        };
        return res;
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map