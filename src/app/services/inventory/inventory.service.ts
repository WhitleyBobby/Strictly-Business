import { Injectable } from '@angular/core';
import { Inventory } from 'src/app/inventory/inventory';
import { AngularFireDatabase, AngularFireList,
  AngularFireObject, } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventoryListRef: AngularFireList<any>;
  inventoryRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  //Creates item
  createItem(itm: Inventory){
    return this.inventoryListRef.push({
      item: itm.item, 
      itemCost: itm.itemCost,
      itemValue: itm.itemValue
    });
  }

  // Get single item
  getInventory(id: string){
    this.inventoryRef = this.db.object('/inventory/' + id);
    return this.inventoryListRef;
  }

  //Get list of inventory
  getInventoryList() { 
    this.inventoryListRef = this.db.list('/inventory');
    return this.inventoryListRef;
  }

  //Update item
  updateItem(id, itm: Inventory) {
    return this.inventoryRef.update({
      item: itm.item, 
      itemCost: itm.itemCost,
      itemValue: itm.itemValue
    })
  }

  //Delete Item
  deleteItem(id: string) {
    this.inventoryRef = this.db.object('/inventory/' + id);
    this.inventoryRef.remove();
  }
}
