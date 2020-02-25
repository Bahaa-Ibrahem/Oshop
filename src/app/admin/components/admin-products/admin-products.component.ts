import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { AngularFireList } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { Ng8DataTableDirective } from 'ng8-data-table/lib/directives/ng8-data-table.directive';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filterdProducts: any[];
  itemsRef: AngularFireList<any>;
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.itemsRef = this.productService.getAll()
    this.subscription = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(products => this.filterdProducts = this.products = products )
  }

  filter(query: string) {
    this.filterdProducts = (query) ?
    this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : 
    this.products;
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
