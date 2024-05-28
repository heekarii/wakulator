// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"

import { Show, isServer } from "solid-js/web"
import { extractCss } from "goober"

export default createHandler(() => {
  const css = extractCss()

  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="ko">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0" />
            <link rel="icon" href="/favicon.ico" />
            {assets}

            <Show when={isServer}>
              <style id="_goober">{css || ".loader { background: rgb(255, 255, 255); }"}</style>
            </Show>
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  )
})
