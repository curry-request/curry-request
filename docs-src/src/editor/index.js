import curryReq from "/lib/index.es.js"
import { doc as configDoc } from "./config"
import { doc as actionsDoc } from "./actions"
import { doc as httpCallDoc } from "./http-get.js"

import { bootstrapEditor } from "./util.js"
import Logger from "./Logger"

const configDocLinesLength = configDoc.split("\n").length
const actionsDocLinesLength = actionsDoc.split("\n").length
const httpCallDocLinesLength = httpCallDoc.split("\n").length

const configEditor = bootstrapEditor(
  document.querySelector(".config .feature__demo"),
  configDoc
)
const actionsEditor = bootstrapEditor(
  document.querySelector(".actions .feature__demo"),
  actionsDoc,
  configDocLinesLength
)
const httpCallEditor = bootstrapEditor(
  document.querySelector(".http-call .feature__demo"),
  httpCallDoc,
  configDocLinesLength + actionsDocLinesLength
)

/** snippet for first section **/
const runHttpCallBtn = document.querySelector(".http-call .run-example")

const logger = new Logger()

runHttpCallBtn.addEventListener("click", (e) => {
  const configStateDoc = configEditor.state.doc.toString()
  const actionsStateDoc = actionsEditor.state.doc.toString()
  const usageStateDoc = httpCallEditor.state.doc.toString()
  const script = [configStateDoc, actionsStateDoc, usageStateDoc].join("\n")

  const lastBlockLine =
    configDocLinesLength + actionsDocLinesLength + httpCallDocLinesLength

  const log = logger.setBlock(
    ".http-call .output > pre",
    ".http-call .clear-example"
  )

  // we evaluate the script in a scoped context
  Function(`"use strict"; return function(console, curryReq){ ${script} }`)()(
    {
      ...console,
      log
    },
    curryReq
  )
})

/** reset action for first section **/
const resetHttpCallBtn = document.querySelector(".http-call .reset-example")
resetHttpCallBtn.addEventListener("click", () => {
  const cm = httpCallEditor
  cm.dispatch({
    changes: { from: 0, to: cm.state.doc.length, insert: httpCallDoc }
  })
})
const clearHttpCallBtn = document.querySelector(".http-call .clear-example")
const preNode = document.querySelector(".http-call .output > pre")
clearHttpCallBtn.addEventListener("click", () => {
  preNode.textContent = '';
  clearHttpCallBtn.setAttribute("disabled", "")
})
