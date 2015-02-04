#Meteor Login Package
 
This is a custom login package for Meteor.js using the core accounts-password and accounts-twitter packages.
This package differs from the accounts-ui package, as it has a built in route that goes to a /login.html page, and a better UI.
 
Personally, I'm not a fan of using bootstrap, and the accounts-ui package that offeres a dropdown style account login/register functionality didn't suit my needs.




 
 
###Usage:
The usage is the same as the accounts-ui package. Simply include a {{> loginButtons}} template block somewhere. Since this package uses Iron:Router, you will probably have some sort of layout template. So include it there, or inside of a {{> header}} partial.

The only additional step is include an {{> errors}} template block helper somewhere in your layout template as well. This will allow the user to see any login/registration errors in your application. The errors are styled to be fixed position at the top. Style accordingly. 

####With Twitter:
This package includes login with twitter using the twitter oauth flow package, so you don't need any API keys. However, should you have your own twitter app you'd like to use, simply include the public and private keys in a settings.json file inside the root directory of your app, like so:

```
{
  "twitter": {
		"public": "<insert public key here>",
		"private":"<insert private key here>"
	}
}
```

