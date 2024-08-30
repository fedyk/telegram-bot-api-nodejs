import { readFileSync } from "fs"

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
