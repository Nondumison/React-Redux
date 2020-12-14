// @flow strict

import { connect } from 'react-redux';
import type { ContextRouter } from 'react-router-dom';

import View from './Template';

import type { Dispatch } from 'index';
import type { State } from 'reducers';
import * as selectors from 'selectors';
import * as entityActions from 'actions/entity';

const mapStateToProps = (state: State, { match }: ContextRouter) => ({
	bar:
		match.params.id != null
			? selectors.entity.get('bar', state, match.params.id)
			: undefined,
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
	async remove() {
		if (match.params.id != null) {
			const success = await dispatch(
				entityActions.remove('bar', match.params.id),
			);
			if (success) {
				history.push(
					// $FlowIgnore we’ve already refined the type, so we know match.params.id is not null or undefined
					match.url.replace(new RegExp(`/${match.params.id}$`, 'u'), ''),
				);
			}
		}
		return undefined;
	},
});

export default connect<_, ContextRouter, _, _, _, _>(
	mapStateToProps,
	mapDispatchToProps,
)(View);
