import curryReq from "/lib/index.es.js"
import { doc as configDoc } from "../../example-contents/config.js"
import { doc as actionsDoc } from "../../example-contents/actions.js"
import { doc as httpCallDoc } from "../../example-contents/http-call.js"
import { doc as postPayloadDoc } from "../../example-contents/post-payload.js"
import { doc as jwtInjectionDoc } from "../../example-contents/jwt-injection.js"
import { doc as abortionDoc } from "../../example-contents/abortion.js"
import { doc as motivationPostDoc } from "../../example-contents/example-from-motivation-post"

import { bootstrapEditor, sectionMarkdownInjector, prepareMarkup, eventuallyScrollTo } from "./util.js";
import Logger from "./Logger.js"

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
  { selector: "http-call", editorDoc: httpCallDoc },
  { selector: "post-payload", editorDoc: postPayloadDoc },
  { selector: "jwt-injection", editorDoc: jwtInjectionDoc },
  { selector: "abortion", editorDoc: abortionDoc },
  { selector: "example-from-motivation-post", editorDoc: motivationPostDoc }
]

const logger = new Logger()

const actionsLogic = ({ selector, editorDoc }) => {
  prepareMarkup(selector)
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
        `.${selector} .output > pre`,
        `.${selector} .clear-example`
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
eventuallyScrollTo()
