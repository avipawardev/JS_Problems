let manageCart={
    arr:[],
    addItems:function(item){
        this.arr.push(item)
    },
    removeItem:function(){
        console.log(`removedItem: ${this.arr.pop()}`)
    },
    totalItems:function(){
        console.log(`TotalItems: ${this.arr.length}`)
    },
    items:function(){
        console.log(`items: ${this.arr}`)
    }
};


manageCart.addItems("Apples");
manageCart.addItems("Bananas");
manageCart.addItems("Bread");
manageCart.addItems("Milk");
manageCart.removeItem()
manageCart.totalItems();
manageCart.items()
