# Sample API

This is a sample application for new ELDO software projects. Currently this is
focused on the front-end only.

To create a new app:

- clone this repo,
- remove the `.git` folder,
- run `git init`,
- apply renames in module in: `package.json`
- edit `default.json`, change the postgres connection string to the correct
  details (you should create a new DB user and new DB for your app).
- change the `default.json` JWT secret to a new one for your app

## Tech stack

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

1. Create your DB and DB user
1. Make sure you have [NodeJS](https://nodejs.org/) and [yarn](https://yarnpkg.com/) installed.
1. Install your dependencies
   ```
   cd path/to/sample-api; yarn
   ```
1. Create `.env.*.local`. See Local Environment below for more details.
1. Start your app
   ```
   yarn start
   ```

## Testing

Simply run `yarn test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ yarn global add @feathersjs/cli         # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Local Environment

create a `.env.*.local` file in the root directory, with your default password set as `DEFAULT_ADMIN_PW`.
For example:

```
/*.env.*.local*/
DEFAULT_ADMIN_PW=default
```

The `*` refers to what `NODE_ENV` you are using, i.e `NODE_ENV=development` === `.env.development.local`

Documentation for more information:

- [dotenv-flow](https://github.com/kerimdzhanov/dotenv-flow)
- [dotenv](https://github.com/motdotla/dotenv)

## Migrating

For a manual migration, simply run `yarn migrate`.

All migration scripts should be kept in `src/migrations/scripts`

Note: The database will migrate every time `yarn start` or `yarn start:dev` is run.

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

**0.1.0**

- Initial release
