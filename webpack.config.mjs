import path from "path"
import RemarkHTML from "remark-html"
import { URL } from "url"

const url = new URL(import.meta.url)
const dir = path.dirname(url.pathname)

console.log('dir is', dir)
const config = {
  mode: "none",
  entry: "./docs-src/src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(dir, "docs")
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.md/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [RemarkHTML]
              }
            }
          }
        ]
      }
    ]
  }
}

export default config
