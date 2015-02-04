Template.loginForm.rendered = function(){
	Session.set('loginPage', null);
}


Template.loginForm.helpers({
	'twitterLoginEnabled': function(){
		if (CustomLogin.settings.enableTwitterLogin)
			return true
	},
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

//EVENTS
Template.loginForm.events({
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
				Errors.throw(error.reason, 'error');
		})
	}
})