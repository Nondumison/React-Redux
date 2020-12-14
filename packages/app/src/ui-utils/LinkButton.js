// @flow strict

import * as React from 'react';
// Material Core
import Button from '@material-ui/core/Button';

// eslint-disable-next-line flowtype/require-exact-type
type Props = {
	+link?: string,
	+buttonText?: string,
};

// eslint-disable-next-line react/display-name, flowtype/no-existential-type
export const Link = React.forwardRef<{}, *>((props: {}, ref) => (
	// eslint-disable-next-line jsx-a11y/anchor-has-content
	<a {...props} ref={ref} target="_blank" rel="noopener noreferrer" />
));

const LinkButton = ({ link = '', buttonText = 'View', ...rest }: Props) => (
	<Button {...{ href: link, ...rest }} component={Link}>
		{buttonText}
	</Button>
);

export default LinkButton;
