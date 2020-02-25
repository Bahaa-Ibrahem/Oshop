import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.sass']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('catego') catego;

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories(); 
  }

  ngOnInit() {
  }

}
