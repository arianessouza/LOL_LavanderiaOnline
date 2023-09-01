import { Component, OnInit } from '@angular/core';
import { AuthService, OrderService } from 'src/app/services';
import { Order } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public orderService: OrderService, private authService: AuthService) { }
  listOrder: Order[] = this.orderService.listOrder
  listOpenOrder: Order[] = this.orderService.listOrder
    .filter(o => o.status == 'Em Aberto')
    .sort((a, b) => a.orderDate.getTime() - b.orderDate.getTime());
  isEmployee: boolean = false;

  ngOnInit(): void {

    this.listOrder = this.orderService.listOrder;
    this.isEmployee = !!this.authService.isEmployee();
  }

  recolherPedido(order: Order): void {
    order.status = 'Recolhido';
    this.orderService.updateOrder(order);
  }
}

