import { Suspense, onMount } from "solid-js"
import { isServer } from "solid-js/web"
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta"

import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"

import { JSDELIVR_CDN, TOSSFACE_CDN, WANTED_SANS_CDN } from "./constants/styles"

import "./globals.css"

export default function App() {
  onMount(() => {
    if (import.meta.env.MODE !== "production" && !isServer) {
      var script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/eruda"
      document.body.append(script)

      script.onload = function () {
        //@ts-ignore
        window.eruda.init()
      }
    }
  })

  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>왁큘레이터 - 왁물원 등급 계산기</Title>

          <Link rel="preconnect" href={JSDELIVR_CDN} crossorigin="anonymous" />
          <Link rel="stylesheet" href={WANTED_SANS_CDN} />
          <Link rel="stylesheet" href={TOSSFACE_CDN} />

          <Link rel="canonical" href="https://www.wakulator.xyz/" />

          <Meta name="description" content="왁큘레이터 - 왁물원 등급 계산기R" />
          <Meta name="keywords" content="왁물원, 왁타버스, 등급계산기, 느그자, 우왁굳" />
          <Meta name="url" content="https://www.wakulator.xyz/" />

          <Meta property="og:type" content="website" />
          <Meta property="og:title" content="WAKULATOR" />
          <Meta property="og:url" content="https://www.wakulator.xyz/" />
          <Meta property="og:description" content="왁큘레이터 - 왁물원 등급 계산기" />

          <Meta name="twitter:card" content="summary" />
          <Meta name="twitter:title" content="WAKULATOR" />
          <Meta name="twitter:description" content="왁큘레이터 - 왁물원 등급 계산기" />

          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
