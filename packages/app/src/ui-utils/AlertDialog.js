// @flow strict

// TODO: Create at least a smoke test for this component

import * as React from 'react';
// Material Core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

// TODO: it’d be less confusing if some of these prop names just shadowed
// the Dialog component prop names.
type Props = {|
	+show: boolean,
	+handleClose?: () => mixed,
	+fullScreen?: boolean,
	+title: React.Node,
	+message: React.Node,
	+agreeAction?: (event: SyntheticEvent<>) => mixed,
	+disagreeAction?: (event: SyntheticEvent<>) => mixed,
	+removeAction?: (event: SyntheticEvent<>) => mixed,
	+agreeButtonText?: string,
	+disagreeButtonText?: string,
	+removeButtonText?: string,
	+children?: React.Node,
|};

const AlertDialog = ({
	show,
	handleClose,
	title,
	message,
	agreeAction,
	disagreeAction,
	removeAction,
	agreeButtonText = 'Okay',
	disagreeButtonText = 'Cancel',
	removeButtonText = 'Remove',
	fullScreen,
	children,
}: Props) => (
	<Dialog open={show} onClose={handleClose} fullScreen={fullScreen}>
		<DialogTitle>{title}</DialogTitle>
		<DialogContent>
			<DialogContentText>{message}</DialogContentText>
			{children}
		</DialogContent>
		<DialogActions>
			{agreeAction ? (
				<Button onClick={agreeAction} color="secondary">
					{agreeButtonText}
				</Button>
			) : null}
			{removeAction ? (
				<Button onClick={removeAction} color="primary">
					{removeButtonText}
				</Button>
			) : null}
			{disagreeAction ? (
				<Button onClick={disagreeAction}>{disagreeButtonText}</Button>
			) : null}
		</DialogActions>
	</Dialog>
);

export default withMobileDialog()(AlertDialog);
