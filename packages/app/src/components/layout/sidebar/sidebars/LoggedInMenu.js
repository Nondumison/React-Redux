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
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import AdbIcon from '@material-ui/icons/Adb';

type Props = {|
	+location: Location,
	+classes: { +[string]: string },
	+handleDrawerToggle?: () => mixed,
|};

const LoggedInMenu = ({
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
			<Link to="/users" className={classes.link} onClick={handleDrawerToggle}>
				<ListItem button selected={pathname === '/users'}>
					<ListItemIcon>
						<PersonIcon />
					</ListItemIcon>
					<ListItemText primary="Users" />
				</ListItem>
			</Link>
			<Link to="/roles" className={classes.link} onClick={handleDrawerToggle}>
				<ListItem button selected={pathname === '/roles'}>
					<ListItemIcon>
						<GroupIcon />
					</ListItemIcon>
					<ListItemText primary="Roles" />
				</ListItem>
			</Link>
			<Link to="/foos" className={classes.link} onClick={handleDrawerToggle}>
				<ListItem button selected={/\/foos/u.test(pathname)}>
					<ListItemIcon>
						<AdbIcon />
					</ListItemIcon>
					<ListItemText primary="Foos" />
				</ListItem>
			</Link>
			<Link to="/bars" className={classes.link} onClick={handleDrawerToggle}>
				<ListItem button selected={/\/bars/u.test(pathname)}>
					<ListItemIcon>
						<AdbIcon />
					</ListItemIcon>
					<ListItemText primary="Bars" />
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

export default withRouter(withStyles(styles)(LoggedInMenu));
