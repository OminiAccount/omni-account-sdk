import { BigNumberish } from 'ethers';
export declare const EMPTY_KECCAK_HASH: Uint8Array;
export declare const EMPTY_HASH: Uint8Array;
/** 0x-prefixed, hex encoded, ethereum account address. */
export type Address = string;
/** 0x-prefixed, hex encoded, ECDSA signature. */
export type Signature = string;
export declare enum OperationType {
    UserAction = 0,
    DepositAction = 1,
    WithdrawAction = 2
}
export interface ExecDataField {
    nonce?: null | BigNumberish;
    chainId?: null | number;
    callData?: null | string;
    mainChainGasLimit?: null | BigNumberish;
    destChainGasLimit?: null | BigNumberish;
    zkVerificationGasLimit?: null | BigNumberish;
    mainChainGasPrice?: null | BigNumberish;
    destChainGasPrice?: null | BigNumberish;
}
declare class ExecData implements ExecDataField {
    #private;
    get nonce(): bigint;
    set nonce(value: BigNumberish);
    get chainId(): number;
    set chainId(value: number);
    get callData(): null | string;
    set callData(value: null | string);
    get mainChainGasLimit(): bigint;
    set mainChainGasLimit(value: BigNumberish);
    get destChainGasLimit(): bigint;
    set destChainGasLimit(value: BigNumberish);
    get zkVerificationGasLimit(): bigint;
    set zkVerificationGasLimit(value: BigNumberish);
    get mainChainGasPrice(): bigint;
    set mainChainGasPrice(value: BigNumberish);
    get destChainGasPrice(): bigint;
    set destChainGasPrice(value: BigNumberish);
    constructor();
    static from(execData: ExecDataField): ExecData;
    keccakCalldata(): string;
    packOpInfo(): Uint8Array;
    packChainGasLimit(): Uint8Array;
    packChainGasPrice(): Uint8Array;
    formattedExecData(): Record<string, any>;
}
export interface UserOperationField {
    operationType?: null | number;
    operationValue?: null | BigNumberish;
    sender?: null | string;
    exec?: null | ExecDataField;
    innerExec?: null | ExecDataField;
}
export declare class UserOperation implements UserOperationField {
    #private;
    get operationType(): number;
    set operationType(value: number);
    get operationValue(): bigint;
    set operationValue(value: BigNumberish);
    get sender(): string;
    set sender(value: string);
    get exec(): ExecData;
    set exec(value: ExecDataField);
    get innerExec(): null | ExecData;
    set innerExec(value: ExecDataField);
    constructor();
    static from(userOperation: UserOperationField): UserOperation;
    packOperation(): Uint8Array;
    formattedUserOperation(): Record<string, any>;
}
export interface AccountDetails {
    balance: string;
    nonce: number;
    history: Transaction[];
}
export interface Transaction {
    hash: string;
    to: string;
    from: string;
    value: string;
    timestamp: string;
}
export {};
