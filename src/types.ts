import {
  BigNumberish,
  ethers,
  zeroPadValue,
  toBeArray,
  hexlify,
  getBigInt,
  keccak256,
} from 'ethers';
import {packUints} from './utils';

import {Buffer} from 'buffer';

const BN_0 = BigInt(0);

/** 0x-prefixed, hex encoded, ethereum account address. */
export type Address = string;
/** 0x-prefixed, hex encoded, ECDSA signature. */
export type Signature = string;

export enum OperationType {
  UserAction = 0,
  DepositAction = 1,
  WithdrawAction = 2,
}

export interface UserOperationField {
  operationType?: null | number;
  operationValue?: null | BigNumberish;
  sender?: null | string;
  nonce?: null | BigNumberish;
  chainId?: null | number;
  callData?: null | string;
  mainChainGasLimit?: null | BigNumberish;
  destChainGasLimit?: null | BigNumberish;
  zkVerificationGasLimit?: null | BigNumberish;
  mainChainGasPrice?: null | BigNumberish;
  destChainGasPrice?: null | BigNumberish;
}

export class UserOperation implements UserOperationField {
  #operationType: number;
  #operationValue: bigint;
  #sender: string;
  #nonce: bigint;
  #chainId: number;
  #callData: null | string;
  #mainChainGasLimit: bigint;
  #destChainGasLimit: bigint;
  #zkVerificationGasLimit: bigint;
  #mainChainGasPrice: bigint;
  #destChainGasPrice: bigint;

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
    this.#operationType = 0;
    this.#operationValue = BN_0;
    this.#sender = '0x';
    this.#nonce = BN_0;
    this.#chainId = 0;
    this.#callData = '0x';
    this.#mainChainGasLimit = BN_0;
    this.#destChainGasLimit = BN_0;
    this.#zkVerificationGasLimit = BN_0;
    this.#mainChainGasPrice = BN_0;
    this.#destChainGasPrice = BN_0;
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
    if (userOperation.nonce != null) {
      result.nonce = userOperation.nonce;
    }
    if (userOperation.chainId != null) {
      result.chainId = userOperation.chainId;
    }
    if (userOperation.callData != null) {
      result.callData = userOperation.callData;
    }
    if (userOperation.mainChainGasLimit != null) {
      result.mainChainGasLimit = userOperation.mainChainGasLimit;
    }
    if (userOperation.destChainGasLimit != null) {
      result.destChainGasLimit = userOperation.destChainGasLimit;
    }
    if (userOperation.zkVerificationGasLimit != null) {
      result.zkVerificationGasLimit = userOperation.zkVerificationGasLimit;
    }
    if (userOperation.mainChainGasPrice != null) {
      result.mainChainGasPrice = userOperation.mainChainGasPrice;
    }
    if (userOperation.destChainGasPrice != null) {
      result.destChainGasPrice = userOperation.destChainGasPrice;
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

  formattedUserOperation(): Record<string, any> {
    const toHexString = (value: BigNumberish) =>
      `0x${BigInt(value).toString(16)}`;

    return {
      operationType: this.operationType,
      operationValue: toHexString(this.operationValue),
      sender: this.sender,
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
