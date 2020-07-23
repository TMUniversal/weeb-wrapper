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
wrapper.settings.getSetting('guilds', '<some id>')
  .then(result => {
    console.log(result) // Will return the settings: { prefix: '?' }
  })
```

## License

Please refer to the [LICENSE](LICENSE.md) file.


[Weeb Wrapper]: https://github.com/TMUniversal/weeb-wrapper
[weeb-services]: https://github.com/weeb-services
