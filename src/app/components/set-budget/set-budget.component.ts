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
export class SetBudgetComponent implements OnInit{
  faBudget = faChartPie;
  faExchange = faExchange;
  faDashboard = faDashboard;
  faTrash = faTrashAlt


  showModalTransaction = false;
  selectedCategory: string = '';
  previousAmount: string = '';
  editedAmount: string = '';
  public categoriesNoSpend:any = [];
  public newCategory:string = ''



constructor(private auth:AuthService){}
ngOnInit(): void {
    this.categoriesWithNoSpend()
    
}
createCategory(){
  const newCategoryData = {
    name:this.newCategory,
  }
  this.auth.createCategory(newCategoryData).subscribe({
    next:(response)=>{
      this.closeModal()
      console.log('category created',response);
      this.newCategory = ''
    },
    error:(error)=>{
      console.log('error creating category',error)
    }

  })
}


deleteCategory(category:{categoryId:string}):void{
  this.auth.deleteCategory(category.categoryId).subscribe({
    next:()=>{
      console.log(`category ${category.categoryId} deleted successful`)
    },
    error:(err)=>console.log(err),
    complete:()=>{
      this.categoriesWithNoSpend()
    }
  })
}


  categoriesWithNoSpend():void{
    this.auth.categoryWithNoSpend().subscribe({
      next:(response)=>{
        console.log(response)
        this.categoriesNoSpend = response},
      error:(err)=>console.log(err),
      complete:()=>console.log('complete')
    })
  }





  openEditModal(category: string, previousAmount: string) {
    // Open the modal and pass the selected category and previous amount
    this.showModalTransaction = true;
    this.selectedCategory = category;
    this.previousAmount = previousAmount;
    this.editedAmount = previousAmount; // Initialize edited amount with the previous amount

    // Show the modal (you can implement this using Tailwind CSS classes or Angular ngIf/ngClass)
    // For example, you can add a CSS class to make the modal visible
  }

  saveEditedAmount() {
    // Implement logic to save the edited amount for the selected category
    console.log('Category:', this.selectedCategory);
    console.log('Previous Amount:', this.previousAmount);
    console.log('Edited Amount:', this.editedAmount);
    this.showModalTransaction = false

    // Close the modal (you can implement this using Tailwind CSS classes or Angular ngIf/ngClass)
    // For example, you can remove the CSS class to hide the modal
  }



  
  showModal = false;
 
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.showModalTransaction = false;
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
