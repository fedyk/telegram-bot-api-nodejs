import { describe, it } from "node:test"
import { deepEqual, equal } from "node:assert/strict"
import { readFileSync } from "node:fs"
import { getMe } from "./api.js"
import { fetch } from "./helpers.js"

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

    equal(token.startsWith(me.id.toString()), true, "token should starts with bot id")
    equal(me.is_bot, true, "the response should have `is_bot` property")
    equal(typeof me.username === "string", true, "the response should have `username` property")
  })
})

describe("fetch", function () {
  it("should fetch an remote content", async function (ctx) {
    const signal = ctx.signal
    const url = "http://example.com"
    const text = await fetch(url, { signal }).then(resp => resp.text())

    equal(typeof text === "string", true, "text is present")
    equal(text.includes("Example Domain"), true, "text is example content")
  })

  it("should throw fetch error", async function (ctx) {
    const signal = ctx.signal
    const invalidUrl = "http://192.0.2.256"
    const err = await fetch(invalidUrl, { signal }).catch(err => err)

    equal(err instanceof Error, true, "err is instance of Error")
    equal(err.cause instanceof Error, true, "err.cause includes nested error")
    equal(err.cause.message === err.message, true, "err extends the cause err message")
    equal(err.data.url, invalidUrl, "err.data.url is present")
    equal(typeof err.data.duration === "number", true, "err.data.duration is present")
  })
})
