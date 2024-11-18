import {Scalar} from 'ffjavascript';
import getPoseidon from './poseidon';

/**
 * Convert array of 4 Scalars of 64 bits into a unique 256 bits scalar
 * @param {Array[Scalar]} h4 - Array of 4 Scalars of 64 bits
 * @returns {Scalar} 256 bit number representation
 */
function h4toScalar(h4: bigint[]) {
  return Scalar.add(
    Scalar.add(h4[0], Scalar.shl(h4[1], 64)),
    Scalar.add(Scalar.shl(h4[2], 128), Scalar.shl(h4[3], 192)),
  );
}

/**
 * Convert array of 4 Scalars of 64 bits into an hex string
 * @param {Array[Scalar]} h4 - Array of 4 Scalars of 64 bits
 * @returns {String} 256 bit number represented as hex string
 */
function h4toString(h4: bigint[]): string {
  const sc = h4toScalar(h4);

  return `0x${Scalar.toString(sc, 16).padStart(64, '0')}`;
}

const BYTECODE_ELEMENTS_HASH = 8;
const BYTECODE_BYTES_ELEMENT = 7;

/**
 * Computes the bytecode hash in order to add it to the state-tree
 * @param {string} _bytecode - smart contract bytecode represented as hex string
 * @returns {Promise<string>} bytecode hash represented as hex string
 */
async function hashMessage(_bytecode: string): Promise<string> {
  const poseidon = await getPoseidon();
  const {F} = poseidon;

  let bytecode = _bytecode.startsWith('0x')
    ? _bytecode.slice(2)
    : _bytecode.slice();
  bytecode = bytecode.length % 2 ? `0${bytecode}` : bytecode;
  bytecode += '01';

  while (bytecode.length % (56 * 2) !== 0) bytecode += '00';

  const lastByte = (Number(bytecode.slice(-2)) | 0x80).toString(16);
  bytecode = `${bytecode.slice(0, -2)}${lastByte}`;

  const numBytes = bytecode.length / 2;
  const numHashes = Math.ceil(
    numBytes / (BYTECODE_ELEMENTS_HASH * BYTECODE_BYTES_ELEMENT),
  );

  let tmpHash: bigint[] = [F.zero, F.zero, F.zero, F.zero];
  let bytesPointer = 0;

  for (let i = 0; i < numHashes; i++) {
    const maxBytesToAdd = BYTECODE_ELEMENTS_HASH * BYTECODE_BYTES_ELEMENT;
    const elementsToHash: bigint[] = []; // 4 capacity + 8 elements

    elementsToHash.push(...tmpHash);

    const subsetBytecode = bytecode.slice(
      bytesPointer,
      bytesPointer + maxBytesToAdd * 2,
    );
    bytesPointer += maxBytesToAdd * 2;

    let tmpElem = '';
    let counter = 0;

    for (let j = 0; j < maxBytesToAdd; j++) {
      let byteToAdd = '00';
      if (j < subsetBytecode.length / 2) {
        byteToAdd = subsetBytecode.slice(j * 2, (j + 1) * 2);
      }

      tmpElem = byteToAdd.concat(tmpElem);
      counter += 1;

      if (counter === BYTECODE_BYTES_ELEMENT) {
        elementsToHash.push(F.e(Scalar.fromString(tmpElem, 16)));
        tmpElem = '';
        counter = 0;
      }
    }

    tmpHash = poseidon(elementsToHash.slice(4, 12), elementsToHash.slice(0, 4));
  }
  const a = h4toString(tmpHash);

  return a;
}

export {h4toString, hashMessage};
