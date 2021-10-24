/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_xxx';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 测试cors 关闭掉csrf token验证
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['localhost:3000']
  };

  config.cors = {
    // origin: '*',
    // credentials: true, // 不带cookies
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  
  return {
    ...config,
    ...userConfig,
  };
};
