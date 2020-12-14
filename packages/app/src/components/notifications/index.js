// @flow strict

import { connect } from 'react-redux';

// Selectors
import Notifications from './Template';

import * as selectors from 'selectors';
import type { State } from 'reducers';

const mapStateToProps = (state: State) => ({
	ids: selectors.notification.getIds(state),
	notifications: selectors.notification.getAll(state),
});

export default connect<_, {||}, _, _, _, _>(
	mapStateToProps,
	{},
)(Notifications);
