export default class Logger {
  nodeStore = {}
  node = null
  btnNode = null

  setBlock = (selector, btnSelector) => {
    if (this.nodeStore[selector]) {
      this.node = this.nodeStore[selector]
    } else {
      this.node = this.nodeStore[selector] = document.querySelector(selector)
    }
    if (this.nodeStore[btnSelector]) {
      this.btnNode = this.nodeStore[btnSelector]
    } else {
      this.btnNode = this.nodeStore[btnSelector] =
        document.querySelector(btnSelector)
    }

    this.node.textContent = ""

    return this.printOutput
  }

  printOutput = (...logArgs) => {
    if (this.btnNode) {
      this.btnNode.removeAttribute("disabled")
      this.btnNode = null
    }

    logArgs.forEach((x) => {
      const content = JSON.stringify(x, null, 2)
      this.node.append(`\n${content} \n `)
    })
    console.log(...logArgs)
  }
}
