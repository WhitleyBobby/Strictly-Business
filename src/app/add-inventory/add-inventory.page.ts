import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { InventoryService } from '../services/inventory/inventory.service';
import { ModalController } from '@ionic/angular';
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
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.inventoryForm = this.fb.group({
      name: ['',[Validators.required]],
      cost: ['',[Validators.required]],
      value: ['',[Validators.required]]
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
        cost: this.inventoryForm.get('cost').value
      }
      await this.invServices.createItem(item).then( ref => {
        console.log(ref), 
        this.modalController.dismiss();
      })
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
