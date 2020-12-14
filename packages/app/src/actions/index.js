// @flow strict

import type { Action as AuthAction } from './auth';
import type { Action as NotificationAction } from './notification';
import type { Action as EntityAction } from './entity';

import type { EntityNames } from 'entity-models';

export type Action =
	| AuthAction
	| NotificationAction
	| EntityAction<EntityNames>;
