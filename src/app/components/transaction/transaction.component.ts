import { Component, OnInit } from '@angular/core';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faExchange } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})


export class TransactionComponent implements OnInit{
  faBudget = faChartPie
  faExchange = faExchange
  faDashboard = faDashboard;

  ngOnInit(): void {
      
  }
}
