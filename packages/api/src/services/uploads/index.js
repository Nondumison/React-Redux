// @flow strict

// Initializes the `uploads` service on path `/uploads`
import multer from 'multer';
import blobService from 'feathers-blob';
import fs from 'fs-blob-store';

import hooks from './hooks';

import type { App } from 'types/feathers.types';

const multipartMiddleware = multer();

// File storage location. Folder must be created before upload.
// Example: './uploads' will be located under feathers app top level.
const blobStorage = fs('./uploads');

export default (app: App) => {
	// Initialize our service with any options it requires
	app.use(
		'/uploads',
		multipartMiddleware.single('uri'),
		(req, _, next) => {
			req.feathers.file = req.file;
			next();
		},
		blobService({
			Model: blobStorage,
		}),
	);

	// Get our initialized service so that we can register hooks
	const service = app.service('uploads');

	service.hooks(hooks);
};
