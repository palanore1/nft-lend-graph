import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ItemCancelled } from "../generated/schema"
import { ItemCancelled as ItemCancelledEvent } from "../generated/NFTlend/NFTlend"
import { handleItemCancelled } from "../src/nf-tlend"
import { createItemCancelledEvent } from "./nf-tlend-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let borrower = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let nftAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let newItemCancelledEvent = createItemCancelledEvent(
      borrower,
      nftAddress,
      tokenId
    )
    handleItemCancelled(newItemCancelledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ItemCancelled created and stored", () => {
    assert.entityCount("ItemCancelled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ItemCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "borrower",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ItemCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nftAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ItemCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
