// @flow strict

import * as React from 'react';
import { withRouter, Link, type Location } from 'react-router-dom';
// Material Core
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
// Icons
import ProfileIcon from '@material-ui/icons/AccountCircle';
import ForwardIcon from '@material-ui/icons/ChevronRight';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import LoginIcon from '@material-ui/icons/HowToReg';

type Props = {|
	+classes: { +[string]: string },
	+logout: () => mixed,
	+handleDrawerToggle: () => mixed,
	+isLoggedIn: boolean,
	+location: Location,
|};

type State = {|
	+open: boolean,
|};

class ProfileListItems extends React.PureComponent<Props, State> {
	state = {
		open: false,
	};

	toggleDropDown = () => {
		this.setState(({ open }) => ({ open: !open }));
	};

	render() {
		const {
			classes,
			logout,
			handleDrawerToggle,
			isLoggedIn,
			location: { pathname },
		} = this.props;
		const { open } = this.state;

		return (
			<div>
				<ListItem button onClick={this.toggleDropDown}>
					<ListItemIcon>
						<ForwardIcon
							className={open ? classes.chevronRotate : classes.chevron}
						/>
					</ListItemIcon>
					<ListItemText primary="Account" />
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{isLoggedIn ? (
							<>
								<Link
									to="/profile"
									className={classes.link}
									onClick={handleDrawerToggle}
								>
									<ListItem button>
										<ListItemIcon>
											<ProfileIcon />
										</ListItemIcon>
										<ListItemText primary="Profile" />
									</ListItem>
								</Link>
								<ListItem button onClick={logout}>
									<ListItemIcon>
										<LogoutIcon />
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</ListItem>
							</>
						) : (
							<Link
								to="/login"
								className={classes.link}
								onClick={handleDrawerToggle}
							>
								<ListItem
									button
									selected={pathname.match(/^\/login.*/u) !== null}
								>
									<ListItemIcon>
										<LoginIcon />
									</ListItemIcon>
									<ListItemText primary="Log in" />
								</ListItem>
							</Link>
						)}
					</List>
				</Collapse>
			</div>
		);
	}
}

const styles = {
	chevron: {
		transition: 'all 300ms',
	},
	chevronRotate: {
		transform: 'rotate(90deg)',
		transition: 'all 300ms',
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
};

export default withRouter(withStyles(styles)(ProfileListItems));
