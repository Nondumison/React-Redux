// flow-typed signature: fecbe7e9cb23233fe2035110c7eeef2b
// flow-typed version: <<STUB>>/jsonapi-normalizer_v1.2.0/flow_v0.75.0

declare module 'jsonapi-normalizer' {
	// import type { JSONAPIDocument } from 'json-api';
	// FIXME: Currently JSONAPIDocument leads to a very slow
	// Flow analysis on every pass.
	// Probably related to https://github.com/facebook/flow/issues/5631
	declare type JSONAPIDocument = Object;

	declare type Entity = {
		id: string,
	};

	declare type Entities<Obj> = {
		[entity: string]: {
			[id: string]: Obj,
		},
	};

	declare type Normalized = {|
		result: { [entity: string]: Array<string> },
		entities: Entities<Entity>,
		meta?: Object,
	|};

	declare type RootEntity = { [entity: string]: string };

	declare module.exports: {
		normalize(jsonAPI: JSONAPIDocument): Normalized,
		denormalize(root: RootEntity, entities: Entities<{}>): JSONAPIDocument,
	};
}
