# React Component Development (InputField, DataTable)

Accessible React + TypeScript components styled with Tailwind, documented in Storybook 9 (React + Vite), tested with Vitest + Testing Library, and published via Chromatic for a live preview link.

## Live Storybook 
[Preview](https://www.chromatic.com/setup?appId=68bdc3331b3fb7447c2ee44a)
```plane
https://www.chromatic.com/setup?appId=68bdc3331b3fb7447c2ee44a
```

## Clone Repo :
```plane
https://github.com/alankritip/React-Component-Development-
```

## Folder structure

```plane
src/
  components/
    InputField/
      InputField.tsx
      InputField.test.tsx
      InputField.stories.tsx
    DataTable/
      DataTable.tsx
      DataTable.test.tsx
      DataTable.stories.tsx
  App.tsx
  index.css
  main.tsx
.storybook/
  main.ts
  preview.ts
.github/
  workflows/
    chromatic.yml
tailwind.config.js
postcss.config.js
vite.config.ts
vitest.setup.ts
```
## Tech stack

* React + Vite + TypeScript for fast DX and typed APIs.

* Tailwind CSS for utility-first, responsive styling in Storybook.

* Storybook 9 (framework: @storybook/react-vite) for isolated component docs and playground.

* Vitest + Testing Library for unit and interaction tests.

* Chromatic for publishing Storybook and sharing review links.

## Components
### InputField :
Label, helper, error, disabled, invalid, loading states; variants: outlined, filled, ghost; sizes: sm, md, lg; optional clear button and password visibility toggle; dark/light ready.

### DataTable

Typed columns and data, client-side sorting (asc/desc/none), single/multiple row selection, select-all with indeterminate, loading and empty states, responsive table container.

## Getting started
### Install dependencies
```plane
npm i
```
### Run the Vite app
```plane
npm run dev and open http://localhost:5173
```
### Run Storybook
```plane
npm run storybook and open http://localhost:6006
```
### Build Storybook
```plane
npm run build-storybook to emit storybook-static for deployment.
```
### Tests
```plane
npm test for a CI-friendly run or npm run test:watch during development.
```
## Scripts
* dev: Vite dev server.

* build: Vite production build.

* storybook: Start Storybook 9 in dev mode.

* build-storybook: Build Storybook static site.

* test / test:watch: Run Vitest with jsdom and Testing Library.

## Storybook 9 configuration highlights
* Framework: @storybook/react-vite with stories under src/**/*.stories.(ts|tsx|mdx). 

* Tailwind: import src/index.css in .storybook/preview.ts and ensure PostCSS is used in Storybook’s Vite build.

* Dark mode: preview decorator toggles Tailwind’s class-based darkMode for quick visual checks.

## Chromatic deployment
* Install Chromatic in devDependencies and run npx chromatic --project-token=<TOKEN> to publish and get a permanent preview URL.

* GitHub Actions: .github/workflows/chromatic.url builds and publishes on push/PR using the CHROMATIC_PROJECT_TOKEN secret

## Screenshots and GIFs
* [inputfield.gif](https://github.com/alankritip/React-Component-Development-/blob/main/docs/media/inputfields.gif) 
* [datatable.gif](https://github.com/alankritip/React-Component-Development-/blob/main/docs/media/datatables.gif)

## License

[MIT](https://choosealicense.com/licenses/mit/)