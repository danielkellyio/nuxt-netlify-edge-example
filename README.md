# Accessing Netlify Edge Context in Nuxt (and Why You Might Want To)

Nitro abstracts away a lot of platform functionality like key-value storage, route caching, and more. But not all of it! There's more useful information available to us in the Netlify function context.

Netlify Functions and Edge Functions expose a runtime context with geolocation, client IP, cookies, site metadata, and more. You can read this context from Nuxt server routes to personalize responses, implement regional logic, and more.

## How to Access the Netlify Edge Context

In an api endpoint, or on the server side on a page/component, you can access the context on the `Netlify` global.

```tsx
const netlifyContext = (globalThis as any)?.Netlify?.context ?? null;
```

The resulting `netlifyContext` object will have all kinds of useful information. Here's an example of that context object:

```json
{
  "cookies": {},
  "deploy": {
    "id": "a1b2c3d4e5f6g7h8i9j0k1l2",
    "published": false
  },
  "geo": {
    "city": "Tuscaloosa",
    "country": {
      "code": "US",
      "name": "United States"
    },
    "subdivision": {
      "code": "AL",
      "name": "Alabama"
    },
    "timezone": "America/Chicago",
    "latitude": 0.0,
    "longitude": 0.0,
    "postalCode": "00000"
  },
  "ip": "0.0.0.0",
  "params": {
    "0": "api/geo"
  },
  "requestId": "01K237BX82FXV254MXMZPCH0BB",
  "spanID": "",
  "site": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "test",
    "url": "<http://test.netlify.app>"
  },
  "account": {
    "id": "a1b2c3d4e5f6g7h8i9j0k1l2"
  },
  "server": {
    "region": "aws-us-east-1"
  },
  "url": "<https://regal-cactus-1b3289.netlify.app/api/geo>"
}
```

You can view the full Netlify Edge Function `Context` [shape in the docs](https://docs.netlify.com/build/edge-functions/api/#netlify-specific-context-object)

## Enable Edge Functions for Nuxt

This context is available in both regular functions and edge function contexts. If you want run the Nuxt server in an edge function, set the following environment variable in the Netlify dashboard:

```bash
# Netlify UI → Site settings → Environment variables
SERVER_PRESET=netlify_edge
```

Reference: Nuxt’s Netlify deployment guide ([Nuxt → Netlify](https://nuxt.com/deploy/netlify)).

## Some Practical Use Cases for Netlify Edge Context in Nuxt

Now that you know the "how", let's look at some practical use cases for Netlify Context in Nuxt.

- Localization and regional content
  - **Personalize by country/city**: Use `context.geo.country.code` to select copy, currency, or shipping options.
  - **Default locale**: Redirect or rewrite to localized pages based on `geo` with care for caching.
- Pricing and promotions by region
  - Show region-specific pricing, taxes, or promo banners (e.g., EU VAT rules).
- Feature flags by geography
  - Roll out features to specific regions first; combine with cookies to persist user experience.
- Fraud prevention and abuse mitigation
  - Use `context.ip` for basic rate limiting or blocklists before hitting origin services.
- Fine-grained caching on Netlify
  - When varying by cookies or query, prefer `Netlify-Vary` to keep cache cardinality under control. See advanced Nuxt on Netlify caching guidance ([guide](https://developers.netlify.com/guides/isr-and-advanced-caching-with-nuxt-v4-on-netlify/)).
  - For API routes, disable caching for per-user or per-location responses (as shown in `routeRules`).
- A/B testing at the edge
  - Assign variants in an Edge API route using cookies; render downstream with consistent variant keys.

There are certainly some exciting opportunities when you combine the Netlify Context with the power of Nuxt.

## Other Considerations and Troubleshooting

This approach is not without its caveats. If implementing, do consider the following:

- Geo- or user-specific responses should generally set `Cache-Control: no-store` or use `Netlify-Vary` with a small, controlled set of keys to capture the right info for the right user.
- `Netlify.context` is null locally. This is expected. You'll need to verify on a deployed Netlify site.
- If you’d like to run some middleware on the edge before running your Nuxt server in a non-edge function, that might meet your needs better (for example, I recently had to block some traffic based on location. An edge function in-front of my Nuxt server worked great!).

## Conclusion

Do you have any other use cases for Netlify Context in Nuxt? Let us know in the comments! If you'd like to learn more about Nuxt, checkout the complete video course [Mastering Nuxt](https://masteringnuxt.com/).
