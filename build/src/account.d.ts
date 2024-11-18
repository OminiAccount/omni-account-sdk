import { ethers } from 'ethers';
import { EIP712Signer } from './signer';
import { AccountDetails, Address, UserOperationField } from './types';
export declare class Account {
    private ethSigner;
    bundler: string;
    eip712: EIP712Signer;
    constructor(bundler: string, ethSigner: ethers.Signer);
    sendUserOperation(userOperationField: UserOperationField): Promise<{
        success: boolean;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getUserAccount(account: Address): Promise<Address>;
    getAccountInfo(account: Address, accountContract: Address, chainId: string): Promise<AccountDetails>;
}
