// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"

import { Show, isServer } from "solid-js/web"
import { extractCss } from "goober"

export default createHandler(() => {
  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="ko">
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}

            <Show when={isServer}>
              <style id="_goober">{extractCss() || ".loader { background: #ffffff; }"}</style>
            </Show>

            {/* Google Tag Manager */}
            <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MZK9P927');`}</script>
            {/* End Google Tag Manager */}
          </head>

          <body>
            {/* Google Tag Manager (noscript) */}
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-MZK9P927"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              ></iframe>
            </noscript>
            {/* End Google Tag Manager (noscript) */}

            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  )
})
