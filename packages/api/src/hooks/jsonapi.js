// @flow strict

import { sentenceCase } from 'change-case';
import { GeneralError, BadRequest } from '@feathersjs/errors';
import hydrate from 'feathers-sequelize/hooks/hydrate';

const prop = key => obj => obj[key];
const objMap = f => obj => Object.fromEntries(Object.entries(obj).map(f));
const objFilter = f => obj =>
	Object.fromEntries(Object.entries(obj).filter(f));
const nincludes = xs => x => !xs.includes(x);

/*
 * TODO: In the case of HasMany association, find the IDs of associated entities and include those in the result
 *
 * TODO: In order to handle relationships in the JSON:API style, we need to
 * support [Relationship Links][1] as well as [Related Resource Links][2]
 *
 */

const invalidPaginationParams = ['$limit', '$skip'];

const validPaginationParams = ['limit', 'offset'];

const sortParams = ['$sort'];

const sparseFieldsetParams = ['$select'];

const filterParams = [
	'$eq',
	'$ne',
	'$gte',
	'$gt',
	'$lte',
	'$lt',
	'$in',
	'$nin',
	'$like',
	'$notLike',
	'$iLike',
	'$notILike',
	'$or',
	'$and',
];

const jsonApiQueryParams = ['filter', 'page', 'sort', 'include', 'fields'];

const displayStrings = (strs: Array<string>) =>
	strs.map(str => `'${str}'`).join(', ');

/**
 * JSON:API hooks should only run when the service is run as a result of a REST
 * call.
 *
 * This is a higher order function that adds this easily to hooks.
 */
const restOnly = hook => context =>
	context.params.provider === 'rest' ? hook(context) : context;

/**
 * Feathers.js and feathers-sequelize set up some convenient filter, sort and
 * pagination functionality via query parameters. However, these are not
 * JSON:API compliant, and we should not allow them to function. This hook
 * removes those query parameters.
 *
 * In production that is the only effect, but in development, it will also
 * cause the API to respond with an error.
 */
export const cleanQueryParams = restOnly(context => {
	const params = Object.keys(context.params.query);
	// TODO: context.path might be the path, instead of the service name. When
	// we implement the relationship links we may have to check that we’re not
	// getting the full path, and extract the service name from it if we are
	const name = context.path;
	const service = context.app.services[name];
	const model = service.Model;
	const attributes = Object.keys(model.rawAttributes).filter(
		attribute => !jsonApiQueryParams.includes(attribute),
	);
	const associations = Object.keys(model.associations).filter(
		association => !jsonApiQueryParams.includes(association),
	);

	// Only throw an error in development, because of the Robustness principle
	// https://en.wikipedia.org/wiki/Robustness_principle
	if (process.env.NODE_ENV !== 'production') {
		const errors = {
			...(attributes =>
				attributes.length > 0
					? {
							attributes: `Entity attribute(s) ${displayStrings(
								attributes,
							)} are queriable using the filter syntax`,
					  }
					: {})(params.filter(param => attributes.includes(param))),
			...(associations =>
				associations.length > 0
					? {
							associations: `Entity association(s) ${displayStrings(
								associations,
							)} are queriable using the filter syntax`,
					  }
					: {})(params.filter(param => associations.includes(param))),
			...(operators =>
				operators.length > 0
					? {
							feathersOperators: `Feathers.js parameter(s) ${displayStrings(
								operators,
							)} are not supported. Use JSON:API 'page' query parameter keys ${displayStrings(
								validPaginationParams,
							)}.`,
					  }
					: {})(
				params.filter(param => invalidPaginationParams.includes(param)),
			),
			...(operators =>
				operators.length > 0
					? {
							feathersOperators: `The keys of Feathers.js parameter(s) ${displayStrings(
								operators,
							)} need to be used as keys of the JSON:API 'sort' query parameter instead`,
					  }
					: {})(params.filter(param => sortParams.includes(param))),
			...(operators =>
				operators.length > 0
					? {
							feathersOperators: `The keys of Feathers.js parameter(s) ${displayStrings(
								operators,
							)} need to be used as keys of the JSON:API 'fields' parameter instead`,
					  }
					: {})(params.filter(param => sparseFieldsetParams.includes(param))),
			...(operators =>
				operators.length > 0
					? {
							sequelizeOperators: `Feathers.js/Sequelize operator query parameter(s) ${displayStrings(
								operators,
							)} need to be used as keys of the JSON:API 'filter' query parameter`,
					  }
					: {})(params.filter(param => filterParams.includes(param))),
			...(knownParams =>
				(params =>
					params.length > 0
						? {
								unknown: `Query parameter(s) ${displayStrings(
									params,
								)} are not supported`,
						  }
						: {})(params.filter(param => !knownParams.includes(param))))([
				...attributes,
				...associations,
				...invalidPaginationParams,
				...sortParams,
				...sparseFieldsetParams,
				...filterParams,
				...jsonApiQueryParams,
			]),
		};

		if (Object.keys(errors).length > 0) {
			throw new BadRequest('Invalid query syntax', { errors });
		}
	}

	params
		.filter(param => !jsonApiQueryParams.includes(param))
		.forEach(param => {
			delete context.params.query[param];
		});

	return context;
});

