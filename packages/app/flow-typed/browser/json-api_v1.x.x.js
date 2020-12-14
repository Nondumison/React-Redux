// @flow

declare module 'json-api' {
	declare type JSONSerializable =
		| null
		| void
		| string
		| number
		| boolean
		| { [string]: JSONSerializable }
		| Array<JSONSerializable>;

	declare export type JSONAPIMeta = { [string]: JSONSerializable };

	declare export type JSONAPILink =
		| string
		| {|
				href: string,
				meta?: JSONAPIMeta,
		  |};

	declare export type JSONAPILinks = {
		self?: JSONAPILink,
		related?: JSONAPILink,
		[string]: JSONAPILink,
	};

	declare export type JSONAPIPaginationLinks = {
		first?: ?JSONAPILink,
		last?: ?JSONAPILink,
		prev?: ?JSONAPILink,
		next?: ?JSONAPILink,
	};

	declare export type JSONAPIError = {|
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

	declare export type JSONAPIObject = {|
		version?: string,
		meta?: JSONAPIMeta,
	|};

	declare export type JSONAPIAttributes = {
		[string]: JSONSerializable,
	};

	declare export type JSONAPIResourceIdentifier = {|
		id: string,
		type: string,
		meta?: JSONAPIMeta,
	|};

	declare export type JSONAPIResourceLinkage =
		| Array<JSONAPIResourceIdentifier>
		| JSONAPIResourceIdentifier
		| null;

	declare export type JSONAPIRelationship = {|
		links?: {
			self?: JSONAPILink,
			related?: JSONAPILink,
		} & JSONAPILinks,
		data?: JSONAPIResourceLinkage,
		meta?: JSONAPIMeta,
	|};

	declare export type JSONAPIResource = {|
		id?: string,
		type: string,
		attributes?: JSONAPIAttributes,
		relationships?: {
			[string]: JSONAPIRelationship,
		},
		links?: JSONAPILinks,
		meta?: JSONAPIMeta,
	|};

	declare export type JSONAPIDataDocument = {|
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

	declare export type JSONAPIMetaDocument = {|
		meta: JSONAPIMeta,
		jsonapi?: JSONAPIObject,
		links?: JSONAPILinks,
	|};

	declare export type JSONAPIErrorDocument = {|
		errors: Array<JSONAPIError>,
		meta?: JSONAPIMeta,
		jsonapi?: JSONAPIObject,
		links?: JSONAPILinks,
	|};

	declare export type JSONAPIDocument =
		| JSONAPIDataDocument
		| JSONAPIMetaDocument
		| JSONAPIErrorDocument;
}
