### 基于 gulp 和 Koa2 的前端自动化开发架构（一）
#### 1. 概要
基于 gulp 和 Koa2 的前端自动化开发架构。
#### 2. 实现的功能
- 自动化编译及检测后端文件 gulp-watch
- 错误中间件处理 middleware
- 文件说明 jsdoc
- 错误日志收集 log4js
- 上线时，自动化流清洗配置文件，以减少冗余代码 gulp-rollup
- 后端代码自动化检查 gulp-eslint


#### 3. 启动
- npm run server:dev  //编译node后端文件
- npm run server:lint  //检查node后端文件代码
- npm run server:prod //上线时执行

- npm run start:dev  //启动文件 app.js

- 默认端口号：
  8081 开发环境 ，
  80 生产环境
