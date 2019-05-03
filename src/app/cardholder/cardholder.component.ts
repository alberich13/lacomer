import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { LACOMER_IMG_PREFIX, LACOMER_IMG_POSTFIX, LACOMER_SUCC_ARRAY } from '../config/constant';


@Component({
  selector: 'app-cardholder',
  templateUrl: './cardholder.component.html',
  styleUrls: ['./cardholder.component.scss']
})
export class CardholderComponent implements OnInit {
  public searchText: string;
  public pageNumber: 1;
  public productsDisplayed: Array<Product[]> = []
  public succArray :number[] = LACOMER_SUCC_ARRAY;
  public selectedSucc: string = "TODAS";
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  async getProductsBySearchText() {
    this.productsDisplayed = []
    console.log("Buscar por: " + this.searchText);
    let responseText: any = await this.productService.getProductsBySearchTextAndSucc(this.searchText, this.selectedSucc);

    const products = responseText["hits"]["hits"];
    let productArray : Product[] = [];

    for (let key in products) {
      const source = products[key]["_source"];
      console.log("KEY: "+key+ " _ID: "+products[key]["_id"]+"  "+products[key]["_score"]);
      for (let keyDos in products[key]["_source"]) {
        if(!keyDos.includes("INVENTARIO")){
          console.log("KEY: "+keyDos+"  VALUE: "+products[key]["_source"][keyDos]);
        }
      }
      console.log("***********************************");
    }

    for (let key in products) {
      const source = products[key]["_source"];
      const product: Product = this.getProductFromSource(source);
      productArray.push(product);
      const numberKey = Number(key) +1;

      if(numberKey % 4 == 0 || numberKey == Object.keys(products).length){
        this.productsDisplayed.push(productArray);
        productArray = [];
      }
    }
    this.pageNumber = 1;
  }

  getProductFromSource(source: any) {
    // if(this.selectedSucc == "TODAS"){
    //   console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
    //   for(let k in source){
    //     if(k.includes("INVENTARIO")){
    //       console.log(k+" -- "+source[k]);
    //     }
    //   }
    // }
    return new Product(
      source["ART_DES"],
      source["ART_PRES"],
      source["MAR_DES"],
      source["CATEGORIA"],
      source["SUB_CATEGORIA"],
      source["DES_PROVEEDOR"],
      LACOMER_IMG_PREFIX+source["ART_EAN"]+LACOMER_IMG_POSTFIX,
      source["SUCC_"+this.selectedSucc+"_INVENTARIO"]
    );
  }
}
