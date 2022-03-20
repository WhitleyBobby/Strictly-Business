import { Injectable } from '@angular/core';
import { Item } from '../../inventory/inventory';
// import { AngularFireDatabase, AngularFireList,
//   AngularFireObject, } from '@angular/fire/compat/database';
import { Firestore, collectionData, docData, doc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { collection, DocumentReference  } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // inventoryListRef: AngularFireList<any>;
  // inventoryRef: AngularFireObject<any>;

  INVENTORY_KEY = 'Inventory'
  constructor(
    private firestore: Firestore
  ) { }

  //Creates item
  createItem(item: Item){
    const inventoryRef = collection(this.firestore, this.INVENTORY_KEY);
    return addDoc(inventoryRef, item);
  }

  // Get single item
  getInventory(): Observable<Item[]> {
    const inventoryRef = collection(this.firestore, this.INVENTORY_KEY);
    return collectionData(inventoryRef, {idField: 'iid'}) as Observable<Item[]>
  }

  //Get list of inventory
  getItem(iid: string): Observable<Item[]>{
    const itemDocRef = doc(this.firestore, `${this.INVENTORY_KEY}/${iid}`);
    return docData(itemDocRef, {idField: `iid`}) as Observable<Item[]>
  }
  //Update item
  updateItem(item: Item): Promise<any> {
    const itemDocRef = doc(this.firestore, `${this.INVENTORY_KEY}/${item.iid}`);
    return updateDoc(itemDocRef,
    {
      name: item.name, 
      cost: item.cost, 
      value: item.value
    })
  }

  //Delete Item
  deleteItem(iid: string): Promise<any> {
    const itemDocRef = doc(this.firestore, `${this.INVENTORY_KEY}/${iid}`);
    return deleteDoc(itemDocRef)
  }
}
