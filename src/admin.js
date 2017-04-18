window.$ = require('jquery')
var coala = require('coala')
var admin = require('./pages/admin.html')

coala.mount(admin, '#app')
