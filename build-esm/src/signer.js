import { assert, ethers } from 'ethers';
import { TypedDataEncoder } from './typed-data';
import { UserOperation } from './types';
/**
 * All typed data conforming to the EIP712 standard within Omni-AA.
 */
export const EIP712_TYPES = {
    UserOperation: [
        { name: 'operation', type: 'bytes32' },
        { name: 'sender', type: 'address' },
        { name: 'opInfo', type: 'bytes32' },
        { name: 'callData', type: 'bytes32' },
        { name: 'chainGasLimit', type: 'bytes32' },
        { name: 'zkVerificationGasLimit', type: 'uint256' },
        { name: 'chainGasPrice', type: 'bytes32' },
    ],
};
/**
 * A `EIP712Signer` provides support for signing EIP712-typed ZKsync Era transactions.
 */
export class EIP712Signer {
    ethSigner;
    eip712Domain;
    /**
     * @example
     *
     * import { Provider, types, EIP712Signer } from "omniAA-sdk";
     * import { ethers } from "ethers";
     *
     * const PRIVATE_KEY = "<PRIVATE_KEY>";
     *
     * const provider = Provider.getDefaultProvider(types.Network.Sepolia);
     * const signer = new EIP712Signer(new ethers.Wallet(PRIVATE_KEY);
     */
    constructor(ethSigner) {
        this.ethSigner = ethSigner;
        this.eip712Domain = Promise.resolve().then(() => ({
            name: 'OMNI-ACCOUNT',
            version: '1.0',
        }));
    }
    /**
     * Generates the EIP712 typed data from provided transaction. Optional fields are populated by zero values.
     *
     * @param transaction The transaction request that needs to be populated.
     *
     * @example
     *
     * import { EIP712Signer } from "zksync-ethers";
     *
     * const tx = EIP712Signer.getSignInput({
     *   type: utils.EIP712_TX_TYPE,
     *   to: "0xa61464658AfeAf65CccaaFD3a512b69A83B77618",
     *   value: 7_000_000n,
     *   from: "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049",
     *   nonce: 0n,
     *   chainId: 270n,
     *   gasPrice: 250_000_000n,
     *   gasLimit: 21_000n,
     *   customData: {},
     * });
     */
    getSignInput(userOperation) {
        return {
            operation: userOperation.packOperation(),
            sender: userOperation.sender,
            opInfo: userOperation.packOpInfo(),
            callData: userOperation.keccakCalldata(),
            chainGasLimit: userOperation.packChainGasLimit(),
            zkVerificationGasLimit: userOperation.zkVerificationGasLimit,
            chainGasPrice: userOperation.packChainGasPrice(),
        };
    }
    /**
     * Signs a transaction request using EIP712.
     *
     * @param transaction The transaction request that needs to be signed.
     * @returns A promise that resolves to the signature of the transaction.
     *
     * @example
     *
     * import { Provider, types, EIP712Signer } from "zksync-ethers";
     * import { ethers } from "ethers";
     *
     * const PRIVATE_KEY = "<PRIVATE_KEY>";
     *
     * const provider = Provider.getDefaultProvider(types.Network.Sepolia);
     * const signer = new EIP712Signer(new ethers.Wallet(PRIVATE_KEY, Number(await provider.getNetwork()));
     * const signature = signer.sign({
     *   type: utils.EIP712_TX_TYPE,
     *   to: "0xa61464658AfeAf65CccaaFD3a512b69A83B77618",
     *   value: 7_000_000n,
     *   nonce: 0n,
     *   chainId: 270n,
     *   gasPrice: 250_000_000n,
     *   gasLimit: 21_000n,
     * })
     */
    async sign(userOperationField) {
        const userOperation = UserOperation.from(userOperationField);
        const dataHash = ethers.toBeArray(await TypedDataEncoder.hash(await this.eip712Domain, EIP712_TYPES, this.getSignInput(UserOperation.from(userOperationField))));
        const signature = await this.ethSigner.signMessage(dataHash);
        {
            let messageHash = ethers.hashMessage(dataHash);
            const recoverAddress = ethers.recoverAddress(messageHash, signature);
            assert(recoverAddress == (await this.ethSigner.getAddress()), 'signature failed(recoverAddress is not equal to signer)', 'UNKNOWN_ERROR', {});
        }
        return { userOperation, signature };
    }
    /**
     * Hashes the transaction request using EIP712.
     *
     * @param transaction The transaction request that needs to be hashed.
     * @returns A hash (digest) of the transaction request.
     *
     * @throws {Error} If `transaction.chainId` is not set.
     *
     * @example
     *
     * import { EIP712Signer } from "zksync-ethers";
     *
     * const hash = EIP712Signer.getSignedDigest({
     *   type: utils.EIP712_TX_TYPE,
     *   to: "0xa61464658AfeAf65CccaaFD3a512b69A83B77618",
     *   value: 7_000_000n,
     *   from: "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049",
     *   nonce: 0n,
     *   chainId: 270n,
     *   gasPrice: 250_000_000n,
     *   gasLimit: 21_000n,
     *   customData: {},
     * });
     */
    async getSignedDigest(userOperationField) {
        return await TypedDataEncoder.hash(await this.eip712Domain, EIP712_TYPES, this.getSignInput(UserOperation.from(userOperationField)));
    }
    /**
     * Returns ZKsync Era EIP712 domain.
     *
     * @example
     *
     * import { Provider, types, EIP712Signer } from "zksync-ethers";
     * import { ethers } from "ethers";
     *
     * const PRIVATE_KEY = "<PRIVATE_KEY>";
     *
     * const provider = Provider.getDefaultProvider(types.Network.Sepolia);
     * const signer = new EIP712Signer(new ethers.Wallet(PRIVATE_KEY, Number(await provider.getNetwork()));
     * const domain = await signer.getDomain();
     */
    async getDomain() {
        return await this.eip712Domain;
    }
}
//# sourceMappingURL=signer.js.map