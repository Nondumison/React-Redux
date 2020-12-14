// @flow strict

import * as React from 'react';
import Slide from '@material-ui/core/Slide';
import type { TransitionProps } from 'react-transition-group';

type Props = TransitionProps & {
	+in?: boolean,
	+children: React.Element<mixed>,
};

const SlideDown = ({ children, ...rest }: Props) => (
	<Slide direction="down" {...rest}>
		{children}
	</Slide>
);

export default SlideDown;
