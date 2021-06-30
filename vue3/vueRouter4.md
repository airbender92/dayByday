<!--
 * @Author: wangyunbo
 * @Date: 2021-06-30 14:50:04
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-30 17:46:35
 * @Description: file content
 * @FilePath: \dayByday\vue3\vueRouter4.md
-->
### 安装：
```
npm install vue-router@4
```

### router-link 
- router-link 用来替代传统的标签a, 允许在改变URL的时候不去重新刷新整个页面

### router-view
- router-view 会展示路由匹配的组件

### used with vue3

```js
const app = Vue.createApp({})
app.use(router)
app.mount('#app')
// 挂载后就可以在任何组件中使用 this.$router 和当前路由 this.$route
```
------------------
### used in `setup()` function
- 要在`setup`中访问`router`, `route` 需要调用`useRouter` or  `useRoute`函数。

### router 实例
- 同常我们会经常使用`router`实例对象， `this.$router` 等同于通过`createRouter()`创建的`router`实例对象

-----------------------------
### 动态路由匹配

动态路由片段是以 `:` 开始的

譬如： { path: '/users/:id', component: User }

A `parm` is denoted by a colon `:` ，当匹配时，`param` 的值会暴露在 `this.$route.params` 中。 

`$route.query` 中可以获取到URL的查询参数    
`$route.hash` 获取 hash

----------------------------
### reacting to params changes
从 `/users/johnny` 导航到 `/users/joy` 此时需要 `watch`  `$route`  对象：
```js
this.$watch(
  () => this.$route.params,
  (toParams, previousParams) => {
    // react to route changes...
  }
)
```
或者使用 `beforeRouteUpdate ` 守卫：
```
async beforeRouteUpdate(to, from) {
  // react to route changes...
  this.userData = await fetchUser(to.params.id)
},
```

------------------
```js
const routes = [
  // /:orderId -> matches only numbers
  { path: '/:orderId(\\d+)' },
  // /:productName -> matches anything else
  { path: '/:productName' },
]
Now, going to /25 will match /:orderId while going to anything else will match /:productName. The order of the routes array doesn't even matter!
```
### 可选参数
```js
const routes = [
  // will match /users and /users/posva
  { path: '/users/:userId?' },
  // will match /users and /users/42
  { path: '/users/:userId(\\d+)?' },
]
```

### 嵌套 `<router-view></router-view>`

To render components into this nested router-view, we need to use the children option in any of the routes:
- 注意： 如果嵌套的path以 `/`开头，会被当做根路由
```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'profile',
        component: UserProfile,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

---------------

### 导航到其他路由

`router.push('/users/eduardo')`   

`router.push({ path: '/users/eduardo' })`   

`router.push({ name: 'user', params: { username: 'eduardo' } })`   

// with query, resulting in /register?plan=private

`router.push({ path: '/register', query: { plan: 'private' } })`   

// with hash, resulting in /about#team

`router.push({ path: '/about', hash: '#team' })`

`router.replace({ path: '/home' })`

### redirect
```js
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```
### alias:
```js
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // this will render the UserList for these 3 URLs
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```
--------------------

-----------
### guards   
```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  return false
})
```

```js
//router.beforeResolve is the ideal spot to fetch data or do any other operation that you want to avoid doing if the user cannot enter a page.
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... handle the error and then cancel the navigation
        return false
      } else {
        // unexpected error, cancel the navigation and pass the error to the global handler
        throw error
      }
    }
  }
})
```

```js
// They are useful for analytics, changing the title of the page, accessibility features like announcing the page and many other things.
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})
```

### 给路由绑定其他信息：   
`$route.meta` 获取绑定的信息
```js
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // only authenticated users can create posts
        meta: { requiresAuth: true }
      },
      {
        path: ':id',
        component: PostsDetail
        // anybody can read a post
        meta: { requiresAuth: false }
      }
    ]
  }
]
```

--------------------------
### typescript:  
It is possible to type the meta field by extending the RouteMeta interface:
```ts
// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    isAdmin?: boolean
    // must be declared by every route
    requiresAuth: boolean
  }
}
```

-----------------------------
---------------------------------
### with Vue3
### 在 setup 中访问 Router 和 current Route
```ts
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query,
        },
      })
    }
  },
}
```
- The route object is a reactive object, so any of its properties can be watched and `you should avoid watching the whole route object`. In most scenarios, you `should directly watch the param you are expecting to change`
```ts
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const userData = ref()

    // fetch the user information when params change
    watch(
      () => route.params.id,
      async newId => {
        userData.value = await fetchUser(newId)
      }
    )
  },
}
```
- Note we still have access to $router and $route in templates, so there is no need to return router or route inside of setup

### Navigation Guards
```ts
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    // same as beforeRouteLeave option with no access to `this`
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )
      // cancel the navigation and stay on the same page
      if (!answer) return false
    })

    const userData = ref()

    // same as beforeRouteUpdate option with no access to `this`
    onBeforeRouteUpdate(async (to, from) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id)
      }
    })
  },
}
```

### useLink

```ts
import { RouterLink, useLink } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'AppLink',

  props: {
    // add @ts-ignore if using TypeScript
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    const { route, href, isActive, isExactActive, navigate } = useLink(props)

    const isExternalLink = computed(
      () => typeof props.to === 'string' && props.to.startsWith('http')
    )

    return { isExternalLink, href, navigate, isActive }
  },
}
```