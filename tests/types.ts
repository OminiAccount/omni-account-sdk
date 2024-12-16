import {assert} from 'console';
import {
  EMPTY_HASH,
  EMPTY_KECCAK_HASH,
  UserOperation,
  UserOperationField,
} from '../src/types';
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
    exec: {
      nonce: 1,
      chainId: 11155111,
      mainChainGasLimit: '0x30d40',
      zkVerificationGasLimit: '0x898',
      mainChainGasPrice: '0x9502f900',
    },
  };

  let depositSig = UserOperation.from(depositUserOp);

  const depositOp = {
    operation: depositSig.packOperation(),
    sender: depositSig.sender,
    opInfo0: depositSig.exec.packOpInfo(),
    callData0: depositSig.exec.keccakCalldata(),
    chainGasLimit0: depositSig.exec.packChainGasLimit(),
    zkVerificationGasLimit0: depositSig.exec.zkVerificationGasLimit,
    chainGasPrice0: depositSig.exec.packChainGasPrice(),
    opInfo1:
      depositSig.innerExec == null
        ? EMPTY_HASH
        : depositSig.innerExec.packOpInfo(),
    callData1:
      depositSig.innerExec == null
        ? EMPTY_KECCAK_HASH
        : depositSig.innerExec.keccakCalldata(),
    chainGasLimit1:
      depositSig.innerExec == null
        ? EMPTY_HASH
        : depositSig.innerExec.packChainGasLimit(),
    zkVerificationGasLimit1:
      depositSig.innerExec == null
        ? BigInt(0)
        : depositSig.innerExec.zkVerificationGasLimit,
    chainGasPrice1:
      depositSig.innerExec == null
        ? EMPTY_HASH
        : depositSig.innerExec.packChainGasPrice(),
  };
  const depositDataHash = await TypedDataEncoder.hash(
    eip712Domain,
    EIP712_TYPES,
    depositOp,
  );

  assert(
    '0xa659ecc7e358743a6cbea61c2769fcd6efb2e74394d724d2e2d888bae3ff8416' ==
      depositDataHash,
  );

  const withdrawUserOp: UserOperationField = {
    operationType: 2,
    operationValue: '0xb1a2bc2ec50000',
    sender: '0xd09d22e15b8c387a023811e5c1021b441b8f0e5a',
    exec: {
      nonce: 2,
      chainId: 11155111,
      mainChainGasLimit: '0x30d40',
      zkVerificationGasLimit: '0x898',
      mainChainGasPrice: '0x9502f900',
    },
  };

  let withdrawSig = UserOperation.from(withdrawUserOp);

  const withdrawOp = {
    operation: withdrawSig.packOperation(),
    sender: withdrawSig.sender,
    opInfo0: withdrawSig.exec.packOpInfo(),
    callData0: withdrawSig.exec.keccakCalldata(),
    chainGasLimit0: withdrawSig.exec.packChainGasLimit(),
    zkVerificationGasLimit0: withdrawSig.exec.zkVerificationGasLimit,
    chainGasPrice0: withdrawSig.exec.packChainGasPrice(),
    opInfo1:
      withdrawSig.innerExec == null
        ? EMPTY_HASH
        : withdrawSig.innerExec.packOpInfo(),
    callData1:
      withdrawSig.innerExec == null
        ? EMPTY_KECCAK_HASH
        : withdrawSig.innerExec.keccakCalldata(),
    chainGasLimit1:
      withdrawSig.innerExec == null
        ? EMPTY_HASH
        : withdrawSig.innerExec.packChainGasLimit(),
    zkVerificationGasLimit1:
      withdrawSig.innerExec == null
        ? EMPTY_HASH
        : withdrawSig.innerExec.zkVerificationGasLimit,
    chainGasPrice1:
      withdrawSig.innerExec == null
        ? EMPTY_HASH
        : withdrawSig.innerExec.packChainGasPrice(),
  };
  const withdrawDataHash = await TypedDataEncoder.hash(
    eip712Domain,
    EIP712_TYPES,
    withdrawOp,
  );

  assert(
    '0xc8a02fadf45b2781bf28e5417d20eadbbe2b051424a6c4e0abc7d9f6ea2dd0c7' ==
      withdrawDataHash,
  );
}

main()
  .then()
  .catch(error => {
    console.log(`Error: ${error}`);
  });
