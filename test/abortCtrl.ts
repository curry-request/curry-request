import { assert } from "chai"
import fetch from "node-fetch"
import request from "../src"
import AbortController from "abort-controller"
import TestServer from "./utils/server"

const local = new TestServer()

describe("abortCtrl - Use AbortController", function() {
  before(function (done) {
    local.start(done)
  })

  after(function (done) {
    local.stop(done)
  })

  it(`Should be able to abort a request`, async function () {
    const url = `${local.baseUrl}timeout?t=2222`
    const r = request(url)()("GET")()()()

    setTimeout(r.abort, 123)

    return r.catch(({ message, stack, type }) => {
      assert.equal(type, "aborted")
      assert.equal(message, "The user aborted a request.")
    })
  })

  it(`Pulling the abort trigger sync should still work`, async function () {
    const url = `${local.baseUrl}timeout?t=2222`
    const r = request(url)()("GET")()()()

    r.abort()

    return r.catch(({ message, stack, type }) => {
      assert.equal(type, "aborted")
      assert.equal(message, "The user aborted a request.")
    })
  })

  it("node fetch works like in docs", async function () {
    this.timeout(5000)

    const url = `${local.baseUrl}timeout?t=2222`
    const ac = new AbortController()
    const { signal } = ac
    const r = fetch(url, { signal })

    setTimeout(() => {
      ac.abort()
    }, 12)

    return r.catch(({ message, stack, type }) => {
      assert.equal(type, "aborted")
      assert.equal(message, "The user aborted a request.")
    })
  })
})
