import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Item } from '../inventory/inventory';
import { InventoryService } from '../services/inventory/inventory.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.page.html',
  styleUrls: ['./edit-inventory.page.scss'],
})
export class EditInventoryPage implements OnInit {
  updateInventoryForm: FormGroup;
  item: Item;
  constructor(
    private invServices: InventoryService, 
    private router: Router, 
    public fb: FormBuilder,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const item = this.invServices.getItem('iid');

    this.updateInventoryForm = this.fb.group({
      name: [this.item.name ,[Validators.required]],
      cost: [this.item.cost ,[Validators.required]],
      value: [this.item.value ,[Validators.required]]
    })    
  }

  async updateEdit(){
    this.invServices.updateItem(undefined);

    // if(!this.updateInventoryForm.valid){ 
    //   return false;
    //  } else {
    //    this.invServices.updateItem(this.item).then(() => {
    //    this.modalController.dismiss();
    //    console.log('Data Updated')
    //    })
      //  await this.invServices.getInventory();
      //  await this.invServices.updateItem(doc(this.inventory.iid));
    //  }

  //   if(!this.updateInventoryForm.valid){ 
  //     return false;
  //    } else {
  //      console.log('SUBMITTING FORM')
  //      console.log(this.updateInventoryForm);
  //     const item: Item = {
  //       name: this.updateInventoryForm.get('name').value,
  //       value: this.updateInventoryForm.get('value').value,
  //       cost: this.updateInventoryForm.get('cost').value
  //     }
  //     await this.invServices.updateItem(item).then( ref => {
  //       console.log(ref),
  //       this.presentToast('Item successfully Updated!', 'success', 'thumbs-up-outline'),
  //       this.modalController.dismiss();
  //     })
  //   }
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

  //Closes Update item window
  close() {
    this.modalController.dismiss();
  }
}
