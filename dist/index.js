
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./electron-typed-ipc.cjs.production.min.js')
} else {
  module.exports = require('./electron-typed-ipc.cjs.development.js')
}
