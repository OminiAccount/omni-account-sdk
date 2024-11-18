import {assert} from 'console';
import {UserOperation, UserOperationField} from '../src/types';
import {EIP712_TYPES} from '../src/signer';
import {TypedDataEncoder} from '../src/typed-data';
import {userInfo} from 'os';
import {hashMessage} from '../src/smt-utils';

const eip712Domain = {
  name: 'OMNI-ACCOUNT',
  version: '1.0',
};

async function main() {
  const root = await hashMessage('');
  console.log('root: ', root);
}

main()
  .then()
  .catch(error => {
    console.log(`Error: ${error}`);
  });
