// flow-typed signature: d3631f53fa41fb497fa32e3c2addb993
// flow-typed version: <<STUB>>/@feathersjs/errors_v^3.3.0/flow_v0.94.0

declare module '@feathersjs/errors' {
	declare type Errors = { [string]: string };
	declare type Message =
		| string
		| Error
		| { message: string }
		| { errors: Errors };
	declare type Data = { errors?: Errors };

	declare class FeathersError {
		constructor(
			message: Message,
			name: string,
			code: string,
			className: string,
			data?: Data,
		): FeathersError;
		+type: 'FeathersError';
		+name: string;
		+message: string;
		+code: string;
		+className: string;
		+data?: {};
		+errors: Errors;
		+toJSON: () => {
			name: string,
			message: string,
			code: string,
			className: string,
			data?: {},
			errors: Errors,
		};
	}

	declare class BadRequest extends FeathersError {
		constructor(message: Message, data?: Data): BadRequest;
		+name: 'BadRequest';
		+code: '400';
		+className: 'bad-request';
	}

	declare class NotAuthenticated extends FeathersError {
		constructor(message: Message, data?: Data): NotAuthenticated;
		+name: 'NotAuthenticated';
		+code: '401';
		+className: 'not-authenticated';
	}

	declare class PaymentError extends FeathersError {
		constructor(message: Message, data?: Data): PaymentError;
		+name: 'PaymentError';
		+code: '402';
		+className: 'payment-error';
	}

	declare class Forbidden extends FeathersError {
		constructor(message: Message, data?: Data): Forbidden;
		+name: 'Forbidden';
		+code: '403';
		+className: 'forbidden';
	}

	declare class NotFound extends FeathersError {
		constructor(message: Message, data?: Data): NotFound;
		+name: 'NotFound';
		+code: '404';
		+className: 'not-found';
	}

	declare class MethodNotAllowed extends FeathersError {
		constructor(message: Message, data?: Data): MethodNotAllowed;
		+name: 'MethodNotAllowed';
		+code: '405';
		+className: 'method-not-allowed';
	}

	declare class NotAcceptable extends FeathersError {
		constructor(message: Message, data?: Data): NotAcceptable;
		+name: 'NotAcceptable';
		+code: '406';
		+className: 'payment-error';
	}

	declare class Timeout extends FeathersError {
		constructor(message: Message, data?: Data): Timeout;
		+name: 'Timeout';
		+code: '408';
		+className: 'timeout';
	}

	declare class Conflict extends FeathersError {
		constructor(message: Message, data?: Data): Conflict;
		+name: 'Conflict';
		+code: '409';
		+className: 'conflict';
	}

	declare class LengthRequired extends FeathersError {
		constructor(message: Message, data?: Data): LengthRequired;
		+name: 'LengthRequired';
		+code: '410';
		+className: 'length-required';
	}

	declare class Unprocessable extends FeathersError {
		constructor(message: Message, data?: Data): Unprocessable;
		+name: 'Unprocessable';
		+code: '422';
		+className: 'unprocessable';
	}

	declare class TooManyRequests extends FeathersError {
		constructor(message: Message, data?: Data): TooManyRequests;
		+name: 'TooManyRequests';
		+code: '429';
		+className: 'too-many-requests';
	}

	declare class GeneralError extends FeathersError {
		constructor(message: Message, data?: Data): GeneralError;
		+name: 'GeneralError';
		+code: '500';
		+className: 'general-error';
	}

	declare class NotImplemented extends FeathersError {
		constructor(message: Message, data?: Data): NotImplemented;
		+name: 'NotImplemented';
		+code: '501';
		+className: 'not-implemented';
	}

	declare class BadGateway extends FeathersError {
		constructor(message: Message, data?: Data): BadGateway;
		+name: 'BadGateway';
		+code: '502';
		+className: 'bad-gateway';
	}

	declare class Unavailable extends FeathersError {
		constructor(message: Message, data?: Data): Unavailable;
		+name: 'Unavailable';
		+code: '503';
		+className: 'unavailable';
	}

	declare module.exports: {
		FeathersError: typeof FeathersError,
		BadRequest: typeof BadRequest,
		NotAuthenticated: typeof NotAuthenticated,
		PaymentError: typeof PaymentError,
		Forbidden: typeof Forbidden,
		NotFound: typeof NotFound,
		MethodNotAllowed: typeof MethodNotAllowed,
		NotAcceptable: typeof NotAcceptable,
		Timeout: typeof Timeout,
		Conflict: typeof Conflict,
		LengthRequired: typeof LengthRequired,
		Unprocessable: typeof Unprocessable,
		TooManyRequests: typeof TooManyRequests,
		GeneralError: typeof GeneralError,
		NotImplemented: typeof NotImplemented,
		BadGateway: typeof BadGateway,
		Unavailable: typeof Unavailable,
		// https://github.com/facebook/flow/issues/380
		'400': typeof BadRequest,
		'401': typeof NotAuthenticated,
		'402': typeof PaymentError,
		'403': typeof Forbidden,
		'404': typeof NotFound,
		'405': typeof MethodNotAllowed,
		'406': typeof NotAcceptable,
		'408': typeof Timeout,
		'409': typeof Conflict,
		'411': typeof LengthRequired,
		'422': typeof Unprocessable,
		'429': typeof TooManyRequests,
		'500': typeof GeneralError,
		'501': typeof NotImplemented,
		'502': typeof BadGateway,
		'503': typeof Unavailable,
	};
}
