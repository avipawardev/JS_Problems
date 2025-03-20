const checkout = {
  items: [],

  total: 0,

  addItem:function (item) {
    if (typeof item.price !== "number" || isNaN(item.price)) {
      console.log("Invalid price.");

      return;
    }

    this.items.push(item);

    this.total += item.price;
  },

  getTotal:function(){
    return `Total:${parseFloat(this.total).toFixed(2)}`;
  },
};

checkout.addItem({ name: "Coffee Maker", price: parseInt("99.95") });

checkout.addItem({ name: "Milk", price: 3.5 });

console.log(checkout.getTotal()); // Expected issue !
