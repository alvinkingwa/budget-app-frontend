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
  editCategoryName: string = '';
  editCategorySpending: number = 0;
  showEditModal = false;
  showCreateCategoryModal = false;
  public transactions: any[] = [];
  depositAmount: number = 0;
  receiverName: string = '';
  public categories: any = [];
  categoryId: string = '';
  searchQuery: string = '';
  filteredTransactions: any[] = [];
  


  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.getUserIdFromToken();
    this.listCategory();
    this.loadTransaction();
    this.filteredTransactions = this.transactions
  }

  loadTransaction(): void {
    const userId = this.auth.getUserIdFromToken();
    this.auth.getTransaction(userId).subscribe({
      next: (data) => {
        console.log('transaction category shown', data);
        this.transactions = data.map((transaction) => ({
          ...transaction,
          receiverName: transaction.receiver
            ? transaction.receiver.name
            : 'N/A',
        }));
        this.filteredTransactions = this.transactions;
      },
      error: (error) => {
        console.log('error fetching transaction', error);
      },
    });
  }

  filterTransactions(): void {
    // Create a copy of the original transactions array
    let filteredTransactions = [...this.transactions];
  
    // Convert the search query to lowercase for case-insensitive search
    const query = this.searchQuery.toLowerCase();
  
    // Filter transactions based on category name or receiver name
    filteredTransactions = filteredTransactions.filter((transaction) => {
      const categoryName = transaction.category ? transaction.category.name.toLowerCase() : '';
      const receiverName = transaction.receiver ? transaction.receiver.name.toLowerCase() : '';
  
      // Check if the search query matches category name or receiver name
      return categoryName.includes(query) || receiverName.includes(query);
    });
  
    // Update the transactions array with the filtered results
    this.filteredTransactions = filteredTransactions;
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
  getCategoryId(transaction: any): string {
    // Check if the transaction has a category, and return its categoryId, otherwise return an empty string
    return transaction.category ? transaction.category.categoryId : '';
  }

  // Function to open the edit modal
  openEditModal(
    categoryName: string,
    spending: number,
    receiverName: string,
    categoryId: string
  ) {
    this.editCategoryName = categoryName;
    this.editCategorySpending = spending;
    this.showEditModal = true;
    this.receiverName = receiverName;
    this.categoryId = categoryId;
    console.log('category Id ',categoryId);
  }

  // Function to close the edit modal
  closeEditModal() {
    this.showEditModal = false;
  }

  // Function to save the edited spending

  saveEditedSpending(): void {
    if (this.categoryId) {
      // Handle category spending edit
      this.auth
        .editCategorySpending(
          this.categoryId,
          this.editCategorySpending,
          this.receiverName
        )
        .subscribe({
          next: (data) => {
            console.log('Category spending edited successfully', data);
            this.closeEditModal();
          },
          error: (error) => {
            console.error('Error editing category spending', error);
          },
        });
    } else {
      // Handle deposit edit
      this.auth
        .deposit(this.receiverName, this.editCategorySpending)
        .subscribe({
          next: (data) => {
            console.log('Deposit successful', data);

            this.closeEditModal();
          },
          error: (error) => {
            console.error('Error depositing', error);
          },
        });
    }
  }


  newCategoryName: string = '';
  newSpending: string = '';
  newAmountLimit: number = 0;

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




    
    console.log('Creating a new category:');
    console.log('Category Name:', this.newCategoryName);
    console.log('Spending:', this.newSpending);
    console.log('Amount Limit:', this.newAmountLimit);

    // Close the modal
    this.closeCreateCategoryModal();
  }
}
