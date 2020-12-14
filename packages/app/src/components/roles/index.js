// @flow strict

import * as React from 'react';
import { Route, Switch, type ContextRouter } from 'react-router-dom';

import List from './list';
import Create from './create';
import Read from './read';
import Update from './update';

const Router = ({ match }: ContextRouter) => (
	<Switch>
		<Route path={`${match.path}/new`} component={Create} />
		<Route path={`${match.path}/:id/edit`} component={Update} />
		<Route path={`${match.path}/:id`} component={Read} />
		<Route exact path={match.path} component={List} />
	</Switch>
);

export default Router;
