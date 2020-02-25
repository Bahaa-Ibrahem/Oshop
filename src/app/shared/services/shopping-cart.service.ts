import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { shoppingCart } from '../models/shopping-cart';
import { shoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<shoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    if (cartId && this.db.object('/shopping-carts/' + cartId + '/items')) {
    return this.db.object(`/shopping-carts/${cartId}`).valueChanges()
      .pipe(map((x: shoppingCart) => new shoppingCart(x.items)))
    }
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
   }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      if (item) item$.update({ product: product, quantity: item.quantity + 1 });
      else item$.set({ product: product, quantity: 1 });
    })
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      item$.update({ quantity: item.quantity - 1 });
    })
  }

}
