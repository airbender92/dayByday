<!--
 * @Author: wangyunbo
 * @Date: 2021-07-07 08:58:27
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-07 09:03:50
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