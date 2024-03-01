class libraryBase{
    
    discountRate = 20;
    
    constructor(firstName, lastName, hasCard, cart){
        this.firstName = firstName;
        this.lastName = lastName;
        this.hasCard = hasCard;
        this.cart = cart
    }

    checkProducts(cart){ 
        if(cart != null && cart.length > 0){
            return true
        } else {
            return false
        }
    }

    calculate(){

        if (!this.checkProducts(cart)) {
            alert("Cart is empty! Please, choose at least one product");
        }

        cartTotal = cart.reduce((total, value) => {
            return total + value.price;
        }, 0);
        
        //have some book in my cart
        if (this.hasCard) {
            totalPayment = (cartTotal * (100 - this.discountRate) / 100);
            // calculation of discounted price for students,
        } else {
            totalPayment = cartTotal;
        }
        
        return totalPayment;
        
    }
}

class Student extends libraryBase {
    constructor(firstName, lastName, hasCard, cart){
        super(firstName, lastName, hasCard, cart) //from librarBase
    }
    referral(){
      return super.calculate()
    }
}

class NotStudent extends libraryBase {
    constructor(firstName, lastName, hasCard, cart){
        super(firstName, lastName, hasCard, cart) //from librarBase
    }
    referral(){
      return super.calculate()
    }
}