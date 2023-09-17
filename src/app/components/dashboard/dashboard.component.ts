import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faExchange } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  faBudget = faChartPie;
  faExchange = faExchange;
  faDashboard = faDashboard;
  faCoins = faCoins;
  faPiggy = faPiggyBank;
  faMoney = faMoneyBill;
  faWallet = faWallet;
  faCredit = faCreditCard;

  public userName: any = '';
  isDepositInProgress = false;
  depositAmount: number = 0;

  constructor(private auth: AuthService, private user: UserService) {}
  ngOnInit(): void {
    this.user.getUserName().subscribe((val) => {
      let userNameFromToken = this.auth.getUserNameFromToken();
      this.userName = val || userNameFromToken;
    });
  }

  // modal
  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deposit(): void {
    this.auth.deposit(this.depositAmount).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
    this.closeModal();
  }

  getUserName() {
    this.auth.getUserNameFromToken();
  }

  logout() {
    this.auth.signOut();
  }
}
