## [2.0.1](https://github.com/prantlf/plural-rules/compare/v2.0.0...v2.0.1) (2022-12-21)


### Bug Fixes

* Complete the command-line help ([83ffb85](https://github.com/prantlf/plural-rules/commit/83ffb858ddd64c9ae7911c46771d71d7d0906504))

# [2.0.0](https://github.com/prantlf/plural-rules/compare/v1.0.2...v2.0.0) (2022-08-18)


### Features

* API for checking supported locales and plural forms ([0b8fadc](https://github.com/prantlf/plural-rules/commit/0b8fadcb53ff50b5c1b42c511e26623935adca31))
* Declare CJS, UMD and ES exports in package.json ([8beef35](https://github.com/prantlf/plural-rules/commit/8beef354d140fda3c5d2fe93b0b65ac7847d364b))


### BREAKING CHANGES

* Newer Node.js required, different command-line parsing, renamed CJS exports.
* Node.js 14.8 or newer is required for the `create-plural-data` script. Also supports `type`, `module`, `types` and `exports`. The sources of the library didn't change, which means that the exported modules should still work in Node.js 6 and newer, but the're no tests proving that.
* Command-line argument parsing done by a custom code instead of using `commander`. Boolean arguments cannot be joined to groups like `-mpv`. They have to be passed separately, for example: `-m -p -v`. Also, the command-line script requires Node.js with the ESM support, which means >= 14.8.
* CJS modules in the `dist` directory end with the file extension `.cjs` instead of `.js`. (ES modules end with `.mjs`.) Usually imported main exports are not affected, because they are imported in both CJS and ES modules using the package name.

## [1.0.2](https://github.com/prantlf/plural-rules/compare/v1.0.1...v1.0.2) (2022-01-28)

### Bug Fixes

* Adapt sources after upgrading the build environment ([9f4021e](https://github.com/prantlf/plural-rules/commit/9f4021e7c7c272a2df7157f105b0638d3ea09eb1))

## [1.0.1](https://github.com/prantlf/plural-rules/compare/v1.0.0...v1.0.1) (2019-09-24)

### Bug Fixes

* Upgrade package dependencies ([bf8bfa6](https://github.com/prantlf/plural-rules/commit/bf8bfa6))

# [1.0.0](https://github.com/prantlf/plural-rules/compare/v0.1.0...v1.0.0) (2019-08-03)

### Features

* Improve the data compression by serialising plural form objects to strings ([858c2a0](https://github.com/prantlf/plural-rules/commit/858c2a0))

### BREAKING CHANGES

* Plural data created by this version of the library cannot be consumed by *older versions*. It would be unusual, if you created data by tis version and fed them to an older version of the library, but nevertheless, be aware of it. If you create data by this version, use them with the same major version or a newer one, as long as it is documented to be feasible.

Plural data created by older versios of this library can still be used with this version. The code is beckwards compatible.

## 2019-08-03   v1.0.0

Decrease the size of the packed plural rules and forms

# [0.1.0](https://github.com/prantlf/plural-rules/compare/v0.0.2...v0.1.0) (2019-08-03)

### Bug Fixes

* Transpile the CJS module output for Node.js 6 or newer ([6fb15aa](https://github.com/prantlf/plural-rules/commit/6fb15aa))

### Features

* Upgrade CLDR data to the version 35.1
* Provide both minificated and only cleaned-up UMD scripts for the browser ([460efad](https://github.com/prantlf/plural-rules/commit/460efad))

## [0.0.2](https://github.com/prantlf/plural-rules/compare/v0.0.1...v0.0.2) (2019-06-07)

### Bug Fixes

* Upgrade module dependencies ([a76acb4](https://github.com/prantlf/plural-rules/commit/a76acb4))

## 2018-11-05   v0.0.1

Initial release
