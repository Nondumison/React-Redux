// @flow strict

type JSON =
	| null
	| void
	| string
	| number
	| boolean
	| { [string]: JSON }
	| Array<JSON>;

export type JSONAPIMeta = { [string]: JSON };

export type JSONAPILink =
	| string
	| {|
			href: string,
			meta?: JSONAPIMeta,
	  |};

export type JSONAPILinks = {
	self?: JSONAPILink,
	related?: JSONAPILink,
	[string]: JSONAPILink,
};

export type JSONAPIPaginationLinks = {|
	first?: ?JSONAPILink,
	last?: ?JSONAPILink,
	prev?: ?JSONAPILink,
	next?: ?JSONAPILink,
|};

export type JSONAPIError = {|
	id?: string,
	links?: {|
		about: JSONAPILink,
	|},
	status?: string,
	code?: string,
	title?: string,
	detail?: string,
	source?: {
		pointer?: string,
		parameter?: string,
	},
	meta?: JSONAPIMeta,
|};

export type JSONAPIObject = {|
	version?: string,
	meta?: JSONAPIMeta,
|};

export type JSONAPIAttributes = {
	[string]: JSON,
};

export type JSONAPIResourceIdentifier = {|
	id: string,
	type: string,
	meta?: JSONAPIMeta,
|};

export type JSONAPIResourceLinkage =
	| Array<JSONAPIResourceIdentifier>
	| JSONAPIResourceIdentifier
	| null;

export type JSONAPIRelationship = {|
	links?: {
		self?: JSONAPILink,
		related?: JSONAPILink,
	} & JSONAPILinks,
	data?: JSONAPIResourceLinkage,
	meta?: JSONAPIMeta,
|};

export type JSONAPIResource = {|
	id?: string,
	type: string,
	attributes?: JSONAPIAttributes,
	relationships?: {
		[string]: JSONAPIRelationship,
	},
	links?: JSONAPILinks,
	meta?: JSONAPIMeta,
|};

export type JSONAPIDataDocument = {|
	data:
		| Array<JSONAPIResource | JSONAPIResourceIdentifier>
		| JSONAPIResource
		| JSONAPIResourceIdentifier
		| null,
	meta?: JSONAPIMeta,
	jsonapi?: JSONAPIObject,
	links?: JSONAPIPaginationLinks & JSONAPILinks,
	included?: Array<JSONAPIResource>,
|};

export type JSONAPIMetaDocument = {|
	meta: JSONAPIMeta,
	jsonapi?: JSONAPIObject,
	links?: JSONAPILinks,
|};

export type JSONAPIErrorDocument = {|
	errors: Array<JSONAPIError>,
	meta?: JSONAPIMeta,
	jsonapi?: JSONAPIObject,
	links?: JSONAPILinks,
|};

export type JSONAPIDocument =
	| JSONAPIDataDocument
	| JSONAPIMetaDocument
	| JSONAPIErrorDocument;
