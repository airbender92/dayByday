/*
 * @Author: wangyunbo
 * @Date: 2021-05-13 21:07:43
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-13 21:08:33
 * @Description: file content
 * @FilePath: \dayByday\javascript\广度递归遍历.js
 */
/**
 * 广度优先遍历二叉树，也就是按层次的去遍历。依次遍历根节点，然后是左孩子和右孩子。所以要遍历完当前节点的所有孩子，。根据左右孩子的顺序来输出，所以就是先进先出的原则，那么我们当然就想到了队列这个数据结构：
思路：
1.创建一个nodelist存放最终结果
2.创建一个队列存放
3.当队列不为空时，获取队列第一个元素 ，存进nodelist
4.遍历所有的儿子节点，存进队列尾部
5.队列为空时退出循环并结束
————————————————
*/
//bfs广度优先(利用队列)
function wideTraverval(node){
  var nodelist=[]
  if(node!=null){
      var temp=[]
      temp.unshift(node)
      while(temp.length!=0){
          var item=temp.shift()
          nodelist.push(item)
          var children=item.children
          for(var i=0;i<children.length;i++){
              temp.push(children[i])
          }
      }
  }
  return nodelist
}
