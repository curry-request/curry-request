## Curry Request

Composable/extendable http client built with one curried function.

This module was born while dealing with REST resources in front-end applications,  
de-duplicating the configuration of `fetch` has proven, in our experience, to be beneficial in the maintainability of the App's Api calls.

This is implemented in a functional fashion extending the configuration definition for the fetch function,  
the original definition is:

```haskell
  curryRequest :
    baseUrl ->
    baseHeaders ->
    method ->
    route ->
    payload ->
    token -> Fetch.Response
```

Although the module is already evolving to include additional/alternative parameters, it is guaranteed to stay compatible with its original form.

## Installation

```
npm install -S curry-request
```

This package is written in typescript, types are included.

## Usage
Currying the main function you should be able to easily map REST APIs:

```ts
import cr from 'curry-request'
// we place the web api base url & the base headers
const apiRequest = cr("https://jsonplaceholder.typicode.com")({
  "Content-Type": "application/json",
  Accept: "application/json"
})

const apiGet = apiRequest("GET")
const apiPost = apiRequest("POST")

// get example
const getTodosById = id => apiGet(`/todos/${id}`)()()
getTodosById("1")
  .then(res => res.json())
  .then(res => console.log(res))

// post example
const postTodo = payload => apiPost('/todos)(payload)() 
postTodo({title: "BuyMilk", completed: false})
  .then(res => res.json())
  .then(res => console.log(res))

```

## Parameters explained
    - baseUrl: _string_ the webApi base url, root path for all routes belonging to a specific backend.
    - baseHeaders?: _object_ the base headers included in every call (the token can be added later)  
    - method: _string_ any http verb ('GET', 'POST', 'PUT', 'PATCH', 'DELETE', etc.) 
    - route?: _string_ the defining part of the route (and eventually the query strings)
    - payload?: _object_ this will be serialized and attached to the body section of the request
    - token?: _string_ this will be used as defined in JWT specs, `Authorization: Bearer ${token}`

## Compatibility

Although it was born in browser context the default fetch implementation (`cross-fetch`) is compatible also with **nodejs**.
If you're not happy with that the fetch implementation can actually be [swapped](#extendability).



## Extendability
One of the motivations for centralizing all Api requests is having the ability to manipulate them in one place.  
Therefore we provide additional parameters that can be used in order to expand the function,
following are a list of options that can be accessed through optional parameters,
if you use Typescript in your project you should be able to identify these with an autocompleting editor,  
following is a complete description of all options:
```ts

curryRequest
  (baseUrl: string, fetchImplementation?: (req: Request => Promise<Response>)) =>
  (baseHeaders?: {[headerName: string]: string}) => 
  (method: string) =>
  (route?: string) =>
  (payload?: {[k: string]: string}) =>
  (token?: string) 

```

## Todo
  - Add support for cancellation token
  - Study composability options

  
