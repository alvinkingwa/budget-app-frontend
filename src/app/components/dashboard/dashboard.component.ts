import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faExchange } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  faBudget = faChartPie
  faExchange = faExchange
  faDashboard = faDashboard;
  faCoins = faCoins;
  public userName: any = '';

  constructor(private auth: AuthService, private user: UserService) {}
  ngOnInit(): void {
    this.user.getUserName().subscribe((val) => {
      let userNameFromToken = this.auth.getUserNameFromToken();
      this.userName = val || userNameFromToken;
    });
  }

  logout() {
    this.auth.signOut();
    this.userName = null;
    console.log('clicked');
  }
}
