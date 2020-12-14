// @flow strict

import * as React from 'react';
import { NavLink } from 'react-router-dom';
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

type Props = {|
	+classes: { +[string]: string },
	+recoverPassword: string => mixed,
	+errors: $ReadOnlyArray<Error>,
	+clearLoginErrors: () => void,
|};

const ForgotPassword = ({
	classes,
	errors,
	clearLoginErrors,
	recoverPassword,
}: Props) => {
	React.useEffect(() => clearLoginErrors, []);

	return (
		<Content container>
			<Grid item xs={12} md={6}>
				<Hidden smDown>
					<Grid container justify="center" className={classes.spacing}>
						<Logo width="50%" />
					</Grid>
				</Hidden>
				<Paper className={classes.paper} elevation={2}>
					<Form onSubmit={({ email }) => recoverPassword(email)}>
						{({ handleSubmit, submitting }) => (
							<form onSubmit={handleSubmit}>
								<Grid item align="center">
									<Typography variant="h4" gutterBottom>
										Forgot your Password?
									</Typography>
								</Grid>
								<Field name="email">
									{({ input }) => (
										<TextField
											{...input}
											label="Email"
											type="email"
											disabled={submitting}
											fullWidth
											margin="normal"
											required
										/>
									)}
								</Field>
								{errors.map(({ message }) => (
									<Typography
										variant="body2"
										gutterBottom
										color="error"
										key={message}
										className={classes.spacing}
									>
										{message}
									</Typography>
								))}
								<Button
									type="submit"
									variant="contained"
									color="primary"
									isLoading={Boolean(submitting)}
									fullWidth
									text="Send me instructions"
									className={classes.spacing}
								/>
								<NavLink to="/login" style={{ textDecoration: 'none' }}>
									<Typography
										className={classes.spacing}
										variant="body1"
										color="textSecondary"
									>
										Already have an account?
									</Typography>
								</NavLink>
							</form>
						)}
					</Form>
				</Paper>
			</Grid>
		</Content>
	);
};

const styles = (theme: Theme) => ({
	paper: theme.mixins.gutters({
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		marginTop: theme.spacing(3),
	}),
	spacing: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
});

export default withStyles(styles)(ForgotPassword);
