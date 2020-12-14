// @flow strict

import * as React from 'react';
import { Link, withRouter, type Location } from 'react-router-dom';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// Icons
import HomeIcon from '@material-ui/icons/Home';

type Props = {|
	+location: Location,
	+classes: { +[string]: string },
	+handleDrawerToggle?: () => mixed,
|};

const LoggedOutMenu = ({
	classes,
	location: { pathname },
	handleDrawerToggle,
}: Props) => (
	<div>
		<List>
			<Link to="/" className={classes.link} onClick={handleDrawerToggle}>
				<ListItem button selected={pathname === '/'}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
			</Link>
		</List>
	</div>
);

const styles = {
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
};

export default withRouter(withStyles(styles)(LoggedOutMenu));
