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
	user:
		match.params.id != null
			? selectors.entity.get('user', state, match.params.id)
			: undefined,
	errors: selectors.entity.getErrors('user', state),
});

const mapDispatchToProps = (
	dispatch: Dispatch,
	{ match, history }: ContextRouter,
) => ({
	fetch() {
		if (match.params.id != null) {
			dispatch(entityActions.fetch('user', match.params.id));
		}
		return undefined;
	},
	async update(user: $Shape<Entity<'user'>>) {
		if (match.params.id != null) {
			const res = await dispatch(
				entityActions.update('user', match.params.id, user),
			);
			if (res != null) {
				history.push(`${match.url.replace(/\/edit$/u, '')}`);
			}
		}
		return undefined;
	},
	clearErrors() {
		dispatch(entityActions.clearErrors('user'));
	},
});

export default connect<_, ContextRouter, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(Update);
