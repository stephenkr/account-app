# The account app

This is a NxJS monorepo that contains an Angular frontend(known as the client) and a NestJS backend (known as the API).

## Installation

To get started, install the dependencies using:

```bash
yarn install
```

**Seed the database**

Please ensure you have a Mongo DB server running locally on your machine.

Also the API server will create a database called `nest`.

> Ensure you do not have a database called `nest` before running, to prevent losing data.

To seed the database you can run:

```bash
yarn seed:api
```

Once done, to run the applications, please open two terminal commands, one for each application.

**To run the client**

```bash
yarn serve:client
```

**To run the API server**

```bash
yarn serve:api
```

**Finally**

The API server should be available at http://localhost:4000

And the client should be available at http://localhost:4200

## Other useful commands

### Testing

You can run the unit tests for the client using:

```bash
yarn test:client
```

You can run the unit tests for the api using:

```bash
yarn test:api
```

### Linting

You can run the lint task for both projects using:

```bash
yarn lint:all
```

### NxJS

For other useful commands with the NxJS system, you can also use the [VSCode extension found here](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
