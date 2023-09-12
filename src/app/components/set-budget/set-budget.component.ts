import { Component, OnInit } from '@angular/core';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faExchange } from '@fortawesome/free-solid-svg-icons';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-set-budget',
  templateUrl: './set-budget.component.html',
  styleUrls: ['./set-budget.component.css'],
})
export class SetBudgetComponent {
  faBudget = faChartPie;
  faExchange = faExchange;
  faDashboard = faDashboard;
  faTrash = faTrashAlt


  
  showModal = false;
 
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  editCategoryName(): void {
    // Implement logic to edit the category name
    // You can use a form within the modal to get the new name
    // Update the category name accordingly
    this.closeModal();
  }

  deleteCategory(): void {
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
