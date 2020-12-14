// @flow strict

import { connect } from 'react-redux';
import type { ContextRouter } from 'react-router-dom';

import Update from './Template';

import * as selectors from 'selectors';
import * as entityActions from 'actions/entity';
import type { Dispatch } from 'index';
import type { State } from 'reducers';
import type { Entity } from 'reducers/entity';

const mapStateToProps = (state: State, { match }) => ({
	role:
		match.params.id != null
			? selectors.entity.get('role', state, match.params.id)
			: undefined,
	errors: selectors.entity.getErrors('role', state),
});

const mapDispatchToProps = (
	dispatch: Dispatch,
	{ match, history }: ContextRouter,
) => ({
	fetch() {
		if (match.params.id != null) {
			dispatch(entityActions.fetch('role', match.params.id));
		}
		return undefined;
	},
	async update(role: $Shape<Entity<'role'>>) {
		if (match.params.id != null) {
			const res = await dispatch(
				entityActions.update('role', match.params.id, role),
			);
			if (res != null) {
				history.push(`${match.url.replace(/\/edit$/u, '')}`);
			}
		}
		return undefined;
	},
	clearErrors() {
		dispatch(entityActions.clearErrors('role'));
	},
});

export default connect<_, ContextRouter, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(Update);
