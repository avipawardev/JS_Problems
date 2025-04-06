class Car{
    constructor(model,type,fuelType,rentedBy){
        this.model=model,
        this.type=type,
        this.fuelType=fuelType,
        this.rentedBy=rentedBy
    }
    rent(){
        console.log(this.rentedBy)
    };
    returnVehicle(){
        console.log(this.model)
    }
};

const car1 = new Car("Honda Civic", "Sedan", "Petrol", 5);
car1.rent("Customer001");
car1.returnVehicle();
car1.rent("Customer007");