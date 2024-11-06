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
  const depositUserOp: UserOperationField = {
    operationType: 1,
    operationValue: '0x2c68af0bb140000',
    sender: '0xd09d22e15b8c387a023811e5c1021b441b8f0e5a',
    nonce: 1,
    chainId: 11155111,
    mainChainGasLimit: '0x30d40',
    zkVerificationGasLimit: '0x41eb0',
    mainChainGasPrice: '0x29810',
  };

  let depositSig = UserOperation.from(depositUserOp);

  const depositOp = {
    operation: depositSig.packOperation(),
    sender: depositSig.sender,
    opInfo: depositSig.packOpInfo(),
    callData: depositSig.keccakCalldata(),
    chainGasLimit: depositSig.packChainGasLimit(),
    zkVerificationGasLimit: depositSig.zkVerificationGasLimit,
    chainGasPrice: depositSig.packChainGasPrice(),
  };
  const depositDataHash = await TypedDataEncoder.hash(
    eip712Domain,
    EIP712_TYPES,
    depositOp,
  );

  assert(
    '0x8086f65ce9c1f6c3d5eadfa0783e8fce4bb325321ba9b8f89d110b2e4817fd81' ==
      depositDataHash,
  );

  const withdrawUserOp: UserOperationField = {
    operationType: 2,
    operationValue: '0xb1a2bc2ec50000',
    sender: '0xd09d22e15b8c387a023811e5c1021b441b8f0e5a',
    nonce: 2,
    chainId: 11155111,
    mainChainGasLimit: '0x30d40',
    zkVerificationGasLimit: '0x41eb0',
    mainChainGasPrice: '0x29810',
  };

  let withdrawSig = UserOperation.from(withdrawUserOp);

  const withdrawOp = {
    operation: withdrawSig.packOperation(),
    sender: withdrawSig.sender,
    opInfo: withdrawSig.packOpInfo(),
    callData: withdrawSig.keccakCalldata(),
    chainGasLimit: withdrawSig.packChainGasLimit(),
    zkVerificationGasLimit: withdrawSig.zkVerificationGasLimit,
    chainGasPrice: withdrawSig.packChainGasPrice(),
  };
  const withdrawDataHash = await TypedDataEncoder.hash(
    eip712Domain,
    EIP712_TYPES,
    withdrawOp,
  );

  assert(
    '0x4300e9432f3513d538a9fd1b89452a5379618a032b808d9f0a01b6df01c301b6' ==
      withdrawDataHash,
  );
}

main()
  .then()
  .catch(error => {
    console.log(`Error: ${error}`);
  });
