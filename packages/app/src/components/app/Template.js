// @flow strict

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, Redirect, type Location } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
// $FlowIgnore Flow doesn’t resolve this correctly because monorepo
import 'typeface-roboto'; // eslint-disable-line import/no-unassigned-import
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

// components
import AppbarDrawerLayout from 'components/layout';
// Auth
import LoginContainer from 'components/auth/login';
import ForgotPassword from 'components/auth/forgot';
import UpdatePassword from 'components/auth/update';
// General
import Notifications from 'components/notifications';
import Users from 'components/users';
import Roles from 'components/roles';
import Foos from 'components/foos';
import Bars from 'components/bars';

const styles = {
	contentWrapper: {
		position: 'relative',
		flex: 1,
	},
	container: {
		overflowX: 'hidden',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
};

const ContentWrapper = withStyles(styles)(
	// eslint-disable-next-line react/display-name
	React.forwardRef(
		({ classes, ...rest }: { +classes: { +[string]: string } }, ref) => (
			<main ref={ref} className={classes.contentWrapper} {...rest} />
		),
	),
);

type Props = {|
	+classes: { +[string]: string },
	+isLoggedIn: boolean,
	+location: Location,
|};

const App = ({ location, isLoggedIn, classes }: Props) => (
	<div className={classes.container}>
		<Notifications />
		<Helmet>
			<title>Sample App</title>
		</Helmet>
		<AppbarDrawerLayout>
			<TransitionGroup component={null}>
				<Slide direction="right" timeout={300} exit={false}>
					<ContentWrapper>
						{isLoggedIn ? (
							<Switch location={location}>
								<Route
									exact
									path="/"
									render={() => <div>Base route (logged in)</div>}
								/>
								<Redirect from="/login/:nextRoute*" to="/:nextRoute*" />
								<Route path="/users" component={Users} />
								<Route path="/roles" component={Roles} />
								<Route path="/foos" component={Foos} />
								<Route path="/bars" component={Bars} />
								<Route render={() => <div>Not found</div>} />
							</Switch>
						) : (
							<Switch location={location}>
								<Route
									exact
									path="/"
									render={() => <div>Base route (logged out)</div>}
								/>
								<Route path="/login/:nextRoute*" component={LoginContainer} />
								<Route path="/forgot-password" component={ForgotPassword} />
								<Route
									path="/update-password/:token"
									component={UpdatePassword}
								/>
								<Redirect from="/:route*" to="/login/:route*" />
								<Route render={() => <div>Not found</div>} />
							</Switch>
						)}
					</ContentWrapper>
				</Slide>
			</TransitionGroup>
		</AppbarDrawerLayout>
	</div>
);

export default withStyles(styles)(App);
