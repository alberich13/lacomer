import { Injectable } from '@angular/core';
import { LACOMER_ENDPOINT } from '../config/constant';
import * as elasticsearch from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private client: elasticsearch.Client;

  constructor(
  ) { 
    if (!this.client) {
      this.connect();
    }
  }

  private connect() {
    this.client = new elasticsearch.Client({
      host: `${LACOMER_ENDPOINT}`,
      log: 'trace'
    });
  }

  async getProductsBySearchTextAndSucc(searchText: string, succ: string): Promise<string[]> {
    console.log(LACOMER_ENDPOINT);
    let succText = "SUCC_";
    if(succ != undefined && succ != "TODAS"){
       succText += succ;
    } else {
      succText += "*";
    }
    succText += "_INVENTARIO";

    console.log("succText: "+succText);
   return this.client.search({
      index: "lacomerindex",
      body: {
        "query":{
          "bool": {
              "must_not":{
                "match":{[succText]:"0"}
              },
              "must": [
                { "multi_match": { 
                    "query": searchText,
                    "type": "cross_fields",
                    "fields": ["ART_DES^9", "ART_PRES^8", "MAR_DES^7", "CATEGORIA^9", "SUB_CATEGORIA^8", "DES_PROVEEDOR^4"]
                    }
                }
            ],
            "should": { "term": {
              "PATROCINADO": {
                "value": "1",
                "boost": 5 
              }
            }
          }
        }
      }, 
      "size": 10,
      "_source":["PATROCINADO","ART_DES", "ART_PRES", "MAR_DES", "CATEGORIA", "SUB_CATEGORIA", "DES_PROVEEDOR","ART_EAN", succText]
      }
    });
  }
}
