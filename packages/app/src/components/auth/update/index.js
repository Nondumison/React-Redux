// @flow strict

import { connect } from 'react-redux';
import type { ContextRouter } from 'react-router-dom';

import UpdatePassword from './Template';

import type { Dispatch } from 'index';
import type { State } from 'reducers';
import { auth } from 'selectors';
import { notify } from 'actions/notification';
import * as authActions from 'actions/auth';

const mapStateToProps = (state: State, { match }: ContextRouter) => ({
	errors: auth.getErrors(state),
	token: match.params.token,
});

const mapDispatchToProps = (
	dispatch: Dispatch,
	{ history }: ContextRouter,
) => ({
	async updatePassword(password: string, token: ?string) {
		if (token != null) {
			if (await dispatch(authActions.updatePassword(password, token))) {
				history.replace('/login');
			}
		} else {
			dispatch(
				notify({
					message:
						'Token was not found, please follow the forgot password link again.',
					type: 'error',
				}),
			);
		}
	},
	clearLoginErrors() {
		dispatch(authActions.clearErrors());
	},
});

export default connect<_, ContextRouter, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(UpdatePassword);
