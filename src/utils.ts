import {
  BigNumberish,
  ethers,
  hexlify,
  toBeArray,
  toBeHex,
  toBigInt,
  toUtf8Bytes,
  zeroPadValue,
} from 'ethers';
import {hashMessage} from './smt-utils';
import {Buffer} from 'buffer';

// Defines a BigInt value with a maximum of 128 bits
const MAX_UINT128 = (1n << 128n) - 1n;

function addHexPrefix(value: string): string {
  return '0x' + value;
}

/**
 * Check if BigInt is in the 128-bit range
 * @param value BigInt value to check
 * @returns Returns true if the value is in the 128-bit range, otherwise it returns false
 */
function isWithin128Bits(value: bigint): boolean {
  return value >= 0n && value <= MAX_UINT128;
}

/**
 * Packing two uint128 values (BigNumber representations) into a 32-byte Uint8Array.
 * @param high128
 * @param low128
 * @returns 32-byte Uint8Array
 * @throws
 */
export function packUints(high128: bigint, low128: bigint): Uint8Array {
  // Make sure both numbers are within 128 digits
  if (!isWithin128Bits(high128) || !isWithin128Bits(low128)) {
    throw new Error('high128 or low128 exceeds 128 bits');
  }

  // Convert high128 and low128 to 16 bytes
  const highBytes = zeroPadValue(
    toBeArray(addHexPrefix(high128.toString(16))),
    16,
  );
  const lowBytes = zeroPadValue(
    toBeArray(addHexPrefix(low128.toString(16))),
    16,
  );

  // Create a 32-byte buffer and copy the high and low bytes
  const packed = new Uint8Array(32);
  packed.set(Buffer.from(highBytes.slice(2), 'hex'), 0);
  packed.set(Buffer.from(lowBytes.slice(2), 'hex'), 16);

  return packed;
}

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
export async function poseidonId(value: string): Promise<string> {
  const valueBytes = toUtf8Bytes(value);

  const typeHash = hashMessage(hexlify(valueBytes));
  return typeHash;
}
