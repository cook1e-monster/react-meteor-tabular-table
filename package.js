Package.describe({
  name: 'react-tabular-table',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:cook1e-monster/react-meteor-tabular-table.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.6.1');
  api.use('ecmascript');
  api.use('react-meteor-data');
  api.use('underscore');
  api.use('tmeasday:publish-counts');
  api.mainModule('client/smartTable.js', 'client');
  api.addFiles(['client/paginator.js', 'client/search.js', 'client/smartTable.js', 'client/tableBody.js'], 'client', { isImport: true });
});

Package.onTest((api) => {
  // api.use('react-meteor-data');
  api.use('ecmascript');
  api.use('tinytest');
  api.use('react-tabular-table');
  api.mainModule('react-tabular-table-tests.js');
});

Npm.depends({
  react: '15.6.2',
  'semantic-ui-css': '2.2.12',
  'semantic-ui-react': '0.75.1',
});
