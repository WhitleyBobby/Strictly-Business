import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddInventoryPage } from '../add-inventory/add-inventory.page';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private modalController: ModalController
    ) {}
    
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
