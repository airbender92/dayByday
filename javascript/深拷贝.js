/*
 * @Author: wangyunbo
 * @Date: 2021-09-15 14:37:44
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-15 14:37:55
 * @FilePath: \dayByday\javascript\深拷贝.js
 * @Description: file content
 */
export default class DeepCopy {
  /**
   * 深拷贝
   * @param {*} obj 拷贝对象(object or array)
   * @param {*} cache 缓存数组
   */
  deepCopy (obj, cache = []) {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
    /**
     * 类似下面这种
     * var a = {b:1}
     * a.c = a
     * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
     */
    const hit = cache.filter(c => c.original === obj)[0]
    if (hit) {
      return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
    cache.push({
      original: obj,
      copy
    })
    Object.keys(obj).forEach(key => {
      copy[key] = this.deepCopy(obj[key], cache)
    })

    return copy
  }
}
