import crossFetch from "cross-fetch"
import AbortController from "abort-controller"

interface Abortable extends Promise<Response> {
  abort: () => void
}

type AbortableFetch = Promise<Response> & Abortable

const request =
  (baseUrl: string, alternativeFetchImpl?: typeof fetch) =>
  (baseHeaders?: { [k: string]: string }) =>
  (method: string) =>
  (route?: string) =>
  (payload?: string | object) =>
  (token?: string): AbortableFetch => {
    const headers = baseHeaders || {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const fetch = alternativeFetchImpl || crossFetch

    // we add the abort method
    const abortCtrl = new AbortController()
    const signal = abortCtrl.signal

    const httpConfig: RequestInit = {
      method,
      headers,
      signal
    }

    if (payload) {
      httpConfig.body =
        typeof payload === "object" ? JSON.stringify(payload) : payload
    }

    const res = fetch(`${baseUrl}${route || ""}`, httpConfig) as AbortableFetch

    res.abort = () => {
      abortCtrl.abort()
    }

    return res
  }

export default request
