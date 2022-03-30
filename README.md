# 项目说明

一个使用 Vue3 构建 Web 记账小工具。

面试作业项目，基于 https://github.com/xmindltd/hiring/tree/master/frontend-1

体验地址：https://money-manage-web-junbin.vercel.app

# 技术说明

**项目使用的技术栈**

- Vue3
- Vite: 使用 Vite 打包
- tailwindcss: 原子化的 css 框架
- element-plus: UI 框架
- chart.js: 一个图表库，用于封装账单图表组(BillChart.vue)
- dayjs: 日期处理
- sanity.io: 项目使用的接口服务

**实现的功能点**

- 简单的自适应布局
- 账单列表的查看、筛选、添加功能
- 基于时间和分类的图表展示，支持排序
- 总收支金额展示

**文件结构**

业务代码写在 src 目录下

- src/api：接口封装层
- src/assets：静态资源，包括图片，表单/图表默认配置数据
- src/components：所有的组件
- src/hooks：业务和通用的钩子函数保存在这里
- src/utils：保存通用和业务的方法
- src/views：路由页面
- src/routes.js：路由配置文件
- src/main.js：项目入口文件

# 如何运行？

运行环境：

node v14.18.0

npm v6.14.15

```sh
# 1. clone 项目
git clone https://github.com/junbin123/money-manage-web.git

# 2. 安装依赖
yarn

# 3. 本地运行 or 打包
yarn dev
yarn build
```

# 实现细节
