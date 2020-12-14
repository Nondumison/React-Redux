// @flow strict

import * as React from 'react';
// Material UI
import { withStyles, type Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
// Icons
import MenuIcon from '@material-ui/icons/Menu';

// Components

import LoggedInMenu from './sidebars/LoggedInMenu';
import LoggedOutMenu from './sidebars/LoggedOutMenu';
import Profile from './profile';

import Logo from 'components/branding/Logo';

type Props = {|
	+classes: { +[string]: string },
	+isLoggedIn: boolean,
	+handleDrawerToggle: () => mixed,
|};

const Sidebar = ({ isLoggedIn, classes, handleDrawerToggle }: Props) => (
	<>
		<Grid
			container
			alignItems="center"
			justify="space-between"
			className={classes.toolbarIcon}
		>
			<Logo width="50%" />
			<Hidden mdUp>
				{handleDrawerToggle ? (
					<IconButton onClick={handleDrawerToggle}>
						<MenuIcon className={classes.logo} />
					</IconButton>
				) : null}
			</Hidden>
		</Grid>
		<List>
			<Profile handleDrawerToggle={handleDrawerToggle} />
		</List>
		<Divider light />
		{isLoggedIn ? <LoggedInMenu /> : <LoggedOutMenu />}
	</>
);

const styles = (theme: Theme) => ({
	toolbarIcon: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		...theme.mixins.toolbar,
	},
	logo: {
		objectPosition: 'left',
		margin: theme.spacing(1),
		maxHeight: theme.spacing(6),
	},
});

export default withStyles(styles)(Sidebar);
