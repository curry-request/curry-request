import { assert } from "chai"
import request from "../lib"
import { fetch } from "cross-fetch"
import mockedFetch from "./utils/mockedFetch"

const alternativeFetchImpl = mockedFetch({ status: 200 }) as typeof fetch

describe("We can exchange fetch implementations", () => {
  it("Should be able to use mockedFetch", (done) => {
    request(
      "https://httpbin.org/",
      alternativeFetchImpl
    )({})("GET")("ip")()()
      .then((x) => {
        assert.equal(x.status, 200)
        done()
      })
      .catch(done)
  })
})
