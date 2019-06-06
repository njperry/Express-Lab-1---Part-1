import { Component } from '@angular/core';
import { CartService } from "./cart-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  cartitems: any;
  shouldBeHidden: boolean = true;

  constructor(private cartService: CartService) {
    this.cartService.getItems().subscribe(response => {
      this.cartitems = response;
      console.log(this.cartitems);
    });
  }

  toggleForm(index) {
    this.cartitems[index].beingUpdated = !this.cartitems[index].beingUpdated;
    console.log(this.cartitems[index]);
    // this.shouldBeHidden = !this.shouldBeHidden; removed after adding .beingUpdated
  }

  addNewItem(form) {
    // console.log(form.value.fur);
   
    console.log({ 
      ...form.value
      // , 
      // fur: form.value.fur === "" ? false : form.value.fur,
      // scales: form.value.scales === "" ? false : form.value.scales,
      // feather: form.value.feather === "" ? false : form.value.feather
    });
    this.cartService.addItems({ 
      ...form.value
      // , 
      // fur: form.value.fur === "" ? false : form.value.fur,
      // scales: form.value.scales === "" ? false : form.value.scales,
      // feather: form.value.feather === "" ? false : form.value.feather
    }).subscribe(response => {
      this.cartitems = response;
    });
  }

  // addItems(newItem) {
  //   this.cartService.addItems(newItem.value).subscribe(response => {
  //     this.cartitems = response;
  //     console.log(newItem);
  //   });
  // }

  deleteItems(id) {
    this.cartService.deleteItems(id).subscribe(response => {
      this.cartitems = response;
      console.log(this.cartitems);
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

  updateItems(item) {
    console.log(item);
    
    this.cartService.updateItems(item).subscribe(response => {
      this.cartitems = response;
    });
  }

}
