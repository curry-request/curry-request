const request = require('../src/request').default


request
  ('https://httpbin.org/')
  ({})
  ('GET')
  ('ip')
  ()()
  .then(x => x.json())
  .then(console.log)
