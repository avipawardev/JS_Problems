function createOrderManager(){
    let array = []
    return{
        addOrder:function(order){
            array.push(order);
            console.log(array)
        },
    updateOrder:function(id,newStatus){
        this.array.id=id;
        this.array.status=newStatus;
    },
    filterOrders:function(status){
        return array.filter(ele=>ele.status===status);
    },
    sortOrder:function(by){
        array.sort((a,b)=> (a.by).localCompare(-b.by));
    },
    getTotalRevenue:function(){
       return array.reduce((acc,cur)=>{
        acc+cur;
       })
    },
    exportOrder:function(){
        return JSON.stringify(array)
    }
    }
}
const manager = createOrderManager();
manager.addOrder({ id: 1, customerName: "Alice", items: [{ name: "Laptop", price: 1000, quantity: 1 }], status: "pending", createdAt: new Date("2024-03-01") });
manager.addOrder({ id: 2, customerName: "Bob", items: [{ name: "Phone", price: 500, quantity: 2 }], status: "shipped", createdAt: new Date("2024-03-02") });
// console.log(manager.filterOrders("pending"));
console.log(manager.getTotalRevenue());


