function createFunctionRegistry(){
    let registery = {};
    return {
        registerFunction:function(name,cb){
            registery[name]=cb;
        },
            executeFunction:function(name,args=[],context=null){
                registery[name]?.apply(context,args);
            },
            mapFunction:function(name,dataArray){
                dataArray.map(item=>registery[name](item))
            },
            filterFunction:function(name,dataArray){
                dataArray.filter(item=>registery[name](item))
            },
            reduceFunction:function(name,dataArray,initialValue){
                dataArray.reduce((acc,item)=>registery[name](acc,item),initialValue);

            }
    }
};

const registry = createFunctionRegistry();
registry.registerFunction("double", x => x * 2);
console.log(registry.executeFunction("double", [5]));