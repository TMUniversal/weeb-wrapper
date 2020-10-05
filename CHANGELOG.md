# Changelog

### 0.3.5

Changes:

- Add `test/` to .npmignore
- Format CHANGELOG.md to be more easily readable

### 0.3.4

Changes:

- Remove lodash from dependencies
- Extended error handling

### 0.3.3

Fixes:

- Remove inline source map

### 0.3.2

Additions:

- Add prettier to project
- Use new @tmware configs for prettier and eslint
- Add prettier ignore file

Changes:

- Apply prettier to code style
- Marked API url parameter as optional.
- Revert changelog list style change (see 0.3.0)
- Use yarn instead of npm

Fixes:

- Documentation
- Move @types/lodash to devDependencies
- Fix broken ko-fi link in changelog

### 0.3.1

Additions:

- Add support for BotStat API.
- Documentation.

### 0.3.0

Additions:

- Add support for TM's General API (some random collection of features).
- Add my [ko-fi page](https://ko-fi.com/tmuniversal) to FUNDING.yml.

Changes:

- Update README.
- Change list-style in CHANGELOG.md (from "-" to "\*")

### 0.2.1

Changes:

- Update workflows for typescript.
- Updated README to display 'Build' badge instead of 'Test'.

### 0.2.0

Additions:

- TypeScript compiler configuration.

Fixes:

- Some types were incorrect or hard to read.

Changes:

- Switched to TypeScript.
- Re\*reverted default api url. it made no sense since my api version uses pluralized endpoints.

### 0.1.3

Additions:

- Created this CHANGELOG.

## Fixes

- Fixed settings api error handling for failing requests.
- Fixed settings api typings that I broke earlier.

### 0.1.2

Changes:

- Updated README.

Additions:

- Account API Iroh is now handled properly.
- JSDoc for account api.
- Request handler can now use put method.

Fixes:

- JSDoc for settings api now has String types capitalized.

### 0.1.1

Changes:

- Revert default API urls to weeb.sh.
- Test now succeeds on API key rejection.
- Rename LICENSE file to LICENSE.md.

Additions:

- Extended README.

Fixes:

- Package size shield now links to bundlephobia.

### 0.1.0

Changes:

- Data from settings api is now correctly handled and filtered.

Additions:

- Type definitions.

Fixes:

- Fixed API key handling error.
- API Endpoints.

### 0.0.1

Additions:

- First coverage of settings api tama.
