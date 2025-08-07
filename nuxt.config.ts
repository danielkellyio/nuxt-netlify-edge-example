// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  routeRules: {
    "/api/geo": {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  },
});
