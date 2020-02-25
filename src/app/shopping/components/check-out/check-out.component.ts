import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { shoppingCart } from '../../../shared/models/shopping-cart';
import { Subscribable, Subscription } from 'rxjs';
import { OrderService } from '../../../shared/services/order.service';
import { map } from 'rxjs/operators';
import { Product } from '../../../shared/models/product';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  subscribtion: Subscription;
  userSubscription: Subscription;
  cartt: shoppingCart;
  userId: string;
  usernameOrder: string;
  product: Product;
  quantity: number;
  item: {};
  AllItems: any[] = [];
  totalPrice: number;
  totoalPriceForAllProduct: number;
  totoalQuantityForAllProduct: number;
  productIds: string[];
  cart$;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCatService: ShoppingCartService) {
     }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
    this.cart$ = await this.shoppingCatService.getCart();
    this.subscribtion = this.cart$.subscribe(cart => {
      this.cartt = cart;
      this.productIds = Object.keys(cart.items);
      this.totoalPriceForAllProduct = 0;
      this.totoalQuantityForAllProduct = 0;
      for (const productId of this.productIds) {
        this.product = {
          title: cart.items[productId].product.title,
          imageUrl: cart.items[productId].product.imageUrl,
          price: cart.items[productId].product.price,
          key: cart.items[productId].product.key,
          category: cart.items[productId].product.category
        };
        this.quantity = cart.items[productId].quantity;
        this.totalPrice = cart.items[productId].quantity * cart.items[productId].product.price;

        this.totoalPriceForAllProduct += cart.items[productId].quantity * cart.items[productId].product.price;
        this.totoalQuantityForAllProduct += cart.items[productId].quantity;
        this.item = {product: this.product, quantity: this.quantity, totalPrice: this.totalPrice };
        this.AllItems.push(this.item);
      }
    });
  }

  placeOrder(shipping) {
    let order = {
      userId: this.userId,
      datedPlaced: new Date().getTime(),
      shipping: shipping,
      items: this.AllItems
    };

    const res = this.orderService.storeOrder(order);
    this.router.navigate(['/order-success/' + res.key]);
    this.shoppingCatService.clearCart();
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
