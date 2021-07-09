<!--
 * @Author: wangyunbo
 * @Date: 2021-07-09 17:49:45
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-09 17:59:38
 * @Description: file content
 * @FilePath: \dayByday\webpack\loader_plugins_babel.md
-->
Webpack took web development world by storm. Ever since its release, it was adopted by major companies like Airbnb and Facebook, and web development frameworks like Angular and React. While it’s clear that Webpack plays a major part in the web development today, the exact features and functionalities of the Webpack weren’t clear to me until recently. So in this post I’m explaining Webpack in the simplest way possible.

What is webpack?

Simply put, `Webpack is a tool for putting your code through the processing pipeline and bundling it together into a single JavaScript file`.

So what kind of processing are we talking about? To explain this we need to get back to the long-standing JavaScript problem of module collisions. Before Node.js, developers had to use different kinds of tricks to avoid variable name collision in JavaScript. Node.js introduced a great solution — CommonJS moduling system. Unfortunately, CommonJS is not natively supported by browsers. This is where Webpack comes in. We can write our application using Node.js moduling system and things like `require()` and `module.exports` and use Webpack to bundle it into a single JavaScript file that is compatible with all browsers. Let take a look at a quick example to get a better understanding:


Image you have a project with two files `greet.js` and `main.js`. Here's the content of the `greet.js`:
```js
module.exports = function(name) {
    var template = '<h2>Hi there ' + name + '!</h2>';
 
    return template;
}
```

This module exposes a single function using `module.exports`. The function simply returns `h2` tag with a greeting as a string. Now let's take a look at the `main.js`:

```js
window.addEventListener('load', function () {
    var greet = require('./greet');
    var greeting = greet('Dolly');
    var body = document.getElementsByTagName('body')[0];
    body.innerHTML = greeting;
});
```

Our `main.js` script imports `greet.js` using require, which is also specific to Node.js moduling system. Afterwards, this script makes a call to our greet function and stores the result in the `body` tag of the current html page.


If you tried to run this code in the browser as it is, it would certainly fail. That’s why we need to use Webpack. In your project’s folder run this command: `webpack main.js -o bundle.js` which will bundle up main.js and all of its dependencies.
As the final step, let’s create a simple html page and insert our bundle in it:

```js
<html>
    <head>
        <title>Webpack Sample</title>
        <script src="bundle.js"></script>
    </head>
    <body>
        
    </body>
</html>
```

If you open our html page you should see the greeting. Wasn’t it easy to export and import modules using Node.js system? We didn’t have to worry about managing dependencies or configuring paths, all we had to do is export our greet module and `import` it using `require`.

## Loaders and Plugins

Since CommonsJS is arguably the best moduling system JavaScript world has to offer at the moment, this alone should be enough to start using Webpack. However, Webpack is a very flexible and powerful tool that offers so much more. One of the most prominent functionalities of the Webpack is plugins and loaders.


Loaders and plugins in Webpack allow adding more rules or processing pipelines during the bundling process. Built-in and third party loaders are one of the main reasons why Webpack is such a powerful and popular tool.
While at first glance they might seem like they are used to accomplish same thing, loaders and plugins are different in Webpack:

## Loaders:
- Work before or at the beginning of the bundle generation
- Loaders work at the individual file level

## Plugins:
- Work at the end or after of bundle generation
- Plugins work at bundle level
- Plugins have much more control over the bundle

## Babel loader

Babel loader is used to convert code written in modern flavors and supersets of JavaScript into plain old JavaScript code supported by older browsers. Thanks to Babel loader we can enjoy new JavaScript syntax and write our code using EcmaScript 2015 and even JSX (React). Let’s take a look at a sample `webpack.config.js` file, which is a configuration file used to declare all the plugins and loaders used by Webpack in your project:
```js
var path = require('path');
 module.exports = {
     entry: path.join(__dirname, 'src', 'main.js'),
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: path.join(__dirname, 'src'),
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
 ```
As you can see, all this module does is export a configuration file which will be used by Webpack when you run a command line to transpile your code. This file has `entry` and `output` fields, which decide the location of the input and output files for the transpiler. Easy enough.

The `loaders` subfield is where we define the loaders used by Webpack. Here we're only defining `babel-loader`. `test` field accepts regex pattern or directory location which decides which files will be affected by the loader. In this case all the files located in `src` folder will be affected by our loader.

Babel loader uses presets to work with different JavaScript flavors and supersets. There are a lot of different presets available with Babel. In this case we’re using `es2015` preset to convert any `EcmaScript 2015` code into `vanilla JavaScript`. The `presets` array can contain more than one preset, for example we could add `react` preset to also be able to write `JSX` code in our project.

## Uglify plugin
As mentioned before, plugins are usually executed towards the end of the transpiling process and work at the bundle level.


Let’s take a look at the uglify plugin. This plugin is used to obfuscate your code and minify the generated bundle. It does so by changing the name of the variables to shorter ones and removing white spaces from your code. Here’s how you can define a plugin in your webpack.config.js:
```js
const path = require('path');
const webpack = require('webpack');
 
const uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    dead_code: true,
})
 
module.exports = {
    entry: path.join(__dirname, 'src', 'main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [uglifyJSPlugin]
}
```
In the code above we declared uglifyJSPlugin object which is used to define settings for our plugin. We set beautify: false so that the code of our generated bundle is not formatted, which makes it harder to read for malicious users. We also specified dead_code: true which will remove all the dead code from the bundle which can be useful when setting up dynamic code branching and can also help reduce the size of the bundle.


Note: for the above code to work you will need to install the Babel loader, presets and Uglify plugin separately in your project using npm.


Other advantages of Webpack


We’ve already seen more than enough to convince us about how useful Webpack is. However, here a few more reasons why Webpack is such a great tool:


Webpack provides a browser-compatible version for many of the core Node.js modules. This means that we can use modules that used to be only available with Node.js, like http or events.


We can exclude incompatible modules from the build or substitute them with compatible ones. Webpack can be configured to swap modules during the build time.


You can invoke web pack from task managing tools like Gulp and Grunt.


Webpack can be used to bundle different kinds of files, not just JavaScript.


In this short post we discussed the main responsibilities and features of Webpack. We learned the basic of loaders and plugins in Webpack and their differences. We also discussed why Webpack is such a great tool for web development.


While there are other transpiling tools out there like Browserfy and RollupJS, thanks to its powerful set of features, Webpack is one the most widely adopted transpilers today.


Thank you for reading!