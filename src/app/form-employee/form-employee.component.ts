import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../employee';
//import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent {

  @Input() employee!: Employee;
  @Input() isDeleteMode!: boolean;
  @Output() dataFormValues= new EventEmitter<Employee>();

  formEmployee!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    //console.log('dataEmployee:', this.employee);
    this.formEmployee = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      emailId: ['']
    });
    if(this.employee) {
      this.formEmployee.patchValue(this.employee);
    }else{
      this.employee = new Employee();
      this.formEmployee.patchValue(this.employee);
    }
    this.formEmployee.get('id')?.disable();
  }

  onSubmit() {
    const tempData= {
      id: this.formEmployee.controls['id'].value,
      firstName: this.formEmployee.controls['firstName'].value,
      lastName: this.formEmployee.controls['lastName'].value,
      emailId: this.formEmployee.controls['emailId'].value
    }
    //console.log('Form component id submitted!', this.formEmployee.value.id);
    this.dataFormValues.emit(tempData);
  }
}
