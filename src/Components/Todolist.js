import React, { useState,useEffect } from 'react';
import "./Todolist.css";

const getLocalItems = () =>{
  let items = localStorage.getItem("lists");
  if(items){
    return JSON.parse(items);
  }else{
    return [];
  }
}



function TodoList() {
    const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState(getLocalItems());
  const[toggle,setToggle]=useState(true);
const [editTodo, setEditTodo] = useState(null);
  
  function addtodo() {
    if (!newTodo){
      alert("Please enter a todo");
    } else if(newTodo && ! toggle){
      
      setTodos(
        todos.map((elm) =>{
       if(elm.id===editTodo){
      return {[...elm,name:newTodo]}
          }
            return elm;
          
        } ))
      setNewTodo("");
      setToggle(true);
      setEditTodo(null);
      
    }
    else{
      const alltodos={id:Math.random().toString(),name:newTodo};
      setTodos([...todos, alltodos]);
      setNewTodo('');
}
 }
  function remove(id) {
    const updateditems = todos.filter((elm) =>
     elm.id !== id
   )
    
   setTodos(updateditems); 
    
     
  }
  useEffect(() =>{
    localStorage.setItem("lists", JSON.stringify(todos))
  }, [todos]
    );
    
function editItems(id){
const editedItems = todos.find((elm) =>
         elm.id === id
      )
setNewTodo(editedItems.name);
      setEditTodo(id);
      setToggle(false);
      
      
    }
  
  return(
  <>
    <div className="container">
      <div className="Todolist">
        <div className="header">
          <h1>Todo List</h1>
          <span>📝</span>
        </div>
        <div className="input-container">
          <input type="text" value ={newTodo} placeholder="Add a new todo" onChange={(e)=>setNewTodo(e.target.value)} />
          
          
            
           {   toggle ?
            <button onClick={addtodo}>+</button>
           :<button className="edit-btn" onClick={addtodo}>Edit</button>
          }
          
        </div>
        
          {
            todos.map((elm) =>{
              return (
<div className="list-container" key={elm.id}>
 <div className="list-item" >
   <p>{elm.id.name}</p>
 </div>
<div className="list-item-btns">
<button className="edit-btn" onClick={()=>editItems(elm.id)}>Edit</button>
<button className="del-btn" onClick={()=>remove(elm.id)}>Del</button>
</div>
    
        </div>
                )})}
              
<div className="removeall">
          <button className="removeall-btn" onClick={()=>setTodos([])} >Remove All</button>
        </div>
            
     </div>    
      
    </div>
   </>
    
  );
  } export default TodoList;
