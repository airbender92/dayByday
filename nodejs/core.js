/*
 * @Author: wangyunbo
 * @Date: 2021-07-01 17:48:31
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-02 09:34:53
 * @Description: file content
 * @FilePath: \dayByday\nodejs\core.js
 */

/**
 assert

 The assert module provides a simple set of assertion tests that can be used to test invariants.

 ===========================================================

 buffer

 Prior to the introduction of TypedArray in ECMAScript 2015 (ES6), the JavaScript language had no mechanism for
reading or manipulating streams of binary data. The Buffer class was introduced as part of the Node.js API to make
it possible to interact with octet streams in the context of things like TCP streams and file system operations.

========================================================

c/c++_addons

Node.js Addons are dynamically-linked shared objects, written in C or C++, that can be loaded into Node.js using
the require() function , and used just as if they were an ordinary Node.js module. They are used primarily to
provide an interface between JavaScript running in Node.js and C/C++ libraries

=========================================================

child_process

The child_process module provides the ability to spawn child processes in a manner that is similar, but not
identical, to popen(3).

=======================================================

cluster

A single instance of Node.js runs in a single thread. To take advantage of multi-core systems the user will
sometimes want to launch a cluster of Node.js processes to handle the load. The cluster module allows you to
easily create child processes that all share server ports

==================================================

console

The console module provides a simple debugging console that is similar to the JavaScript console mechanism
provided by web browsers.

======================================================
OpenSSL是一個開放原始碼的軟體函式庫套件，應用程式可以使用這個套件來進行安全通訊，避免竊聽，同時確認另一端連線者的身分。這個套件廣泛被應用在網際網路的網頁伺服器上。 其主要函式庫是以C語言所寫成，實作了基本的加密功能，實作了SSL與TLS協定
crypto

The crypto module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC,
cipher, decipher, sign and verify functions

=====================================================

dns
The dns module contains functions belonging to two different categories:

1. Functions that use the underlying operating system facilities to perform name resolution, and that do not
necessarily perform any network communication. This category contains only one function: dns.lookup().
2. Functions that connect to an actual DNS server to perform name resolution, and that always use the network
to perform DNS queries. This category contains all functions in the dns module except dns.lookup().

============================================================

Events

Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain
kinds of objects (called "emitters") periodically emit named events that cause Function objects ("listeners") to be
called.

============================================================
fs
File I/O is provided by simple wrappers around standard POSIX functions. To use this module do require('fs'). All
the methods have asynchronous and synchronous forms.

===============================================================

http
The HTTP interfaces in Node.js are designed to support many features of the protocol which have been traditionally
difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire
requests or responses--the user is able to stream data.

===========================================================

module
Node.js has a simple module loading system. In Node.js, files and modules are in one-to-one correspondence (each
file is treated as a separate module).

===========================================================

net
The net module provides you with an asynchronous network wrapper. It contains functions for creating both
servers and clients (called streams). You can include this module with require('net');.

==========================================================

os
The os module provides a number of operating system-related utility methods.

=========================================================

path
The path module provides utilities for working with file and directory paths.

======================================================

querystring
The querystring module provides utilities for parsing and formatting URL query strings.

=======================================================

readline
The readline module provides an interface for reading data from a Readable stream (such as process.stdin) one
line at a time.

======================================================

repl
The repl module provides a Read-Eval-Print-Loop (REPL) implementation that is available both as a standalone
program or includible in other applications

=========================================================
stream
A stream is an abstract interface for working with streaming data in Node.js. The stream module provides a base
API that makes it easy to build objects that implement the stream interface

There are many stream objects provided by Node.js. For instance, a request to an HTTP server and process.stdout
are both stream instances.

========================================================
string_decoder
The string_decoder module provides an API for decoding Buffer objects into strings in a manner that preserves
encoded multi-byte UTF-8 and UTF-16 characters.

==========================================================
timers
The timer module exposes a global API for scheduling functions to be called at some future period of time. Because
the timer functions are globals, there is no need to call require('timers') to use the API.
The timer functions within Node.js implement a similar API as the timers API provided by Web Browsers but use a
different internal implementation that is built around the Node.js Event Loop.

=============================================================
tls_(ssl)
The tls module provides an implementation of the Transport Layer Security (TLS) and Secure Socket Layer (SSL)
protocols that is built on top of OpenSSL.
================================================================
tracing
Trace Event provides a mechanism to centralize tracing information generated by V8, Node core, and userspace
code.

Tracing can be enabled by passing the --trace-events-enabled flag when starting a Node.js application

=================================================================

url
The url module provides utilities for URL resolution and parsing.

=============================================================
util
The util module is primarily designed to support the needs of Node.js' own internal APIs. However, many of the
utilities are useful for application and module developers as well

========================================================
zlib
The zlib module provides compression functionality implemented using Gzip and Deflate/Inflate.
 */