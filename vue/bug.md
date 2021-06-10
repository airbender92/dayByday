<!--
 * @Author: wangyunbo
 * @Date: 2021-06-10 11:17:17
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-10 11:18:22
 * @Description: file content
 * @FilePath: \dayByday\vue\bug.md
-->
Q: This reference is undefined in template's v-for loops

A: if you still having the issue here is a workaround I'm using.
in your `data` add a variable like `myRef: this` and use `myRef` in the `v-for` loop instead of `this`
