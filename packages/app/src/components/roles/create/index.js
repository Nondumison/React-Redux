// @flow strict

import { connect } from 'react-redux';
import type { ContextRouter } from 'react-router-dom';

import Create from './Template';

import * as selectors from 'selectors';
import * as entityActions from 'actions/entity';
import type { Dispatch } from 'index';
import type { State } from 'reducers';
import type { NewEntity } from 'reducers/entity';

const mapStateToProps = (state: State) => ({
	errors: selectors.entity.getErrors('role', state),
});

const mapDispatchToProps = (
	dispatch: Dispatch,
	{ match, history }: ContextRouter,
) => ({
	async create(role: NewEntity<'role'>) {
		const res = await dispatch(entityActions.create('role', role));
		if (res != null) {
			history.push(`${match.url.replace(/\/new$/u, `/${res.id}`)}`);
		}
	},
	clearErrors() {
		dispatch(entityActions.clearErrors('role'));
	},
});

export default connect<_, ContextRouter, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(Create);
