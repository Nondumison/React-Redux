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
	bar:
		match.params.id != null
			? selectors.entity.get('bar', state, match.params.id)
			: undefined,
	errors: selectors.entity.getErrors('bar', state),
});

const mapDispatchToProps = (
	dispatch: Dispatch,
	{ match, history }: ContextRouter,
) => ({
	fetch() {
		if (match.params.id != null) {
			dispatch(entityActions.fetch('bar', match.params.id));
		}
		return undefined;
	},
	async update(bar: $Shape<Entity<'bar'>>) {
		if (match.params.id != null) {
			const res = await dispatch(
				entityActions.update('bar', match.params.id, bar),
			);
			if (res != null) {
				history.push(`${match.url.replace(/\/edit$/u, '')}`);
			}
		}
		return undefined;
	},
	clearErrors() {
		dispatch(entityActions.clearErrors('bar'));
	},
});

export default connect<_, ContextRouter, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(Update);
