import { readFileSync } from "node:fs"

export const SUPPORTED_REACTION_EMOJI = ["👍", "👎", "\u2764\ufe0f" // red heart
  , "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢"
  , "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥"
  , "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋"
  , "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝"
  , "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄"
  , "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡"
]

export function isUnauthorizedError(err: unknown): boolean {
  return err instanceof Error && err.message === "Unauthorized"
}

export function isBotBlockedByUserError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Forbidden: bot was blocked by the user")
}

export function isChatNotFoundError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Bad Request: chat not found")
}

export function isUserDeactivatedError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Forbidden: user is deactivated")
}

export function isBotKickedFromSupergroupError(err: unknown): boolean {
  return err instanceof Error && err.message === "Forbidden: bot was kicked from the supergroup chat"
}

export function isBotKickedFromGroupError(err: unknown): boolean {
  return err instanceof Error && err.message === "Forbidden: bot was kicked from the group chat"
}

export function isNotEnoughRightsError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Bad Request: not enough rights to send text messages to the chat")
}

export function isUpgradeToSupergroupChatError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Bad Request: group chat was upgraded to a supergroup chat")
}

export function isTextMustBeNonEmptyError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Bad Request: text must be non-empty")
}

export function isTooManyRequestsError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Too Many Requests: retry after")
}

export function isMessageTooLongError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("message is too long")
}

export function isMessageCaptionTooLongError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("message caption is too long")
}

export function isWebpageCurlFailedError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("WEBPAGE_CURL_FAILED")
}

export function isWrongFileUrlError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Wrong file identifier/HTTP URL specified")
}

export function isBadGatewayError(err: unknown): boolean {
  return err instanceof Error && err.message === "Bad Gateway"
}

export function isMessageToEditNotFoundError(err: unknown): boolean {
  return err instanceof Error && err.message === "Bad Request: message to edit not found"
}

export function isMessageToDeleteNotFoundError(err: unknown) {
  return err instanceof Error && err.message === "Bad Request: message to delete not found"
}

// Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a specified new message content and reply markup are exactly the same as a current content and reply markup of the message
// Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a current content and reply markup of the message
export function isMessageNotModifiedError(err: unknown) {
  return err instanceof Error && err.message.startsWith("Bad Request: message is not modified")
}

// Bad Request: wrong type of the web page content
export function isWrongTypeOfTheWebPageContentError(err: unknown) {
  return err instanceof Error && err.message.includes("wrong type of the web page content")
}

// Bad Request: failed to send message #1 with the error message "WEBPAGE_MEDIA_EMPTY"
export function isWebpageMediaEmptyError(err: unknown) {
  return err instanceof Error
    && /^Bad Request: failed to send message #\d+ with the error message "WEBPAGE_MEDIA_EMPTY"$/.test(err.message)
}

// Bad Request: failed to get HTTP URL content
export function isFailToGetHTTPURLContentError(err: unknown) {
  return err instanceof Error && err.message.includes("failed to get HTTP URL content")
}

// Bad Request: wrong file identifier/HTTP URL specified
export function isWrongFileIdentifierError(err: unknown) {
  return err instanceof Error && err.message.toLowerCase().includes("wrong file identifier/http url specified")
}

// Bad Request: invalid file HTTP URL specified: Unsupported URL protocol
export function isInvalidFileUrlSpecifiedError(err: unknown) {
  return err instanceof Error && err.message.includes("invalid file HTTP URL specified: Unsupported URL protocol")
}

// Bad Request: message can't be deleted
export function isMessageDeleteError(err: unknown) {
  return err instanceof Error && err.message.includes("message can't be deleted")
}

export function isBotNotMemberGroupChatError(err: unknown) {
  return err instanceof Error && err.message === "Forbidden: bot is not a member of the group chat"
}

// Forbidden: the group chat was deleted
export function isGroupChatWasDeletedError(err: unknown) {
  return err instanceof Error && err.message === "Forbidden: the group chat was deleted"
}

