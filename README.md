# Weeb Wrapper

<div>
  <p align="center">
    <a href="https://github.com/TMUniversal/weeb-wrapper/blob/master/package.json#L3">
      <img src="https://img.shields.io/github/package-json/v/TMUniversal/weeb-wrapper?style=flat" />
    </a>
    <a href="https://github.com/TMUniversal/weeb-wrapper/actions">
      <img src="https://github.com/TMUniversal/weeb-wrapper/workflows/Build/badge.svg" />
    </a>
    <a href="https://tmuniversal.eu/redirect/patreon">
      <img src="https://img.shields.io/badge/Patreon-support_me-fa6956.svg?style=flat&logo=patreon" />
    </a>
    <a href="https://www.npmjs.com/package/@tmuniversal/weeb-wrapper">
      <img src="https://img.shields.io/npm/dt/@tmuniversal/weeb-wrapper" />
    </a>
    <br />
    <a href="https://bundlephobia.com/result?p=@tmuniversal/weeb-wrapper">
      <img src="https://img.shields.io/bundlephobia/min/@tmuniversal/weeb-wrapper?label=packge%20size" />
    </a>
    <a href="https://github.com/TMUniversal/weeb-wrapper/issues">
      <img src="https://img.shields.io/github/issues/TMUniversal/weeb-wrapper.svg?style=flat">
    </a>
    <a href="https://github.com/TMUniversal/weeb-wrapper/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/TMUniversal/weeb-wrapper.svg?style=flat">
    </a>
    <a href="https://github.com/TMUniversal/weeb-wrapper/blob/stable/LICENSE.md">
      <img src="https://img.shields.io/github/license/TMUniversal/weeb-wrapper.svg?style=flat">
    </a>
  </p>
</div>

[Weeb Wrapper] is a simple API wrapper for the weeb api, an api that helps discord bot's and their developers. This is a closed API, details on [weeb.sh](https://weeb.sh) and [docs.weeb.sh](https://docs.weeb.sh).

If you want to host your own instance of this api, have a look at [weeb-services].

## Getting Started

### Installation

With npm: `npm install --save @tmuniversal/weeb-wrapper`

With yarn: `yarn add @tmuniversal/weeb-wrapper`

### Usage

```js
const WeebWrapper = require('@tmuniversal/weeb-wrapper')

const wrapper = new WeebWrapper('<Your API key>') // Create a new instance of the API wrapper

// If you need to change the base url of the api:
const wrapper = new WeebWrapper('<You API key>', 'https://api.example.com')

wrapper.accounts // accessing the accounts api
  .validate('<Your API key>') // Doing something with it, in this case validating your API key
  .then(...) // Returns a promise, so you can work with the results
  .catch(e => { // Catch promise rejections
    console.error(e)
  })
```

## Examples

### Using the settings API

> Requires API key.

Saving settings of a discord bot: in this example we are creating a _setting_ of the type `guilds` named `<some id>`. It contains the guilds command prefix.

```js
const WeebWrapper = require('@tmuniversal/weeb-wrapper')

const wrapper = new WeebWrapper('<Your API key>', 'https://api.example.com') // Create a new instance of the API wrapper

wrapper.settings.createSetting('guilds', '<some id>', {
  prefix: '?'
})
```

It's easy to retrieve the setting:

```js
// With async/await
const result = await wrapper.settings.getSetting('guilds', '<some id>')
console.log(result) // Will return the settings: { prefix: '?' }

// With promises
wrapper.settings.getSetting('guilds', '<some id>').then(result => {
  console.log(result) // Will return the settings: { prefix: '?' }
})
```

Note: Subsettings are not connected to their parent settings, they perform as a full settings themselves and will work even if the parent route doesn't exist. Deleting a parent will not delete it's subsettings.

### Using the BotStat API

> Requires API key for post requests. Get endpoints are public.

The BotStat API serves as a means of saving certain numbers like the amount of servers a bot is in to be made publicly available.

```js
// Updating the amount of guilds, channels, users your bot is in:
wrapper.statistics.updateBot('<id here>', 123, 456, 789)
wrapper.statistics.updateBot('<id here>', [123, 456, 789]) // or as an array
wrapper.statistics.updateBot('<id here>', {
  guilds: 123,
  channels: 456,
  users: 789
}) // or as an object

// retrieving this data:
const bot = await wrapper.statistics.getBot('<id here>')
console.log(bot)
/* example output:
{
  userId: '12345678901234545', // a discord user id
  guilds: 42,
  channels: 69,
  users: 420,
  lastUpdated: '2020-07-26T14:37:37.017Z',
  owner: {
    id: '123456781543243534',
    username: 'A name',
    discriminator: '0001'
  }
}
*/
```

### Using TM's General API

> This is a very random collection of some features I wanted to realize.
> An API key is NOT required for these features.

```js
const WeebWrapper = require('@tmuniversal/weeb-wrapper')

const wrapper = new WeebWrapper(
  "<Your API key (or not since you don't need one for this)>"
)

const neko = await wrapper.general.getNeko() // Will retrieve a catgirl image url.

console.log(neko)
// (example) => https://nekos.moe/image/rygkhkosf
```

### Upcoming

- Implementation of the [Bruh API](https://bruhapi.xyz/) _(Maybe)_.

## License

Please refer to the [LICENSE](LICENSE.md) file.

[weeb wrapper]: https://github.com/TMUniversal/weeb-wrapper
[weeb-services]: https://github.com/weeb-services
