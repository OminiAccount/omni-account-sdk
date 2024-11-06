import { ethers, JsonRpcError, JsonRpcPayload, JsonRpcResult } from 'ethers';
import { Address } from './types';
type Constructor<T = {}> = new (...args: any[]) => T;
export declare function JsonRpcApiProvider<TBase extends Constructor<ethers.JsonRpcApiProvider>>(ProviderType: TBase): {
    new (...args: any[]): {
        /**
         * Sends a JSON-RPC `_payload` (or a batch) to the underlying channel.
         *
         * @param _payload The JSON-RPC payload or batch of payloads to send.
         * @returns A promise that resolves to the result of the JSON-RPC request(s).
         */
        _send(_payload: JsonRpcPayload | Array<JsonRpcPayload>): Promise<Array<JsonRpcResult | JsonRpcError>>;
        /**
         * Returns the addresses of the main contract and default ZKsync Era bridge contracts on both L1 and L2.
         */
        contractAddresses(): {
            bridgehubContract?: Address;
            mainContract?: Address;
            erc20BridgeL1?: Address;
            erc20BridgeL2?: Address;
            wethBridgeL1?: Address;
            wethBridgeL2?: Address;
            sharedBridgeL1?: Address;
            sharedBridgeL2?: Address;
            baseToken?: Address;
        };
        "__#17@#private": any;
        _getOption<K extends keyof ethers.JsonRpcApiProviderOptions>(key: K): ethers.JsonRpcApiProviderOptions[K];
        readonly _network: ethers.Network;
        _perform(req: ethers.PerformActionRequest): Promise<any>;
        _detectNetwork(): Promise<ethers.Network>;
        _start(): void;
        _waitUntilReady(): Promise<void>;
        _getSubscriber(sub: ethers.Subscription): ethers.Subscriber;
        readonly ready: boolean;
        getRpcTransaction(tx: ethers.TransactionRequest): ethers.JsonRpcTransactionRequest;
        getRpcRequest(req: ethers.PerformActionRequest): null | {
            method: string;
            args: Array<any>;
        };
        getRpcError(payload: JsonRpcPayload, _error: JsonRpcError): Error;
        send(method: string, params: Array<any> | Record<string, any>): Promise<any>;
        getSigner(address?: number | string): Promise<ethers.JsonRpcSigner>;
        listAccounts(): Promise<Array<ethers.JsonRpcSigner>>;
        destroy(): void;
        "__#14@#private": any;
        readonly pollingInterval: number;
        readonly provider: any;
        readonly plugins: ethers.AbstractProviderPlugin[];
        attachPlugin(plugin: ethers.AbstractProviderPlugin): any;
        getPlugin<T extends ethers.AbstractProviderPlugin = ethers.AbstractProviderPlugin>(name: string): null | T;
        disableCcipRead: boolean;
        ccipReadFetch(tx: ethers.PerformActionTransaction, calldata: string, urls: Array<string>): Promise<null | string>;
        _wrapBlock(value: ethers.BlockParams, network: ethers.Network): ethers.Block;
        _wrapLog(value: ethers.LogParams, network: ethers.Network): ethers.Log;
        _wrapTransactionReceipt(value: ethers.TransactionReceiptParams, network: ethers.Network): ethers.TransactionReceipt;
        _wrapTransactionResponse(tx: ethers.TransactionResponseParams, network: ethers.Network): ethers.TransactionResponse;
        getBlockNumber(): Promise<number>;
        _getAddress(address: ethers.AddressLike): string | Promise<string>;
        _getBlockTag(blockTag?: ethers.BlockTag): string | Promise<string>;
        _getFilter(filter: ethers.Filter | ethers.FilterByBlockHash): ethers.PerformActionFilter | Promise<ethers.PerformActionFilter>;
        _getTransactionRequest(_request: ethers.TransactionRequest): ethers.PerformActionTransaction | Promise<ethers.PerformActionTransaction>;
        getNetwork(): Promise<ethers.Network>;
        getFeeData(): Promise<ethers.FeeData>;
        estimateGas(_tx: ethers.TransactionRequest): Promise<bigint>;
        call(_tx: ethers.TransactionRequest): Promise<string>;
        getBalance(address: ethers.AddressLike, blockTag?: ethers.BlockTag): Promise<bigint>;
        getTransactionCount(address: ethers.AddressLike, blockTag?: ethers.BlockTag): Promise<number>;
        getCode(address: ethers.AddressLike, blockTag?: ethers.BlockTag): Promise<string>;
        getStorage(address: ethers.AddressLike, _position: ethers.BigNumberish, blockTag?: ethers.BlockTag): Promise<string>;
        broadcastTransaction(signedTx: string): Promise<ethers.TransactionResponse>;
        getBlock(block: ethers.BlockTag | string, prefetchTxs?: boolean): Promise<null | ethers.Block>;
        getTransaction(hash: string): Promise<null | ethers.TransactionResponse>;
        getTransactionReceipt(hash: string): Promise<null | ethers.TransactionReceipt>;
        getTransactionResult(hash: string): Promise<null | string>;
        getLogs(_filter: ethers.Filter | ethers.FilterByBlockHash): Promise<Array<ethers.Log>>;
        _getProvider(chainId: number): ethers.AbstractProvider;
        getResolver(name: string): Promise<null | ethers.EnsResolver>;
        getAvatar(name: string): Promise<null | string>;
        resolveName(name: string): Promise<null | string>;
        lookupAddress(address: string): Promise<null | string>;
        waitForTransaction(hash: string, _confirms?: null | number, timeout?: null | number): Promise<null | ethers.TransactionReceipt>;
        waitForBlock(blockTag?: ethers.BlockTag): Promise<ethers.Block>;
        _clearTimeout(timerId: number): void;
        _setTimeout(_func: () => void, timeout?: number): number;
        _forEachSubscriber(func: (s: ethers.Subscriber) => void): void;
        _recoverSubscriber(oldSub: ethers.Subscriber, newSub: ethers.Subscriber): void;
        on(event: ethers.ProviderEvent, listener: ethers.Listener): Promise<any>;
        once(event: ethers.ProviderEvent, listener: ethers.Listener): Promise<any>;
        emit(event: ethers.ProviderEvent, ...args: Array<any>): Promise<boolean>;
        listenerCount(event?: ethers.ProviderEvent): Promise<number>;
        listeners(event?: ethers.ProviderEvent): Promise<Array<ethers.Listener>>;
        off(event: ethers.ProviderEvent, listener?: ethers.Listener): Promise<any>;
        removeAllListeners(event?: ethers.ProviderEvent): Promise<any>;
        addListener(event: ethers.ProviderEvent, listener: ethers.Listener): Promise<any>;
        removeListener(event: ethers.ProviderEvent, listener: ethers.Listener): Promise<any>;
        readonly destroyed: boolean;
        paused: boolean;
        pause(dropWhilePaused?: boolean): void;
        resume(): void;
    };
} & TBase;
export {};
