
export const doc = ` 

// get                                                                                                                                                                                                                                    
const getTodosById = (id) => get("/todos/" + id)()()                                                                                                                                                                            
                                                                                                                                                                                                                                          
// post                                                                                                                                                                                                                                   
const postTodo = (payload) => post("/todos")(payload)()                                                                                                                                                                         
                                                                                                                                                                                                                                          
// post                                                                                                                                                                                                                                   
const putTodo = (id, payload) => put("/todos/" + id)(payload)()                                                                                                                                                                           
                                                                                                                                                                                                                                          
// delete                                                                                                                                                                                                                                 
const deleteTodosById = (id) => del("/todos/" + id)()();

(async () =>  {
  const postedTodo = await postTodo({ title: 'New activity' }).then(x => x.json())
  console.log('postedTodo', postedTodo)
  
  const post1 = await getTodosById(1).then(x => x.json()) 
  console.log('post1',post1)
  
  const updatedTodo = await putTodo(1, { title: 'Buy milk' }).then(x => x.json())
  console.log('updatedTodo', updatedTodo)

  const delResponse = await deleteTodosById(1)
  console.log('delResponse', delResponse)
})()
`
