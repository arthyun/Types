/// <reference types="vite/client" />

// interface ImportMetaEnv {
//   readonly VITE_APP_PROXY: string;
//   // more env variables...
// }

interface ImportMeta {
  env: {
    VITE_APP_PROXY?: string;
  };
}
