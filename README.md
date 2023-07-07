# The account app

This is a monorepo powered by NxJS that contains an Angular frontend(known as the client) and a NestJS backend (known as the API).

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

Once done, to run the applications, please open two terminal windows, one for each application.

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

## NxJS

For other useful commands with the NxJS system, you can also use the [VSCode extension found here](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)

## The user experience

The frontend application consists of two pages:

- The account table
- The detailed view for the account.

The account table lists a number of accounts returned from the backend, the Bitcoin value is converted into USD dollars using the exchange rate provided by the backend.

The exchange rate changes every 30 seconds, and the USD values are reflected by this change.

**The account detail page**

You can access the detail page of the account by clicking on one of the account table rows.

This page consists of a table of transactions associated with the selected account.

Each 20 to 40 seconds, a new transaction is added to a random account. When an account is updated, it will flash green if the balance has increased, red if decreased, or nothing if the value remains the same.
