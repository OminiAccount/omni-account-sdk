"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOperation = exports.OperationType = void 0;
const ethers_1 = require("ethers");
const utils_1 = require("./utils");
const buffer_1 = require("buffer");
const BN_0 = BigInt(0);
var OperationType;
(function (OperationType) {
    OperationType[OperationType["UserAction"] = 0] = "UserAction";
    OperationType[OperationType["DepositAction"] = 1] = "DepositAction";
    OperationType[OperationType["WithdrawAction"] = 2] = "WithdrawAction";
})(OperationType || (exports.OperationType = OperationType = {}));
class UserOperation {
    #operationType;
    #operationValue;
    #sender;
    #nonce;
    #chainId;
    #callData;
    #mainChainGasLimit;
    #destChainGasLimit;
    #zkVerificationGasLimit;
    #mainChainGasPrice;
    #destChainGasPrice;
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
        this.#operationValue = (0, ethers_1.getBigInt)(value, 'operationValue');
    }
    get sender() {
        return this.#sender;
    }
    set sender(value) {
        this.#sender = value;
    }
    get nonce() {
        return this.#nonce;
    }
    set nonce(value) {
        this.#nonce = (0, ethers_1.getBigInt)(value, 'nonce');
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
        this.#mainChainGasLimit = (0, ethers_1.getBigInt)(value, 'mainChainGasLimit');
    }
    get destChainGasLimit() {
        return this.#destChainGasLimit;
    }
    set destChainGasLimit(value) {
        this.#destChainGasLimit = (0, ethers_1.getBigInt)(value, 'destChainGasLimit');
    }
    get zkVerificationGasLimit() {
        return this.#zkVerificationGasLimit;
    }
    set zkVerificationGasLimit(value) {
        this.#zkVerificationGasLimit = (0, ethers_1.getBigInt)(value, 'zkVerificationGasLimit');
    }
    get mainChainGasPrice() {
        return this.#mainChainGasPrice;
    }
    set mainChainGasPrice(value) {
        this.#mainChainGasPrice = (0, ethers_1.getBigInt)(value, 'mainChainGasPrice');
    }
    get destChainGasPrice() {
        return this.#destChainGasPrice;
    }
    set destChainGasPrice(value) {
        this.#destChainGasPrice = (0, ethers_1.getBigInt)(value, 'destChainGasPrice');
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
    packOperation() {
        const encodeBytes = new Uint8Array(32);
        encodeBytes[0] = this.operationType;
        const operationValueBytes = (0, ethers_1.zeroPadValue)((0, ethers_1.toBeArray)(this.operationValue), 31);
        encodeBytes.set(buffer_1.Buffer.from(operationValueBytes.slice(2), 'hex'), 1);
        return encodeBytes;
    }
    keccakCalldata() {
        let calldata = '0x';
        if (this.callData != null) {
            calldata = this.callData;
        }
        return (0, ethers_1.keccak256)(calldata);
    }
    packOpInfo() {
        return (0, utils_1.packUints)(this.nonce, BigInt(this.chainId));
    }
    packChainGasLimit() {
        return (0, utils_1.packUints)(this.mainChainGasLimit, this.destChainGasLimit);
    }
    packChainGasPrice() {
        return (0, utils_1.packUints)(this.mainChainGasPrice, this.destChainGasPrice);
    }
}
exports.UserOperation = UserOperation;
//# sourceMappingURL=types.js.map