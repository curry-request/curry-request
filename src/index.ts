/// <reference path="../node_modules/cross-fetch/index.d.ts" />
import fetch from 'cross-fetch'

const request = 
    (baseUrl: string) =>
    (baseHeaders: {[k: string]: string}) =>
    (method: string) =>
    (route?: 'string') =>
    (payload?: {[k: string]: string}) =>
    (token?: string) => {
      const headers = baseHeaders
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const config = {
        method,
        headers,
        body: JSON.stringify(payload)
      }

      return fetch(`${baseUrl}${route || ''}`, config)
}

export default request
