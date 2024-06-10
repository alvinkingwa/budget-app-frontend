import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faChartPie, faExchange, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-set-budget',
  templateUrl: './set-budget.component.html',
  styleUrls: ['./set-budget.component.css'],
})
export class SetBudgetComponent implements OnInit {
  faBudget = faChartPie;
  faExchange = faExchange;
  faDashboard = faDashboard;
  faTrash = faTrashAlt;


  selectedCategoryLimitModel = false;
  showModalTransaction = false;
  previousAmount: number = 0;
  editedAmount: number = 0;
  categoriesNoSpend: any[] = [];
  newCategory: string = '';
  selectedCategory: any = null;
  displayAmountLimit: any[] = [];
  amountLimit: number = 0;
  showModal = false;
  selectedCategoryLimit: any;


  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.categoriesWithNoSpend();
    this.categoryAmountLimit();
  }

  createCategory() {
    const newCategoryData = { name: this.newCategory };
    this.auth.createCategory(newCategoryData).subscribe({
      next: (response) => {
        this.closeModal();
        console.log('Category created', response);
        this.newCategory = '';
        // this.categoriesWithNoSpend(); // Refresh the categoriesthis.newCategory = '';
        this.categoriesWithNoSpend(); // Refresh the categories
        this.categoryAmountLimit(); // Refresh the category limits
        
      },
      error: (error) => {
        console.error('Error creating category', error);
      },
    });
  }

  deleteCategory(categoryId: string) {
    this.auth.deleteCategory(categoryId).subscribe({
      next: () => {
        console.log(`Category ${categoryId} deleted successfully`);
        // this.categoriesWithNoSpend(); // Refresh the categories
        this.categoriesWithNoSpend(); // Refresh the categories
        this.categoryAmountLimit(); // Refresh the category limits
      },
      error: (err) => console.error('Cannot delete category', err),
    });
  }

  setOrUpdateAmountLimit(): void {
    if (this.selectedCategory && this.selectedCategory.categoryId) {
      const categoryId = this.selectedCategory.categoryId;
      this.auth.updateCategoryLimit(categoryId, this.amountLimit).subscribe({
        next: (response) => {
          console.log('Amount limit set/updated:', response);
          this.closeModal();
          this.categoryAmountLimit(); // Refresh the category limits
        },
        error: (error) => {
          console.error('Error setting/updating amount limit:', error);
        },
      });
    } else {
      console.error('Invalid category or category ID');
    }
  }

  categoryAmountLimit(): void {
    const userId = this.auth.getUserIdFromToken();
    if (userId) {
      this.auth.getUserBalance(userId).subscribe({
        next: (response) => {
          console.log('User info:', response);
          this.displayAmountLimit = response.categories;
        },
        error: (err) => console.error('Error fetching user balance:', err),
        complete: () => console.log('Category amount limit load complete'),
      });
    }
  }

  categoriesWithNoSpend(): void {
    this.auth.categoryWithNoSpend().subscribe({
      next: (response) => {
        console.log('Categories with no spend:', response);
        this.categoriesNoSpend = response;
      },
      error: (err) => console.error(err),
      complete: () => console.log('Categories with no spend load complete'),
    });
  }
  openEditModal(category: any, previousAmount: number | null) {
    this.selectedCategory = category;
    this.previousAmount = previousAmount !== null ? previousAmount : 0;
    this.editedAmount = this.previousAmount;
    this.showModalTransaction = true;
  }
  

  saveEditedAmount() {
    this.amountLimit = this.editedAmount;
    this.setOrUpdateAmountLimit(); // Save the edited amount
    this.showModalTransaction = false;
  }

  closeModal(): void {
    this.showModalTransaction = false;
    this.showModal = false
  }
  openModal(): void {
    this.showModal = true;
  }


  openAmountLimitModal(category: any,) {
    
    this.selectedCategory = category
    this.selectedCategoryLimitModel = true;
  
  }

  closeAmountLimitModal(): void {
    this.selectedCategoryLimitModel = false;
    this.selectedCategoryLimit = null;
    this.amountLimit = 0;
  }
  saveAmountLimit(): void {
    if (this.selectedCategory && this.selectedCategory.categoryId) {
      const categoryId = this.selectedCategory.categoryId;
      this.auth.updateCategoryLimit(categoryId, this.amountLimit)
        .subscribe({
          next: (response) => {
            console.log('Amount limit set:', response);
            this.closeAmountLimitModal();
          },
          error: (error) => {
            console.error('Error setting amount limit:', error);
          },
        });
    } else {
      console.error('Invalid category or category ID');
    }
  }
}
