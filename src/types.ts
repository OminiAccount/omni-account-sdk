import {
  BigNumberish,
  ethers,
  zeroPadValue,
  toBeArray,
  hexlify,
  getBigInt,
  keccak256,
} from 'ethers';
import {packUints, toHexString} from './utils';

import {Buffer} from 'buffer';

const BN_0 = BigInt(0);

export const EMPTY_KECCAK_HASH = new Uint8Array(
  Buffer.from(
    'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    'hex',
  ),
);

export const EMPTY_HASH = new Uint8Array(
  Buffer.from(
    '0000000000000000000000000000000000000000000000000000000000000000',
    'hex',
  ),
);

/** 0x-prefixed, hex encoded, ethereum account address. */
export type Address = string;
/** 0x-prefixed, hex encoded, ECDSA signature. */
export type Signature = string;

export enum OperationType {
  UserAction = 0,
  DepositAction = 1,
  WithdrawAction = 2,
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

class ExecData implements ExecDataField {
  #nonce: bigint;
  #chainId: number;
  #callData: null | string;
  #mainChainGasLimit: bigint;
  #destChainGasLimit: bigint;
  #zkVerificationGasLimit: bigint;
  #mainChainGasPrice: bigint;
  #destChainGasPrice: bigint;

  get nonce(): bigint {
    return this.#nonce;
  }
  set nonce(value: BigNumberish) {
    this.#nonce = getBigInt(value, 'nonce');
  }

  get chainId(): number {
    return this.#chainId;
  }
  set chainId(value: number) {
    this.#chainId = value;
  }

  get callData(): null | string {
    return this.#callData;
  }
  set callData(value: null | string) {
    this.#callData = value;
  }

  get mainChainGasLimit(): bigint {
    return this.#mainChainGasLimit;
  }
  set mainChainGasLimit(value: BigNumberish) {
    this.#mainChainGasLimit = getBigInt(value, 'mainChainGasLimit');
  }

  get destChainGasLimit(): bigint {
    return this.#destChainGasLimit;
  }
  set destChainGasLimit(value: BigNumberish) {
    this.#destChainGasLimit = getBigInt(value, 'destChainGasLimit');
  }

  get zkVerificationGasLimit(): bigint {
    return this.#zkVerificationGasLimit;
  }
  set zkVerificationGasLimit(value: BigNumberish) {
    this.#zkVerificationGasLimit = getBigInt(value, 'zkVerificationGasLimit');
  }

  get mainChainGasPrice(): bigint {
    return this.#mainChainGasPrice;
  }
  set mainChainGasPrice(value: BigNumberish) {
    this.#mainChainGasPrice = getBigInt(value, 'mainChainGasPrice');
  }

  get destChainGasPrice(): bigint {
    return this.#destChainGasPrice;
  }
  set destChainGasPrice(value: BigNumberish) {
    this.#destChainGasPrice = getBigInt(value, 'destChainGasPrice');
  }

  constructor() {
    this.#nonce = BN_0;
    this.#chainId = 0;
    this.#callData = '0x';
    this.#mainChainGasLimit = BN_0;
    this.#destChainGasLimit = BN_0;
    this.#zkVerificationGasLimit = BN_0;
    this.#mainChainGasPrice = BN_0;
    this.#destChainGasPrice = BN_0;
  }

  static from(execData: ExecDataField): ExecData {
    const result = new ExecData();
    if (execData.nonce != null) {
      result.nonce = execData.nonce;
    }
    if (execData.chainId != null) {
      result.chainId = execData.chainId;
    }
    if (execData.callData != null) {
      result.callData = execData.callData;
    }
    if (execData.mainChainGasLimit != null) {
      result.mainChainGasLimit = execData.mainChainGasLimit;
    }
    if (execData.destChainGasLimit != null) {
      result.destChainGasLimit = execData.destChainGasLimit;
    }
    if (execData.zkVerificationGasLimit != null) {
      result.zkVerificationGasLimit = execData.zkVerificationGasLimit;
    }
    if (execData.mainChainGasPrice != null) {
      result.mainChainGasPrice = execData.mainChainGasPrice;
    }
    if (execData.destChainGasPrice != null) {
      result.destChainGasPrice = execData.destChainGasPrice;
    }
    return result;
  }

