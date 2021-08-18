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
import cachedMdToHtmlFiles from "../../example-contents/cachedMdToHtmlFiles.json"

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
  const fileName = `${selector}.md`
  sectionMdNode.innerHTML = cachedMdToHtmlFiles[fileName] || ""
}

const placeholderBlock = document.querySelector(".example-placeholder")
const placeholderBlockParent = placeholderBlock.parentNode
placeholderBlock.remove()
export const prepareMarkup = (selector) => {
  const cloned = placeholderBlock.cloneNode(true)
  cloned.classList.add(selector)
  placeholderBlockParent.append(cloned)
}

export const eventuallyScrollTo = () => {
  const hash = window.location.hash
  if (!hash) return

  const node = document.querySelector(hash)
  if (!node) return

  const distanceFromTop = node.getBoundingClientRect().top
  window.scrollTo({
    top: distanceFromTop,
    behavior: "smooth"
  })
}