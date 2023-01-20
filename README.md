# Discord Bot Sample

This is a minimal architecture for building a discord bot, based on discord.js, vite-note, TypeScript & RxJS.

## Examples

This sample provides :
- A message sending in a text channel.
- A periodic sending of message in a text channel via cron.


## Getting Started

### Define your token

Create an .env file at the root of your project and define your Discord bot token in a variable as following:
```shell
TOKEN="Your_token_here"
```

### Define your channels

The channel IDs are defined in src/infra/channels.service.ts
```javascript
const CHANNEL_IDS = [
    {
        key: 'custom_value', id: 'channel_id',
    }
];
```

### Build & Run

```
npm install
npm start
```

## References

- [discord.js](https://discord.js.org): Node.js module to interact with the Discord API.
- [vite-note](https://www.npmjs.com/package/vite-node): Vite as Node runtime.
- [TypeScript](https://www.typescriptlang.org): JavaScript with syntax for types.
- [RxJS](https://rxjs.dev): Reactive Extensions Library for JavaScript.
