// @flow strict

import * as React from 'react';
import { NavLink, type ContextRouter } from 'react-router-dom';
// Material UI
import { withStyles, type Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
// $FlowFixMe https://github.com/final-form/react-final-form/issues/563
import { Form, Field } from 'react-final-form';

import Button from 'ui-utils/Button';
import Content from 'components/layout/Content';
import Logo from 'components/branding/Logo';
import config from 'config';

type Props = {|
	+classes: { +[string]: string },
	+login: (string, string) => mixed,
	+clearLoginErrors: () => void,
	+errors: $ReadOnlyArray<Error>,
	...ContextRouter,
|};

const Login = ({ classes, errors, login, clearLoginErrors }: Props) => {
	React.useEffect(() => clearLoginErrors, []);

	return (
		<Content justify="center">
			<Grid item xs={12} md={6}>
				<Hidden smDown>
					<Grid container className={classes.spacing} justify="center">
						<Logo width="50%" />
					</Grid>
				</Hidden>
				<Paper className={classes.paper} elevation={2}>
					<Form
						onSubmit={({ username, password }) => login(username, password)}
					>
						{({ handleSubmit, submitting }) => (
							<form onSubmit={handleSubmit}>
								<Grid item align="center">
									<Typography variant="h4" gutterBottom>
										Log In
									</Typography>
								</Grid>
								<Field name="username">
									{({ input }) => (
										<TextField
											{...input}
											margin="dense"
											label="Email"
											type="email"
											disabled={submitting}
											fullWidth
											required
										/>
									)}
								</Field>
								<Field name="password">
									{({ input }) => (
										<TextField
											{...input}
											margin="normal"
											label="Password"
											type="password"
											disabled={submitting}
											fullWidth
											required
										/>
									)}
								</Field>
								{errors.map(({ message }) => (
									<Typography
										variant="body2"
										className={classes.spacing}
										color="error"
										key={message}
									>
										{message}
									</Typography>
								))}
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									isLoading={Boolean(submitting)}
									text="Log in"
									className={classes.spacing}
								/>
								<Grid container justify="center">
									<Typography variant="body1">OR</Typography>
								</Grid>
								<NavLink to="/sign-up" style={{ textDecoration: 'none' }}>
									<Button
										fullWidth
										type="button"
										variant="contained"
										color="primary"
										isLoading={Boolean(submitting)}
										text="Sign up"
										className={classes.spacing}
									/>
								</NavLink>
								<NavLink
									to="/forgot-password"
									style={{ textDecoration: 'none' }}
								>
									<Typography
										variant="body1"
										gutterBottom
										color="textSecondary"
									>
										Forgot your password?
									</Typography>
								</NavLink>
							</form>
						)}
					</Form>
				</Paper>
				<Grid container justify="space-evenly" direction="row">
					<NavLink to="/about" style={{ textDecoration: 'none' }}>
						<Typography color="textSecondary" variant="caption">
							About {config.app.name}
						</Typography>
					</NavLink>
					<NavLink to="/help" style={{ textDecoration: 'none' }}>
						<Typography color="textSecondary" variant="caption">
							Help
						</Typography>
					</NavLink>
					<NavLink to="/terms" style={{ textDecoration: 'none' }}>
						<Typography color="textSecondary" variant="caption">
							Terms
						</Typography>
					</NavLink>
				</Grid>
			</Grid>
		</Content>
	);
};

const styles = (theme: Theme) => ({
	paper: theme.mixins.gutters({
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(3),
	}),
	spacing: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
});

export default withStyles(styles)(Login);
