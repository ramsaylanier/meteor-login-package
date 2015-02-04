//on password reset link click from email, render Reset Password Modal
Accounts.onResetPasswordLink(function(token, done){
	Blaze.renderWithData(Template.resetPasswordModal, token, $('body').get(0));
	done();
});

Template.resetPasswordModal.events({
	'submit .reset-password-form': function(e, template){
		e.preventDefault();

		var password = $(e.target).find('[name="password"]').val();
		var passwordConfirm = $(e.target).find('[name="password-confirm"]').val();
		var token = template.data;

		if (!password)
			Errors.throw("Please enter a password.", 'error');

		else if (password.length < 6)
			Errors.throw("Passwords is less that 6 character.", 'error');

		else if (password != passwordConfirm){
			Errors.throw("Passwords do not match.", 'error');
		}

		else (
			Accounts.resetPassword(token, password, function(error){
				if (error)
					Errors.throw(error.reason, 'error');
				else {
					Errors.throw('Password Reset.', 'error');
					$('.modal').remove();
					Session.set('loginPage', null);
				}
			})
		)
	}
})