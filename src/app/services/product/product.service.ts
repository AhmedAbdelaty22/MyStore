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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  addProductToCart(product: Product[]): void{
    this.storage.setItem('cart', JSON.stringify(product));
  }

  getProductsInCart(): Product[] | []{
    const getProduct = this.storage.getItem('cart')
    return getProduct? JSON.parse(getProduct): [];
  }

  clearCart(): void{
    this.storage.clear();
  }
}
