## Updating schema

- Update the `./prisma/schema.prisma` based requirements.
- Run the following command to create a new migration file:

```
pnpm prisma migrate dev --name init
```

Where `init` is the name of the migration file. Choose a name related to the changes you are making on the schema.

For more details, [see this link](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#production-and-testing-environments).
