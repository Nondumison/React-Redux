declare module 'react-helmet-async' {
	declare type Props = {
		base?: Object,
		bodyAttributes?: Object,
		children?: React$Node,
		defaultTitle?: string,
		defer?: boolean,
		encodeSpecialCharacters?: boolean,
		htmlAttributes?: Object,
		link?: Array<Object>,
		meta?: Array<Object>,
		noscript?: Array<Object>,
		onChangeClientState?: (
			newState?: Object,
			addedTags?: Object,
			removeTags?: Object,
		) => any,
		script?: Array<Object>,
		style?: Array<Object>,
		title?: string,
		titleAttributes?: Object,
		titleTemplate?: string,
		...
	};

	declare interface TagMethods {
		toString(): string;
		toComponent(): [React$Element<*>] | React$Element<*> | Array<Object>;
	}

	declare interface AttributeTagMethods {
		toString(): string;
		toComponent(): { [string]: *, ... };
	}

	declare interface StateOnServer {
		base: TagMethods;
		bodyAttributes: AttributeTagMethods;
		htmlAttributes: AttributeTagMethods;
		link: TagMethods;
		meta: TagMethods;
		noscript: TagMethods;
		script: TagMethods;
		style: TagMethods;
		title: TagMethods;
	}

	declare class HelmetProvider extends React$Component<{
		children?: React$Node,
		context?: {},
		...
	}> {
		static canUseDom?: boolean;
	}

	declare class Helmet extends React$Component<Props> {
		static rewind(): StateOnServer;
		static renderStatic(): StateOnServer;
		static canUseDom(canUseDOM: boolean): void;
	}

	declare export var Helmet: typeof Helmet;
	declare export var HelmetProvider: typeof HelmetProvider;
}
