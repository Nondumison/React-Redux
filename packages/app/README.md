# Sample app

This is a sample application for new ELDO software projects. Currently this is
focused on the front-end only.

To create a new app:

- clone this repo,
- remove the `.git` folder,
- run `git init`,
- apply renames in module in:
  - `package.json`;
  - `public/manifest.json`;
  - `public/index.html`.

## Tech stack

This project is bootstrapped with [Create React
App](https://facebook.github.io/create-react-app/), and its configuration is
customisable using [rescripts](https://github.com/harrysolovay/rescripts).

We’ve updated React to a pre-release version that supports
[hooks](https://reactjs.org/docs/hooks-intro.html), which are to be preferred
over class-based components wherever possible.

This app is built in modern JavaScript using [React](https://reactjs.org/) to
render UI, and
[SAM](https://sam.js.org/)-in-[Meiosis](https://meiosis.js.org/) for state
management.

Modules are resolved using
[babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver),
with `./src` set as the `root`.

We have a custom ESLint setup that is largely based on [Airbnb’s JavaScript
styleguide](https://github.com/airbnb/javascript). See `.eslintrc.json` for
specifics.

We use [Flow](https://flow.org/) to statically typecheck our code. See
`.flowconfig` for the specific configuration.

We use [MaterialUI](https://material-ui.com/) as our base component library.

We use [Prettier](https://prettier.io/) to automatically format the code.

Create React App comes with support for
[`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros),
and we’ve included some DX plugins:

- [`babel-plugin-console`](https://github.com/mattphillips/babel-plugin-console)
  Exports a `scope` function that functions like `console.log` and has the
  same API, but additionally outputs the current scope to the console.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br> You will also see any lint errors
in the console.

### `yarn storybook`

Runs the app’s [Storybook](https://www.learnstorybook.com/)<br> Open
[http://localhost:3000](http://localhost:9009) to view it in the browser.

The page will reload if you make edits.<br> You will also see any lint errors
in the console.

Use this mode to design UI components in isolation from the application itself.

### `yarn test`

Launches the test runner in the interactive watch mode.<br> See the section
about [running
tests](https://facebook.github.io/create-react-app/docs/running-tests) for
more information.

### `yarn build`

Builds the app for production to the `build` folder.<br> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn cz`

This creates a commit using the
[commitizen](https://commitizen.github.io/cz-cli/) [conventional changelog
adapter](https://github.com/commitizen/cz-conventional-changelog). This makes
it easier to create a commit message that will pass the
[commit linter](https://marionebl.github.io/commitlint/).

### `yarn release`

This will use
[`standard-version`](https://github.com/conventional-changelog/standard-version)
to:

- bump the version in package.json,
- update CHANGELOG.md,
- commit package.json and CHANGELOG.md,
- tag a new release

When pushing a new release please use the `--follow-tags` option so that the
version tags are also pushed, e.g.:

```
git push --follow-tags origin master
```

## Contributing

We use the Conventional Commits standard for commit messages.

Do not work directly on the `master` branch, instead create a feature branch
to do your work. When you’re ready to merge in your changes, please squash and
rebase your work first.

You can also set `git config branch.master.mergeoptions "--ff-only"` to ensure
that you do not commit non-fast-forward commits to the `master` branch.
