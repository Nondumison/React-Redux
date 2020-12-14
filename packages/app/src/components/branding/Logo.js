// @flow strict

import * as React from 'react';

// Components
import logo from './logo.svg';

type Props = {|
	+width?: number | string,
	+height?: number | string,
	+style?: { +[string]: string | number },
	+className?: string,
|};

const Logo = ({ width, height, style, className }: Props) => (
	<img
		style={{
			width: width != null ? width : '100%',
			height: height != null ? height : '100%',
			display: 'block',
			objectFit: 'contain',
			...style,
		}}
		className={className}
		src={logo}
		alt="Logo"
	/>
);

export default Logo;
