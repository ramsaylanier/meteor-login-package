if (Meteor.isServer){
	//configure login with twitter if API keys found in settings.json file
	if (Meteor.settings.twitter){
		ServiceConfiguration.configurations.upsert(
		  { service: "twitter" },
		  {
		    $set: {
		      consumerKey: Meteor.settings.twitter.public,
		      loginStyle: "popup",
		      secret: Meteor.settings.twitter.private
		    }
		  }
		);

		Accounts.onCreateUser(function(options, user){
			if (user.services.twitter.screenName)
				user.username = user.services.twitter.screenName;

			return user;
		})
	} else {
		console.log('Twitter API keys not found in settings.json');
	}
}