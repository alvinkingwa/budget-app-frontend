import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {


    searchQuery: string = '';
    public transactions: any[] = [];
    filteredTransactions: any[] = [];
    editCategoryName: string = '';
    editCategorySpending: number = 0;
    showEditModal = false;
    receiverName: string = '';
    categoryId: string = '';


    constructor(private auth:AuthService){}
    ngOnInit(): void {
      this.filteredTransactions = this.transactions
      this.loadTransaction();
        
    }

    filterTransactions(): void {
      // Create a copy of the original transactions array
      let filteredTransactions = [...this.transactions];
  
      // Convert the search query to lowercase for case-insensitive search
      const query = this.searchQuery.toLowerCase();
  
      // Filter transactions based on category name or receiver name
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const categoryName = transaction.category
          ? transaction.category.name.toLowerCase()
          : '';
        const receiverName = transaction.receiver
          ? transaction.receiver.name.toLowerCase()
          : '';
  
        // Check if the search query matches category name or receiver name
        return categoryName.includes(query) || receiverName.includes(query);
      });
  
      // Update the transactions array with the filtered results
      this.filteredTransactions = filteredTransactions;
    }

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
      console.log('category Id ', categoryId);
    }

    getCategoryId(transaction: any): string {
      // Check if the transaction has a category, and return its categoryId, otherwise return an empty string
      return transaction.category ? transaction.category.categoryId : '';
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

}