export const cacheQueryParams = restOnly(context => {
	context.params.cachedQuery = { ...context.params.query };
	return context;
});

/**
 * Include extra entities in payload
 */
export const include = restOnly(context => {
	// This hook only checks whether the keys are valid, it doesn’t action them
	const includeQuery = context.params.query.include;

	if (includeQuery == null || includeQuery === '') return context;

	// TODO: context.path might be the path, instead of the service name. When
	// we implement the relationship links we may have to check that we’re not
	// getting the full path, and extract the service name from it if we are
	const name = context.path;
	const service = context.app.services[name];
	const model = service.Model;
	const associations = Object.keys(model.associations);

	if (process.env.NODE_ENV !== 'production') {
		const errors = {
			...(keys =>
				keys.length > 0
					? {
							fieldsType: `Include keys(s) ${displayStrings(
								keys,
							)} are not valid! Valid keys are ${displayStrings(
								associations,
							)}.`,
					  }
					: {})(includeQuery.split(',').filter(nincludes(associations))),
		};

		if (Object.keys(errors).length > 0) {
			throw new BadRequest('Invalid query syntax', { errors });
		}
	}

	return context;
});

const isAssociationType = type => association =>
	association.associationType === type;

const validFieldAttributes = model => {
	const relationshipKeys = Object.values(model.associations)
		.filter(isAssociationType('BelongsTo'))
		.map(prop('identifierField'));
	return Object.keys(model.rawAttributes).filter(
		attr => ![model.primaryKeyAttribute, ...relationshipKeys].includes(attr),
	);
};

/**
 * Include only the selected fields
 */
export const fields = restOnly(context => {
	// Sparse fieldsets for included data are handled in the `relationships` hook.
	const fieldsQuery = context.params.query.fields;

	if (fieldsQuery == null || fieldsQuery === '') return context;

	// TODO: context.path might be the path, instead of the service name. When
	// we implement the relationship links we may have to check that we’re not
	// getting the full path, and extract the service name from it if we are
	const name = context.path;
	const service = context.app.services[name];
	const model = service.Model;
	const associationTargets = Object.values(model.associations).map(
		association => association.target.options.name.singular,
	);
	const fieldsTypes = [model.options.name.singular, ...associationTargets];

	if (process.env.NODE_ENV !== 'production') {
		const errors = {
			...(types =>
				types.length > 0
					? {
							fieldsType: `Fields type(s) ${displayStrings(
								types,
							)} are not valid! Valid fields types are ${displayStrings(
								fieldsTypes,
							)}.`,
					  }
					: {})(
				Object.keys(fieldsQuery).filter(
					field => !fieldsTypes.includes(field),
				),
			),
			...Object.fromEntries(
				fieldsTypes
					.map(type => {
						if (fieldsQuery[type] == null) return [];
						const fields = fieldsQuery[type].split(',');
						const attributes = validFieldAttributes(
							model.options.name.singular === type
								? model
								: Object.values(model.associations).find(
										association =>
											association.target.options.name.singular === type,
								  ).target,
						);
						const invalidFields = fields.filter(
							field => !attributes.includes(field),
						);
						return [
							`${type}Fields`,
							invalidFields.length === 0
								? ''
								: `Field(s) ${displayStrings(
										invalidFields,
								  )} are not valid for '${type}'. Valid fields are ${displayStrings(
										attributes,
								  )}.`,
						];
					})
					.filter(([, errorMsg]) => errorMsg),
			),
		};

		if (Object.keys(errors).length > 0) {
			throw new BadRequest('Invalid query syntax', { errors });
		}
	}

	if (fieldsQuery[model.options.name.singular] != null) {
		context.params.query.$select = [
			model.primaryKeyAttribute,
			...Object.values(model.associations)
				.filter(({ associationType }) => associationType === 'BelongsTo')
				.map(({ foreignKey }) => foreignKey),
			...fieldsQuery[model.options.name.singular].split(','),
		];
	}

	return context;
});

