import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.sass']
})
export class ProductQuantityComponent {
  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService ) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) {
      return 0;
    } else if (this.shoppingCart && !this.shoppingCart.items) {
      return 0;
    } else {
      const item = this.shoppingCart.items[this.product.key];
      return item ? item.quantity : 0;
    }
  }

}
