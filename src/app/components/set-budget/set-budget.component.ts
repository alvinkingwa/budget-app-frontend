import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faExchange } from '@fortawesome/free-solid-svg-icons';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-set-budget',
  templateUrl: './set-budget.component.html',
  styleUrls: ['./set-budget.component.css'],
})
export class SetBudgetComponent implements OnInit {
parseFloat(arg0: string): number {
throw new Error('Method not implemented.');
}
  faBudget = faChartPie;
  faExchange = faExchange;
  faDashboard = faDashboard;
  faTrash = faTrashAlt;

  showModalTransaction = false;
  showModalAmountLimit = false;
  selectedCategory: string = '';
  previousAmount: number = 0;
  editedAmount: number = 0;
  public categoriesNoSpend: any = [];
  public newCategory: string = '';
  selectedCategoryLimit: any;
  selectedCategoryLimitModel = false;
  showModal = false;
  public displayAmountLimit: any = [];

  amountLimit: number = 0;

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.categoriesWithNoSpend();
    this.categoryAmountLimit();
  }
  createCategory() {
    const newCategoryData = {
      name: this.newCategory,
    };
    this.auth.createCategory(newCategoryData).subscribe({
      next: (response) => {
        this.closeModal();
        console.log('category created', response);
        this.newCategory = '';
      },
      error: (error) => {
        console.log('error creating category', error);
      },
    });
  }

  deleteCategory(category: { categoryId: string }) {
    this.auth.deleteCategory(category.categoryId).subscribe({
      next: () => {
        console.log(`category ${category.categoryId} deleted successful`);
      },
      error: (err) => console.log('cannot delete', err),
      complete: () => {
        this.categoriesWithNoSpend();
      },
    });
  }

  updateCategoryLimit( categoryId: string ,amountLimit:number) {
    this.auth.updateCategoryLimit(categoryId,amountLimit).subscribe({
      next: (response) => {
        console.log('checking my response', response);
      },
      error:(error)=>{
        console.log('error updating amount Limit',error)
      }
    });
  }

  categoryAmountLimit(): void {
    const userId = this.auth.getUserIdFromToken();
    if (userId) {
      this.auth.getUserBalance(userId).subscribe({
        next: (response) => {
          console.log('users info', response);
          const test = (this.displayAmountLimit = response.categories);
          console.log('testing display', test);
        },
      });
    }
  }

  categoriesWithNoSpend(): void {
    this.auth.categoryWithNoSpend().subscribe({
      next: (response) => {
        console.log('no spent', response);
        this.categoriesNoSpend = response;
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  openAmountLimitModal(category: any) {
    // this.selectedCategoryLimit = category;
    // this.amountLimit = category.amountLimit;
    this.selectedCategoryLimitModel = true;
    console.log('check if it is working ', this.amountLimit);
  }
  saveAmountLimit() {
    if (this.selectedCategoryLimit && this.amountLimit > 0) {
      this.auth
        .amountLimit(this.selectedCategoryLimit.categoryId, this.amountLimit)
        .subscribe({
          next: (response) => {
            console.log('amount Limit set:', response);
            this.closeAmountLimitModal();
          },
          error: (error) => {
            console.log('cannot set amount Limit twice', error);
          },
        });
    }
  }

  openEditModal(categoryName: string, previousAmount: number) {
    this.showModalTransaction = true;
    this.selectedCategory = categoryName;

    if (previousAmount !== null && previousAmount !== undefined) {
      this.previousAmount = previousAmount;
      this.editedAmount = this.previousAmount;
    } else {
      this.previousAmount = 0;
      this.editedAmount = 0;
    }
  }

  saveEditedAmount() {
    console.log('Category:', this.selectedCategory);
    console.log('Previous Amount:', this.previousAmount);
    console.log('Edited Amount:', this.editedAmount);
    this.showModalTransaction = false;

    // Close the modal (you can implement this using Tailwind CSS classes or Angular ngIf/ngClass)
    // For example, you can remove the CSS class to hide the modal
  }

  openModal(): void {
    this.showModal = true;
  }
  closeAmountLimitModal(): void {
    this.selectedCategoryLimitModel = false;
    this.selectedCategoryLimit = null;
    this.amountLimit = 0;
  }

  closeModal(): void {
    this.showModal = false;
    this.showModalTransaction = false;
    this.showModalAmountLimit = false;
    this.selectedCategoryLimitModel = false;
  }

  editCategoryName(): void {
    // Implement logic to edit the category name
    // You can use a form within the modal to get the new name
    // Update the category name accordingly
    this.closeModal();
  }

  deleteyCategory(): void {
    // Implement logic to delete the category
    // Confirm the deletion with the user and handle it accordingly
    this.closeModal();
  }

  setBudgetLimit(): void {
    // Implement logic to set the budget limit for the category
    // You can use a form within the modal to get the new budget limit
    // Update the category's budget limit accordingly
    this.closeModal();
  }

  addCategory(): void {
    // Implement your category addition logic here
    // You can send data to your backend, update categories, etc.
    // After adding the category, close the modal
    this.closeModal();
  }
}
