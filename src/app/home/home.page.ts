import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { AddInventoryPage } from '../add-inventory/add-inventory.page';
import { EditInventoryPage } from '../edit-inventory/edit-inventory.page';
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
    private inventoryService: InventoryService,
    private toastCtrl: ToastController,
    private alertController: AlertController
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
    async deleteItem(item) {
      const alert = await this.alertController.create({
        header: 'Confirm Delete', 
        message: 'Do you really wish to delete this item?', 
        buttons: [{
          text: 'Cancel',
          handler: async (value: any) => { 
            console.log(value);
            console.log('Delete Canceled');
            this.presentToast('Delete Cancelled!', 'primary');
          }
          },{
            text: 'OK', 
            handler: async (value: any) => { 
              console.log(value);
              await this.inventoryService.deleteItem(item).then(res => {
                console.log(res);
                this.presentToast('Deleted Successfully!', 'success');
                this.getInvetory();
              }, err => {
                this.presentToast('an error deleting item has occured', 'danger');
            });
          }
          }],
      });
      await alert.present();
    }

    async updateItem(iid, name, cost, value, quantity) {
      const modal = await this.modalController.create({
        component: EditInventoryPage,
      });
      
      await this.inventoryService.updateItem({
        iid, name, cost, value, quantity
      });

      return await modal.present();
    }
    
    //Logout
    async logout() {
      await this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }

    getInvetory(){
      this.inventoryService.getInventory().subscribe(res => {
        console.log(res);
        this.inventory = res;
      })
    }

    async presentToast(message: string, color: string) {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
        color: color
      });
      toast.present();
    }
}
