CustomLogin = {
	settings: {
		afterLoginRoute: '/dashboard',
		enableTwitterLogin: true
	},

	config: function(config){
		this.settings = _.extend(this.settings, config);
	}
};