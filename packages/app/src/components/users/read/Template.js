// @flow strict

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles, type Theme } from '@material-ui/core/styles';
import type { ContextRouter } from 'react-router-dom';

import Button from 'ui-utils/Button';
import Content from 'components/layout/Content';
import type { Entity } from 'reducers/entity';

type Props = {|
	...ContextRouter,
	+classes: { +[string]: string },
	+fetch: () => void,
	+remove: () => void,
	+user: Entity<'user'> | void,
|};

const View = ({ classes, match, fetch, remove, user }: Props) => {
	useEffect(fetch, []);

	return user == null ? null : (
		<Content justify="center">
			<Grid item xs={12} md={6}>
				<Paper className={classes.paper} elevation={2}>
					<Typography variant="h4" gutterBottom align="center">
						User
					</Typography>
					<pre>{JSON.stringify(user, null, 4)}</pre>
					<Link to={`${match.url}/edit`} style={{ textDecoration: 'none' }}>
						<Button
							text="Update"
							variant="contained"
							color="primary"
							className={classes.button}
							fullWidth
							isLoading={false}
						/>
					</Link>
					<Button
						fullWidth
						text="Delete"
						variant="contained"
						color="secondary"
						className={classes.button}
						onClick={remove}
						isLoading={false}
					/>
					<Link
						to={`${match.url.replace(new RegExp(`/${user.id}$`, 'u'), '')}`}
						style={{ textDecoration: 'none' }}
					>
						<Button
							text="Back"
							variant="contained"
							fullWidth
							className={classes.button}
							isLoading={false}
						/>
					</Link>
				</Paper>
			</Grid>
		</Content>
	);
};

const styles = (theme: Theme) => ({
	paper: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing(10),
		justifyContent: 'center',
	}),
	spacing: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	button: {
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
});

export default withStyles(styles)(View);
