/*
 * @Author: wangyunbo
 * @Date: 2021-06-01 10:45:08
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-01 10:45:09
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\require.context.spec.js
 */
If you are using Babel, look at babel-plugin-require-context-hook. Configuration instructions for Storybook are available at Storyshots | Configure Jest to work with Webpack's require.context(), but they are not Storyshots/Storybook specific.

To summarise:

Install the plugin.

yarn add babel-plugin-require-context-hook --dev
Create a file .jest/register-context.js with the following contents:

import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
registerRequireContextHook();
Configure Jest (the file depends on where you are storing your Jest configuration, e.g. package.json):

setupFiles: ['<rootDir>/.jest/register-context.js']
Add the plugin to .babelrc

{
  "presets": ["..."],
  "plugins": ["..."],
  "env": {
    "test": {
      "plugins": ["require-context-hook"]
    }
  }
}
Alternatively, add it to babel.config.js:

module.exports = function(api) {
  api.cache(true)

  const presets = [...]
  const plugins = [...]

  if (process.env.ENV_NODE === "test") {    
    plugins.push("require-context-hook")    
  }

  return {
    presets,
    plugins
  }
}
It may be worth noting that using babel.config.js rather than .babelrc may cause issues. For example, I found that when I defined the require-context-hook plugin in babel.config.js:

Jest 22 didn't pick it up;
Jest 23 picked it up; but
jest --coverage didn't pick it up (perhaps Istanbul isn't up to speed with Babel 7?).
In all cases, a .babelrc configuration was fine.

Remarks on Edmundo Rodrigues's answer

This babel-plugin-require-context-hook plugin uses code that is similar to Edmundo Rodrigues's answer here. Props to Edmundo! Because the plugin is implemented as a Babel plugin, it avoids static analysis issues. e.g. With Edmundo's solution, Webpack warns:

Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
Despite the warnings, Edmundo's solution is the most robust because it doesn't depend on Babel.