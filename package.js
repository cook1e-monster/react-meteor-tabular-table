Package.describe({
  name: 'react-tabular-table',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.0');
  api.use('ecmascript');
  api.mainModule('client/smartTable.js', 'client');
});

api.addFiles(['client/paginator.js', 'client/search.js', 'client/smartTable.js', 'client/tableBody.js'], 'client', { isImport: true });

Package.onTest(function(api) {
  api.use('react-meteor-data');
  api.use('ecmascript');
  api.use('tinytest');
  api.use('react-tabular-table');
  api.mainModule('react-tabular-table-tests.js');
});

Npm.depends({
  react: '^15.6.2',
  'react-addons-create-fragment': '^15.6.0',
  'react-addons-css-transition-group': '^15.6.0',
  'react-addons-linked-state-mixin': '^15.6.0',
  'react-addons-perf': '^15.4.2',
  'react-addons-pure-render-mixin': '^15.6.2',
  'react-addons-test-utils': '^15.6.0',
  'react-addons-transition-group': '^15.6.0',
  'react-addons-update': '^15.6.0',
  'react-chartjs': '^0.8.0',
  'react-dom': '^15.6.2',
  'react-meteor-data': '^0.2.10',
  'react-mounter': '^1.2.0',
  'react-router': '^4.2.0',
  'react-router-dom': '^4.2.2',
  'react-s-alert': '^1.3.1',
  'semantic-ui-css': '^2.2.12',
  'semantic-ui-react': '^0.75.1'
});
