<!--
 * @Author: wangyunbo
 * @Date: 2022-01-20 15:58:01
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-01-20 15:58:01
 * @FilePath: \dayByday\react\debounce.md
 * @Description: file content
-->
Debounce and Throttle Callbacks with React Hooks
edit 
This one will be short and to the point. I recently ran into a problem while trying to create a debounced callback with React hooks. If you're using the react-hooks ESLint package with the recommended settings, then it will warn you that you can't do the following:

import React from 'react'
import { debounce } from 'lodash'

function Search({ onSearch }) {
  const [value, setValue] = React.useState('')

  // This use of `useCallback` has a problem
  const debouncedSearch = React.useCallback(
    debounce(val => {
      onSearch(val)
    }, 750),
    [onSearch]
  )

  const handleChange = React.useCallback(
    e => {
      setValue(e.target.value)
      debouncedSearch(e.target.value)
    },
    [debouncedSearch]
  )

  return <input type="text" value={value} onChange={handleChange} />
}
This looks fine, but here's the warning:

Error: React Hook useCallback received a function whose dependencies are unknown. Pass an inline function instead react-hooks/exhaustive-deps

useCallback expects an inline function. Handing it the returned function from a debounce or throttle doesn't cut the mustard. Why? The ESLint rule can't figure out what the exhaustive dependencies should be. How do we fix this?

It might seem odd, but useMemo comes to the rescue.
```js
function Search({ onSearch }) {
  const [value, setValue] = React.useState('')

  // This is the solution
  const debouncedSearch = React.useMemo(
    () =>
      debounce(val => {
        onSearch(val)
      }, 750),
    [onSearch]
  )

  const handleChange = React.useCallback(
    e => {
      setValue(e.target.value)
      debouncedSearch(e.target.value)
    },
    [debouncedSearch]
  )

  return <input type="text" value={value} onChange={handleChange} />
}
```
Think about it. useMemo is used to store a memoized value that should only be recalculated when the dependencies change. So what if that memoized value is a function?

It wasn't obvious to me to do this at first, but it makes sense. We want the returned function, and we want it to have the correct exhaustive dependencies, and update whenever they change. useMemo does exactly that.

You can use this same technique with throttle, too. Really any higher ordered function that returns a function. Sky is the limit.

Lastly, credit where it's due. I came across this idea from this GitHub comment. Maybe give it a thumbs up if you found this helpful.