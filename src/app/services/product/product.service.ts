import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  storage = window.localStorage;
  url = 'http://localhost:4200/assets/data.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  addProductToCart(product: Product[]){
    this.storage.setItem('cart', JSON.stringify(product));
  }

  getProductsInCart(): Product[]{
    const getProducts = this.storage.getItem('cart')
    return getProducts? JSON.parse(getProducts): [];
  }

  clearCart(): void{
    this.storage.clear();
  }
}
