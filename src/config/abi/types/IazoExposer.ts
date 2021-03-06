/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IazoExposerInterface extends utils.Interface {
  functions: {
    "IAZOAddressToIndex(address)": FunctionFragment;
    "IAZOAddressToTokenTimelockAddress(address)": FunctionFragment;
    "IAZOAtIndex(uint256)": FunctionFragment;
    "IAZOIsRegistered(address)": FunctionFragment;
    "IAZO_FACTORY()": FunctionFragment;
    "IAZO_LIQUIDITY_LOCKER()": FunctionFragment;
    "IAZOsLength()": FunctionFragment;
    "addTokenTimelock(address,address)": FunctionFragment;
    "getTokenTimelock(address)": FunctionFragment;
    "initializeExposer(address,address)": FunctionFragment;
    "isIAZOExposer()": FunctionFragment;
    "owner()": FunctionFragment;
    "registerIAZO(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "sweepToken(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "IAZOAddressToIndex",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "IAZOAddressToTokenTimelockAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "IAZOAtIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "IAZOIsRegistered",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "IAZO_FACTORY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "IAZO_LIQUIDITY_LOCKER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "IAZOsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addTokenTimelock",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenTimelock",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initializeExposer",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isIAZOExposer",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerIAZO",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "sweepToken", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "IAZOAddressToIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "IAZOAddressToTokenTimelockAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "IAZOAtIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "IAZOIsRegistered",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "IAZO_FACTORY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "IAZO_LIQUIDITY_LOCKER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "IAZOsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addTokenTimelock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenTimelock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializeExposer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isIAZOExposer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerIAZO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sweepToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "IAZORegistered(address)": EventFragment;
    "IAZOTimelockAdded(address,address)": EventFragment;
    "LogInit()": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "IAZORegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "IAZOTimelockAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogInit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type IAZORegisteredEvent = TypedEvent<
  [string],
  { IAZOContract: string }
>;

export type IAZORegisteredEventFilter = TypedEventFilter<IAZORegisteredEvent>;

export type IAZOTimelockAddedEvent = TypedEvent<
  [string, string],
  { IAZOContract: string; TimelockContract: string }
>;

export type IAZOTimelockAddedEventFilter =
  TypedEventFilter<IAZOTimelockAddedEvent>;

export type LogInitEvent = TypedEvent<[], {}>;

export type LogInitEventFilter = TypedEventFilter<LogInitEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface IazoExposer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IazoExposerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    IAZOAddressToIndex(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    IAZOAddressToTokenTimelockAddress(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    IAZOAtIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    IAZOIsRegistered(
      _iazoAddress: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    IAZO_FACTORY(overrides?: CallOverrides): Promise<[string]>;

    IAZO_LIQUIDITY_LOCKER(overrides?: CallOverrides): Promise<[string]>;

    IAZOsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    addTokenTimelock(
      _iazoAddress: string,
      _iazoTokenTimelock: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getTokenTimelock(
      _iazoAddress: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    initializeExposer(
      _iazoFactory: string,
      _liquidityLocker: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isIAZOExposer(overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    registerIAZO(
      _iazoAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sweepToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  IAZOAddressToIndex(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  IAZOAddressToTokenTimelockAddress(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<string>;

  IAZOAtIndex(_index: BigNumberish, overrides?: CallOverrides): Promise<string>;

  IAZOIsRegistered(
    _iazoAddress: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  IAZO_FACTORY(overrides?: CallOverrides): Promise<string>;

  IAZO_LIQUIDITY_LOCKER(overrides?: CallOverrides): Promise<string>;

  IAZOsLength(overrides?: CallOverrides): Promise<BigNumber>;

  addTokenTimelock(
    _iazoAddress: string,
    _iazoTokenTimelock: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getTokenTimelock(
    _iazoAddress: string,
    overrides?: CallOverrides
  ): Promise<string>;

  initializeExposer(
    _iazoFactory: string,
    _liquidityLocker: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isIAZOExposer(overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  registerIAZO(
    _iazoAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sweepToken(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    IAZOAddressToIndex(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    IAZOAddressToTokenTimelockAddress(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<string>;

    IAZOAtIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    IAZOIsRegistered(
      _iazoAddress: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    IAZO_FACTORY(overrides?: CallOverrides): Promise<string>;

    IAZO_LIQUIDITY_LOCKER(overrides?: CallOverrides): Promise<string>;

    IAZOsLength(overrides?: CallOverrides): Promise<BigNumber>;

    addTokenTimelock(
      _iazoAddress: string,
      _iazoTokenTimelock: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getTokenTimelock(
      _iazoAddress: string,
      overrides?: CallOverrides
    ): Promise<string>;

    initializeExposer(
      _iazoFactory: string,
      _liquidityLocker: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isIAZOExposer(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    registerIAZO(
      _iazoAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    sweepToken(token: string, overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "IAZORegistered(address)"(
      IAZOContract?: string | null
    ): IAZORegisteredEventFilter;
    IAZORegistered(IAZOContract?: string | null): IAZORegisteredEventFilter;

    "IAZOTimelockAdded(address,address)"(
      IAZOContract?: string | null,
      TimelockContract?: string | null
    ): IAZOTimelockAddedEventFilter;
    IAZOTimelockAdded(
      IAZOContract?: string | null,
      TimelockContract?: string | null
    ): IAZOTimelockAddedEventFilter;

    "LogInit()"(): LogInitEventFilter;
    LogInit(): LogInitEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    IAZOAddressToIndex(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    IAZOAddressToTokenTimelockAddress(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    IAZOAtIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    IAZOIsRegistered(
      _iazoAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    IAZO_FACTORY(overrides?: CallOverrides): Promise<BigNumber>;

    IAZO_LIQUIDITY_LOCKER(overrides?: CallOverrides): Promise<BigNumber>;

    IAZOsLength(overrides?: CallOverrides): Promise<BigNumber>;

    addTokenTimelock(
      _iazoAddress: string,
      _iazoTokenTimelock: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getTokenTimelock(
      _iazoAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initializeExposer(
      _iazoFactory: string,
      _liquidityLocker: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isIAZOExposer(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    registerIAZO(
      _iazoAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sweepToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    IAZOAddressToIndex(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    IAZOAddressToTokenTimelockAddress(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    IAZOAtIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    IAZOIsRegistered(
      _iazoAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    IAZO_FACTORY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    IAZO_LIQUIDITY_LOCKER(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    IAZOsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addTokenTimelock(
      _iazoAddress: string,
      _iazoTokenTimelock: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getTokenTimelock(
      _iazoAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initializeExposer(
      _iazoFactory: string,
      _liquidityLocker: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isIAZOExposer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registerIAZO(
      _iazoAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sweepToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
