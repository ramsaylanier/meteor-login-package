Package.describe({
  name: 'ramsay:login',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Custom login package with /login route and twitter login',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ramsaylanier/meteor-login-package',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use([
    'session', 
    'handlebars', 
    'accounts-base',
    'accounts-password', 
    'accounts-twitter', 
    'underscore', 
    'templating',
    'ramsay:errors',
    'iron:router'
  ], 'client');
  api.imply(['accounts-base', 'accounts-password']);
  api.addFiles([
    'ramsay:login.html', 
    'ramsay:_account.html',
    'ramsay:_changePasswordModal.html',
    'ramsay:_resetPasswordModal.html',
    'ramsay:_formField.html',
    'ramsay:_loginButtons.html',
    'ramsay:_twitterIcon.html',
    'ramsay:login-client.js',
    'ramsay:login.css'
  ], 'client');
  api.addFiles([
    'ramsay:login-server.js'
  ], 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ramsay:login');
  api.addFiles('ramsay:login-tests.js');
});
