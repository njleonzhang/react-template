var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var ip = require('ip')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  httpBaseUrl: `"/api/"`
})
