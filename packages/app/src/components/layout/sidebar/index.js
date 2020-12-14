// @flow strict

import { connect } from 'react-redux';

// Selectors
import Sidebar from './Sidebar';

import * as selectors from 'selectors';
import type { State } from 'reducers';

const mapStateToProps = (state: State) => ({
	isLoggedIn: Boolean(selectors.auth.getToken(state)),
});

export default connect<_, {| handleDrawerToggle: () => mixed |}, _, _, _, _>(
	mapStateToProps,
	{},
)(Sidebar);
