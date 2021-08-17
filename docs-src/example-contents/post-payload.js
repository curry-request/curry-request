export const doc = ` 
const payload = { title: 'Day at the park', content: 'Once upon a time ...', author: 'Celine' }
const sendPost = post('/posts')

sendPost(payload)()
  .then(x => {
    console.log('first', x)
  })

sendPost(JSON.stringify(payload))()
  .then(x => {
    console.log('second', x)
  })
`
