# message-board
由vue+egg.js+mysql开发的一个留言板项目

##### 注意
项目采用的是本地mysql,需要安装mysql v5.7.1和node.js v8.12.0
从根目录打开命令行

###### 1、克隆项目到本地

`   git clone https://github.com/zengjielin/message-board.git`

###### 2、运行和安装前端项目

```
    cd server-app
    npm install
    npm run dev
```

###### 3、修改server-app/config/config.default.js,更改自己的本地服务器基本信息,并在自己数据库上建表usermsg,再运行服务，否则报错

```
    const userConfig = {
        // myAppName: 'egg',
        mysql: {
        // 单数据库信息配置
        client: {
            // host
            host: 'localhost',
            // 端口号
            port: '3306',
            // 用户名
            user: 'zengjielin',
            // 密码
            password: '123',
            // 数据库名
            database: 'msgboard',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
        }
    };
```

###### 4、运行和安装后台项目

```
    cd web-app
    npm install
    npm run dev
```