Migration notes

- This repository originally contains a React + Vite app under `src/app`.
- I scaffolded minimal SvelteKit files so you can run SvelteKit alongside this code and begin converting components.

Steps to continue migration:

1. Install new dependencies:

```bash
npm install --save-dev @sveltejs/adapter-auto @sveltejs/kit
npm install svelte
```

2. Run dev server:

```bash
npm run dev
```

3. Convert React components from `src/app` into Svelte components under `src/lib` and route them under `src/routes`.

4. Update or remove React-specific dependencies from `package.json` as you complete the migration.
