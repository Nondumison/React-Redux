// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
// the UI
import { withStyles, type Theme } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core';
import type { ContextRouter } from 'react-router-dom';

import Content from 'components/layout/Content';
import Button from 'ui-utils/Button';
import type { Entity } from 'reducers/entity';

type Props = {|
	...ContextRouter,
	+classes: { +[string]: string },
	+roles: $ReadOnlyArray<Entity<'role'>>,
	+fetchAll: () => void,
|};

const List = ({ classes, roles, match, fetchAll }: Props) => {
	React.useEffect(fetchAll, []);

	return (
		<Content justify="center">
			<Grid item xs={12} md={6}>
				<Paper className={classes.paper} elevation={6}>
					<Typography variant="h4" gutterBottom align="center">
						List
					</Typography>

					{roles.length > 0 && (
						<>
							<Grid
								className={classes.spacing}
								container
								justify="center"
								direction="column"
							>
								{roles.map(role => (
									<Link
										key={role.id}
										to={`${match.url}/${role.id}`}
										style={{ textDecoration: 'none' }}
									>
										<Typography variant="h5" className={classes.link}>
											{role.name}
										</Typography>
									</Link>
								))}
							</Grid>
							<Grid container justify="center">
								<Typography gutterBottom variant="h6">
									OR
								</Typography>
							</Grid>
						</>
					)}

					<Link to={`${match.url}/new`} style={{ textDecoration: 'none' }}>
						<Button
							variant="contained"
							color="primary"
							isLoading={false}
							text="New"
							fullWidth
							className={classes.spacing}
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
	link: {
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	spacing: {
		marginTop: theme.spacing(1),
	},
});

export default withStyles(styles)(List);
