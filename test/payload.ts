import { assert } from "chai"
import request from "../src"

import { echoReq } from "./utils"

describe("payload - We can pass the string array and objects as payload parameter", () => {
  it(`Should be able to use string`, (done) => {
    const out = JSON.stringify({ ciao: 42 })
    request("https://dontmatter.com/", echoReq(out))()("PUT")()(out)()
      .then((x) => x.json())
      .then((x) => {
        assert.equal(x, out)
        done()
      })
      .catch(done)
  })
  it(`Should be able to use empty object`, (done) => {
    const out = {}
    request("https://dontmatter.com/", echoReq(out))()("PUT")()(out)()
      .then((x) => x.json())
      .then((x) => {
        assert.equal(x, out)
        done()
      })
      .catch(done)
  })
  it(`Should be able to use a regular object`, (done) => {
    const out = { ciao: 42 }
    request("https://dontmatter.com/", echoReq(out))()("PUT")()(out)()
      .then((x) => x.json())
      .then((x) => {
        assert.equal(x, out)
        done()
      })
      .catch(done)
  })
  it(`Should be able to use a nested object`, (done) => {
    const out = { ciao: 42, data: ["hello", "hola"] }
    request("https://dontmatter.com/", echoReq(out))()("PUT")()(out)()
      .then((x) => x.json())
      .then((x) => {
        assert.equal(x, out)
        done()
      })
      .catch(done)
  })
  it(`Should be able to use an array`, (done) => {
    const out = ["hello", "hola"]
    request("https://dontmatter.com/", echoReq(out))()("PUT")()(out)()
      .then((x) => x.json())
      .then((x) => {
        assert.equal(x, out)
        done()
      })
      .catch(done)
  })
})
