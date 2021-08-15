const path = require("path")

module.exports = {
  mode: "none",
  entry: "./docs-src/src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "docs")
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}
