/*
 * @Author: wangyunbo
 * @Date: 2021-06-30 09:33:29
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-30 10:04:56
 * @Description: file content
 * @FilePath: \dayByday\npm\package.js
 */
var packagejson = {
  // The name must be less than 214 characters, must not have spaces, it can only contain lowercase letters, hyphens (-) or underscores (_).
  "name": "test-projest",
  "author": "Joe <joe@whatever.com> (https://whatever.com)",
  /*
  Can also be used with this format:
  {
    "author": {
      "name": "Joe",
      "email": "joe@whatever.com",
      "url": "https://whatever.com"
    }
  }
  */
  // As well as the author, the project can have one or more contributors. This property is an array that lists them.
  "contributors": ["Joe <joe@whatever.com> (https://whatever.com)"],
  /**
   * {
  "contributors": [
    {
      "name": "Joe",
      "email": "joe@whatever.com",
      "url": "https://whatever.com"
    }
  ]
}
   */
  //Links to the package issue tracker, most likely a GitHub issues page
  "bugs": "https://github.com/whatever/package/issues",
  // Sets the package homepage
  "homepage": "https://whatever.com/package",
  // Indicates the current version of the package. The first number is the major version, the second the minor version and the third is the patch version
  /**
   * There is a meaning in these numbers: a release that only fixes bugs is a patch release,
   *  a release that introduces backward-compatible changes is a minor release, 
   * a major release can have breaking changes.
   */
  "version": "1.0.0",
  // Indicates the license of the package.
  "license": "MIT",
  /**
   * This property contains an array of keywords that associate with what your package does;
   * This helps people find your package when navigating similar packages, or when browsing the https://www.npmjs.com/ website.
   */
  "keywords": [
    "email",
    "machine learning",
    "ai"
  ],
  /**
   * This property contains a brief description of the package
This is especially useful if you decide to publish your package to npm so that people can find out what the package is about.
   */
  "description": "A package to work with strings",
  // This property specifies where this package repository is located.
  /**
   * Notice the github prefix. There are other popular services baked in:
   * "repository": "gitlab:whatever/testing",
   * "repository": "bitbucket:whatever/testing",
   */
  /**
   * You can explicitly set the version control system:(git or svn)
   * "repository": {
        "type": "git",
        "url": "https://github.com/whatever/testing.git"
      }

      "repository": {
          "type": "svn",
          "url": "..."
        }
   */
  "repository": "github:whatever/testing",
  // Sets the entry point for the package.
  // When you import this package in an application, that's where the application will search for the module exports.
  "main": "src/main.js",
  /**
   In your package.json, you can add a “files” property which has an array value and link to the generated files to include them when publishing our package to NPM.
   Files included with the "package.json#files" field cannot be excluded through .npmignore or .gitignore.
   Certain files are always included, regardless of settings:
    1:package.json
    2:README
    3:CHANGES / CHANGELOG / HISTORY
    4:LICENSE / LICENCE
    5:NOTICE
    6:The file in the "main" field
   */
  "files": [
    "dist/index.js"
  ],
  // if set to true prevents the app/package to be accidentally published on npm
  "private": true,
  // Defines a set of node scripts you can run
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "test": "npm run unit",
    "lint": "eslint --ext .js,.vue src test/unit",
    "build": "node build/build.js"
  },
  "dependencies": {
    "vue": "^2.5.2"
  },
  // Sets which versions of Node.js and other commands this package/app work on
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0",
    "yarn": "^0.13.0"
  },
  /**
   * Is used to tell which browsers (and their versions) you want to support. 
   * It's referenced by Babel, Autoprefixer, and other tools, to only add the polyfills and fallbacks needed to the browsers you target.
   */
  /**
   * This configuration means you want to support the last 2 major versions of all browsers with at least 1% of usage (from the CanIUse.com stats), except IE8 and lower
   */
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}