export function isBusinessPeerUsageMissingError(err: unknown) {
  return err instanceof Error && err.message === "Bad Request: BUSINESS_PEER_USAGE_MISSING"
}

export function isInvalidPhotoDimensionsError(err: unknown) {
  return err instanceof Error && err.message.includes("PHOTO_INVALID_DIMENSIONS")
}

export function parseRetryAfterTime(err: unknown): number {
  if (!(err instanceof Error)) {
    throw new RangeError("`err` needs to be an Error")
  }

  if (!err.message.startsWith("Too Many Requests: retry after")) {
    throw new RangeError(`'err' message does not start with "Too Many Requests: retry after" ("${err.message}")`)
  }

  const param = err.message.replace("Too Many Requests: retry after", "").trim()

  if (!param) {
    throw new RangeError(`'err' message does not match the format "Too Many Requests format"`)
  }

  const time = Number(param)

  if (Number.isNaN(time)) {
    throw new RangeError(`'err' message has invalid time parameter ("${err.message}"`)
  }

  return time
}

export function resolveNameFromMessageOrigin(messageOrigin: MessageOrigin) {
  if (messageOrigin.type === "user") {
    return resolveChatName(messageOrigin.sender_user)
  }

  if (messageOrigin.type === "hidden_user") {
    return messageOrigin.sender_user_name || "Hidden User"
  }

  if (messageOrigin.type === "channel") {
    return resolveChatName(messageOrigin.chat)
  }

  if (messageOrigin.type === "chat") {
    return resolveChatName(messageOrigin.sender_chat)
  }

  return "unknown origin"
}

export function resolveChatName(chat: any) {
  return `${chat.first_name || ""} ${chat.last_name || ""}`.trim() ||
    `${chat.title}`.trim() ||
    `@${chat.username || ""}`.trim()
}

export function resolveMessageOriginName(messageOrigin: MessageOrigin) {
  if (messageOrigin.type === "channel") {
    return resolveChatName(messageOrigin.chat)
  }

  if (messageOrigin.type === "user") {
    return resolveChatName(messageOrigin.sender_user)
  }

  if (messageOrigin.type === "chat") {
    return resolveChatName(messageOrigin.sender_chat)
  }

  if (messageOrigin.type === "hidden_user") {
    return messageOrigin.sender_user_name || "Hidden User"
  }
}

export function removeTokenFromUrl(url: string) {
  return String(url).replace(/bot([\d]+)\:([^\/]+)/ig, function (match, botId, token) {
    return `bot${botId}:${"*".repeat(token.length)}`
  })
}

export namespace currencies {
  const __dirname = import.meta.dirname

  export interface Currency {
    code: string
    title: string
    symbol: string
    native: string
    thousands_sep: string
    decimal_sep: string
    symbol_left: boolean
    space_between: boolean
    drop_zeros: boolean
    exp: number
    min_amount: string | number
    max_amount: string | number
  }

  let currencies: Record<string, Currency> | null = null

  export function formatPrice(amount: number, code: string) {
    if (!currencies) {
      currencies = loadCurrencies()
    }

    const currency = currencies[code]
    let value = ""

    if (currency) {
      if (currency.symbol_left && currency.native) {
        value += currency.native

        if (currency.space_between) {
          value += " "
        }
      }

      if (currency.exp > 0) {
        value += amount / (10 ** currency.exp)
      }
      else {
        value += `${amount}`
      }

      if (!currency.symbol_left && currency.native) {
        if (currency.space_between) {
          value += " "
        }

        value += currency.native
      }
    }
    else {
      value = `${code} ${amount / 2}`
    }

    return value
  }

  function loadCurrencies(): Record<string, Currency> {
    return JSON.parse(readFileSync(`${__dirname}/currencies.json`, {
      encoding: "utf8"
    }))
  }
}
