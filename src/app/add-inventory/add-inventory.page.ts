import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { InventoryService } from '../services/inventory/inventory.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Item } from '../inventory/inventory';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})
export class AddInventoryPage implements OnInit {
  inventoryForm: FormGroup;  
  constructor(
    private invServices: InventoryService, 
    private router: Router, 
    public fb: FormBuilder,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.inventoryForm = this.fb.group({
      name: ['',[Validators.required]],
      cost: ['',[Validators.required]],
      value: ['',[Validators.required]],
      quantity: ['',[Validators.required]]
    })
  }

  async formSubmit(){
    if(!this.inventoryForm.valid){ 
      return false;
     } else {
       console.log('SUBMITTING FORM')
       console.log(this.inventoryForm);
      const item: Item = {
        name: this.inventoryForm.get('name').value,
        value: this.inventoryForm.get('value').value,
        cost: this.inventoryForm.get('cost').value,
        quantity: this.inventoryForm.get('quantity').value
      }
      await this.invServices.createItem(item).then( ref => {
        console.log(ref),
        this.presentToast('Item successfully added!', 'success', 'thumbs-up-outline'),
        this.modalController.dismiss();
      })
    }
  }

  async presentToast(message: string, color: string, icon?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      icon: icon
    });
    toast.present();
  }
  
  //Closes Add item window
  close() {
    this.modalController.dismiss();
  }
}
