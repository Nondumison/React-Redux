// @flow strict

import { connect } from 'react-redux';
import type { ContextRouter } from 'react-router-dom';

import List from './Template';

import * as selectors from 'selectors';
import * as entityActions from 'actions/entity';
import type { Dispatch } from 'index';
import type { State } from 'reducers';

const mapStateToProps = (state: State) => ({
	users: Object.values(selectors.entity.getAll('user', state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	fetchAll() {
		dispatch(entityActions.fetchAll('user'));
	},
});

export default connect<_, ContextRouter, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(List);
