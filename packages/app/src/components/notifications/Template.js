// @flow strict

import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';

import NotificationContainer from './notification';

import transitions from 'ui-utils/transitions';
import type { Notification } from 'reducers/notification';

type Props = {|
	+ids: $ReadOnlyArray<string>,
	+notifications: { +[id: string]: Notification },
	+classes: { +[string]: string },
|};

const Notifications = ({ ids, notifications, classes }: Props) => (
	<Grid container>
		<Grid item xs={12} md={3}>
			<div className={classes.container}>
				<TransitionGroup component={null}>
					{ids.map(id => (
						<Slide key={id} timeout={transitions} direction="left">
							<NotificationContainer {...notifications[id]} />
						</Slide>
					))}
				</TransitionGroup>
			</div>
		</Grid>
	</Grid>
);

const styles = {
	container: {
		position: 'absolute',
		top: 15,
		right: 15,
		zIndex: 1200,
	},
};

export default withStyles(styles)(Notifications);
