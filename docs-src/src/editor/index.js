import curryReq from "/lib/index.es.js"
import { doc as configDoc } from "../../example-contents/config"
import { doc as actionsDoc } from "../../example-contents/actions"
import { doc as httpCallDoc } from "../../example-contents/http-call.js"

import { bootstrapEditor, sectionMarkdownInjector } from "./util.js";
import Logger from "./Logger"

// we need to treat the 'config' and 'actions' sections independently because it is used afterward and we need a reference here
const configDocLinesLength = configDoc.split("\n").length
const actionsDocLinesLength = actionsDoc.split("\n").length
const confDocLinesLength = configDocLinesLength + actionsDocLinesLength

const configEditor = bootstrapEditor(
  document.querySelector(".config .feature__demo"),
  configDoc
)
const actionsEditor = bootstrapEditor(
  document.querySelector(".actions .feature__demo"),
  actionsDoc,
  configDocLinesLength
)
sectionMarkdownInjector("config")
sectionMarkdownInjector("actions")

// this is a list of all sections
const sections = [
  { selector: "http-call", editorDoc: httpCallDoc }
]

const logger = new Logger()

const actionsLogic = ({ selector, editorDoc }) => {
  sectionMarkdownInjector(selector)

  const parent = document.querySelector(`.${selector} .feature__demo`)
  const editor = bootstrapEditor(
    parent,
    editorDoc,
    confDocLinesLength
  )

  /** run snippet **/
  const runBtn = document.querySelector(`.${selector} .run-example`)

  if (runBtn) {
    runBtn.addEventListener("click", (e) => {
      const configStateDoc = configEditor.state.doc.toString()
      const actionsStateDoc = actionsEditor.state.doc.toString()
      const editorState = editor.state.doc.toString()
      const script = [configStateDoc, actionsStateDoc, editorState].join("\n")

      const log = logger.setBlock(
        ".http-call .output > pre",
        ".http-call .clear-example"
      )

      // we evaluate the script in a scoped context
      Function(
        `"use strict"; return function(console, curryReq){ ${script} }`
      )()(
        {
          ...console,
          log
        },
        curryReq
      )
    })
  }

  /** reset action **/
  const resetBtn = document.querySelector(`.${selector} .reset-example`)
  resetBtn.addEventListener("click", () => {
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: editorDoc }
    })
  })

  const clearBtn = document.querySelector(`.${selector} .clear-example`)
  const preNode = document.querySelector(`.${selector} .output > pre`)
  if (clearBtn || preNode) {
    clearBtn.addEventListener("click", () => {
      preNode.textContent = ""
      clearBtn.setAttribute("disabled", "")
    })
  }
}

// we run all the action logic for all interested sections
sections.forEach(actionsLogic)
