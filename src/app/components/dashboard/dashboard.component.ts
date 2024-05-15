import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
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
  public userId: any = '';
  public incomeAmount: number | null = null;
  public spending: number | null = null;

  isDepositInProgress = false;
  depositAmount: number = 0;
  receivedFrom: string = '';

  constructor(
    private auth: AuthService,
    private user: UserService,
    private userDataService: UserDataService
  ) {}
  ngOnInit(): void {
    this.user.getUserName().subscribe((val) => {
      let userNameFromToken = this.auth.getUserNameFromToken();
      this.userName = val || userNameFromToken;

      this.auth.getUserIdFromToken();
      this.loadUserBalance();
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

  // deposit(): void {
  //   this.auth.deposit(this.receivedFrom,this.depositAmount);
  //   this.closeModal();
  // }


  deposit(): void {
    if (this.receivedFrom && this.depositAmount > 0) {
      this.auth.deposit(this.receivedFrom, this.depositAmount)
        .subscribe({
          next: (response) => {
            console.log('Deposit successful:', response);
            // Additional handling after successful deposit
            this.closeModal(); // Close the modal after successful deposit
          },
          error: (error) => {
            console.error('Error depositing funds:', error);
            // Handle error response if needed
          }
        });
    } else {
      console.error('Invalid deposit details.');
      // Handle invalid deposit details (optional)
    }
  }


  loadUserBalance(): void {
    const userId = this.auth.getUserIdFromToken();
    if (userId) {
      this.auth.getUserBalance(userId).subscribe({
        next: (data) => {
          console.log('this is user inform', data);

          {
            this.incomeAmount = data.account.balance;
          }
          {
            this.spending = data.account.amountSpent;
          }
        },

        error: (err) => console.log(err),
        complete: () => console.log('complete'),
      });
    }
  }
  amountSpent(): void {}

  getUserName() {
    this.auth.getUserNameFromToken();
  }
  // getUserId() {
  //   this.auth.getUserId();
  // }

  logout() {
    this.auth.signOut();
  }
}
