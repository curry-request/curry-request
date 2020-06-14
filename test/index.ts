import { assert } from "chai"
import request from "../lib"

describe("we can make a simple fetch request", () => {
  it("should receive a status of 200", (done) => {
    request("https://httpbin.org/")({})("GET")("ip")()()
      .then((x) => {
        assert.equal(x.status, 200)
        done()
      })
      .catch(done)
  })
}
