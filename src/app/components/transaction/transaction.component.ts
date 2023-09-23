import { Component, OnInit } from '@angular/core';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faExchange } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  faBudget = faChartPie;
  faExchange = faExchange;
  faDashboard = faDashboard;
  editCategoryName: string | undefined;
  editCategorySpending: number | undefined;
  showEditModal = false;
  showCreateCategoryModal = false;
  public transactions: any[] = [];

  public categories: any = [];

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.getUserIdFromToken();
    this.listCategory();
    this.loadTransaction();
  }
  loadTransaction(): void {
    const userId = this.auth.getUserIdFromToken();
    this.auth.getTransaction(userId).subscribe({
      next: (data) => {
        console.log('transaction category shown', data);
        this.transactions = data.map((transaction)=>({
          ...transaction,
          receiverName:transaction.receiver?transaction.receiver.name:'N/A'
        }))
      },
      error: (error) => {
        console.log('error fetching transaction', error);
      },
    });
  }

  listCategory(): void {
    const userId = this.auth.getUserIdFromToken();
    if (userId) {
      this.auth.getUserBalance(userId).subscribe({
        next: (data) => {
          this.categories = data.categories;
        },
        error: (err) => console.log(err),
        complete: () => console.log('complete'),
      });
    }
  }

  // Function to open the edit modal
  openEditModal(categoryName: string, spending: number) {
    this.editCategoryName = categoryName;
    this.editCategorySpending = spending;
    this.showEditModal = true;
    console.log('hope it work');
  }

  // Function to close the edit modal
  closeEditModal() {
    this.showEditModal = false;
    this.editCategoryName = undefined;
    this.editCategorySpending = undefined;
  }

  // Function to save the edited spending
  saveEditedSpending() {
    // Implement logic to save the edited spending
    console.log('Category Name:', this.editCategoryName);
    console.log('Edited Spending:', this.editCategorySpending);

    // Close the modal
    this.closeEditModal();
  }

  newCategoryName: string = '';
  newSpending: string = '';
  newAmountLimit: number | undefined;

  // Function to open the Create Category modal
  openCreateCategoryModal() {
    this.showCreateCategoryModal = true;
    console.log('opnnned');
  }

  // Function to close the Create Category modal
  closeCreateCategoryModal() {
    this.showCreateCategoryModal = false;
  }

  // Function to create a new category
  createCategory() {
    // Implement logic to create the new category with the provided inputs
    console.log('Creating a new category:');
    console.log('Category Name:', this.newCategoryName);
    console.log('Spending:', this.newSpending);
    console.log('Amount Limit:', this.newAmountLimit);

    // Close the modal
    this.closeCreateCategoryModal();
  }
}
