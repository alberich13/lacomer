import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LACOMER_ENDPOINT } from '../config/constant';
import * as elasticsearch from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private client: elasticsearch.Client;

  constructor(
    private http: HttpClient
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

  async getProductsBySearchText(searchText: string): Promise<string[]> {
    console.log(LACOMER_ENDPOINT);
    
    let result: any = await this.http.get(`${LACOMER_ENDPOINT}`).toPromise();


    this.client.search({
      index: "lacomerdos",
      body: {
        "query":{
            "bool": {
                "should": [
                    { "match": { "ORDEN": "Frutas Kiwi Jicama" } }
                ]
              }
        }, 
        "size": 10,
        "_source":["ORDEN"]
      }
    });
    console.log("result: "+result);
    return result;
  }
}
