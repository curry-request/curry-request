

export const doc = `// example configuration
// import curryReq from 'curry-request' /*curryReq is already in scope*/
// we place the web api base url & the base headers
  
const baseUrl = "https://jsonplaceholder.typicode.com"
const baseHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

const apiRequest = curryReq(baseUrl)(baseHeaders)

// we prepare the methods we'll need
// differently from axios this is a manual operation
const get = apiRequest('GET')
const post = apiRequest('POST')
const put = apiRequest('PUT')
const del = apiRequest('DELETE')
`


