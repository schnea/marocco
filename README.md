# Marocco

Your one-stop illegal horseracing shop. 

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

If you are running the app for the first time, you will also need to setup the ORM: 
```bash
npm run db:push
```

you can then set the horses in the drizzle web UI with 
```bash 
npm run db:studio
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
