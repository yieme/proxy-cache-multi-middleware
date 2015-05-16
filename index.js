/** Proxy Cache Multi-Middleware for Express
 *
 *  @copyright  Copyright (C) 2015 by Yieme
 *  @module     proxy-cache-multi-middleware
 */

  'use strict';
  var _                   = require('lodash')
  var proxyCacheMultiDomain = require('proxy-cache-multi-domain')
  var options             = {
    dir: "./tmp",
    cacheControl:  24 * 60 * 60 * 1000, // 1 day default
}


function proxyCacheMultiMiddleware(req, res, next) {
  if (!res) {
    options = _.extend(options, req)
    proxyCacheMultiDomain(options)
    return proxyCacheMultiMiddleware
  }


  proxyCacheMultiDomain(req, function(err, data) {
    if (err) {
      next(err)
    } else {
      var headers = data.headers
      res.set('content-type', headers.type)
      if (headers.code) {
        res.status(headers.code).send(data.body)
        return
      }
      if (options.cacheControl) res.set('cache-control', 'public, max-age=' + options.cacheControl)
      res.send(data.body)
    }
  })
}



module.exports = proxyCacheMultiMiddleware
