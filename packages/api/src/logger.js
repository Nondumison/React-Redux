// @flow strict

import { createLogger, format, transports } from 'winston';

// type LevelType = {| info: number, error: number, debug: number |};

// Configure the Winston logger. For the complete documentation seee https://github.com/winstonjs/winston
const logger = createLogger({
	// To see more detailed errors, change this to 'debug'
	level: 'info',
	format: format.combine(format.splat(), format.simple()),
	transports: [
		new transports.Console({
			stderrLevels: ['error', 'warn'],
			consoleWarnLevels: ['error', ' warn'],
		}),
	],
});

export default logger;