/**
 * Sorts the results
 */
export const sort = restOnly(context => {
	const sortQuery = context.params.query.sort;

	if (sortQuery == null || sortQuery === '') return context;

	// TODO: context.path might be the path, instead of the service name. When
	// we implement the relationship links we may have to check that we’re not
	// getting the full path, and extract the service name from it if we are
	const name = context.path;
	const service = context.app.services[name];
	const model = service.Model;
	const attributes = Object.keys(model.rawAttributes);
	const sortFields = sortQuery.split(',');

	if (process.env.NODE_ENV !== 'production') {
		const errors = {
			...(invalidFields =>
				invalidFields.length > 0
					? {
							invalidFields: `Invalid sort field(s) specified: ${displayStrings(
								invalidFields,
							)}. Valid sort fields are: ${displayStrings(attributes)}.`,
					  }
					: {})(
				sortFields.filter(
					field => !attributes.includes(field.replace(/^-/u, '')),
				),
			),
		};

		if (Object.keys(errors).length > 0) {
			throw new BadRequest('Invalid query syntax', { errors });
		}
	}

	context.params.query.$sort = Object.fromEntries(
		sortFields.map(field => [
			field.replace(/^-/u, ''),
			field.startsWith('-') ? -1 : 1,
		]),
	);

	return context;
});

/**
 * Filter the results
 */
export const filter = restOnly(context => {
	const filterQuery = context.params.query.filter;

	if (filterQuery == null || filterQuery === '') return context;

	// TODO: context.path might be the path, instead of the service name. When
	// we implement the relationship links we may have to check that we’re not
	// getting the full path, and extract the service name from it if we are
	const name = context.path;
	const service = context.app.services[name];
	const model = service.Model;
	const attributes = Object.keys(model.rawAttributes);

	if (process.env.NODE_ENV !== 'production') {
		const errors = {
			...(invalidFields =>
				invalidFields.length > 0
					? {
							invalidFields: `Invalid filter field(s) specified: ${displayStrings(
								invalidFields,
							)}. Valid sort fields are the attributes: ${displayStrings(
								attributes,
							)}; or the following filter query operators: ${displayStrings(
								filterParams,
							)}.`,
					  }
					: {})(
				Object.keys(filterQuery).filter(
					param => ![...attributes, ...filterParams].includes(param),
				),
			),
		};

		if (Object.keys(errors).length > 0) {
			throw new BadRequest('Invalid query syntax!', { errors });
		}
	}

	context.params.query = {
		...context.params.query,
		...filterQuery,
	};

	return context;
});

/**
 * Paginates and limits the result
 */
