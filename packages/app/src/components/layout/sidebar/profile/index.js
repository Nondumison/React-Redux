// @flow strict

import { connect } from 'react-redux';

// Actions
import ProfileTab from './Template';

import * as authActions from 'actions/auth';
import * as selectors from 'selectors';
import type { State } from 'reducers';
import type { Dispatch } from 'index';

type OwnProps = {|
	+handleDrawerToggle: () => mixed,
|};

const mapStateToProps = (state: State) => ({
	isLoggedIn: Boolean(selectors.auth.getToken(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	logout() {
		dispatch(authActions.clear());
	},
});

export default connect<_, OwnProps, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(ProfileTab);
