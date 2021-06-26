# vuedemo

> 请求拦截 响应拦截 令牌机制
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
### Bearer Token 规范
* 概念：描述HTPP访问OAuth2保护资源是如何使用令牌规范
* 特点：令牌就是身份证明，无需证明令牌的所有权（只要有令牌，后端在验证是，不管是谁拿的都放行）
* 具体规范：在请求头中定义Authorization
`req.headers.Authorization = "Bearer " + token`
* 注意：jwt-koa的验证机制需要将token设置为“authorization：Bearer token”，否则会报错

### JSON Web Token规范
* 概念：令牌的具体定义方式
* 规定：令牌由三部分组成："头.载荷.签名"
* 头部：包含加密算法、令牌类型等信息
* 载荷：包含用户信息、签发时间、过期时间等信息
* 签名：由头部、载荷、秘钥加密得到的哈希串
> 头和载荷通过Base64转码的，可以通过反转来看到头和载荷的信息，所以不宜在载荷里放敏感的信息如密码都给你。

### Koa 相对应的两个包
* jsonwebtoken: 生成令牌
* koa-jwt: 验证令牌

### 可详细查看令牌

https://jwt.io