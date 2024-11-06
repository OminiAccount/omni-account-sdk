/**
 * Packing two uint128 values (BigNumber representations) into a 32-byte Uint8Array.
 * @param high128
 * @param low128
 * @returns 32-byte Uint8Array
 * @throws
 */
export declare function packUints(high128: bigint, low128: bigint): Uint8Array;
/**
 *  A simple hashing function which operates on UTF-8 strings to
 *  compute an 32-byte identifier.
 *
 *  This simply computes the [UTF-8 bytes](toUtf8Bytes) and computes
 *  the [[Poseidon]].
 *
 *  @example:
 *    id("hello world")
 *    //_result:
 */
export declare function poseidonId(value: string): Promise<string>;
