import {
  EditorView,
  drawSelection,
  keymap,
  highlightSpecialChars,
  highlightActiveLine
} from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { lineNumbers } from "@codemirror/gutter"
import { javascript } from "@codemirror/lang-javascript"
import { history, historyKeymap } from "@codemirror/history"
import { defaultHighlightStyle } from "@codemirror/highlight"
import { defaultKeymap } from "@codemirror/commands"
import curryReq from "/lib/index.es.js"
import marked from "marked"

let playgroundTheme = EditorView.theme({
  "&": {
    backgroundColor: "#ddd"
  },
  ".cm-gutters": {
    border: "none",
    marginRight: ".5rem",
    width: "1.5rem"
  },
  ".cm-scroller": {
    overflow: "hidden"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    textAlign: "initial"
  }
})

export const bootstrapEditor = (parent, doc, lineNumberOffset = 0) => {
  return new EditorView({
    state: EditorState.create({
      doc,
      extensions: [
        lineNumbers({
          formatNumber: (n) => String(n + lineNumberOffset).padStart(2, "0")
        }),
        highlightSpecialChars(),
        history(),
        drawSelection(),
        defaultHighlightStyle.fallback,
        keymap.of(defaultKeymap),
        javascript(),
        playgroundTheme
      ]
    }),
    parent
  })
}

export const sectionMarkdownInjector = (selector) => {
  const sectionMdNode = document.querySelector(
    `.feature.${selector} .feature__desc__txt`
  )
  curryReq()()("GET")(`/example-contents/${selector}.md`)()()
    .then((x) => x.text())
    .then((x) => {
      sectionMdNode.innerHTML = marked(x, { breaks: true })
    })
}
