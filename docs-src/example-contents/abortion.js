export const doc = `
const req = getTodos()

req.catch(x => {
  console.log(x.toString())
})
  
setTimeout(req.abort, 1)
`
