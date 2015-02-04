//setup login route
Router.map(function(){
	this.route('loginForm', {
		path: '/login',
		action: function(){
			if (Meteor.userId())
				Router.go(CustomLogin.settings.afterLoginRoute);
			else
				this.render();
		}
	})
})