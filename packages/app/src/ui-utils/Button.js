// @flow strict

import * as React from 'react';
// Material UI
import MaterialButtonBase from '@material-ui/core/ButtonBase';
import MaterialButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

type MaterialButtonBaseProps = React.ElementConfig<typeof MaterialButtonBase>;
type MaterialButtonProps = React.ElementConfig<typeof MaterialButton>;

type Props = {|
	...$Exact<MaterialButtonBaseProps>,
	...$Exact<
		$Diff<
			MaterialButtonProps,
			{ children: $PropertyType<MaterialButtonProps, 'children'> },
		>,
	>,
	+isLoading: boolean,
	+text?: ?string,
	+icon?: React.Node,
|};

const Button = ({ isLoading, text, icon, ...rest }: Props) => (
	<MaterialButton disabled={isLoading} {...rest}>
		{isLoading ? <CircularProgress size={20} /> : null}
		{!isLoading ? icon : null}
		{!isLoading ? text : null}
	</MaterialButton>
);

export default Button;
