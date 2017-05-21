/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ConfigPage from './containers/ConfigPage';
import BackupPage from './containers/BackupPage';

export default () => (
  <App>
    <Switch>
      <Route path="/backup" component={BackupPage} />
      <Route path="/editform" component={ConfigPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
