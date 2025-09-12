function createInventoryItem(name,category,price){
return {name,
category,
price,
describeItem : function(){
    console.log(`Item: ${this.name}, Category: ${this.category}, Price:${this.price}`)
}
}
}

function addItemDiscount(inventryItem,discountPercent){
    let {price,name}=inventryItem;
return{
    applyDiscount:function(){
        let discountedPrice = price -(price*discountPercent/100);
        console.log(`Discounted Price for ${name}: ${discountedPrice}`)
    }
}
};

const item = createInventoryItem("Laptop", "Electronics", 1500);
item.describeItem();
// Output: Item: Laptop, Category: Electronics, Price: 1500

const discountedItem = addItemDiscount(item, 10);
discountedItem.applyDiscount();
// Output: Discounted Price for Laptop: 1350
