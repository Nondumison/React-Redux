// @flow strict

import * as React from 'react';
import classNames from 'classnames';
// Material UI
import { withStyles, type Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// eslint-disable-next-line flowtype/require-exact-type
type Props = {
	+classes: { [string]: string },
	+contentClassName?: string,
	+children: React.Node,
};

const Content = ({
	classes,
	contentClassName = '',
	children,
	...rest
}: Props) => (
	<div className={classNames(classes.content, contentClassName)}>
		<Grid spacing={10} container {...rest}>
			{children}
		</Grid>
	</div>
);

const styles = (theme: Theme) => ({
	content: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		overflowY: 'auto',
		overflowX: 'hidden',
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
	},
});

export default withStyles(styles)(Content);
