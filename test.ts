import test, { describe, it } from "node:test"
import { ok, deepEqual, equal } from "node:assert/strict"
import {
  TelegramError,
  currencies,
  isBotKickedFromGroupError,
  isBotNotMemberGroupChatError,
  isBusinessPeerUsageMissingError,
  isFailToGetHTTPURLContentError,
  isInvalidPhotoDimensionsError,
  isMessageNotModifiedError,
  isMessageToEditNotFoundError,
  isTextMustBeNonEmptyError,
  isTooManyRequestsError,
  isWebpageMediaEmptyError,
  isWrongFileIdentifierError,
  parseResponse,
  parseRetryAfterTime,
  prepareFormBody,
  prepareFormHeaders,
  removeTokenFromUrl
} from "./index.js"

describe("TelegramError", function () {
  it("should except additional details", function () {
    const err = new TelegramError("test", 123, {
      test: 123
    })

    ok(err instanceof TelegramError)
    equal(err.message, "test")
    equal(err.status, 123)
    deepEqual(err.data, {
      test: 123
    })
  })
})

describe(parseResponse.name, function () {
  it("should parse success response", function (ctx, done) {
    const response = new Response(JSON.stringify({
      ok: true,
      result: {
        status: 123
      },
    }), {
      status: 200,
      statusText: "OK",
    })

    parseResponse<{
      status: number
    }>(response)
      .then(function (resp) {
        deepEqual(resp, {
          status: 123
        })
      })
      .finally(done)
  })

  it("should parse error response and throw an exception", function (ctx, done) {
    const body = JSON.stringify({
      ok: false,
      error_code: 400,
      description: "Bad Request: group chat was migrated to a supergroup chat",
      parameters: {
        migrate_to_chat_id: -123456789
      }
    })
    const response = new Response(body, {
      status: 400,
      statusText: "Error",
    })

    parseResponse(response)
      .then(function () {
        throw new Error("`parseResponse` should throw an error")
      })
      .catch(function (err: unknown) {
        if (!(err instanceof TelegramError)) {
          throw new RangeError("`err` should be an TelegramError instance")
        }

        equal(err.message, "Bad Request: group chat was migrated to a supergroup chat")
        equal(err.status, 400)
        deepEqual(err.data, {
          migrate_to_chat_id: -123456789,
          text: body,
          url: "",
        })
      })
      .finally(done)
  })
})

describe(isTextMustBeNonEmptyError.name, function () {
  it("should detect error", function () {
    equal(isTextMustBeNonEmptyError(new Error("Bad Request: text must be non-empty")), true)
  })
})

describe(isTooManyRequestsError.name, function () {
  it("should detect error", function () {
    equal(isTooManyRequestsError(new Error("Too Many Requests: retry after 39")), true)
  })
})

test(isMessageToEditNotFoundError.name, function () {
  equal(isMessageToEditNotFoundError(new Error("Test")), false)
  equal(isMessageToEditNotFoundError(new Error("Bad Request: message to edit not found")), true)
})

test(isMessageNotModifiedError.name, function () {
  equal(
    isMessageNotModifiedError(new Error("Test")),
    false
  )
  equal(
    isMessageNotModifiedError(new Error("Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a specified new message content and reply markup are exactly the same as a current content and reply markup of the message")),
    true
  )
  equal(
    isMessageNotModifiedError(new Error("Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a current content and reply markup of the message")),
    true
  )
})

test(parseRetryAfterTime.name, function () {
  equal(parseRetryAfterTime(new Error("Too Many Requests: retry after 39")), 39)
})

describe(currencies.formatPrice.name, function () {
  it("format amount", function () {
    equal(currencies.formatPrice(100, "USD"), "$1")
    equal(currencies.formatPrice(100, "EUR"), "1 €")
    equal(currencies.formatPrice(123, "EUR"), "1.23 €")
    equal(currencies.formatPrice(123, "PLN"), "1.23 zł")
  })
})

describe(removeTokenFromUrl.name, function () {
  it("should remove sensetive token from URL", function () {
    equal(removeTokenFromUrl(""), "")
    equal(
      removeTokenFromUrl("https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe"),
      "https://api.telegram.org/bot123456:**********************************/getMe"
    )
  })
})

test(isFailToGetHTTPURLContentError.name, function () {
  equal(isFailToGetHTTPURLContentError(new Error("Bad Request: failed to get HTTP URL content")), true)
  equal(isFailToGetHTTPURLContentError(new Error("Bad Request: failed to get TEXT content")), false)
})

test(isBotKickedFromGroupError.name, function () {
  equal(isBotKickedFromGroupError(new Error("Forbidden: bot was kicked from the group chat")), true)
  equal(isBotKickedFromGroupError(new Error("Bad Request: message to edit not found")), false)
})

test(isBotNotMemberGroupChatError.name, function () {
  equal(isBotNotMemberGroupChatError(new Error("Forbidden: bot is not a member of the group chat")), true)
  equal(isBotNotMemberGroupChatError(new Error("Forbidden: test message")), false)
})

test(isBusinessPeerUsageMissingError.name, function () {
  equal(isBusinessPeerUsageMissingError(new Error("Bad Request: BUSINESS_PEER_USAGE_MISSING")), true)
  equal(isBusinessPeerUsageMissingError(new Error("test error")), false)
})

test(isWebpageMediaEmptyError.name, function () {
  equal(isWebpageMediaEmptyError(new Error("Bad Request: failed to send message #1 with the error message \"WEBPAGE_MEDIA_EMPTY\"")), true)
  equal(isWebpageMediaEmptyError(new Error("Bad Request: failed to send message #42 with the error message \"WEBPAGE_MEDIA_EMPTY\"")), true)
  equal(isWebpageMediaEmptyError(new Error("Bad Request: failed to send message #1 with the error message \"WEBPAGE_CURL_FAILED\"")), false)
})

test(prepareFormBody.name, function () {
  const form = new FormData()
  equal(prepareFormBody(form), form)
  equal(prepareFormBody({}), "{}")
})

test(prepareFormHeaders.name, function () {
  equal(prepareFormHeaders(new FormData()), undefined)
  deepEqual(prepareFormHeaders({}), {
    "Accept": "application/json",
    "Content-Type": "application/json",
  })
})

test(isInvalidPhotoDimensionsError.name, function () {
  equal(isInvalidPhotoDimensionsError(new Error("Bad Request: PHOTO_INVALID_DIMENSIONS")), true)
  equal(isInvalidPhotoDimensionsError(new Error(`Bad Request: failed to send message #1 with the error message "PHOTO_INVALID_DIMENSIONS"`)), true)
  equal(isInvalidPhotoDimensionsError(new Error(`Bad Request: failed to send message #2 with the error message "PHOTO_INVALID_DIMENSIONS"`)), true)
  equal(isInvalidPhotoDimensionsError(new Error("Bad Request: test error")), false)
})

test(isWrongFileIdentifierError.name, function () {
  equal(isWrongFileIdentifierError(new Error(`Bad Request: wrong file identifier/HTTP URL specified`)), true)
  equal(isWrongFileIdentifierError(new Error(`Bad Request: failed to send message #1 with the error message "Wrong file identifier/HTTP URL specified"`)), true)
  equal(isWrongFileIdentifierError(new Error("Bad Request: test error")), false)
})
