import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss']
})
export class BillingFormComponent implements OnInit {

  userForm: FormGroup = new FormGroup({

    productData: new FormArray([])
  }
  );

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.setupForm();
    // throw new Error('Method not implemented.');
  }

  setupForm() {

    this.userForm = this.fb.group({
      Name: [""],
      Address: [""],
      GSTNO: ["", [Validators.required, Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]],
      productData: this.fb.array([this.initItemRows()]),
    })


  }



  initItemRows(): FormGroup {
    return this.fb.group({
      index: [""],
      Description: [""],
      HSN: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      Quantity: [""],
      Rate: [""]
    })
  }


  get formarr(): FormArray {
    return this.userForm.get('productData') as FormArray;
  }

  addNewRow() {
    this.formarr?.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formarr.removeAt(index);
  }



  getItemRows() {
    return (this.userForm.get('productData') as FormArray).controls;
  }




  submitForm() {
    console.log(this.userForm.value);

  }


  get GSTNO() {
    return this.userForm.get('GSTNO');
  }

  // get HSN(){
  //   return this.userForm.get('HSN');
  // }

  get Name(){
    return this.userForm.get('Name');
  }

  get Address(){
    return this.userForm.get('Address');
  }
  get productData(){
return this.userForm.get('productData');
  }
  get HSN(){
    return this.productData?.get('HSN');
  }

  get Description(){
    return this.productData?.get('Description');
  }
  get Quantity(){
    return this.productData?.get('Quantity');
  }

  get Rate(){
    return this.productData?.get('Rate');
  }

}



