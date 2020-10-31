# @sect/modernizr-loader 

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Get your Modernizr build bundled with webpack.  
This Repos forked from [peerigon/modernizr-loader](https://github.com/peerigon/modernizr-loader).

## Features
- Support webpack 5

## Install
```
$ npm install --save-dev modernizr @sect/modernizr-loader json-loader
```

## Initialization

You have to create a `.modernizrrc` configuration file and put your modernizr stuff in it. Like so

```json
// .modernizrrc
{
  "minify": true,
  "options": [
    "setClasses"
  ],
  "feature-detects": []
}
```

Full list of supported **"options"** and **"feature-detects"** can be found in Modernizr [config-all.json](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json).

### Webpack config

[Documentation: Using loaders](https://webpack.js.org/configuration/module/#rule-use)

Put the following code to your webpack config file:

```js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.modernizrrc.js$/,
        use: [ '@sect/modernizr-loader' ]
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        use: [ '@sect/modernizr-loader', 'json-loader' ]
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, "path/to/.modernizrrc")
    }
  }
}
```

### Usage

Now you are able to import your custom Modernizr build as a module throughout your application like so:

```js
import Modernizr from 'modernizr';

if (!Modernizr.promises) {
    // ...
}
```

See the [Modernizr documentation](https://modernizr.com/docs) for all available options.

## Changelog 

See [CHANGELOG](https://github.com/sectsect/modernizr-loader/blob/master/CHANGELOG.md) file.

## License

See [LICENSE](https://github.com/sectsect/modernizr-loader/blob/master/LICENSE) file.