export const paginate = restOnly(context => {
	const pageQuery = context.params.query.page || {};

	if (pageQuery == null || pageQuery === '') return context;

	if (process.env.NODE_ENV !== 'production') {
		const errors = {
			...(invalidParams =>
				invalidParams.length > 0
					? {
							invalidParams: `Invalid pagination parameter(s) specified: ${displayStrings(
								invalidParams,
							)}. Valid pagination parameters are: ${displayStrings(
								validPaginationParams,
							)}.`,
					  }
					: {})(
				Object.keys(pageQuery).filter(
					param => !validPaginationParams.includes(param),
				),
			),
		};

		if (Object.keys(errors).length > 0) {
			throw new BadRequest('Invalid query syntax', { errors });
		}
	}

	if (pageQuery.offset != null) context.params.query.$skip = pageQuery.offset;
	if (pageQuery.limit != null) context.params.query.$limit = pageQuery.limit;

	return context;
});

/**
 * Remove all JSON:API parameters from query
 */
export const noJsonApiQueryParams = restOnly(context => {
	jsonApiQueryParams.forEach(key => {
		delete context.params.query[key];
	});
	return context;
});

const isOneToOneAssociation = association =>
	['BelongsTo', 'HasOne'].some(t => isAssociationType(t)(association));

const sourceRelationshipAttributes = model =>
	Object.values(model.associations)
		.filter(isAssociationType('BelongsTo'))
		.map(prop('identifierField'));

const entityToResource = model => entity => related =>
	((entity, related) => {
		const { [model.primaryKeyAttribute]: id, ...rest } = entity;

		return {
			id,
			type: model.options.name.singular,
			attributes: objFilter(([key]) =>
				nincludes(sourceRelationshipAttributes(model))(key),
			)(rest),
			relationships: objMap(([as, association]) => {
				const type = association.target.options.name.singular;
				const idKey = association.target.primaryKeyAttribute;
				return [
					as,
					{
						data: isOneToOneAssociation(association)
							? related[as][0]
								? {
										type,
										id: related[as][0][idKey],
								  }
								: null
							: Array.isArray(related[as])
							? related[as].map(({ [idKey]: id }) => ({
									type,
									id,
							  }))
							: [],
					},
				];
			})(model.associations),
		};
	})(
		entity.toJSON(),
		objMap(([key, entities]) => [
			key,
			entities.filter(entity => entity).map(entity => entity.toJSON()),
		])(related),
	);

const related = ({ fieldsQuery }) => model => async entity =>
	Object.fromEntries(
		await Promise.all(
			Object.entries(model.associations).map(async ([key, association]) => {
				const type = association.target.options.name.singular;
				return [
					key,
					[].concat(
						await entity[association.accessors.get]({
							...(!fieldsQuery || fieldsQuery[type] == null
								? null
								: {
										attributes: [
											association.target.primaryKeyAttribute,
											...(['HasMany', 'HasOne'].includes(
												association.associationType,
											)
												? [association.foreignKey]
												: []),
											...fieldsQuery[type].split(','),
										],
								  }),
						}),
					),
				];
			}),
		),
	);

const resourceAndRelated = ({ fieldsQuery }) => model => async entity => {
	const relatedEntities = await related({ fieldsQuery })(model)(entity);
	const data = entityToResource(model)(entity)(relatedEntities);
	return [data, relatedEntities];
};

/**
 * Include relationships and included data, too
 */
export const serialize = restOnly(async context => {
	const fieldsQuery = context.params.cachedQuery.fields;
	const includeQuery = context.params.cachedQuery.include;
	// TODO: context.path might be the path, instead of the service name. When
	// we implement the relationship links we may have to check that we’re not
	// getting the full path, and extract the service name from it if we are
	const { path: name, method } = context;
	const service = context.app.services[name];
	const model = service.Model;
	const { associations } = model;

	if (method === 'remove') {
		context.dispatch = null;
		context.statusCode = 204;
		return context;
	}

	const [data, relatedEntities] =
		method !== 'find'
			? await resourceAndRelated({ fieldsQuery })(model)(context.result)
			: (
					await Promise.all(
						context.result.data.map(
							resourceAndRelated({ fieldsQuery })(model),
						),
					)
			  ).reduce(
					(acc, [data, relatedEntities]) => {
						acc[0].push(data);
						Object.entries(relatedEntities).forEach(([as, entities]) => {
							// eslint-disable-next-line flowtype/no-unused-expressions
							acc[1][as] = {
								...acc[1][as],
								...Object.fromEntries(
									entities
										.filter(entity => entity != null)
										.map(entity => [entity.id, entity]),
								),
							};
						});
						return acc;
					},
					[[], {}],
			  );

	const included =
		includeQuery != null && includeQuery !== ''
			? await Promise.all(
					Object.entries(relatedEntities).flatMap(([type, entities]) =>
						includeQuery.split(',').includes(type)
							? Object.values(entities).map(
									async entity =>
										(
											await resourceAndRelated({ fieldsQuery })(
												associations[type].target,
											)(entity)
										)[0],
							  )
							: [],
					),
			  )
			: null;

	// TODO: set meta with total, count, and other pagination information

	// eslint-disable-next-line require-atomic-updates
	context.dispatch = {
		data,
		...(included != null ? { included } : {}),
	};

	return context;
});

