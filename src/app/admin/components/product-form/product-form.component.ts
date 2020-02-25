import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product;
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService, 
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) productService.get(this.id).valueChanges()
      .pipe(take(1))
      .subscribe(prod => this.product = prod);
   }

  ngOnInit() {
  }

  save(product) { 
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['admin/products']);
  }

  delete(productId) {
    this.productService.delete(productId);
    this.router.navigate(['admin/products']);
  }

}
