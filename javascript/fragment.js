/*
 * @Author: wangyunbo
 * @Date: 2021-05-27 17:39:11
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-27 17:39:12
 * @Description: file content
 * @FilePath: \dayByday\javascript\fragment.js
 */
const chartIds = ['situationLine', 'cpuChart', 'memoryChart', 'pingChart', 'diskChart', 'networkFlowChart', 'webPerfChart']
const fragment = document.createDocumentFragment();
chartIds.forEach(function(id){
  const div = document.createElement('div');
  div.id = id;
  fragment.appendChild(div)
});
document.body.appendChild(fragment);