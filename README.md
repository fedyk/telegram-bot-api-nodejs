# telegram-bot-api-nodejs


## Install

```
npm install telegram-bot-api-nodejs
```

# Usage

## Send message

```js
import { sendMessage } from "telegram-bot-api-nodejs"

const token = "12345:abcd..."
const message = await sendMessage(token, {
  chat_id: 12345,
  text: "Hello",
})
```

## Parse webhook updates

```js
import { parseUpdate } from "telegram-bot-api-nodejs"


const update = await parseUpdate(ctx.request.body)

if (update.message) {
  // ...
}
```
