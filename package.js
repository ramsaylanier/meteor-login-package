Package.describe({
  name: 'ramsay:login',
  version: '1.0.7',
  // Brief, one-line summary of the package.
  summary: 'Custom login package with login route and twitter login',
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
    'templating',
    'ramsay:errors@1.0.0',
    'iron:router@1.0.7'
  ], 'client');

  api.imply(['accounts-base', 'accounts-password'], 'client');

  api.use([
    'accounts-base', 
    'accounts-password',
    'service-configuration'
  ], 'server');


  api.imply(['accounts-twitter','service-configuration'], 'server');

  api.addFiles([
    'client/views/loginForm/loginForm.html', 
    'client/views/loginForm/loginForm.js', 
    'client/views/account/_account.html',
    'client/views/account/_account.js',
    'client/views/changePassword/_changePasswordModal.html',
    'client/views/changePassword/_changePasswordModal.js',
    'client/views/resetPassword/_resetPasswordModal.html',
    'client/views/resetPassword/_resetPasswordModal.js',
    'client/views/_formField.html',
    'client/views/_formField.js',
    'client/views/loginButtons/_loginButtons.html',
    'client/views/loginButtons/_loginButtons.js',
    'client/views/_twitterIcon.html',
    'client/router.js',
    'client/loginConfig.js',
    'client/css/login-main.css'
  ], 'client');

  api.export('CustomLogin', ['client', 'server']);
  
  api.addFiles([
    'server/configureService.js'
  ], 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ramsay:login');
  api.addFiles('ramsay:login-tests.js');
});
