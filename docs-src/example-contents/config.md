### Base Configuration
Curry Request is conceived to centralize the management of api calls to common services (both in Node and in the browser);
in the js ecosystem the most popular package for dealing with XHR is Axios, but we weren't satisfied with it so this module.
<br/>
Similar to Axios you can configure instances, and through the pluggable fetch module it can easily implement interceptors.
<br/>
Differently from Axios, it is not such a high abstraction,  
it is built with the assumption that __fetch is good enough__, and it doesn't transform inputs and outputs so drastically.  
this is done through a simple curried function, with the fetch parameters ordered for our convenience.
