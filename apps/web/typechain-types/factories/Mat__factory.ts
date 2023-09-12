/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { Mat, MatInterface } from "../Mat";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "CheckedIn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "NewUser",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "checkIn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "createUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "getUser",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "lastCheckIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
        ],
        internalType: "struct Mat.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "uint256",
        name: "lastCheckIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "initialized",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526040518060400160405280601081526020017f4d7920417765736f6d6520546f6b656e00000000000000000000000000000000815250600090816200004a919062000361565b506040518060400160405280600381526020017f4d415400000000000000000000000000000000000000000000000000000000008152506001908162000091919062000361565b503480156200009f57600080fd5b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000448565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200016957607f821691505b6020821081036200017f576200017e62000121565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620001e97fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620001aa565b620001f58683620001aa565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620002426200023c62000236846200020d565b62000217565b6200020d565b9050919050565b6000819050919050565b6200025e8362000221565b620002766200026d8262000249565b848454620001b7565b825550505050565b600090565b6200028d6200027e565b6200029a81848462000253565b505050565b5b81811015620002c257620002b660008262000283565b600181019050620002a0565b5050565b601f8211156200031157620002db8162000185565b620002e6846200019a565b81016020851015620002f6578190505b6200030e62000305856200019a565b8301826200029f565b50505b505050565b600082821c905092915050565b6000620003366000198460080262000316565b1980831691505092915050565b600062000351838362000323565b9150826002028217905092915050565b6200036c82620000e7565b67ffffffffffffffff811115620003885762000387620000f2565b5b62000394825462000150565b620003a1828285620002c6565b600060209050601f831160018114620003d95760008415620003c4578287015190505b620003d0858262000343565b86555062000440565b601f198416620003e98662000185565b60005b828110156200041357848901518255600182019150602085019450602081019050620003ec565b868310156200043357848901516200042f601f89168262000323565b8355505b6001600288020188555050505b505050505050565b610c4480620004586000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806395d89b411161005b57806395d89b41146100ee578063a87430ba1461010c578063cdd876181461013e578063d9a59e331461015a5761007d565b806306fdde03146100825780636f77926b146100a05780638da5cb5b146100d0575b600080fd5b61008a610176565b604051610097919061070b565b60405180910390f35b6100ba60048036038101906100b59190610790565b610204565b6040516100c79190610833565b60405180910390f35b6100d861034e565b6040516100e5919061085d565b60405180910390f35b6100f6610374565b604051610103919061070b565b60405180910390f35b61012660048036038101906101219190610790565b610402565b60405161013593929190610896565b60405180910390f35b61015860048036038101906101539190610790565b610439565b005b610174600480360381019061016f9190610790565b61053a565b005b60008054610183906108fc565b80601f01602080910402602001604051908101604052809291908181526020018280546101af906108fc565b80156101fc5780601f106101d1576101008083540402835291602001916101fc565b820191906000526020600020905b8154815290600101906020018083116101df57829003601f168201915b505050505081565b61020c610658565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff161515151581525050905080604001516102cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c490610979565b60405180910390fd5b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff161515151581525050915050919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60018054610381906108fc565b80601f01602080910402602001604051908101604052809291908181526020018280546103ad906108fc565b80156103fa5780601f106103cf576101008083540402835291602001916103fa565b820191906000526020600020905b8154815290600101906020018083116103dd57829003601f168201915b505050505081565b60036020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900460ff16905083565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060020160009054906101000a900460ff16156104ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c5906109e5565b60405180910390fd5b600081600001819055506000816001018190555060018160020160006101000a81548160ff0219169083151502179055507f7ee9b70bf129b91a237044ce07c93c79f5562b96b53c04f7edaf7c9d6711f3d88260405161052e919061085d565b60405180910390a15050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905042816000018190555061058e6105e9565b8160010160008282546105a19190610a34565b925050819055507fdddb6e14f7f2101397a6526aab95e964de7f1f44ed06aa47a1c9a0e6b99244568282600101546040516105dd929190610a68565b60405180910390a15050565b60008042443360405160200161060193929190610afa565b6040516020818303038152906040528051906020012060001c9050600160ff1660018060026106309190610b44565b61063a9190610b79565b60ff16826106489190610bdd565b6106529190610a34565b91505090565b604051806060016040528060008152602001600081526020016000151581525090565b600081519050919050565b600082825260208201905092915050565b60005b838110156106b557808201518184015260208101905061069a565b60008484015250505050565b6000601f19601f8301169050919050565b60006106dd8261067b565b6106e78185610686565b93506106f7818560208601610697565b610700816106c1565b840191505092915050565b6000602082019050818103600083015261072581846106d2565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061075d82610732565b9050919050565b61076d81610752565b811461077857600080fd5b50565b60008135905061078a81610764565b92915050565b6000602082840312156107a6576107a561072d565b5b60006107b48482850161077b565b91505092915050565b6000819050919050565b6107d0816107bd565b82525050565b60008115159050919050565b6107eb816107d6565b82525050565b60608201600082015161080760008501826107c7565b50602082015161081a60208501826107c7565b50604082015161082d60408501826107e2565b50505050565b600060608201905061084860008301846107f1565b92915050565b61085781610752565b82525050565b6000602082019050610872600083018461084e565b92915050565b610881816107bd565b82525050565b610890816107d6565b82525050565b60006060820190506108ab6000830186610878565b6108b86020830185610878565b6108c56040830184610887565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061091457607f821691505b602082108103610927576109266108cd565b5b50919050565b7f5573657220646f6573206e6f7420657869737400000000000000000000000000600082015250565b6000610963601383610686565b915061096e8261092d565b602082019050919050565b6000602082019050818103600083015261099281610956565b9050919050565b7f5573657220616c72656164792065786973747300000000000000000000000000600082015250565b60006109cf601383610686565b91506109da82610999565b602082019050919050565b600060208201905081810360008301526109fe816109c2565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610a3f826107bd565b9150610a4a836107bd565b9250828201905080821115610a6257610a61610a05565b5b92915050565b6000604082019050610a7d600083018561084e565b610a8a6020830184610878565b9392505050565b6000819050919050565b610aac610aa7826107bd565b610a91565b82525050565b60008160601b9050919050565b6000610aca82610ab2565b9050919050565b6000610adc82610abf565b9050919050565b610af4610aef82610752565b610ad1565b82525050565b6000610b068286610a9b565b602082019150610b168285610a9b565b602082019150610b268284610ae3565b601482019150819050949350505050565b600060ff82169050919050565b6000610b4f82610b37565b9150610b5a83610b37565b9250828203905060ff811115610b7357610b72610a05565b5b92915050565b6000610b8482610b37565b9150610b8f83610b37565b9250828201905060ff811115610ba857610ba7610a05565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610be8826107bd565b9150610bf3836107bd565b925082610c0357610c02610bae565b5b82820690509291505056fea26469706673582212206e66192a04c116e01031b9da94345a62cfe4a8f50ac3a165f26aaba39484abcd64736f6c63430008130033";

type MatConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MatConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Mat__factory extends ContractFactory {
  constructor(...args: MatConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Mat & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Mat__factory {
    return super.connect(runner) as Mat__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MatInterface {
    return new Interface(_abi) as MatInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Mat {
    return new Contract(address, _abi, runner) as unknown as Mat;
  }
}
