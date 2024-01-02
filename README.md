# Event Manager

A simple node REST api with jwt authentication.

## Tech Stack

- Express
- MongoDB

## Installation steps

- Clone the repository
- Run `yarn install` or `npm install` or `pnpm install`
- Create .env file and enter your mongodb dev and test url
- also create a token for jwt authentication

.env file should look like this
```sh
DB_URI=$mongodb_url
DB_URI_TEST=$mongodb_url
TOKEN=$jwt_secret
```
### run test to check whether the app is working or not
- Run `yarn test` or `npm run test` or `pnpm test

### start the app
- Run `yarn start` or `npm run start` or `pnpm start`

Visit `http://localhost:5555/docs` to see the api documentation

## Licence

MIT © 2023