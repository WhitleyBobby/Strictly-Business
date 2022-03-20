import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddInventoryPage } from '../add-inventory/add-inventory.page';
import { Item } from '../inventory/inventory';
import { AuthService } from '../services/auth/auth.service';
import { InventoryService } from '../services/inventory/inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  inventory: Item[] = [];
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private modalController: ModalController, 
    private inventoryService: InventoryService
    ) {
      this.inventoryService.getInventory().subscribe(res => {
        console.log(res);
        this.inventory = res;
      })
    }
    
    // Add an item to inventory
    async addInventory(){
      const modal = await this.modalController.create({
        component: AddInventoryPage,
      });
      return await modal.present();
    }

    // Delete an item from inventory
    async deleteItem(iid) {
      await this.inventoryService.deleteItem(iid);
      this.modalController.dismiss();
      // if (window.confirm('Do you really want to delete?')){
      //   return this.inventoryService.deleteItem(iid);
      // }
    }

    //Logout
    async logout() {
      await this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
}
