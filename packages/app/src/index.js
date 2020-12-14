// @flow strict

/* eslint-disable import/no-unassigned-import */
// $FlowIgnore Flow doesn’t resolve this correctly because monorepo
import 'typeface-roboto';
// $FlowIgnore Flow doesn’t resolve this correctly because monorepo
import 'react-hot-loader/patch';
/* eslint-enable */
import * as React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { throttle } from 'lodash';
import { Router, type RouterHistory } from 'react-router-dom';
import type { Store as Redux$Store } from 'redux';

import configureStore from 'configureStore';
import { saveState } from 'localStorage';
import * as serviceWorker from 'serviceWorker';
import history from 'myHistory';
import theme from 'theme';
// Actions
import { initializeUser } from 'actions/auth';
import type { Action } from 'actions';
import type { State } from 'reducers';
import App from 'components/app';

/* eslint-disable no-use-before-define */
type ThunkAction<R> = (
	dispatch: Dispatch,
	getState: GetState,
	subscribe: Subscribe,
	extraArgument: { history: RouterHistory },
) => R;
/* eslint-enable */
type ThunkDispatch = <R>(action: ThunkAction<R>) => R;
type PlainDispatch = <A: Action>(action: A) => A;
export type GetState = () => State;
export type Subscribe = (listener: () => void) => () => void;
export type Dispatch = ThunkDispatch & PlainDispatch;
export type Store = Redux$Store<State, Action, Dispatch>;

const store: Store = configureStore();

// Save the auth slice for persistent login
// throttle because saveState is expensive
store.subscribe(
	throttle(() => {
		const {
			auth: { errors: _, ...auth },
		} = store.getState() || {};
		saveState({ auth });
	}, 1000),
);

store.dispatch(initializeUser());

/**
 * Render the root React view
 *
 * Wraps the root application component with:
 * * React Hot Loader container
 * * React Strict Mode
 * * Redux store container
 * * React Router
 * * Material UI theme context provider
 */
const render = (Component: React.AbstractComponent<{}>) => {
	const rootEl = document.getElementById('root');
	if (!(rootEl instanceof HTMLElement)) {
		return;
	}
	ReactDOM.render(
		<AppContainer>
			<React.StrictMode>
				<HelmetProvider>
					<Provider store={store}>
						<Router history={((history: $DownCast): RouterHistory)}>
							<MuiThemeProvider theme={theme}>
								<CssBaseline />
								<Component />
							</MuiThemeProvider>
						</Router>
					</Provider>
				</HelmetProvider>
			</React.StrictMode>
		</AppContainer>,
		rootEl,
	);
};

render(App);

// Enable React Hot Reloading
// https://gaearon.github.io/react-hot-loader/
if (module.hot && process.env.NODE_ENV !== 'production') {
	module.hot.accept('./components/app', () => {
		render(App);
	});
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
