import { Suspense } from "solid-js"
import { MetaProvider, Title, Link } from "@solidjs/meta"

import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"

import { JSDELIVR_CDN, TOSSFACE_CDN, WANTED_SANS_CDN } from "./constants/styles"

import "./globals.css"

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>왁큘레이터 - Wakulator</Title>

          <Link rel="preconnect" href={JSDELIVR_CDN} crossorigin="anonymous" />
          <Link rel="stylesheet" href={WANTED_SANS_CDN} />
          <Link rel="stylesheet" href={TOSSFACE_CDN} />

          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
