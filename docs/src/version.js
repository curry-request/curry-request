// this module is used to get the version placeholder and writing the version in that

const version = (import.meta.env || {}).NODE_ENV || "00.00"

console.log(import.meta.env)
const versionNode = document.querySelector(".pkg-version")
versionNode.textContent = version
