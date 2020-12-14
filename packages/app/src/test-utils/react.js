// @flow strict

import * as React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createMemoryHistory, type MemoryHistoryOpts } from 'history';
import { render } from '@testing-library/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router, type RouterHistory } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import configureStore from 'configureStore';
import theme from 'theme';
import { state } from 'test-utils/redux';
import type { Store } from 'index';

HelmetProvider.canUseDom = false;

const Context = ({ store, history }) => ({ children }) => (
	<HelmetProvider>
		<Provider store={store || configureStore(state)}>
			<Router
				history={((createMemoryHistory(history): $DownCast): RouterHistory)}
			>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					{children}
				</MuiThemeProvider>
			</Router>
		</Provider>
	</HelmetProvider>
);

type Options = {|
	store?: Store,
	history?: MemoryHistoryOpts,
	container?: HTMLElement,
	baseElement?: HTMLElement,
|};

export const contextRender = (
	// eslint-disable-next-line flowtype/no-existential-type
	ui: React.Element<*>,
	{ store, history, ...options }: Options = {},
	// eslint-disable-next-line babel/new-cap
) => render(ui, { wrapper: Context({ store, history }), ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { contextRender as render };
