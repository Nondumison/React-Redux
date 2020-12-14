// @flow strict

import { connect } from 'react-redux';

// Actions
import Notification from './Template';

import * as notifyActions from 'actions/notification';
import type { Dispatch } from 'index';
import type { Notification as NotificationType } from 'reducers/notification';

const mapDispatchToProps = (
	dispatch: Dispatch,
	{ id }: NotificationType,
) => ({
	remove() {
		dispatch(notifyActions.clear([id]));
		return undefined;
	},
});

export default connect<_, NotificationType, _, _, _, _>(
	null,
	mapDispatchToProps,
	null,
	{ forwardRef: true },
)(Notification);
