// @flow strict

import * as React from 'react';
import classNames from 'classnames';
// Material UI
import { withStyles, type Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import DangerIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';

import type { Notification as NotificationType } from 'reducers/notification';

type Props = {|
	...NotificationType,
	+classes: { +[string]: string },
	+remove: () => mixed,
|};

const Notification = React.forwardRef(
	({ type, message, remove, classes }: Props, ref) => {
		React.useEffect(() => {
			setTimeout(remove, 2500);
		}, []);

		const { icon, title, notificationClass } =
			type === 'success'
				? {
						title: 'Success',
						notificationClass: classes.successMessage,
						icon: <SuccessIcon color="disabled" />,
				  }
				: type === 'info'
				? {
						title: 'Info',
						notificationClass: classes.infoMessage,
						icon: <InfoIcon color="disabled" />,
				  }
				: type === 'warning'
				? {
						title: 'Warning',
						notificationClass: classes.warningMessage,
						icon: <WarningIcon color="disabled" />,
				  }
				: type === 'error'
				? {
						title: 'Error',
						notificationClass: classes.errorMessage,
						icon: <DangerIcon color="disabled" />,
				  }
				: (type: empty);

		return (
			<Paper
				elevation={4}
				className={classNames(classes.paper, notificationClass)}
				ref={ref}
			>
				<Grid
					container
					className={classes.noteContainer}
					justify="space-around"
					direction="column"
				>
					<Grid container justify="space-between" direction="row">
						<Grid item xs={9}>
							<Grid container direction="row">
								{icon}
								<Typography
									gutterBottom
									variant="body1"
									color="textSecondary"
								>
									{title}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={3}>
							<IconButton onClick={remove} className={classes.iconButton}>
								<CloseIcon />
							</IconButton>
						</Grid>
					</Grid>
					<Grid container direction="row" alignItems="center">
						<Typography gutterBottom variant="subtitle1">
							{message}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		);
	},
);

const styles = (theme: Theme) => ({
	paper: {
		marginBottom: theme.spacing(1),
		width: theme.spacing(35),
	},
	noteContainer: {
		padding: theme.spacing(1),
	},
	iconButton: {
		height: theme.spacing(3),
		width: 30,
		marginLeft: theme.spacing(4),
	},
	infoMessage: {
		backgroundColor: theme.palette.secondary.main,
	},
	successMessage: {
		backgroundColor: theme.palette.primary.main,
	},
	warningMessage: {
		backgroundColor: theme.palette.error.light,
	},
	errorMessage: {
		backgroundColor: theme.palette.error.main,
	},
});

export default withStyles(styles)(Notification);
