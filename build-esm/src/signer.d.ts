import { ethers } from 'ethers';
import { TypedDataDomain } from './typed-data';
import { Signature, UserOperation, UserOperationField } from './types';
/**
 * All typed data conforming to the EIP712 standard within Omni-AA.
 */
export declare const EIP712_TYPES: {
    UserOperation: {
        name: string;
        type: string;
    }[];
};
/**
 * A `EIP712Signer` provides support for signing EIP712-typed ZKsync Era transactions.
 */
export declare class EIP712Signer {
    private ethSigner;
    private eip712Domain;
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
    constructor(ethSigner: ethers.Signer);
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
    getSignInput(userOperation: UserOperation): {
        operation: Uint8Array;
        sender: string;
        opInfo0: Uint8Array;
        callData0: string;
        chainGasLimit0: Uint8Array;
        zkVerificationGasLimit0: bigint;
        chainGasPrice0: Uint8Array;
        opInfo1: Uint8Array;
        callData1: string | Uint8Array;
        chainGasLimit1: Uint8Array;
        zkVerificationGasLimit1: bigint | Uint8Array;
        chainGasPrice1: Uint8Array;
    };
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
    sign(userOperationField: UserOperationField): Promise<{
        userOperation: UserOperation;
        signature: Signature;
    }>;
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
    getSignedDigest(userOperationField: UserOperationField): Promise<string>;
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
    getDomain(): Promise<TypedDataDomain>;
}
