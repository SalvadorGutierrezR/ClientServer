import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ItemsService) { }
  items: any;
  uId!: number;
  uName!: string;
  uDescription!: string;
  uPrice!: string;
  uAvatar: File | null = null;
  updId!: number;
  updName!: string;
  updDescription!: string;
  updPrice!: string;
  successfulNew!: boolean;
  successfulDelete!: boolean;
  successfulUpd!: boolean;
  fileToUpload!: File;

  ngOnInit(): void {
    this.successfulNew = false;
    this.successfulDelete = false;
    this.successfulUpd = false;
    this.service.getItems().subscribe((result: Item[]) => {
      this.items = result;
      console.log(result);
      console.log(result[0].id);
    });
  }

  handleFileInput( event: any) {
    this.fileToUpload = event.target.files.item(0) as File;
  }

  saveNew(){
    const newItem = {name:this.uName, description: this.uDescription, price: this.uPrice, image: "avatar.jpg"}
    this.service.addItem(newItem).subscribe(item => {
      this.successfulNew = true;
      this.items.push(item);
    });
  }

  uploadFileToActivity() {
    this.service.postFile(this.uName, this.uDescription, this.uPrice, this.fileToUpload).subscribe(data => {
        this.successfulNew = true;
        this.items.push(data);
      }, error => {
        console.log(error);
      });
  }

  deleteItem(){
    this.service.deleteItem(this.uId).subscribe(() => this.successfulDelete = true);
  }

  updateItem(){
    const itemToUpdate = {id: this.updId, name: this.updName, description: this.updDescription, price: this.updPrice}
    this.service.updateItem(itemToUpdate).subscribe(() => this.successfulUpd = true);
  }

}
