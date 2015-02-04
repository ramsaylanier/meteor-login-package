Template.account.events({
	'click .logout-link': function(e){
		e.preventDefault();
		Meteor.logout(function(){
			$('body').removeClass('with-account');
			Router.go('/');
		});
	},
	'click .change-password-link': function(e){
		e.preventDefault();
		Blaze.render(Template.changePasswordModal, $('body').get(0));
	}
})