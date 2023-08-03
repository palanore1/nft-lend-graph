import {BigInt, Address} from "@graphprotocol/graph-ts"
import {
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent,
  ItemLoaned as ItemLoanedEvent,
  LoanPayed as LoanPayedEvent
} from "../generated/NFTlend/NFTlend"
import {
  ActiveLoan,
  ActiveItem,
  ItemCancelled,
  ItemListed,
  ItemLoaned,
  LoanPayed
} from "../generated/schema"

export function handleItemCancelled(event: ItemCancelledEvent): void {
  let itemCancelled = ItemCancelled.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))

  if(!itemCancelled) {
    itemCancelled = new ItemCancelled(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  itemCancelled.borrower = event.params.borrower
  itemCancelled.nftAddress = event.params.nftAddress
  itemCancelled.tokenId = event.params.tokenId
  activeItem!.lender = Address.fromString("0x000000000000000000000000000000000000dEaD")

  itemCancelled.save()
  activeItem!.save()
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))

  if(!itemListed){
    itemListed = new ItemListed(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }
  if(!activeItem){
    activeItem = new ActiveItem(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  itemListed.borrower = event.params.borrower
  activeItem.borrower = event.params.borrower

  itemListed.nftAddress = event.params.nftAddress
  activeItem.nftAddress = event.params.nftAddress

  itemListed.tokenId = event.params.tokenId
  activeItem.tokenId = event.params.tokenId

  itemListed.minLoanValue = event.params.minLoanValue
  activeItem.minLoanValue = event.params.minLoanValue

  itemListed.interestRate = event.params.interestRate
  activeItem.interestRate = event.params.interestRate

  itemListed.loanPeriod = event.params.loanPeriod
  activeItem.loanPeriod = event.params.loanPeriod

  activeItem.lender = Address.fromString("0x0000000000000000000000000000000000000000")

  itemListed.save()
  activeItem.save()
  
}

export function handleItemLoaned(event: ItemLoanedEvent): void {
  let itemLoaned = ItemLoaned.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  let activeLoan = ActiveLoan.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))

  if (!itemLoaned){
    itemLoaned = new ItemLoaned(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  if (!activeLoan){
    activeLoan = new ActiveLoan(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  itemLoaned.lender = event.params.lender
  activeLoan.lender = event.params.lender

  itemLoaned.borrower = event.params.borrower
  activeLoan.borrower = event.params.borrower

  itemLoaned.nftAddress = event.params.nftAddress
  activeLoan.nftAddress = event.params.nftAddress

  itemLoaned.tokenId = event.params.tokenId
  activeLoan.tokenId = event.params.tokenId

  itemLoaned.loanValue = event.params.loanValue
  activeLoan.loanValue = event.params.loanValue

  itemLoaned.interestRate = event.params.interestRate
  activeLoan.interestRate = event.params.interestRate

  itemLoaned.loanPeriod = event.params.loanPeriod
  activeLoan.loanPeriod = event.params.loanPeriod

  itemLoaned.timeOfLoan = event.params.timeOfLoan
  activeLoan.timeOfLoan = event.params.timeOfLoan

  activeItem!.lender = event.params.lender

  itemLoaned.save()
  activeLoan.save()
  activeItem!.save()
}

export function handleLoanPayed(event: LoanPayedEvent): void {
  let loanPayed = LoanPayed.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  let activeLoan = ActiveLoan.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))

  if (!loanPayed){
    loanPayed = new LoanPayed(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  loanPayed.borrower = event.params.borrower
  loanPayed.nftAddress = event.params.nftAddress
  loanPayed.tokenId = event.params.tokenId
  loanPayed.loanValue = event.params.loanValue

  activeLoan!.lender = Address.fromString("0x0000000000000000000000000000000000000000")

  loanPayed.save()
  activeLoan!.save()
 
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString()
}