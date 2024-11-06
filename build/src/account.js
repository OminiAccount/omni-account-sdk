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
            const signUserOperation = { ...userOperation, signature };
            const response = await axios_1.default.post(this.bundler, {
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
        const response = await axios_1.default.post(this.bundler, {
            jsonrpc: '2.0',
            method: 'eth_getUserAccount',
            params: [account],
            id: 1,
        });
        (0, ethers_1.assert)(!!response.data.result[0], 'failed to find UserAccount', 'UNKNOWN_ERROR', {});
        return response.data.result[0];
    }
    async getUserOpsHistoryForAccount(account, aaContractAddress) {
        const response = await axios_1.default.post(this.bundler, {
            jsonrpc: '2.0',
            method: 'eth_getUserOpsForAccount',
            params: [account, aaContractAddress],
            id: 1,
        });
        (0, ethers_1.assert)(!!response.data.result, 'failed to find userOps history', 'UNKNOWN_ERROR', {});
        return response.data.result;
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map