import { describe, it } from "node:test"
import { deepEqual } from "node:assert/strict"
import { readFileSync } from "node:fs"

const source_url = "https://core.telegram.org/bots/payments/currencies.json"

describe("currencies", function () {
  it("should be up to date", async function () {
    const remote = await fetch(source_url).then(function (resp) {
      return resp.json()
    })

    const local = JSON.parse(readFileSync("./currencies.json", {
      encoding: "utf8"
    }))

    deepEqual(remote, local)
  })
})
