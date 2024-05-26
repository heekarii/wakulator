// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

import { Show, isServer } from "solid-js/web";
import { extractCss } from "solid-styled-components";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="ko">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}

          <Show when={isServer}>
            <style id="_goober">{extractCss()}</style>
          </Show>
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
