import { assert } from "chai"
import cr from "../src"

const apiRequest = cr("https://jsonplaceholder.typicode.com")({
  "Content-Type": "application/json",
  Accept: "application/json"
})
const apiGet = apiRequest("GET")
const getTodosById = (id: string) => apiGet(`/todos/${id}`)()()
const apiPost = apiRequest("POST")
const postTodo = (payload: { [s: string]: any }) => apiPost("/todos")(payload)()

// doing these calls on the real network are error prone
describe("index - Smoke tests", () => {
  it("Should receive a status of 200", (done) => {
    cr("https://httpbin.org/")({})("GET")("ip")()()
      .then((x) => {
        assert.equal(x.status, 200)
        done()
      })
      .catch(done)
  })

  it("Doc get test should work", (done) => {
    getTodosById("1")
      .then((res) => {
        assert.equal(res.status, 200)
        return res.json()
      })
      .then((res) => {
        assert.equal(res.id, 1)
        done()
      })
      .catch(done)
  })

  it("Should be able to cast 'baseUrl' parameter", () => {
    const req = cr()({})("GET")("ip")()()

    req.then((x) => {
      assert.equal(x.status, 404)
    })
  })
  /*
   * sometimes typicode errors out 
  it("Doc post test should work", function (done) {
    this.timeout(0)
    postTodo({ title: "BuyMilk", completed: false })
      .then((res) => {
        assert.equal(res.status, 201)
        return res.json()
      })
      .then((res) => {
        assert.equal(res.title, "BuyMilk")
        done()
      })
      .catch(done)
  })
  */
})
