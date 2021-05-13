/*
 * @Author: wangyunbo
 * @Date: 2021-05-13 21:08:54
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-13 21:10:18
 * @Description: file content
 * @FilePath: \dayByday\javascript\递归更新数据.js
 */
// 对数据做唯一标识
export function uniqueKey(datas) {
  function each(e, parentId) {
    if(!Array.isArray(e)) { e = [e]}
    e.forEach((data) => {
      data.nodeId = parentId ? `${parentId}-${data.id}` : data.id;
      if(data.children && data.children.length) {
        // 此处必须深拷贝
        data.children = JSON.parse(JSON.stringify(data.children))
        each(data.children, data.nodeId)
      }
    })
  }
 each(datas);
 return datas
}


// 获取树形节点的最深层级
export function getMaxFloor (treeData) {
  let max = 0
  function each (data, floor) {
    if(!Array.isArray(data)){
      data = [data]
    }
    const sameLevelCount = data.length;
    data.forEach((e) => {
      e.sameLevelCount = sameLevelCount
      e.floor = floor;
      if (floor > max) {
        max = floor
      }
      if (e.children && e.children.length > 0) {
        each(e.children, floor + 1)
      }
    })
  }
  each(treeData,1);
  return max
}