/**
 * Deserializes data from JSON:API format to Sequelize
 */
export const deserialize = restOnly(context => {
	// TODO: context.path might be the path, instead of the service name. When
	// we implement the relationship links we may have to check that we’re not
	// getting the full path, and extract the service name from it if we are
	const { path: name, method, id } = context;
	if (!['create', 'update', 'patch'].includes(method)) {
		return context;
	}
	const { Model: model } = context.app.services[name];
	const modelTimeProps = (({
		timestamps,
		createdAt,
		updatedAt,
		paranoid,
		deletedAt,
	}) =>
		[
			timestamps && (createdAt == null ? 'createdAt' : createdAt),
			timestamps && (updatedAt == null ? 'updatedAt' : updatedAt),
			timestamps && paranoid && (deletedAt == null ? 'deletedAt' : deletedAt),
		].filter(timeProp => timeProp))(model.options);
	const modelAttrProps = Object.keys(model.rawAttributes).filter(
		attr => !modelTimeProps.includes(attr),
	);
	const modelRelProps = Object.keys(model.associations);
	const modelAssocProps = Object.values(model.associations).map(
		({ identifierField }) => identifierField,
	);
	const { data } = context.data;
	const dataAttrProps = Object.keys(data.attributes || {});
	const dataRelProps = Object.keys(data.relationships || {});

	const errors = {
		...(data.type !== model.options.name.singular
			? {
					type: `Entity type must be correct. Got '${data.type}', expected '${model.options.name.singular}'.`,
			  }
			: {}),
		...(method !== 'create' && data.id != null && data.id !== id
			? {
					id: `Entity ID is not writeable.`,
			  }
			: {}),
		...(method !== 'update' && process.env.NODE_ENV !== 'production'
			? (timestamps =>
					timestamps.length > 0
						? {
								timestamps: `Entity timestamp(s) ${displayStrings(
									timestamps,
								)} are not writeable on model '${
									model.options.name.singular
								}'.`,
						  }
						: {})(dataAttrProps.filter(attr => modelTimeProps.includes(attr)))
			: {}),
		...(associations =>
			associations.length > 0
				? {
						associations: `Entity properties(s) ${displayStrings(
							associations,
						)} of model '${
							model.options.name.singular
						}' are association(s) that need to be manipulated using the relationship(s) ${associations
							.map(
								assoc =>
									`'${
										Object.values(model.associations).find(
											({ identifierField }) => identifierField === assoc,
										).as
									}'`,
							)
							.join(', ')}, respectively.`,
				  }
				: {})(dataAttrProps.filter(attr => modelAssocProps.includes(attr))),
		...(attributes =>
			attributes.length > 0
				? {
						attributes: `Entity attribute(s) ${displayStrings(
							attributes,
						)} are not part of model '${
							model.options.name.singular
						}'.${(possibleAttrs =>
							possibleAttrs.length > 0
								? ` Did you mean ${displayStrings(possibleAttrs)}?`
								: '')(
							modelAttrProps.filter(attr => !dataAttrProps.includes(attr)),
						)}`,
				  }
				: {})(
			dataAttrProps.filter(
				attr =>
					!modelTimeProps.includes(attr) &&
					!modelAssocProps.includes(attr) &&
					!modelAttrProps.includes(attr),
			),
		),
		...(relationships =>
			relationships.length > 0
				? {
						relationships: `Entity relationship(s) ${displayStrings(
							relationships,
						)} are not part of model '${
							model.options.name.singular
						}'.${(possibleRels =>
							possibleRels.length > 0
								? ` Did you mean ${displayStrings(possibleRels)}?`
								: '')(
							modelRelProps.filter(rel => !dataRelProps.includes(rel)),
						)}`,
				  }
				: {})(dataRelProps.filter(rel => !modelRelProps.includes(rel))),
	};

	if (Object.keys(errors).length > 0) {
		throw new BadRequest('Invalid request body!', { errors });
	}

	const newData = {
		...(id != null ? { id } : {}),
		...Object.fromEntries(
			Object.entries(data.attributes).filter(
				([attr]) => !modelTimeProps.includes(attr),
			),
		),
	};

	if (data.relationships) {
		context.relationships = data.relationships;
	}

	context.data = newData;

	return context;
});

export const setRelationships = restOnly(async context => {
	// TODO: context.path might be the path, instead of the service name. When
	// we implement the relationship links we may have to check that we’re not
	// getting the full path, and extract the service name from it if we are
	const { path: name, method } = context;
	const service = context.app.services[name];
	const { Model: model } = service;

	if (!['create', 'update', 'patch'].includes(method)) return context;

	if (context.relationships) {
		const entity = await model.findByPk(context.result.id);
		await Promise.all(
			Object.entries(model.associations).map(async ([as, association]) => {
				if (context.relationships[as]) {
					if (isOneToOneAssociation(association)) {
						if (context.relationships[as].data != null) {
							const relation = await association.target.findByPk(
								context.relationships[as].data.id,
							);
							await entity[association.accessors.set](relation);
						}
					} else {
						const relations = await Promise.all(
							context.relationships[as].data.map(({ id }) =>
								association.target.findByPk(id),
							),
						);
						await entity[association.accessors.set](relations);
					}
				}
			}),
		);

		const params = { ...context.params, provider: null };
		// eslint-disable-next-line require-atomic-updates
		context.result = await service.get(context.result.id, params);
	}

	return context;
});

// eslint-disable-next-line consistent-return
export const errorHandler = (error, _, res, next) => {
	if (res.headersSent) {
		return next(error);
	}

	const fError =
		error.type === 'FeathersError'
			? error
			: new GeneralError(error.message, {
					errors: error.errors,
			  });

	fError.code = !Number.isNaN(parseInt(error.code, 10))
		? parseInt(error.code, 10)
		: 500;

	const { message, code, errors, data = {} } = fError;

	const primaryError = {
		status: code,
		title: message,
		detail: data.detail,
	};

	const secondaryErrors =
		typeof errors === 'object'
			? Array.isArray(errors)
				? errors.map(error => ({
						status: code,
						title: error.message,
				  }))
				: errors != null
				? Object.entries(errors).map(([key, error]) => ({
						status: code,
						title: `${sentenceCase(key)}: ${error}`,
				  }))
				: []
			: [];

	const output = {
		errors: [primaryError, ...secondaryErrors],
	};

	res.status(fError.code);
	res.set('Content-Type', 'application/vnd.api+json');
	res.json(output);
};

export const hooks = {
	before: {
		all: [
			cleanQueryParams,
			cacheQueryParams,
			include,
			fields,
			sort,
			filter,
			paginate,
			deserialize,
			noJsonApiQueryParams,
		],
	},
	after: {
		all: [hydrate(), setRelationships, serialize],
	},
};

export default (serviceHooks = {}) => ({
	...serviceHooks,
	before: {
		...serviceHooks.before,
		all:
			serviceHooks.before != null && serviceHooks.before.all != null
				? [...hooks.before.all, ...serviceHooks.before.all]
				: hooks.before.all,
	},
	after: {
		...serviceHooks.after,
		all:
			serviceHooks.after != null && serviceHooks.after.all != null
				? [...serviceHooks.after.all, ...hooks.after.all]
				: hooks.after.all,
	},
});
