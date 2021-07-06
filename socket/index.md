<!--
 * @Author: wangyunbo
 * @Date: 2021-07-06 09:00:23
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-06 09:02:02
 * @Description: file content
 * @FilePath: \dayByday\socket\index.md
-->
`Socket.ON()`: Takes an event name and a callback as parameters, it listens for an event emitted from the server or vice versa, and the callback is used to retrieve any data associated with the event.

`Socket.EMIT()`: This emits/sends an event with or without data to the listening sockets including itself.

`Socket.Broadcast.Emit()`: This emits an event to other connected clients without itself included. We will be using these methods to send different events from the server throughout the Chat App.