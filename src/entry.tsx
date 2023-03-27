import React, { Suspense } from 'react'
import * as styled from 'styled-components'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

import App from './components/App.js'

declare global {
  interface Window {
    styled: typeof styled
    React: typeof React
    ReactDOM: typeof ReactDOM
    createRoot: typeof createRoot
  }
}

window.styled = styled
window.React = React
window.ReactDOM = ReactDOM
window.createRoot = createRoot

const Application = (
  <Suspense fallback="...is loading">
    <App />
  </Suspense>
)

export default {
  Application,
}
