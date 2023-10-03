"use client";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/routers";

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- this is a next.js env var
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    // eslint-disable-next-line turbo/no-undeclared-env-vars -- this is a next.js env var
    return `https://${process.env.VERCEL_URL}`;
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- this is a render.com env var
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    // eslint-disable-next-line turbo/no-undeclared-env-vars -- this is a render.com env var
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- this is a next.js env var
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * {@link https://trpc.io/docs/ssr}
           **/
          url: `${getBaseUrl()}/api/trpc`,
          // You can pass any HTTP headers you wish here
          headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  /**
   * {@link https://trpc.io/docs/ssr}
   **/
  ssr: false,
});
