import {ethers, JsonRpcError, JsonRpcPayload, JsonRpcResult} from 'ethers';
import {Address} from './types';

type Constructor<T = {}> = new (...args: any[]) => T;

export function JsonRpcApiProvider<
  TBase extends Constructor<ethers.JsonRpcApiProvider>,
>(ProviderType: TBase) {
  return class Provider extends ProviderType {
    /**
     * Sends a JSON-RPC `_payload` (or a batch) to the underlying channel.
     *
     * @param _payload The JSON-RPC payload or batch of payloads to send.
     * @returns A promise that resolves to the result of the JSON-RPC request(s).
     */
    override _send(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _payload: JsonRpcPayload | Array<JsonRpcPayload>,
    ): Promise<Array<JsonRpcResult | JsonRpcError>> {
      throw new Error('Must be implemented by the derived class!');
    }

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
    } {
      throw new Error('Must be implemented by the derived class!');
    }
  };
}
