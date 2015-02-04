if (Meteor.isClient){

	//on password reset link click from email, render Reset Password Modal
	Accounts.onResetPasswordLink(function(token, done){
		Blaze.renderWithData(Template.resetPasswordModal, token, $('body').get(0));
		done();
	});

	//setup login route
	Router.map(function(){
		this.route('login')
	})

//LOGIN TEMPLATE

	Template.login.rendered = function(){
		Session.set('loginPage', null);
	}

	//EVENTS
	Template.login.events({
		'submit .login-form': function(e){
			e.preventDefault();

			var userName = $(e.target).find('[name="username"]').val();
			var password = $(e.target).find('[name="password"]').val();

			if (!userName){
				Errors.throw('Please enter a username', 'error');
				return false;
			}

			if (!password){
				Errors.throw('Please enter a password', 'error');
				return false;
			}

			console.log(Meteor.loginWithPassword);

			Meteor.loginWithPassword(userName, password, function(error){
				if (error){
					console.log(error);
					Errors.throw(error.reason, 'error')
				}
				else{
					Session.set('loginPage', null);
					Router.go('/');
				}
			});
		},
		'submit .register-form': function(e){
			e.preventDefault();

			var user = {
				username: $(e.target).find('[name="username"]').val(),
				email: $(e.target).find('[name="email"]').val(),
				password: $(e.target).find('[name="password"]').val(),
			}

			var passwordConfirm = $(e.target).find('[name="password-confirm"]').val();

			if (!user.username)
				Errors.throw("Please enter a username.", 'error');

			else if (!user.email)
				Errors.throw("Please enter an email address.", 'error');

			else if (!user.password)
				Errors.throw("Please enter a password.", 'error');

			else if (user.password.length < 6)
				Errors.throw("Passwords is less that 6 character.", 'error');

			else if (user.password != passwordConfirm){
				Errors.throw("Passwords do not match.", 'error');
			}

			else (
				Accounts.createUser({email: user.email, password: user.password, username: user.username }, function(error){
					if (error){
						Errors.throw(error.reason, 'error');
					}
					else {
						Session.set('loginPage', null);
						Router.go('/');
					}
				})
			)
		},
		'click .register-link': function(e){
			Session.set('loginPage', 'register');

			Meteor.setTimeout(function(){
				$('.form-control').removeClass('off-page');
			})
		},
		'click .forgot-password-link': function(e){
			Session.set('loginPage', 'forgotPassword');

			Meteor.setTimeout(function(){
				$('.form-control').removeClass('off-page');
			})
		},
		'submit .forgot-password-form': function(e){
			e.preventDefault();
			var email = $(e.target).find('[name=email]').val();

			if (!email){
				Errors.throw('Please enter your registered email address.', 'error');
			}

			Accounts.forgotPassword({email: email}, function(error){
				if (error){
					Errors.throw(error.reason, 'error');
				} else {
					Session.set('loginPage', null);
					Errors.throw('Password sent to your registered email address.', 'error');
				}
			})
		},
		'click .twitter-login-link': function(e){
			e.preventDefault;

			Meteor.loginWithTwitter(function(error){
				if (error)
					console.log(error);
			})
		}
	})

	//HELPERS

	Template.login.helpers({
		'registerPage': function(){
			var loginPage = Session.get('loginPage');

			if (loginPage == 'register'){
				$('.form-control').removeClass('off-page');
				return true
			}
		},
		'forgotPassword': function(){
			var loginPage = Session.get('loginPage');

			if (loginPage == 'forgotPassword'){
				$('.form-control').removeClass('off-page');
				return true
			}
		}
	})
//END LOGIN TEMPLATE


//FORM FIELD TEMPLATE
	Template.formField.rendered = function(){
		$(this.firstNode).removeClass('off-page');
	}

	Template.formField.helpers({
		isTextArea: function(){
			if (this.type == 'textarea')
				return true
		}
	})
//END FORM FIELD TEMPLATE

//RESET PASSWORD TEMPLATE
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
//END RESET PASSWORD TEMPLATE

//CHANGE PASSWORD TEMPLATE
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
//END CHANGE PASSWORD TEMPLATE

//ACCOUNT TEMPLATE
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
//END ACCOUNT TEMPLATE
}

//LOGINBUTTONS TEMPLATE
	Template.loginButtons.events({
		'click .account-link': function(e){
			e.preventDefault();
			var app = $('body');
			app.toggleClass('with-account');
		}
	})
//END LOGINBUTTONS