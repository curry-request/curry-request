import fs from "fs"
import path from "path"
import { URL } from "url"
import HtmlWebpackPlugin from 'html-webpack-plugin'

const url = new URL(import.meta.url)
const dir = path.dirname(url.pathname)
const packageJson = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), "utf8"))

class Stripper {
  apply (compiler) {
    compiler.hooks.compilation.tap('Stripper', (compilation) => {
      console.log('Stripper going at it')

      // Static Plugin interface |compilation |HOOK NAME | register listener
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'Stripper', // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
          data.html = data.html.replace('<script type="module" src="src/index.js"></script>', '')
          data.html = data.html.replace('xx.xx.xx', packageJson.version)
          cb(null, data)
        }
      )
    })
  }
}

const config = {
  mode: "none",
  entry: "./docs-src/src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(dir, "docs")
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template:  path.resolve(dir, "docs-src/index.html")
    }),
    new Stripper()
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
    ]
  }
}

export default config
