import { Component, Input, OnInit } from '@angular/core';
import { Product, count } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem!: Product;
  count: string[] = count;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit(cartProduct: Product, event: any): boolean{
    let newProductInCart: Product[] = [];
    let message: string = '';
    let isOptionExist: boolean = false;

    const selectedOption = event.target[0].options[event.target[0].options.selectedIndex].value;
    const cartProducts: Product[] | [] = this.service.getProductsInCart();

    const cartIndex = cartProducts.findIndex(cart => cart.id === cartProduct.id)
    newProductInCart = cartProducts;

    if ((cartIndex === -1) || (cartProducts.length === 0)){
      newProductInCart.push(Object.assign(cartProduct, {option: selectedOption}))
      message = `'${cartProduct.name}' has been added to cart successfully`;
    } else{
      const option: string = newProductInCart[cartIndex].option;
      isOptionExist = selectedOption === option
      
      if (isOptionExist){
        message = `${option} Item(s) of '${cartProduct.name}' already exist in cart.`;
      } else{
        newProductInCart[cartIndex].id = cartProduct.id;
        newProductInCart[cartIndex].option = selectedOption;
        message = `${option} Item(s) of '${cartProduct.name}' already exist in cart. Will be updated to ${selectedOption}`;
      }
      
    }
    !isOptionExist? this.service.addProductToCart(newProductInCart): null;

    alert(message);
    return false;
  }

}
