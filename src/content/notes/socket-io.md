---
title: Socket.IO
tags: [Socket.IO, WebSocket, 前端, Node.js]
pubDate: 2026-06-17
description: Socket.IO实时双向通信库的特性与基本介绍
source: Socket.IO.md
---

# Socket.IO

### 简介

**Socket.io**是一个**WebSocket库**，包括了**客户端的JS**和**服务端的Nodejs**。**它是用于在浏览器和服务器之间进行实时，双向和基于事件的通信**。它会根据浏览器自动从WebSocket、AJAX长轮询（Long Polling）、Iframe流等各种方式中选择最佳的方式来实现网络实时应用，非常方便和人性化。

### Socket.IO的特点

- **实时分析**：将数据推送到客户端，这些客户端会表现为实时计数器，图表或是日志
- **二进制流传输**：Socket.io支持任何形式的二进制文件传输
- **文档合并**：允许多个用户同时编辑一个文档，并且能够看到每个用户做出的修改
