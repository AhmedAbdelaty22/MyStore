import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.css']
})
export class ProductItemDetailsComponent implements OnInit {

  id: number | null = null;
  products: Product[] = [];
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private service: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })
    this.service.getProducts().subscribe(res =>{
      this.products = res;
      this.product = this.getProductById(this.id)
    })
  }

  getProductById(id: number | null): Product{
    return this.products.filter(product => product.id === id)[0];
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
