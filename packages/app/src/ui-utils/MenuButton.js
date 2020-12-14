// @flow strict

import * as React from 'react';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

type Item = {|
	+key: string,
	+component: React.Node,
	+action: () => mixed,
|};

type Props = {|
	+items: $ReadOnlyArray<Item>,
	+id: string,
|};

type State = {|
	anchorEl: ?HTMLElement,
|};

class MenuButton extends React.PureComponent<Props, State> {
	static defaultProps = {
		items: [],
	};

	state = {
		anchorEl: null,
	};

	handleClick = (e: SyntheticEvent<HTMLFormElement>) => {
		this.setState({ anchorEl: e.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleItemClick = (item: Item) => {
		this.setState({ anchorEl: null });
		item.action();
	};

	render() {
		const { anchorEl } = this.state;
		const { id, items } = this.props;
		return (
			<div>
				<IconButton
					aria-label="More"
					aria-owns={anchorEl ? id : null}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id={id}
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
				>
					{items.map(item => (
						<MenuItem
							key={item.key}
							onClick={() => this.handleItemClick(item)}
						>
							{item.component}
						</MenuItem>
					))}
				</Menu>
			</div>
		);
	}
}

export default MenuButton;
