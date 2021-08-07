import http from "http"
import type { Server, IncomingMessage, ServerResponse } from "http"
import { URL, parse } from "url"

export default class TestServer {
  private server: Server
  public port: number
  public baseUrl: string
  public hostname = "localhost"

  constructor(args?: { port: number }) {
    const { port } = args || {}
    this.server = http.createServer(this.router)
    this.port = port || 3333
    this.baseUrl = `http://${this.hostname}:${this.port}/`

    // copied most of this server implementation from node-fetch,
    // same for the lines below on dealing with keepAliveTimeout and socket timeout
    this.server.keepAliveTimeout = 1000
    this.server.on("connection", function (socket) {
      socket.setTimeout(1500)
    })
    this.server.on("error", function (err) {
      console.log(err.stack)
    })
  }

  start(cb: () => void) {
    this.server.listen(this.port, this.hostname, cb)
  }

  stop(cb: () => void) {
    this.server.close(cb)
  }

  getUrl = (pathname?: string): URL => {
    return new URL(`http://localhost${pathname || ""}`)
  }

  router = (req: IncomingMessage, res: ServerResponse) => {
    const reqUrl = req.url as string

    const url = this.getUrl(reqUrl)

    if (url.pathname === "/timeout") {
      const t = Number(url.searchParams.get("t")) || 2000

      setTimeout(() => {
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.end("timeout")
      }, t)
    }
  }
}
