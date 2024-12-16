import { Component } from '@angular/core';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormEmployeeComponent],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  employee: Employee | null = null;
  employeeId: number | null= null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeServiceService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.employeeId = Number(params['id']);
      console.log('EmployeeId:..', this.employeeId);
    });
    if(this.employeeId) {
      this.getDataEmployee(this.employeeId);
    }
  }

  updateEmployee(e: Employee) {
    //console.log('Update employee:..', e);
    this.employeeService.updateEmployee(e.id, e).subscribe(
      {
        next: (response: any) => {
          console.log('updateEmployee response:..', response);
          this.router.navigate(['/employees']);
        },
        error: (error: any) => {
          console.log('error:..', error);
        }
      }
    );
  }

  getDataEmployee(id: number) {
    console.log('Get data employee:..', id);
    this.employeeService.getEmployeeById(id).subscribe(
      {
        next: (employee: Employee) => {
          console.log('Employee:..', employee);
          this.employee = employee;
          this.cd.detectChanges();
        },
        error: (error: any) => {
          console.log('error:..', error);
        }
      }
    );
  }

}
