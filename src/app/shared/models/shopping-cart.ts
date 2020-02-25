import { shoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class shoppingCart {
    count;
    sum;
    
    constructor(public items: shoppingCartItem[] ) {}

    get productIds () {
        return Object.keys(this.items);
    }

    get totalPrice() {
        this.sum = 0;
        for (let productId in this.items)
            this.sum += this.items[productId].product.price * this.items[productId].quantity;
        return this.sum;
    }

    get totalItemCount() {
        this.count = 0;
        for (const productId in this.items) 
            this.count += this.items[productId].quantity;
        return this.count
    }
}