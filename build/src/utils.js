"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packUints = packUints;
exports.poseidonId = poseidonId;
exports.toHexString = toHexString;
const ethers_1 = require("ethers");
const smt_utils_1 = require("./smt-utils");
const buffer_1 = require("buffer");
// Defines a BigInt value with a maximum of 128 bits
const MAX_UINT128 = (1n << 128n) - 1n;
function addHexPrefix(value) {
    return '0x' + value;
}
/**
 * Check if BigInt is in the 128-bit range
 * @param value BigInt value to check
 * @returns Returns true if the value is in the 128-bit range, otherwise it returns false
 */
function isWithin128Bits(value) {
    return value >= 0n && value <= MAX_UINT128;
}
/**
 * Packing two uint128 values (BigNumber representations) into a 32-byte Uint8Array.
 * @param high128
 * @param low128
 * @returns 32-byte Uint8Array
 * @throws
 */
function packUints(high128, low128) {
    // Make sure both numbers are within 128 digits
    if (!isWithin128Bits(high128) || !isWithin128Bits(low128)) {
        throw new Error('high128 or low128 exceeds 128 bits');
    }
    // Convert high128 and low128 to 16 bytes
    const highBytes = (0, ethers_1.zeroPadValue)((0, ethers_1.toBeArray)(addHexPrefix(high128.toString(16))), 16);
    const lowBytes = (0, ethers_1.zeroPadValue)((0, ethers_1.toBeArray)(addHexPrefix(low128.toString(16))), 16);
    // Create a 32-byte buffer and copy the high and low bytes
    const packed = new Uint8Array(32);
    packed.set(buffer_1.Buffer.from(highBytes.slice(2), 'hex'), 0);
    packed.set(buffer_1.Buffer.from(lowBytes.slice(2), 'hex'), 16);
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
async function poseidonId(value) {
    const valueBytes = (0, ethers_1.toUtf8Bytes)(value);
    const typeHash = (0, smt_utils_1.hashMessage)((0, ethers_1.hexlify)(valueBytes));
    return typeHash;
}
function toHexString(value) {
    return `0x${BigInt(value).toString(16)}`;
}
//# sourceMappingURL=utils.js.map