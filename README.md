# Basic Vite Template

This template should provide you with the basics you need to get started with your Vite project.  It comes with a live preview, an build script, and automatic GitHub pages deployment.

## Scripts

There are a couple of scripts you can run to complete specific actions in the app, and they are listed below.

### `npm start`

Use this command to start a live preview of your app.  Recommended for debugging and development purposes.

### `npm run build`

This command will compile all your code for production.  The default build directory is `build/` in the root, but you can change this setting in `vite.config.js`.  Just note that you'll also need to update the path in the GitHub deployments workflow in order to have it deploy properly.

### `npm run lint`

This command will format all of the code in the `public/` directory using Prettier.  You can customize the formatting settings inside of `.prettierrc`.  To fully integrate Prettier with your editor, please check out the [this article](https://prettier.io/docs/en/editors).
