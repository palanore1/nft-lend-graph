import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ItemCancelled,
  ItemListed,
  ItemLoaned,
  LoanPayed
} from "../generated/NFTlend/NFTlend"

export function createItemCancelledEvent(
  borrower: Address,
  nftAddress: Address,
  tokenId: BigInt
): ItemCancelled {
  let itemCancelledEvent = changetype<ItemCancelled>(newMockEvent())

  itemCancelledEvent.parameters = new Array()

  itemCancelledEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  itemCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return itemCancelledEvent
}

export function createItemListedEvent(
  borrower: Address,
  nftAddress: Address,
  tokenId: BigInt,
  minLoanValue: BigInt,
  interestRate: BigInt
): ItemListed {
  let itemListedEvent = changetype<ItemListed>(newMockEvent())

  itemListedEvent.parameters = new Array()

  itemListedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "minLoanValue",
      ethereum.Value.fromUnsignedBigInt(minLoanValue)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "interestRate",
      ethereum.Value.fromUnsignedBigInt(interestRate)
    )
  )

  return itemListedEvent
}

export function createItemLoanedEvent(
  lender: Address,
  nftAddress: Address,
  tokenId: BigInt,
  loanValue: BigInt,
  interestRate: BigInt
): ItemLoaned {
  let itemLoanedEvent = changetype<ItemLoaned>(newMockEvent())

  itemLoanedEvent.parameters = new Array()

  itemLoanedEvent.parameters.push(
    new ethereum.EventParam("lender", ethereum.Value.fromAddress(lender))
  )
  itemLoanedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemLoanedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemLoanedEvent.parameters.push(
    new ethereum.EventParam(
      "loanValue",
      ethereum.Value.fromUnsignedBigInt(loanValue)
    )
  )
  itemLoanedEvent.parameters.push(
    new ethereum.EventParam(
      "interestRate",
      ethereum.Value.fromUnsignedBigInt(interestRate)
    )
  )

  return itemLoanedEvent
}

export function createLoanPayedEvent(
  borrower: Address,
  nftAddress: Address,
  tokenId: BigInt,
  loanValue: BigInt
): LoanPayed {
  let loanPayedEvent = changetype<LoanPayed>(newMockEvent())

  loanPayedEvent.parameters = new Array()

  loanPayedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanPayedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  loanPayedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  loanPayedEvent.parameters.push(
    new ethereum.EventParam(
      "loanValue",
      ethereum.Value.fromUnsignedBigInt(loanValue)
    )
  )

  return loanPayedEvent
}
