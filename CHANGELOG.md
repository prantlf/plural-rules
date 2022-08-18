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
