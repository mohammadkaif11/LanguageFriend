/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        domains: [
          "public.blob.vercel-storage.com",
          "res.cloudinary.com",
          "abs.twimg.com",
          "pbs.twimg.com",
          "avatars.githubusercontent.com",
          "www.google.com",
          "flag.vercel.app",
          "illustrations.popsy.co",
          "storage.googleapis.com",
          "storage.cloud.google.com",
          "images.unsplash.com",
          "http://www.w3.org/2000/svg"
        ],
      },

};


export default config;
