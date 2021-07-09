<!--
 * @Author: wangyunbo
 * @Date: 2021-07-07 08:58:27
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-09 17:42:36
 * @Description: file content
 * @FilePath: \dayByday\webpack\webpack.config.md
-->
/*
 * @Author: wangyunbo
 * @Date: 2021-07-07 08:58:27
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-07 08:58:35
 * @Description: file content
 * @FilePath: \dayByday\webpack\webpack.config.js
 */


- entry:    

  - An entry point can be defined in 3 ways:

    1) This creates a file for every single property in the object.
    ```js
    entry: {
     main: './src/index.js',
     dashboard: './dashboard/dashboard.js'
     }
    ```

    2) The usual configuration, not much different

    ```js
      entry: './src/index.js'
    ```
    3) 
    ```js
    entry: ['@babel/polyfill', 'src/index.js', 'otherfile', 'other something']
    ```
    The only difference between defining as an object and defining as an array is that as an object webpack creates more than one "main" bundle file, it is also a code splitting strategy.

    When defining as an array, webpack will look for dependencies in all these files and put them into the same "entry" file, basically it is categorized as 1 single file.

    What is happening with that project you linked is a combination of 1 + 3, which we could say it is a "4". That creates an object for each entry and each entry on that object is composed by an array of different other libraries.

    ------------------------

    ## [resolve](https://webpack.js.org/configuration/resolve/#resolve)

    These're two ways to inform webpack of extra location to look for a module.

    ```js
    // webpack.config.js
    module.exports = {
      //...
      resolve: {
        // 1. add extra `node_modules` directory to search path
        modules: ['node_modules', '/abs_path/to/global/node_modules'],
        // 2. use alias to explicitly map a module name to its exact location
        alias: {
          '@abc': '/abs_path/to/global/node_modules/@abc'
        }
      }
    };
  ```
-----------

## VanillaJS:
Using "VanillaJS" means using plain JavaScript without any additional libraries like jQuery.