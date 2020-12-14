// @flow strict

import { connect } from 'react-redux';

// Selectors
import ForgotPassword from './Template';

import { auth } from 'selectors';
// Actions
import { recoverPassword, clearErrors } from 'actions/auth';
import type { Dispatch } from 'index';
import type { State } from 'reducers';

const mapStateToProps = (state: State) => ({
	errors: auth.getErrors(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	async recoverPassword(email: string) {
		await dispatch(recoverPassword(email));
	},
	clearLoginErrors() {
		dispatch(clearErrors());
	},
});

export default connect<_, {||}, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(ForgotPassword);
