"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcApiProvider = JsonRpcApiProvider;
function JsonRpcApiProvider(ProviderType) {
    return class Provider extends ProviderType {
        /**
         * Sends a JSON-RPC `_payload` (or a batch) to the underlying channel.
         *
         * @param _payload The JSON-RPC payload or batch of payloads to send.
         * @returns A promise that resolves to the result of the JSON-RPC request(s).
         */
        _send(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _payload) {
            throw new Error('Must be implemented by the derived class!');
        }
        /**
         * Returns the addresses of the main contract and default ZKsync Era bridge contracts on both L1 and L2.
         */
        contractAddresses() {
            throw new Error('Must be implemented by the derived class!');
        }
    };
}
//# sourceMappingURL=provider.js.map