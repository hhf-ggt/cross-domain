## jsonp解决跨域

### 利用浏览器的漏洞、src不受同源策略影响

```text
  我们使用egg起一个服务、然后调试使用jsonp跨域
```

1、初始化一个egg项目(这里我们为了快速、直接使用egg的脚手架来初始化一个项目)

[egg官网](https://eggjs.org/zh-cn/)

**初始化项目**

```bash
$ mkdir egg-server && cd egg-server

$ npm init egg --type=simple

$ npm i

# 启动项目
$ npm run dev

# 打开以下地址（这个端口如果你觉得不满意可以通过config来进行配置）
# http://localhost:7001
```

2、创建一个html文件(在根目录下面)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="demo">
    我是默认数据
  </div>
  <script>
    let demo = document.getElementById('#demo')
  </script>
  <script>
    function myCallback(data) {
      let oDemo = document.getElementById('demo')
      // 将后端返回的数据替换到我们的页面上
      oDemo.innerHTML = data
    }
  </script>
  <script src="http://127.0.0.1:7001/jsonp?callbackName=myCallback"></script>
</body>
</html>
```

1. 保证我们请求回来、执行myCallback方法的时候、这个函数是存在的

2. 或者也可以通过动态的去创建script去发此请求、之后将此dom元素删除掉

3. 我们和后端约定好我们的回调函数名称是callbackName=myCallback

4. 后端将数据拼接为在我们回调函数的如参中 

5. 这样子我们在加载到这个js资源、并且执行此回调的时候就可以获取到资源

6. src 地址部门是我们的egg起动的服务、默认是127.0.0.1:7001、然后路由是/jsonp

3、配置路径以及拼接数据给客户端

```javascript
// app/router.js 中增加一个路有 /jsonp
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/jsonp', controller.home.index)
}

// 在app/controller/jsonp.js中获参数、拼接返回参数
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 1、定义数据
    let res = '<h1>我是通过jsonp跨域获取到的数据</h1>'
    // 2、获取回调函数名称、这里的query返回的就是我们query传的参数、并且是一个对象 eg: {callbackName: myCallback}
    let callbackName = ctx.query.callbackName
    // 3、设置返回内容的MIME
    ctx.set('Content-Type', 'text/javascript')
    // 4、拼接返回数据(这里如果直接穿一个变量res、则会抛res is not defined、需要转下字符串)
    // ctx.body = `${callbackName}(${res})`
    ctx.body = `${callbackName}+(${res})`
  }
}
module.exports = HomeController
```

**启动我们的egg服务**

```bash
$ npm run dev

# 后面在浏览器中打开我们的html文件

# 到这里我们发现并没有拿到数据、查看浏览器控制台、发现报了一个corb
# 我们需在服务端设置下返回的内容为javascript、这里就不深入了、涉及到浏览器的嗅探工作

# 在home.js中(+ 是 diff形式)
+ ctx.set('Content-Type', 'text/javascript')

# 然后我们在重新刷新浏览器、就大功告成了
```

- 纸上得来终觉浅、觉知此事要躬行
