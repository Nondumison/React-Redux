// @flow strict

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from './Template';

import * as selectors from 'selectors';
import type { State } from 'reducers';

const mapStateToProps = (state: State) => ({
	isLoggedIn: Boolean(selectors.auth.getToken(state)),
});

export default withRouter(connect(mapStateToProps)(App));
