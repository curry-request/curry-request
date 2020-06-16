import { assert } from "chai"
import request from "../src"
import { fetch } from "cross-fetch"

import { mockedFetch } from "./utils"
import nodeFetch from "node-fetch"
import isoUnfetch from "isomorphic-unfetch"

const alternativeFetchImpl = mockedFetch({ status: 200 }) as typeof fetch

const alternatives = [
  alternativeFetchImpl,
  (nodeFetch as unknown) as typeof fetch,
  (isoUnfetch as unknown) as typeof fetch
]

describe("alternativeFetchImpl - We can exchange fetch implementations", () => {
  alternatives.forEach((impl) => {
    it(`Should be able to use mockedFetch`, (done) => {
      request(
        "https://httpbin.org/",
        impl
      )({})("GET")("ip")()()
        .then((x) => {
          assert.equal(x.status, 200)
          done()
        })
        .catch(done)
    })
  })
})
