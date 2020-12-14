// @flow strict

import * as React from 'react';
// Material UI
import { withStyles, withTheme, type Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
// Icons
import MenuIcon from '@material-ui/icons/Menu';

// Components
import Logo from '../branding/Logo';

import Sidebar from './sidebar';

type Props = {|
	+classes: { +[string]: string },
	+theme: Theme,
	+children: React.Node,
|};
type State = {|
	mobileOpen: boolean,
|};

class Layout extends React.PureComponent<Props, State> {
	state = {
		mobileOpen: false,
	};

	handleDrawerToggle = () => {
		this.setState(({ mobileOpen }) => ({ mobileOpen: !mobileOpen }));
	};

	render() {
		const { classes, theme, children } = this.props;
		const { mobileOpen } = this.state;

		return (
			<div>
				<Hidden mdUp>
					<AppBar color="inherit" position="static">
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="Menu"
								title="Menu"
								onClick={this.handleDrawerToggle}
							>
								<MenuIcon color="action" />
							</IconButton>
							<Grid container /* justify="center" */>
								<Logo width="50%" className={classes.logo} />
							</Grid>
						</Toolbar>
					</AppBar>
				</Hidden>
				<Hidden mdUp>
					<div className={classes.mobileAppFrame}>
						<Drawer
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							classes={{
								docked: classes.drawerDocked,
								paper: classes.drawerPaper,
								paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
							}}
							onBackdropClick={this.handleDrawerToggle}
						>
							<Sidebar handleDrawerToggle={this.handleDrawerToggle} />
						</Drawer>
						{children}
					</div>
				</Hidden>
				<Hidden smDown implementation="css">
					<div className={classes.appFrame}>
						<Drawer
							variant="permanent"
							open={mobileOpen}
							classes={{
								docked: classes.drawerDocked,
								paper: classes.drawerPaper,
								paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
							}}
						>
							<Sidebar handleDrawerToggle={this.handleDrawerToggle} />
						</Drawer>
						{children}
					</div>
				</Hidden>
			</div>
		);
	}
}

const styles = (theme: Theme) => ({
	appFrame: {
		display: 'flex',
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
	},
	mobileAppFrame: {
		display: 'flex',
		width: '100vw',
		height: 'calc(100vh - 55px)',
		overflow: 'hidden',
	},
	// for drawer children
	drawerDocked: {
		[theme.breakpoints.up('md')]: {
			position: 'relative',
			height: '100%',
		},
	},
	paperAnchorDockedLeft: {
		borderRight: '0px',
	},
	drawerPaper: {
		height: '100%',
		position: 'relative',
		whiteSpace: 'nowrap',
		width: 250,
		boxShadow: '3px 3px 6px 2px #ccc',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	logo: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		marginLeft: theme.spacing(2),
		maxWidth: 200,
		minWidth: 150,
	},
});

export default withStyles(styles)(withTheme(Layout));
