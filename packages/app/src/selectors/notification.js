// @flow strict

import type { State, Notification } from 'reducers/notification';

export const getIds = ({ allIds }: State) => allIds;

export const get = ({ byId }: State, id: string): Notification | void =>
	byId[id];

export const getAll = ({ byId }: State) => byId;
