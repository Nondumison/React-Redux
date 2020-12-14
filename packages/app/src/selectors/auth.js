// @flow strict

import type { State } from 'reducers/auth';

export const isLoading = ({ loading }: State) => loading;

export const getToken = ({ token }: State) => token;

export const getErrors = ({ errors }: State) => errors;

export const getUserId = ({ userId }: State) => userId;

export const getRoleId = ({ roleId }: State) => roleId;
