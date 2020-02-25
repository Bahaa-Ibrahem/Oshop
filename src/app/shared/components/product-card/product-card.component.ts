import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { shoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent {
  @Input('product') product:Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: shoppingCart;

  constructor(private cartService: ShoppingCartService) { }
  
  addToCart() {
    this.cartService.addToCart(this.product);
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
