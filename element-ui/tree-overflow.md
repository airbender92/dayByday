<!--
 * @Author: wangyunbo
 * @Date: 2021-07-19 13:42:15
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-19 13:42:38
 * @FilePath: \dayByday\element-ui\tree-overflow.md
 * @Description: file content
-->
解决ELEMENT-UI-TREE组件无法出现横向滚动条
elementUI用到tree组件碰到tree节点过多需要横向滚动显示。但是组件文档上没有。

上github发现这个问题有人已经遇到而且提了issue



通过下面方法搞定

具体操作：
1、在tree外包一层div,并设置父元素的高，这样才不会出现横向滚动条在树的最低端，需要滚动竖向滚动条才能看到。

<div class="tree">  
  <el-tree>
  </el-tree>  
</div>
2、定义tree的样式

.tree {
  overflow-y: auto;  
  overflow-x: scroll;
  width: 80px;
  height: 500px;  
  background-color: #ffffff;  
}
3、重写tree样式

.el-tree {  
  min-width: 100%;
  display: inline-block !important;  
}
4、设置以下属性，可以防止树多出了莫名的高度

.el-tree-node > .el-tree-node__children {
  overflow: visible;
}
最终实现效果


