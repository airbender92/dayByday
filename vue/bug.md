<!--
 * @Author: wangyunbo
 * @Date: 2021-06-10 11:17:17
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-17 11:21:53
 * @Description: file content
 * @FilePath: \dayByday\vue\bug.md
-->
Q: This reference is undefined in template's v-for loops

A: if you still having the issue here is a workaround I'm using.
in your `data` add a variable like `myRef: this` and use `myRef` in the `v-for` loop instead of `this`


Q: vue在v-html中绑定事件
A: 由于balance是个字符串，需要点击后查看详情，必须渲染成html，但是渲染后的html里面写绑定事件的代码没有经过vue编译，所以事件无效。

解决办法：在v-html同级元素中使用事件绑定，然后根据事件处罚的目标对象去获取参数。

<td v-html="item.balance" @click="tokenDetail($event)">{{item.balance}}</td>
1
渲染内容：

<a href="javascript:;" data-key="key">key : value</a><br>
1
事件详情：

tokenDetail: function(e){
  if(e.target.nodeName === 'A'){
  	// 获取触发事件对象的属性
        var token = e.target.getAttribute('data-key');
        layer.open({
            type: 2,
            title: '详情',
            area: ['800px','500px'],
            shade: [0],
            content: ['token_detail.html?token='+ token],
            shadeClose: true
        })
    }
},
