const sveltePreprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess(),
  vite: {
    resolve: {
      alias: {        
        "@gitgrok/generated-api": path.resolve("../libs/generated-api/src/index.ts"),
        "@gitgrok/isomorphic": path.resolve("../../../libs/api-interfaces/src/index.ts")    
      }
    }
  }
};
