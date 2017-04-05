window.$ = require('jquery')
var coala = require('coala')

function asyncMount(component) {
	coala.cp = component
	coala.cp.on('mount', function() {
	})
	coala.cp.mount('#app')
}

var mount = function (name, id) {
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
				var component = coala.component(detail)
				asyncMount(component)
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

