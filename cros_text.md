# cors(Cross-Origin Resource Sharing)

    CORS （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的HTTP头组成，这些HTTP头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应。

### 为什么会出现跨域？

    同源安全策略 默认阻止“跨域”获取资源。但是 CORS 给了web服务器这样的权限，即服务器可以选择，允许跨域请求访问到它们的资源。


```text
  出现跨域的原因是浏览器的安全限制导致的、这个安全限制就是同源策略(协议、端口、域名只要都一个不相同则就是跨域)
  主要是对ajax请求的一些限制
```

[浏览器的同源策略MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy#%E5%A6%82%E4%BD%95%E5%85%81%E8%AE%B8%E8%B7%A8%E6%BA%90%E8%AE%BF%E9%97%AE)

**同源策略主要是用来保护什么？**

```text
同源策略是一个重要的安全策略，它用于限制一个origin的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。
防止外域的资源进行内嵌、以及防止外域读取我们本地的localStorage、indexDB、cookies等
```

[corsMDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82)

```text
跨源资源共享 (CORS) （或通俗地译为跨域资源共享）是一种基于HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其它origin（域，协议和端口），这样浏览器可以访问加载这些资源。跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的"预检"请求。在预检中，浏览器发送的头中标示有HTTP方法和真实请求中会用到的头。
```

**cors头部字段设置**

### 1、Access-Control-Allow-Origin

```bash
$ Access-Control-Allow-Origin
# 指示请求的资源能共享给哪些域。

$ Access-Control-Allow-Origin: <origin>
# 对于不需具备凭证（credentials）的请求，服务器会以“*”作为通配符，从而允许所有域都具有访问资源的权限。

# eg
$ Access-Control-Allow-Origin: *
# 这样是允许所有人都可以访问我们的资源

$ Access-Control-Allow-Origin: https://developer.mozilla.org
# 只允许指定的域名来访问我们的资源
```

### 2、Access-Control-Allow-Credentials

```bash
$ Access-Control-Allow-Credentials
# 响应头表示是否可以将对请求的响应暴露给页面。返回true则可以，其他值均不可以。
# Credentials可以是 cookies, authorization headers 或 TLS client certificates。
# 当作为对预检请求的响应的一部分时，这能表示是否真正的请求可以使用credentials。注意简单的GET 请求没有预检，所以若一个对资源的请求带了credentials，如果这个响应头没有随资源返回，响应就会被浏览器忽视，不会返回到web内容。

$ Access-Control-Allow-Credentials: true
$ var xhr = new XMLHttpRequest()
$ xhr.open('GET', 'http://example.com/', true)
$ xhr.withCredentials = true // 前端配置、跨域携带cookies
$ xhr.send(null)
```

### 3、Access-Control-Allow-Headers

```text
# 响应首部 Access-Control-Allow-Headers 用于 preflight request （预检请求）中，列出了将会在正式请求的  Access-Control-Request-Headers 字段中出现的首部信息。

# 简单首部，如 simple headers、Accept、Accept-Language、Content-Language、Content-Type （只限于解析后的值为 application/x-www-form-urlencoded、multipart/form-data 或 text/plain 三种MIME类型（不包括参数）），它们始终是被支持的，不需要在这个首部特意列出。
```

### 4、Access-Control-Allow-Methods

```text
$ Access-Control-Allow-Methods
# 响应首部 Access-Control-Allow-Methods 在对 preflight request.（预检请求）的应答中明确了客户端所要访问的资源允许使用的方法或方法列表。

$ Access-Control-Allow-Methods: <method>, <method>, ...
# Access-Control-Allow-Methods: POST, GET, OPTIONS
# 使用逗号隔开

```

### 5、Access-Control-Max-Age
```text
$ Access-Control-Max-Age
# The Access-Control-Max-Age 这个响应头表示 preflight request  （预检请求）的返回结果（即 Access-Control-Allow-Methods 和Access-Control-Allow-Headers 提供的信息） 可以被缓存多久。

返回结果可以被缓存的最长时间（秒）。
在 Firefox 中，上限是24小时 （即 86400 秒）。
在 Chromium v76 之前， 上限是 10 分钟（即 600 秒)。
从 Chromium v76 开始，上限是 2 小时（即 7200 秒)。
Chromium 同时规定了一个默认值 5 秒。
如果值为 -1，表示禁用缓存，则每次请求前都需要使用 OPTIONS 预检请求。
```

### 6、Access-Control-Request-Headers
```text
$ Access-Control-Request-Headers
# 请求头  Access-Control-Request-Headers 出现于 preflight request （预检请求）中，用于通知服务器在真正的请求中会采用哪些请求头。

$ Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

### 6、Access-Control-Request-Method

```text
$ Access-Control-Request-Method
# 请求头  Access-Control-Request-Method 出现于 preflight request （预检请求）中，用于通知服务器在真正的请求中会采用哪种  HTTP 方法。因为预检请求所使用的方法总是 OPTIONS ，与实际请求所使用的方法不一样，所以这个请求头是必要的。
```

### 7、origin 

```text
# 请求首部字段 Origin 指示了请求来自于哪个站点。该字段仅指示服务器名称，并不包含任何路径信息。该首部用于 CORS 请求或者 POST 请求。除了不包含路径信息，该字段与 Referer 首部字段相似。

$ Origin: https://developer.mozilla.org
```