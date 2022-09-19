import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, productCount } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  productsInCart: Product[] = [];
  productCount: string[] = productCount;
  totalPrice: number = 0;

  constructor(private service: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.productsInCart = this.service.getProductsInCart();
    this.calculateTotalPrice();
  }

  selectOption(id: number, event: any): void{
    const selectedOption = event.target.options[event.target.options.selectedIndex].value;
    const cartIdx = this.productsInCart.findIndex(cart => cart.id === id);
    cartIdx != -1 && this.productsInCart.length > 0 ? this.productsInCart[cartIdx].option = selectedOption: null;
    this.productsInCart.length > 0 ? this.service.addProductToCart(this.productsInCart): null;
    this.calculateTotalPrice()
  }

  removeProductFromCart(id: number): void{
    const cartIdx = this.productsInCart? this.productsInCart.findIndex(cart => cart.id === id): -1;
    if(cartIdx != -1 && this.productsInCart.length > 0){
      this.productsInCart.splice(cartIdx,1)
      this.service.addProductToCart(this.productsInCart)
      this.calculateTotalPrice()
    }
  }

  calculateTotalPrice(): void{
    this.totalPrice = this.productsInCart.reduce((acc: number, val: any) =>{
      return acc + val.price * Number(val.option);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  confirmation(name: string): void{
    this.service.clearCart();
    this.route.navigateByUrl(`success/${name}/${this.totalPrice}`);
  }

}
