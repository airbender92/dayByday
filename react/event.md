<!--
 * @Author: wangyunbo
 * @Date: 2022-01-29 15:09:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-01-29 15:10:32
 * @FilePath: \dayByday\react\event.md
 * @Description: file content
-->
[stopPropagation](https://programmer.help/blogs/the-difference-between-stoppropagation-and-stopimmediatepropagation.html)

## The difference between stopPropagation and stopImmediatePropagation

stopPropagation
event.stopPropagation(); prevents the event from bubbling.

stopImmediatePropagation
event.stopImmediatePropagation(); prevents the event from bubbling and the listener of the same event type on the element from being triggered. For example:

Did not prevent the event from bubbling:
```js
import React, { Component } from 'react';
export default class App extends Component {
  componentDidMount() {
    let parent = document.getElementById('parent');
    let child = document.getElementById('child');
    parent.addEventListener('click', this.parentClick);
    child.addEventListener('click', this.childClick1);
    child.addEventListener('click', this.childClick2);
  }
  childClick1 = (e)=> {
    console.log('child1');
  }
  childClick2 = (e)=> {
    console.log('child2');
  }
  parentClick = ()=> {
    console.log('parent');
  }

  render() {
    return (
      <div id='parent'>
        <button id='child'>click me!</button>
      </div>
    );
  }
}
// The console output is: child1 child2 parent
```
Use stopPropagation to prevent event bubbling:
```js
import React, { Component } from 'react';
export default class App extends Component {
  componentDidMount() {
    let parent = document.getElementById('parent');
    let child = document.getElementById('child');
    parent.addEventListener('click', this.parentClick);
    child.addEventListener('click', this.childClick1);
    child.addEventListener('click', this.childClick2);
  }
  childClick1 = (e)=> {
    console.log('child1');
    e.stopPropagation();
  }
  childClick2 = (e)=> {
    console.log('child2');
  }
  parentClick = ()=> {
    console.log('parent');
  }

  render() {
    return (
      <div id='parent'>
        <button id='child'>click me!</button>
      </div>
    );
  }
}
// The console output is: child1 child2
Use stopImmediateStopPropagation to prevent event bubbling:
import React, { Component } from 'react';
export default class App extends Component {
  componentDidMount() {
    let parent = document.getElementById('parent');
    let child = document.getElementById('child');
    parent.addEventListener('click', this.parentClick);
    child.addEventListener('click', this.childClick1);
    child.addEventListener('click', this.childClick2);
  }
  childClick1 = (e)=> {
    console.log('child1');
    e.stopImmediatePropagation();
  }
  childClick2 = (e)=> {
    console.log('child2');
  }
  parentClick = ()=> {
    console.log('parent');
  }
  render() {
    return (
      <div id='parent'>
        <button id='child'>click me!</button>
      </div>
    );
  }
}
// The console output is: child1
```

You can see that there are two click events bound to the child node. If you only use stopPropagation, you can only prevent the event from bubbling to its parent node, while stopImmediatePropagation can prevent the event from bubbling to the parent node and other events of the same type on the current node.

It is worth noting that I bind events through addEventListener instead of onClick of React.
This is because the events bound directly with addEventListener are directly bound to the real DOM node, while the onClick bound events of React are composite events, which are not bound to the real DOM, but listen to all the supported events at the document. When the event bubbles to the document, React encapsulates the event content and submits it to the real processing function to run.

The event event in react is a synthetic event. The synthetic event encapsulates the native stopPropagation, but does not encapsulate the stopImmediatePropagation. In the event of react, there is no stopImmediatePropagation function. However, it can be called through `event.nativeEvent.stopImmediatePropagation`.
For more details on React composite events, please refer to: Notes on mixing React synthetic event and DOM native event