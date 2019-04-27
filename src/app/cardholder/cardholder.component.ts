import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-cardholder',
  templateUrl: './cardholder.component.html',
  styleUrls: ['./cardholder.component.scss']
})
export class CardholderComponent implements OnInit {
  public searchText: string;
  public pageNumber: 1;
  public productsDisplayed: Array<Product[]>= [
    [
      {id: 1, name: "Producto1", description: "Descripcion",price: 100.1, image:""},
      {id: 2, name: "Producto2", description: "Descripcion",price: 100.2, image:""},
      {id: 2, name: "Producto3", description: "Descripcion",price: 100.2, image:""},
      {id: 2, name: "Producto4", description: "Descripcion",price: 100.2, image:""}
    ],
    [
      {id: 2, name: "Producto5", description: "Descripcion",price: 100.2, image:""},
      {id: 2, name: "Producto6", description: "Descripcion",price: 100.2, image:""},
      {id: 2, name: "Producto7", description: "Descripcion",price: 100.2, image:""},
      {id: 2, name: "Producto8", description: "Descripcion",price: 100.2, image:""},
    ],
    [
      {id: 2, name: "Producto9", description: "Descripcion",price: 100.2, image:""},
      {id: 2, name: "Producto10", description: "Descripcion",price: 100.2, image:""},
      {id: 2, name: "Producto11", description: "Descripcion",price: 100.2, image:""},
      {id: 2, name: "Producto12", description: "Descripcion",price: 100.2, image:""},
    ],
    [
      {id: 2, name: "Producto13", description: "Descripcion",price: 100.2, image:""},
      {id: 2, name: "Producto14", description: "Descripcion",price: 100.2, image:""}
    ]
  ]

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  async getProductsBySearchText() {
    console.log("Buscar por: "+ this.searchText);
    const responseText : any = await this.productService.getProductsBySearchText(this.searchText);
    console.log(this.productsDisplayed);

    this.productsDisplayed = await this.getProductsToDisplay(responseText);
  }

  async getProductsToDisplay(responseText : any){

    return null;
  }
}