  keccakCalldata(): string {
    let calldata = '0x';
    if (this.callData != null) {
      calldata = this.callData;
    }
    return keccak256(calldata);
  }

  packOpInfo(): Uint8Array {
    return packUints(this.nonce, BigInt(this.chainId));
  }

  packChainGasLimit(): Uint8Array {
    return packUints(this.mainChainGasLimit, this.destChainGasLimit);
  }

  packChainGasPrice(): Uint8Array {
    return packUints(this.mainChainGasPrice, this.destChainGasPrice);
  }

  formattedExecData(): Record<string, any> {
    return {
      nonce: toHexString(this.nonce),
      chainId: toHexString(this.chainId),
      callData: this.callData || '0x',
      mainChainGasLimit: toHexString(this.mainChainGasLimit),
      destChainGasLimit: toHexString(this.destChainGasLimit),
      zkVerificationGasLimit: toHexString(this.zkVerificationGasLimit),
      mainChainGasPrice: toHexString(this.mainChainGasPrice),
      destChainGasPrice: toHexString(this.destChainGasPrice),
    };
  }
}

export interface UserOperationField {
  operationType?: null | number;
  operationValue?: null | BigNumberish;
  sender?: null | string;
  exec?: null | ExecDataField;
  innerExec?: null | ExecDataField;
}

export class UserOperation implements UserOperationField {
  #operationType: number;
  #operationValue: bigint;
  #sender: string;
  #exec: ExecData;
  #innerExec: null | ExecData;

  get operationType(): number {
    return this.#operationType;
  }
  set operationType(value: number) {
    this.#operationType = value;
  }

  get operationValue(): bigint {
    return this.#operationValue;
  }
  set operationValue(value: BigNumberish) {
    this.#operationValue = getBigInt(value, 'operationValue');
  }

  get sender(): string {
    return this.#sender;
  }
  set sender(value: string) {
    this.#sender = value;
  }

  get exec(): ExecData {
    return this.#exec;
  }

  set exec(value: ExecDataField) {
    this.#exec = ExecData.from(value);
  }

  get innerExec(): null | ExecData {
    return this.#innerExec;
  }

  set innerExec(value: ExecDataField) {
    this.#innerExec = ExecData.from(value);
  }

  constructor() {
    this.#operationType = 0;
    this.#operationValue = BN_0;
    this.#sender = '0x';
    this.#exec = new ExecData();
    this.#innerExec = new ExecData();
  }

  static from(userOperation: UserOperationField): UserOperation {
    const result = new UserOperation();
    if (userOperation.operationType != null) {
      result.operationType = userOperation.operationType;
    }
    if (userOperation.operationValue != null) {
      result.operationValue = userOperation.operationValue;
    }
    if (userOperation.sender != null) {
      result.sender = userOperation.sender;
    }
    if (userOperation.exec != null) {
      result.exec = userOperation.exec;
    }
    if (userOperation.innerExec != null) {
      result.innerExec = userOperation.innerExec;
    }
    return result;
  }

  packOperation(): Uint8Array {
    const encodeBytes = new Uint8Array(32);

    encodeBytes[0] = this.operationType;
    const operationValueBytes = zeroPadValue(
      toBeArray(this.operationValue),
      31,
    );
    encodeBytes.set(Buffer.from(operationValueBytes.slice(2), 'hex'), 1);

    return encodeBytes;
  }

  formattedUserOperation(): Record<string, any> {
    return {
      operationType: this.operationType,
      operationValue: toHexString(this.operationValue),
      sender: this.sender,
      exec: this.exec.formattedExecData(),
      innerExec: this.innerExec?.formattedExecData(),
    };
  }
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
