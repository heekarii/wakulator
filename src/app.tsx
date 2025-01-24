import { Suspense, onMount } from "solid-js"
import { isServer } from "solid-js/web"
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta"

import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"

import { JSDELIVR_CDN, TOSSFACE_CDN, WANTED_SANS_CDN } from "~/constants/styles"
import ToastMessage from "~/components/ToastMessage"

import "./globals.css"

export default function App() {
  onMount(() => {
    if (import.meta.env.MODE !== "production" && !isServer) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/eruda"
      document.body.append(script)

      script.onload = function () {
        // Init eruda storage
        window.localStorage.removeItem("eruda-console")
        window.localStorage.removeItem("eruda-dev-tools")
        window.localStorage.removeItem("eruda-elements")
        window.localStorage.removeItem("eruda-entry-button")
        window.localStorage.removeItem("eruda-resources")
        window.localStorage.removeItem("eruda-sources")

        window.eruda.init()
      }
    }
  })

  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>왁큘레이터 - 왁물원 등급 계산기</Title>

          <Link rel="preconnect" href={JSDELIVR_CDN} crossOrigin="anonymous" />
          <Link rel="preload" href={WANTED_SANS_CDN} crossOrigin="anonymous" as="style" />
          <Link rel="preload" href={TOSSFACE_CDN} crossOrigin="anonymous" as="style" />

          <Link rel="stylesheet" href={WANTED_SANS_CDN} crossOrigin="anonymous" />
          <Link rel="stylesheet" href={TOSSFACE_CDN} crossOrigin="anonymous" />

          <Link rel="canonical" href="https://www.wakulator.xyz/" />

          <Meta name="description" content="왁큘레이터 - 왁물원 등급 계산기" />
          <Meta name="keywords" content="왁물원, 왁타버스, 등급계산기, 느그자, 우왁굳" />
          <Meta name="url" content="https://www.wakulator.xyz/" />

          <Meta property="og:type" content="website" />
          <Meta property="og:title" content="WAKULATOR" />
          <Meta property="og:url" content="https://www.wakulator.xyz/" />
          <Meta property="og:description" content="왁큘레이터 - 왁물원 등급 계산기" />

          <Meta name="twitter:card" content="summary" />
          <Meta name="twitter:title" content="WAKULATOR" />
          <Meta name="twitter:description" content="왁큘레이터 - 왁물원 등급 계산기" />

          {/* 네이버 SEO - 소유 확인 */}
          <Meta name="naver-site-verification" content="0957a708b599810fd51e1c548629e1a4f23f71b1" />

          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
      <ToastMessage />
    </Router>
  )
}
