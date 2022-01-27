<!--
 * @Author: wangyunbo
 * @Date: 2022-01-20 11:05:26
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-01-20 11:09:07
 * @FilePath: \dayByday\javascript\mock.md
 * @Description: file content
-->
umi request和mock（mock文件夹下的js文件）请求传递和接收参数

## utils/request.js
```js
<pre><code class="language-javascript">Request
    req.baseUrl 基础路由地址
    req.body post发送的数据解析出来的对象
    req.cookies 客户端发送的cookies数据
    req.hostname 主机地址 去掉端口号
    req.ip 查看客户端的ip地址
    req.ips 代理的IP地址
    req.originalUrl 对req.url的一个备份
    req.params 在使用/:id/:name 匹配params
    req.path 包含请求URL的路径部分
    req.protocol http 或https协议
    req.query 查询字符串解析出来的对象 username&#61;zhangsan&amp;password&#61;123 { username:zhangsan }
    req.route 当前匹配的路由 正则表达式
    req.params 获取路由匹配的参数
    req.get 获取请求header里的参数
    req.is 判断请求的是什么类型的文件
    req.param(key名称) 用来获取某一个路由匹配的参数
 
 
Response
    res.headersSent 查看http响应是否响应了http头
    res.append(名称,value) 追加http响应头
    res.attachment(文件路径) 响应文件请求 
    res.cookie() 设置cookie
    
    res.setHeader(&#39;Content-Type&#39;,&#39;text/html;charset&#61;utf8&#39;)
    res.append(&#39;Content-Type&#39;,&#39;text/html;charset&#61;utf8&#39;)
    res.append(&#39;hehe&#39;,&#39;1008&#39;)
    res.append(&#39;haha&#39;,&#39;1008&#39;)
    res.attachment(&#39;./xx.zip&#39;) //Content-Disposition: attachment; filename&#61;&#34;xx.zip&#34;
    res.clearCookie(cookiename) 删除cookie
    res.cookie(&#39;zhangsan&#39;,&#39;lisi&#39;) 设置cookie
    res.cookie(&#39;zhangsan1&#39;,&#39;lisi2&#39;,{
        maxAge:900000,
        httpOnly:true,
        path: &#39;/admin&#39;, 
        secure: true,
        signed:true
    })
    res.clearCookie(&#39;zhangsan&#39;)
 
    res.download(文件的path路径) 跟attachment类似 用来处理文件下载的 参数是文件地址
    res.end http模块自带的
    res.format()协商请求文件类型 format匹配协商的文件类型
    res.format({
        &#39;text/plain&#39;: function(){
            res.send(&#39;hey&#39;);
        },
        
        &#39;text/html&#39;: function(){
            res.send(&#39;&lt;p&gt;hey&lt;/p&gt;&#39;);
        },
        
        &#39;application/json&#39;: function(){
            res.send({ message: &#39;hey&#39; });
        },
        
        &#39;default&#39;: function() {
            // log the request and respond with 406
            res.status(406).send(&#39;Not Acceptable&#39;);
        }
    });
 
    res.get(&#39;key&#39;) 获取响应header数据
    res.json() 返回json数据 会自动设置响应header Content-type 为json格式 application/json
 
    res.json({
        xx:100
    })
 
    res.json({
        xx:100
    })
 
    jsonp 利用的就是浏览器加载其他服务器的文件不会存在跨域问题
    ajax请求就会有跨域问题
 
    res.setHeader(&#39;Content-Type&#39;,&#39;text/javascript;charsert&#61;utf8&#39;)
    res.end(&#96;typeof ${req.query.callback} &#61;&#61; &#39;function&#39; ? ${req.query.callback}({aa:100}):null&#96;)
 
    res.jsonp({aaa:100})
 
 
    重定向 把访问的地址跳转到另一个地址上
    res.redirect(301,&#39;/api/aes&#39;)
 
    express jade
    res.render(&#39;index&#39;,{title:&#34;hehe&#34;,test:&#34;23&#34;})
    res.send(&#39;&#39;) 发送数据 可以是任意类型的数据
    res.sendFile() 发送文件的 
    res.sendStatus(200) 设置发送时的状态码
    res.set(&#39;Content-Type&#39;, &#39;text/plain&#39;) //设置响应header
    res.status(200) // 设置状态码
    res.type(&#39;&#39;) // 直接设置响应的文件类型
 
    res.type(&#39;pdf&#39;)
 
    res.send({aa:100})
    res.end(&#39;ok&#39;)
    res.end({aa:100})
 
    res.end(&#39;你好&#39;)
 
 
    res.end(req.get(&#39;Accept-Language&#39;))
    res.json({
        is:req.is(&#39;text/html&#39;)
    })
 
    res.json({
        type:req.baseUrl,
        hostname:req.hostname,
        // ip:req.ip,
        // ips:req.ips,
        // route:req.route,
        ct:req.get(&#39;Accept&#39;),
        cs:&#39;22&#39;
    })
</code></pre> 
```