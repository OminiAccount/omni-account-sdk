/**
 * Convert array of 4 Scalars of 64 bits into an hex string
 * @param {Array[Scalar]} h4 - Array of 4 Scalars of 64 bits
 * @returns {String} 256 bit number represented as hex string
 */
declare function h4toString(h4: bigint[]): string;
/**
 * Computes the bytecode hash in order to add it to the state-tree
 * @param {string} _bytecode - smart contract bytecode represented as hex string
 * @returns {Promise<string>} bytecode hash represented as hex string
 */
declare function hashMessage(_bytecode: string): Promise<string>;
export { h4toString, hashMessage };
