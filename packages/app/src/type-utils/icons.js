// @flow strict

import type { ComponentType } from 'react';

declare module.exports: ComponentType<{
	classes?: Object, // flowlint-line unclear-type:off
	className?: string,
	titleAccess?: string,
	viewBox?: string,
}>;
