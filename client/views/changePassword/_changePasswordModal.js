Template.changePasswordModal.events({
	'submit .change-password-form': function(e, template){
		e.preventDefault();

		var oldPassword = $(e.target).find('[name="old-password"]').val();
		var password = $(e.target).find('[name="password"]').val();
		var passwordConfirm = $(e.target).find('[name="password-confirm"]').val();

		if (!oldPassword)
			Errors.throw("Please enter your existing password.", 'error');

		else if (!password)
			Errors.throw("Please enter a new password.", 'error');

		else if (password.length < 6)
			Errors.throw("Passwords is less that 6 character.", 'error');

		else if (password != passwordConfirm){
			Errors.throw("Passwords do not match.", 'error');
		}

		else (
			Accounts.changePassword(oldPassword, password, function(error){
				if (error)
					Errors.throw(error.reason, 'error');
				else {
					Errors.throw('Password updated.', 'error');
					$('body').toggleClass('with-account');
					$('.modal').remove();
				}
			})
		)
	}
})