#Meteor Login Package
 
This is a custom login package for Meteor.js using the core accounts-password and accounts-twitter packages.
This package differs from the accounts-ui package, as it has a built in route that goes to a /login.html page, and a better UI.
 
Personally, I'm not a fan of using bootstrap, and the accounts-ui package that offeres a dropdown style account login/register functionality didnt suit my needs.
 
 
###Usage:
The usage is the same as the accounts-ui package. Simply include a {{> loginButtons}} template block, probably somewhere inside of a <header> tag.