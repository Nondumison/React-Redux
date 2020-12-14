// @flow strict

import * as React from 'react';
// @material-ui/core components
import { withStyles, type Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const defaultImage = '';

// eslint-disable-next-line flowtype/require-exact-type
type ButtonProps = {
	...React.ElementConfig<typeof Button>,
};

type Props = {|
	+classes: { +[string]: string },
	+avatar?: boolean | null,
	+picture?: string | null,
	+addButtonProps?: ButtonProps | null,
	+changeButtonProps?: ButtonProps | null,
	+removeButtonProps?: ButtonProps | null,
	+selectText: string,
	+imageClass?: string | null,
	+upload: (Blob, string) => mixed | Promise<mixed>,
|};

type State = {|
	+file: Blob | null,
	+imagePreviewUrl: string,
|};

/* eslint-disable react/destructuring-assignment */
class Upload extends React.PureComponent<Props, State> {
	static defaultProps = {
		selectText: 'Select',
		avatar: null,
		picture: null,
		addButtonProps: null,
		changeButtonProps: null,
		removeButtonProps: null,
		imageClass: null,
	};

	state = {
		file: null,
		imagePreviewUrl:
			Boolean(this.props.avatar) && this.props.picture != null
				? this.props.picture
				: defaultImage,
	};

	componentDidUpdate({ avatar, picture }: Props) {
		if (avatar !== this.props.avatar || picture !== this.props.picture) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({
				imagePreviewUrl:
					Boolean(this.props.avatar) && this.props.picture != null
						? this.props.picture
						: defaultImage,
			});
		}
	}

	input = React.createRef();

	handleImageChange = e => {
		e.preventDefault();
		const reader = new FileReader();
		const file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				file,
				imagePreviewUrl: ((reader.result: $DownCast): string),
			});
		};
		reader.readAsDataURL(file);
	};

	handleSubmit = () => {
		const { file, imagePreviewUrl } = this.state;
		if (file != null) {
			this.props.upload(file, imagePreviewUrl);
			this.setState({ file: null });
		}
	};

	handleClick = () => {
		if (this.input.current != null) {
			this.input.current.click();
		}
	};

	handleRemove = () => {
		const { avatar, picture } = this.props;
		this.setState({
			file: null,
			imagePreviewUrl:
				Boolean(avatar) && picture != null ? picture : defaultImage,
		});
		if (this.input.current != null) {
			this.input.current.value = null;
		}
	};

	render() {
		const {
			avatar,
			addButtonProps,
			changeButtonProps,
			removeButtonProps,
			classes,
			picture,
			selectText,
			imageClass,
		} = this.props;

		return (
			<Grid
				container
				justify="flex-start"
				alignItems="center"
				direction="column"
			>
				<input
					style={{ display: 'none' }}
					type="file"
					onChange={this.handleImageChange}
					// $FlowFixMe https://github.com/facebook/flow/issues/6378#issuecomment-408098211
					ref={this.input}
				/>
				{this.state.imagePreviewUrl ? (
					<div>
						<img
							className={imageClass != null ? imageClass : classes.image}
							src={this.state.imagePreviewUrl}
							alt="..."
						/>
					</div>
				) : null}
				<div>
					{this.props.upload ? (
						this.state.file === null ? (
							<Button
								color="primary"
								{...addButtonProps}
								onClick={this.handleClick}
							>
								{// eslint-disable-next-line no-extra-boolean-cast
								!Boolean(avatar)
									? selectText
									: picture != null
									? 'Change'
									: 'Add'}
							</Button>
						) : (
							<Grid container direction="column">
								<Button
									color="primary"
									{...changeButtonProps}
									onClick={this.handleSubmit}
								>
									Upload
								</Button>
								{// eslint-disable-next-line no-extra-boolean-cast
								Boolean(avatar) ? <br /> : null}
								<Button
									color="primary"
									{...removeButtonProps}
									onClick={this.handleRemove}
								>
									Remove
								</Button>
							</Grid>
						)
					) : null}
				</div>
			</Grid>
		);
	}
}
/* eslint-enable */

const styles = (theme: Theme) => ({
	image: {
		height: theme.spacing(18),
		width: theme.spacing(18),
	},
});

export default withStyles(styles)(Upload);
