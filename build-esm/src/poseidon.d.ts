import { F1Field } from 'ffjavascript';
interface Poseidon {
    (inputs: bigint[], capacity?: bigint[]): bigint[];
    F: F1Field;
}
/**
 * Singleton to build poseidon once
 * @returns {Promise<Poseidon>} - poseidon hash function
 */
declare function getPoseidon(): Promise<Poseidon>;
export default getPoseidon;
