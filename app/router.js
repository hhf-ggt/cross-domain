'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/jsonp', controller.jsonp.index)
  router.get('/cors', controller.cors.index)
};
