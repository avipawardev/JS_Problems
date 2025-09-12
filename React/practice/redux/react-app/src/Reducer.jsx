

const initialVal = {
    count:0
}

const ReducerFn=(state=initialVal,action)=>{
        switch (action.type) {
            case 'Increment': return {count : state.count+1}
            case 'Decrement' : return {count : state.count-1}
            default:
                return state
        }
};


export default ReducerFn;


