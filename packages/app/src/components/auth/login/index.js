// @flow strict

import { connect } from 'react-redux';
import type { ContextRouter } from 'react-router-dom';

import Login from './Template';

import * as selectors from 'selectors';
import * as authActions from 'actions/auth';
import type { Dispatch } from 'index';
import type { State } from 'reducers';

const mapStateToProps = (state: State) => ({
	errors: selectors.auth.getErrors(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	async login(username: string, password: string) {
		await dispatch(authActions.login(username, password));
	},
	clearLoginErrors() {
		dispatch(authActions.clearErrors());
	},
});

export default connect<_, ContextRouter, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(Login);
