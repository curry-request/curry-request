export const doc = ` 
const payload = { title: 'Day at the park', content: 'Once upon a time ...', author: 'Celine' }
const createTodo = post('/todos')

createTodo(payload)()
  .then(x => {
    console.log('first', x)
  })

createTodo(JSON.stringify(payload))()
  .then(x => {
    console.log('second', x)
  })
`
