import React, { useReducer } from 'react'



function reducerFn(state,action){
    switch(action.type){
        case 'Add' : return [...state,{id:Date.now(),text:action.payload,isCompleted:false}];

        case 'Toggle' : return state.map(ele=>action.payload == ele.id ? {...ele,isCompleted:!ele.isCompleted}:ele)

        case 'Delete' : return state.filter(ele=> ele.id !== action.payload)

        default : return state;
    }
}

const TodowithReducer = () => {
    const [todos,dispatch] = useReducer(reducerFn,[])
    
  return (
    <div>
        <button onClick={()=>dispatch({type:'Add',payload:'Task'})}>Add Todo</button>
        <div>
            <ul>
            {todos.map(task=>(
                <li key={task.id}>
                    <span style={{cursor:'pointer',textDecoration:task.isCompleted?'line-through':'none'}} onClick={()=>dispatch({type:'Toggle',payload:task.id})}>
                    {task.text}
                    </span>
                    <button onClick={()=>dispatch({type:'Delete',payload:task.id})}>Delete</button>
                    </li>
            ))}
            </ul>
        </div>

    </div>
  )
}

export default TodowithReducer;



