# 一、项目说明
这是我编辑的-------------------------ysw
![img](https://img-blog.csdnimg.cn/b949660eab5b4753963e1d2075b4f033.png)

一个使用 Vue3 构建 Web 记账小工具。

面试作业项目，基于 https://github.com/xmindltd/hiring/tree/master/frontend-1

体验地址：https://money-manage-web-junbin.vercel.app

# 二、如何运行？

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

# 三、技术说明

**项目使用的技术栈**

- Vue3
- Vite: 使用 Vite 打包
- tailwindcss: 原子化的 css 框架
- element-plus: UI 框架
- chart.js: 一个图表库，用于封装账单图表组件(BillChart.vue)
- dayjs: 日期处理
- sanity.io: 项目使用的接口服务

**实现的功能点**

- 支持响应式布局
- 账单列表的查看、筛选、添加功能
- 基于时间和分类的图表展示，支持排序
- 总收支金额展示

**文件结构**

![img](https://img-blog.csdnimg.cn/eb473dde1d9a4ab9a4b2a313ca48d395.png)

业务代码写在 src 目录下

- src/api：接口封装层
- src/assets：静态资源，包括图片，表单/图表默认配置数据
- src/components：所有的组件
- src/hooks：业务和通用的钩子函数保存在这里
- src/utils：保存通用和业务的方法
- src/views：路由页面
- src/routes.js：路由配置文件
- src/main.js：项目入口文件

# 四、细节

## 1. hooks

https://github.com/junbin123/money-manage-web/blob/main/src/hooks/index.js

项目实现三个钩子`useProp`、`useBillList`、`useCreateBill`。

- useProp

  一个通用钩子，把 props 的参数包装成可写的计算属性，以 hooks 的方式实现双向绑定，更加简洁。

  支持传入一个函数(可选)，在改变 props 时去执行副作用。

- useBillList

  一个业务钩子，将跟账单列表展示相关的数据和方法封装在里面，包括刷新、过滤，是否处于请求状态等等。

- useCreateBill

  一个业务钩子，封装了添加账单方法和请求状态，使用需要传入账单分类 categoryDict

## 2. 表单和表格组件的封装

https://github.com/junbin123/money-manage-web/blob/main/src/components/SmartTable.vue

封装了两个通用组件：

- SmartForm.vue：用在筛选账单和添加账单两个场景
- SmartTable.vue：展示账单列表

封装思想差不多，基于关注点分离，以 SmartTable 为例

一个表格被渲染处理，核心是下面三种数据

- columns：静态数据，保存列的相关配置数据，包括表头文案、宽度、渲染函数等
- tableList：静态数据，表示哪些字段需要被展示出来
- tableData：动态数据，最终的渲染数据，由接口获取

应用案例

![img](https://img-blog.csdnimg.cn/c35c449b964a4de6bf71875452895c68.png)
