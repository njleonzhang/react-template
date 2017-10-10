var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var ip = require('ip')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // __PORT_PLACEHOLDER__ is dynamically generated and filled in dev-server.js
  httpBaseUrl: `"http://${ip.address()}:__PORT_PLACEHOLDER__/api/"`
})
