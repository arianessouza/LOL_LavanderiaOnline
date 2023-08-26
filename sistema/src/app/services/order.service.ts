import { Injectable } from '@angular/core';
import { Clothing } from '../models/clothing.model';
import { Order } from '../models/order.model';
import { LocalStorageService } from './LocalStorageService';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  listOrder: Order[] = [];

   constructor(private localStorageService: LocalStorageService) {
    this.listOrder = this.localStorageService.getOrders();
  }

  createOrder(time:number, value: number) {
    return new Order(time, value)
  }

  setStatusOrder(order: Order, status: string) {
    order.status = status;
  }
  
  setClothing(order: Order, clothing: Clothing){
    order.clothings.push(clothing);
  }
  
  addOrder(order: Order): void {
    this.listOrder.push(order);
    this.localStorageService.saveOrders(this.listOrder);
  }

  getPendingOrders(): Order[] {
    return this.listOrder.filter(order => order.status === 'Em Aberto');
  }

  hasPendingOrders(): boolean {
    return this.listOrder.some(order => order.status === 'Em Aberto');
  }
  
  getOrderById(id: number): Order | undefined {
  return this.listOrder.find(order => order.id === id);
}

  
}

