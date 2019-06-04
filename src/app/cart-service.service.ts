import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getItems() { //making a get request to that address and expecting rsponse to be json
    return this.http.get("/api/cartitems", { responseType: "json"});
  }

  addItems(newItem) { 
    return this.http.post("/api/cartitems", newItem , { responseType: "json"});
  }

  // deleteItems(name) { //delet name parameter
  //   return this.http.delete(`/api/cartitems/${name}`, { responseType: "json"});
  // }

  // updateItems(newname, oldname) { //endpoint with old name parameter, newly updated name, response type
  //   return this.http.put(`/api/cartitems/${oldname}`, { name: newname }, { responseType: "json"});
  // }
  
}