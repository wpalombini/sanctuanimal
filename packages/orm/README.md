## Updating schema

- Update the `./prisma/schema.prisma` based requirements.
- Run the following command to create a new migration file:

```
pnpm prisma migrate dev --name init
```

Where `init` is the name of the migration file. Choose a name related to the changes you are making on the schema.

## Running the database

```
pnpm db:dev:up
```

The above command will run docker compose up.

```
pnpm prisma migrate dev
```

The above command will migrate the db schema.

```
pnpm db:dev:seed
```

The above command will seed the database.

## Resetting the database

```
docker compose down --volumes
```

The above command will remove the docker volume that holds the database.

For more details, [see this link](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#production-and-testing-environments).
