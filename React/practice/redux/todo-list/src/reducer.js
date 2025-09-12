
const initialState = []

const reducerFn = (state = initialState,action)=>{
    switch(action.type){
        case 'Add' : return [...state,{id:Date.now(),text:action.payload,completed:false}];

        case 'Del' : return state.filter(ele=> action.payload !== ele.id)

        case 'Toggle' : return state.map(ele=> ele.id === action.payload ? {...ele,completed:!ele.completed}:ele)

        default : return state;
    }
}

export default reducerFn