import { describe, it } from "node:test"
import { deepEqual, equal } from "node:assert/strict"
import { readFileSync } from "node:fs"
import { getMe } from "./index.js"

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

describe("getMe", function () {
  const token = String(process.env.TOKEN || "")
  const test = token ? it : it.skip;

  test("should get bot info", async function (ctx) {
    const me = await getMe(token, ctx.signal)

    equal(token.startsWith(me.id), true, "token should starts with bot id")
    equal(me.is_bot, true, "the response should have `is_bot` property")
    equal(typeof me.username === "string", true, "the response should have `username` property")
  })
})
