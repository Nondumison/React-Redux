// @flow strict

import * as React from 'react';
// Material UI
import { withStyles, type Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// $FlowFixMe https://github.com/final-form/react-final-form/issues/563
import { Form, Field } from 'react-final-form';
import { NavLink, type ContextRouter } from 'react-router-dom';

// Components
import Button from 'ui-utils/Button';
import Content from 'components/layout/Content';
import type { Entity } from 'reducers/entity';

type Props = {|
	...ContextRouter,
	+classes: { +[string]: string },
	+fetch: () => void,
	+update: ($Shape<Entity<'user'>>) => Promise<void>,
	+clearErrors: () => void,
	+user: Entity<'user'> | void,
	+errors: $ReadOnlyArray<Error>,
|};

const Update = ({
	classes,
	match,
	fetch,
	update,
	clearErrors,
	user,
	errors,
}: Props) => {
	React.useEffect(() => {
		clearErrors();
		fetch();
	}, []);

	return user == null ? null : (
		<Content justify="center">
			<Grid item xs={12} md={6}>
				<Paper className={classes.paper} elevation={16}>
					<Form
						onSubmit={formValues =>
							update(
								Object.fromEntries(
									Object.entries(formValues).filter(
										([attr]) => !['id', 'bars'].includes(attr),
									),
								),
							)
						}
						initialValues={user}
					>
						{({ submitting, handleSubmit, pristine, invalid }) => {
							return (
								<form onSubmit={handleSubmit}>
									<Typography variant="h4" gutterBottom align="center">
										Update Entity
									</Typography>

									<Field name="firstName">
										{({ input }) => (
											<TextField
												{...input}
												required
												id="firstName"
												label="firstName"
												margin="dense"
												fullWidth
											/>
										)}
									</Field>

									<Field name="lastName">
										{({ input }) => (
											<TextField
												{...input}
												required
												id="lastName"
												label="lastName"
												margin="dense"
												fullWidth
											/>
										)}
									</Field>

									<Field name="email">
										{({ input }) => (
											<TextField
												{...input}
												required
												id="email"
												label="email"
												type="email"
												margin="normal"
												fullWidth
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
										variant="contained"
										color="primary"
										text="Update"
										disabled={Boolean(pristine) || invalid}
										isLoading={Boolean(submitting)}
										fullWidth
										className={classes.spacing}
									/>
									<NavLink
										to={`${match.url.replace(/\/edit$/u, '')}`}
										style={{ textDecoration: 'none' }}
									>
										<Button
											fullWidth
											type="button"
											variant="contained"
											isLoading={Boolean(submitting)}
											text="Back"
											className={classes.spacing}
										/>
									</NavLink>
								</form>
							);
						}}
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
		marginTop: theme.spacing(1),
	}),
	spacing: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	progress: {
		margin: theme.spacing(2),
	},
});

export default withStyles(styles)(Update);
