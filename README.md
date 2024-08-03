# SanctuAnimal

This is a demo web app for management of animals at animal sanctuaries.

## How to run the app locally

This turborepo uses [pnpm](https://pnpm.io) as a package manager as well as [docker compose](https://docs.docker.com/compose/) to run the app locally.

```
npm install -g pnpm
pnpm install --frozen-lockfile
docker compose up
```

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
