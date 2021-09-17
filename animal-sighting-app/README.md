# Example Project With PostgreSQL, Express, and React

End-to-end React app backed by an Express API server, persisting data to
PostgreSQL database. The project has a very simple interface that fetches data
from a single table in the database, and allows you to add rows to that table.

[See the app in action][live].

[![Deploy to Heroku][deploy-badge]][deploy-workflow]
[![Reset Heroku DB][reset-badge]][reset-workflow]

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Prerequisites

### Docker

This project relies on Docker to run the PostgreSQL server. You must install
Docker first before continuing.

Use one of these methods:

- Use [Homebrew][] on macOS: `brew install --cask docker`
- [Follow the instructions on the Docker website][docker-www]

Once you've installed Docker Desktop, you'll need to launch the app. On macOS,
it's located in `/Applications/Docker`.

### Node

You'll need to install Node v14 or above. [`nvm`][nvm] is highly recommended.

## Set Up the Development Environment

### Install NPM Packages

```sh
npm install
```

### Set Up `postgres` User Password and Database Name

We need to set up couple pieces of information in order to start a new
PostgreSQL server instance, as well as to connect to it later from the Express
server.

1. Copy the example environment file

   ```sh
   cp .env.example .env
   ```

2. You can choose to edit `.env` or just use as-is.

[See the PostgreSQL Docker image documentation for more
information][dh-postgres].

### Initialize the Database

Let's set up the database server, create the application database, and seed it
with some data. You only need to do this the first time you set up your
development environment.

```sh
npm run db:init
```

ℹ️ If you ever need to start over with the database, you can run this command
again which will delete your existing data and start from scratch.

## Start the Development Environment

```sh
npm start
```

Visit <http://localhost:3000>.

## Shut Down the Development Environment

1. `Ctrl-C` to stop the Express and React development servers.
1. `npm run db:stop` to stop and destroy the PostgreSQL Docker container. Don't
   worry, your data is safe.

## Need to Start a `psql` Session?

```sh
npm run psql
```

## Want More Details?

- [Read about the application stack](docs/application-stack.md).
- [Read about the Express server](server/README.md).
- [Read about the React app](app/README.md).

## Deployment

[Read about setting up and deploying to Heroku](docs/deployment.md).

[deploy-badge]: https://github.com/gsong/express-react-project-example/actions/workflows/deploy.yaml/badge.svg
[deploy-workflow]: https://github.com/gsong/express-react-project-example/actions/workflows/deploy.yaml
[dh-postgres]: https://hub.docker.com/_/postgres
[docker-www]: https://docs.docker.com/get-docker/
[homebrew]: https://brew.sh
[live]: https://tt-express-react-example.herokuapp.com
[nvm]: https://github.com/nvm-sh/nvm
[reset-badge]: https://github.com/gsong/express-react-project-example/actions/workflows/reset-db.yml/badge.svg
[reset-workflow]: https://github.com/gsong/express-react-project-example/actions/workflows/reset-db.yml

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/aedward8"><img src="https://avatars.githubusercontent.com/u/63216164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Abigail Edwards</b></sub></a><br /><a href="#mentoring-aedward8" title="Mentoring">🧑‍🏫</a> <a href="#ideas-aedward8" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/gsong/express-react-project-example/issues?q=author%3Aaedward8" title="Bug reports">🐛</a> <a href="https://github.com/gsong/express-react-project-example/commits?author=aedward8" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://blog.ndpsoftware.com/"><img src="https://avatars.githubusercontent.com/u/54177?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Peterson</b></sub></a><br /><a href="https://github.com/gsong/express-react-project-example/commits?author=ndp" title="Code">💻</a> <a href="#mentoring-ndp" title="Mentoring">🧑‍🏫</a></td>
    <td align="center"><a href="https://github.com/carbonsoda"><img src="https://avatars.githubusercontent.com/u/22334165?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Avery</b></sub></a><br /><a href="#infra-carbonsoda" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/gsong/express-react-project-example/commits?author=carbonsoda" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/sunnybrie"><img src="https://avatars.githubusercontent.com/u/76143251?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brie Klassen</b></sub></a><br /><a href="https://github.com/gsong/express-react-project-example/commits?author=sunnybrie" title="Documentation">📖</a> <a href="#ideas-sunnybrie" title="Ideas, Planning, & Feedback">🤔</a> <a href="#mentoring-sunnybrie" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/gsong/express-react-project-example/issues?q=author%3Asunnybrie" title="Bug reports">🐛</a> <a href="https://github.com/gsong/express-react-project-example/commits?author=sunnybrie" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/gsong"><img src="https://avatars.githubusercontent.com/u/607420?v=4?s=100" width="100px;" alt=""/><br /><sub><b>George Song</b></sub></a><br /><a href="https://github.com/gsong/express-react-project-example/commits?author=gsong" title="Code">💻</a> <a href="https://github.com/gsong/express-react-project-example/commits?author=gsong" title="Documentation">📖</a> <a href="#infra-gsong" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-gsong" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/m3ia"><img src="https://avatars.githubusercontent.com/u/38749469?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Meia</b></sub></a><br /><a href="https://github.com/gsong/express-react-project-example/commits?author=m3ia" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/ZelmaSedano"><img src="https://avatars.githubusercontent.com/u/55029831?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ZelmaSedano</b></sub></a><br /><a href="#tutorial-ZelmaSedano" title="Tutorials">✅</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
