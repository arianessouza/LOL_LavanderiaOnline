import { Component } from '@angular/core';
import { Clothing } from 'src/app/models/clothing.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novoPedido.component.html',
  styleUrls: ['./novoPedido.component.scss']
})

export class NovoPedidoComponent {
  clothesList: Clothing[] = [
    { name: 'Camisa', price: 20, quantity: 0, time: 30 },
    { name: 'Calça', price: 20, quantity: 0, time: 40 },
    { name: 'Calça Jeans', price: 25, quantity: 0, time: 50 },
    { name: 'Jaqueta', price: 40, quantity: 0, time: 60 },
    { name: 'Meia', price: 5, quantity: 0, time: 15 },
    { name: 'Cueca', price: 5, quantity: 0, time: 20 },
    { name: 'Bermuda', price: 15, quantity: 0, time: 35 }
  ];

  showOrcamento: boolean = false;
  value: number = 0;
  time: number = 0;
  
  constructor(private orderService: OrderService) { }
  
  calculateValue(): void {
    this.value = this.clothesList.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }

  calculateTime(): void {
    let short = this.clothesList[0].time;
    for (const element of this.clothesList) {
      short = element.time < short ? element.time : short;
    }
    this.time = short;
  }

  generateOrder(): void {
    this.calculateTime();
    this.calculateValue();
    this.showOrcamento = true;
  }

  insertClothes(order: Order): void {
    for (let clothing of this.clothesList) {
      if (clothing.quantity > 0){
        this.orderService.setClothing(order, clothing);
      }
    }
  }
  
  sendOrder(): void {
    this.showOrcamento = false;
    let newOrder = this.orderService.createOrder(this.time, this.value);
    this.insertClothes(newOrder);
    this.orderService.addOrder(newOrder);
    alert(`Orçamento Aprovado!\nNúmero de Pedido: ${newOrder.id}`);
    console.log(this.orderService.listOrder);
  }
}
