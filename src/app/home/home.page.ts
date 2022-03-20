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
    
    async addInventory(){
      const modal = await this.modalController.create({
        component: AddInventoryPage,
      });
      return await modal.present();
    }
    async logout() {
      await this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
}
