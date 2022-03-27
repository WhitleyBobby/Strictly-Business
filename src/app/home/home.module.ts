import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AddInventoryPage } from '../add-inventory/add-inventory.page';
import { EditInventoryPage } from '../edit-inventory/edit-inventory.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    AddInventoryPage, 
    EditInventoryPage
  ]
})
export class HomePageModule {}
