import { zeroPadValue, toBeArray, getBigInt, keccak256, } from 'ethers';
import { packUints, toHexString } from './utils';
import { Buffer } from 'buffer';
const BN_0 = BigInt(0);
export const EMPTY_KECCAK_HASH = new Uint8Array(Buffer.from('c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470', 'hex'));
export const EMPTY_HASH = new Uint8Array(Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex'));
export var OperationType;
(function (OperationType) {
    OperationType[OperationType["UserAction"] = 0] = "UserAction";
    OperationType[OperationType["DepositAction"] = 1] = "DepositAction";
    OperationType[OperationType["WithdrawAction"] = 2] = "WithdrawAction";
})(OperationType || (OperationType = {}));
class ExecData {
    #nonce;
    #chainId;
    #callData;
    #mainChainGasLimit;
    #destChainGasLimit;
    #zkVerificationGasLimit;
    #mainChainGasPrice;
    #destChainGasPrice;
    get nonce() {
        return this.#nonce;
    }
    set nonce(value) {
        this.#nonce = getBigInt(value, 'nonce');
    }
    get chainId() {
        return this.#chainId;
    }
    set chainId(value) {
        this.#chainId = value;
    }
    get callData() {
        return this.#callData;
    }
    set callData(value) {
        this.#callData = value;
    }
    get mainChainGasLimit() {
        return this.#mainChainGasLimit;
    }
    set mainChainGasLimit(value) {
        this.#mainChainGasLimit = getBigInt(value, 'mainChainGasLimit');
    }
    get destChainGasLimit() {
        return this.#destChainGasLimit;
    }
    set destChainGasLimit(value) {
        this.#destChainGasLimit = getBigInt(value, 'destChainGasLimit');
    }
    get zkVerificationGasLimit() {
        return this.#zkVerificationGasLimit;
    }
    set zkVerificationGasLimit(value) {
        this.#zkVerificationGasLimit = getBigInt(value, 'zkVerificationGasLimit');
    }
    get mainChainGasPrice() {
        return this.#mainChainGasPrice;
    }
    set mainChainGasPrice(value) {
        this.#mainChainGasPrice = getBigInt(value, 'mainChainGasPrice');
    }
    get destChainGasPrice() {
        return this.#destChainGasPrice;
    }
    set destChainGasPrice(value) {
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
    static from(execData) {
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
    keccakCalldata() {
        let calldata = '0x';
        if (this.callData != null) {
            calldata = this.callData;
        }
        return keccak256(calldata);
    }
    packOpInfo() {
        return packUints(this.nonce, BigInt(this.chainId));
    }
    packChainGasLimit() {
        return packUints(this.mainChainGasLimit, this.destChainGasLimit);
    }
    packChainGasPrice() {
        return packUints(this.mainChainGasPrice, this.destChainGasPrice);
    }
    formattedExecData() {
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
export class UserOperation {
    #operationType;
    #operationValue;
    #sender;
    #exec;
    #innerExec;
    get operationType() {
        return this.#operationType;
    }
    set operationType(value) {
        this.#operationType = value;
    }
    get operationValue() {
        return this.#operationValue;
    }
    set operationValue(value) {
        this.#operationValue = getBigInt(value, 'operationValue');
    }
    get sender() {
        return this.#sender;
    }
    set sender(value) {
        this.#sender = value;
    }
    get exec() {
        return this.#exec;
    }
    set exec(value) {
        this.#exec = ExecData.from(value);
    }
    get innerExec() {
        return this.#innerExec;
    }
    set innerExec(value) {
        this.#innerExec = ExecData.from(value);
    }
    constructor() {
        this.#operationType = 0;
        this.#operationValue = BN_0;
        this.#sender = '0x';
        this.#exec = new ExecData();
        this.#innerExec = new ExecData();
    }
    static from(userOperation) {
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
    packOperation() {
        const encodeBytes = new Uint8Array(32);
        encodeBytes[0] = this.operationType;
        const operationValueBytes = zeroPadValue(toBeArray(this.operationValue), 31);
        encodeBytes.set(Buffer.from(operationValueBytes.slice(2), 'hex'), 1);
        return encodeBytes;
    }
    formattedUserOperation() {
        return {
            operationType: this.operationType,
            operationValue: toHexString(this.operationValue),
            sender: this.sender,
            exec: this.exec.formattedExecData(),
            innerExec: this.innerExec?.formattedExecData(),
        };
    }
}
//# sourceMappingURL=types.js.map