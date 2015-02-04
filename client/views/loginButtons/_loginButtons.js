Template.loginButtons.events({
	'click .account-link': function(e){
		e.preventDefault();
		var app = $('body');
		app.toggleClass('with-account');
	}
})