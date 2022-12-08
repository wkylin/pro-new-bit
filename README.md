# pro-new-bit

本文将介绍如何跨多个项目利用合适的工具和工作流来开发、分发和应用组件，为各位提供一份基于组件构建、分发和协作来构建项目和应用程序的实用指南。

### 1. 在应用程序之间共享组件的方法有哪些？

1. CV 大法，将项目B的组件完整复制到项目A
2. 将组件独立，发布到内部npm，通过npm加载组件
3. Webpack5: Module Federation
4. Monorepo:
    - Lerna
    - Npm(v7) Workspaces
    - Yarn Workspaces
    - Pnpm Workspaces
    - Bit
5. Git Tools - Submodules
6. ......

### 2. Bit -- 今天的主角

> Bit -- 告别巨石Web应用, 欢迎由自主性团队构建的独立组件构成的组件驱动性Web应用。

> Bit -- 庞大而单一的巨石应用的终结者，具有可扩展性、协助性和一致性的分布式开发方式的释放者...

### 3. Bit 是什么 


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/765adf7f44a0437da3b5a9525adc9cf0~tplv-k3u1fbpfcp-watermark.image?)


### 4. Bit 家庭成员

1. Bit -- https://github.com/teambit/bit
2. Bit Dev -- [https://bit.dev/](https://bit.dev/)
3. Bit Cloud -- [Build together in components ](https://bit.cloud/)

### 5. Bit - Component Driven Development

了解一下Component Driven User Interfaces, 参考网址: [https://www.componentdriven.org/](https://www.componentdriven.org/)

什么是组件？？
> 组件是标准化的、可互换的UI构建块。它们封装了UI片段的外观和功能。想想乐高积木。乐高可以用来建造从城堡到宇宙飞船的一切；组件可以被拆开并用于创建新功能。

### 6. Bit 实践指南
今天的任务列表有以下几个方面: 
- [ Bit Cli ] 
- [ Bit Workspace ]
- [ Bit Scope ]
- [ Bit Component Action ]
- [ [Verdaccio](https://verdaccio.org/) -- A lightweight Node.js private proxy registry ]
- [ Hosting Scopes ]
- [ Bit export Npm ]


### 7. Bit Install


```js
$ npx @teambit/bvm install
$ npx @teambit/bvm upgrade
or
$ npm i -g @teambit/bvm
$ bvm install
$ bit upgrade
```

### 8. Initialize a workspace & scope

> 工作区是一组文件和目录，可为要组成和版本的组件提供必要的上下文。

> 作用域是组件的协作服务器。它是组件导出和导入的地方。一个工作空间处理不同作用域的组件。

需要完成以下准备工作：
1. 到Bit cound 去完成注册，设置自己的组织名（wbit)和 Scope(wui)，本地可以单独设置Scope(wui),不需要设置组织
2. 构建本地Server

查看可以创建工作区的模板：

```js
$ bit templates
bit new <template-name> <workspace-name>
$ bit new react pro-wbit-wui --default-scope wbit.wui
$ cd pro-wbit-wui && bit start
```
工作区本地预览：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/013758a3879e47908e7a2ab12ee64c0a~tplv-k3u1fbpfcp-watermark.image?)

工程目录结构示例：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2ea4274107c431493b598e518367d02~tplv-k3u1fbpfcp-watermark.image?)

### 9. Creating components


```js
$ bit create react apps/ui/to-do --scope wbit.wui
$ bit start
```
本地预览：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5676990b5e4d4067bd6d4ca7cc069145~tplv-k3u1fbpfcp-watermark.image?)

接下来就可以想怎么玩就怎么玩了哈，主要可以了解一下 Bit Cli相关的操作，可以通过 bit --help 查看所有的cli命令

```js
$ bit --help
$ bit status
$ bit list
$ bit tag
$ bit export
$ bit import
$ bit install
$ bit ...
```

### 9. 本地Server 创建，设置共享组件门户, bit.cloud本地私服, 用来展示、收集和发现组件 

参考：Hosting Scopes: [https://bit.dev/docs/scope/running-a-scope-server](https://bit.dev/docs/scope/running-a-scope-server)

官网docker镜像：
1. **[bit-cli container](https://hub.docker.com/r/bitcli/bit)**
2. **[bare-scope container](https://hub.docker.com/r/bitcli/bit-server)**

自定义docker镜像，可以指定 scope, 以下是我使用的文件：

```js
# Dockerfile
FROM node:16.17.1
USER root

RUN npm i @teambit/bvm -g
RUN bvm upgrade
ENV PATH=$PATH:/root/bin

# increase memory to avoid 137 error code
ENV NODE_OPTIONS=--max_old_space_size=4096

RUN bit config set analytics_reporting true
RUN bit config set no_warnings true
RUN bit config set interactive true
RUN bit config set error_reporting true

ARG SCOPE_PATH=/root/wui
WORKDIR ${SCOPE_PATH}
RUN bit init --bare
CMD bit start
```
运行以下cli启动本地server:

```js
$ docker build -f ./Dockerfile -t bitcli/bit-server .
$ docker run -it -v persist:/root/wui -p 3000:3000 bitcli/bit-server:latest
$ bit remote add http://localhost:3000
```
这时可以将已上已创建的to-do 发布到 本地server了，以下是预览：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67300b22da8446bd873e8ffa9442c0d1~tplv-k3u1fbpfcp-watermark.image?)

### 10. Bit 支持将隔离组件打包成npm pkg, 非常方便部署到私服 或者 npm 官网

主要Bit为每个组件提供了各自的package.json， 并且提供link, 对应文件node_modules目录下，举个例子：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0405be6685646d580c0c6ccec4b19ee~tplv-k3u1fbpfcp-watermark.image?)

主要配置文件：workspace.jsonc >> teambit.pkg/pkg


```js
$ npm adduser --registry http://localhost:4873/
$ bit tag 
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5d3bdf9aec74d1c9e881e5afbec0051~tplv-k3u1fbpfcp-watermark.image?)

### 11. Verdaccio 
> Verdaccio是一个简单的、不需要配置的本地私有npm注册表。不需要整个数据库就可以开始!Verdaccio开箱即用，具有自己的小数据库，以及代理其他注册中心的能力(Npmjs.org)，在整个过程中缓存下载的模块。


```js
$ npm install --location=global verdaccio
or
$ docker pull verdaccio/verdaccio
$ docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

To publish your first package just:

```js
# 1. Login
$ npm adduser --registry http://localhost:4873/
# 2. Publish
$ npm publish --registry http://localhost:4873/
# 3. Refresh this page
```

到目前基本功能已完成，相信你对Bit有了一定的了解，可以动手实操起来了...
Bit 高级功能 期待你的发现与了解，共同学习与进步...

总之，在项目之间共享组件，需要坚持三条原则：
1. 将组件开发为可复用单元
2. 分发组件以便查找和使用
3. 让成员采用并协同更改
