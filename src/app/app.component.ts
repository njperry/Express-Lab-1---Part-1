import { Component } from '@angular/core';
import { CartService } from "./cart-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  cartitems: any;

  constructor(private cartService: CartService) {
    this.cartService.getItems().subscribe(response => {
      this.cartitems = response;
    });
  }

  addItems(newItem) {
    this.cartService.addItems(newItem.value).subscribe(response => {
      this.cartitems = response;
      console.log(newItem);
    });
  }

  // deleteItems(itemid) {
  //   this.cartService.deleteItems(itemid).subscribe(response => {
  //     this.cartitems = response;
  //   });
  // }

  // updateItems(newname, oldname) {
  //   this.cartService.updateItems(newname, oldname).subscribe(response => {
  //     this.cartitems = response;
  //   });
  // }
}
