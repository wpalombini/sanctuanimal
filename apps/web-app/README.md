## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using Docker

```
docker build -t walterpalombini/sanctuanimal-web-app:0.0.1 -f ./apps/web-app/Dockerfile . --no-cache
```

```
docker run -p 8080:3000 --env-file ./apps/web-app/.env.production.local walterpalombini/sanctuanimal-web-app:0.0.1
```

Then navigate to localhost:8080
