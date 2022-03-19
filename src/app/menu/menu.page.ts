import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  paneEnabled: boolean = true;
  menuTitle = "Menu";
  menuList = [
    {label: 'LogOut', route: '/', icon: 'log-out-outline'}
  ]
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private menuController: MenuController
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.paneEnabled = true;
    this.menuController.enable(true, 'menuContent')
  }
  ionViewWillLeave() {
    this.paneEnabled = false;
  }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
