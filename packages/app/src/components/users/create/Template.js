// @flow strict

import React from 'react';
import { NavLink } from 'react-router-dom';
// the UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles, type Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import type { ContextRouter } from 'react-router-dom';
// $FlowFixMe https://github.com/final-form/react-final-form/issues/563
import { Form, Field } from 'react-final-form';

import Button from 'ui-utils/Button';
import Content from 'components/layout/Content';
import type { NewEntity } from 'reducers/entity';

type Props = {|
	...ContextRouter,
	+classes: { +[string]: string },
	+errors: $ReadOnlyArray<Error>,
	+clearErrors: () => void,
	+create: (NewEntity<'user'>) => mixed,
|};

const Create = ({ classes, match, create, clearErrors, errors }: Props) => {
	React.useEffect(clearErrors, []);

	return (
		<Content justify="center">
			<Grid item xs={12} md={6}>
				<Paper className={classes.paper} elevation={2}>
					<Form onSubmit={create}>
						{({ submitting, handleSubmit, pristine, invalid }) => {
							return (
								<form onSubmit={handleSubmit}>
									<Typography variant="h4" gutterBottom align="center">
										New
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
										text="Save"
										disabled={Boolean(pristine) || invalid}
										isLoading={Boolean(submitting)}
										fullWidth
										className={classes.spacing}
									/>

									<NavLink
										to={match.url.replace(/\/new$/u, '')}
										style={{ textDecoration: 'none' }}
									>
										<Button
											fullWidth
											type="button"
											variant="contained"
											isLoading={Boolean(submitting)}
											text="Cancel"
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
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(3),
	}),
	Button: {
		marginTop: theme.spacing(10),
	},
	spacing: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
});
export default withStyles(styles)(Create);
