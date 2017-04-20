window.$ = require('jquery')
require('nprogress/nprogress.css')
var nprogress = require('nprogress')
var coala = require('coala')
require('./assets/css/app.css')

nprogress.configure({ showSpinner: false })

function asyncMount(component) {
  coala.cp = component
  coala.cp.on('mount', function() {
    nprogress.done()
  })
  coala.cp.mount('#app')
}

function mount(name, id) {
  nprogress.start()
  if (coala.cp) coala.cp.unmount()
  switch (name) {
    case 'list':
      require.ensure([], function (require) {
        var component = coala.component(require('./pages/list.html'))
        asyncMount(component)
      })
      break
    case 'detail':
      require.ensure([], function (require) {
        var detail = require('./pages/detail.html')
        detail.id = id
        asyncMount(coala.component(detail))
      })
      break
  }
}

coala.cr = coala.router({
  routes: {
    '/': function () {
      mount('list')
    },

    '/:id': function (id) {
      mount('detail', id)
    }
  }
})
