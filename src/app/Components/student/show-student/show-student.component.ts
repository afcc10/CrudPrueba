import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/data-structures/interfaces/student';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { StudentApiService } from 'src/app/Services/student-api.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {

  STUDENTS?: Partial<BasicResponse<Student[]>>;
  modalTitle: string = '';
  activateAddEditStudentComponent: boolean = false;
  student:any;
  studentModel? : Partial<BasicResponse<boolean>>;

  constructor(private _studentService: StudentApiService) { }

  async ngOnInit(): Promise<void> {    
    this.getStudent();
  }

  async getStudent(){
    this['STUDENTS'] = await this._studentService.getStudents();
  }

  modalAdd(){
    this.student = {
      id:         0,
      userName:   '',
      firstName:  '',
      lastName:   '',
      age:        0,
      career:     ''
    }
    this.modalTitle = 'Add student';
    this.activateAddEditStudentComponent = true;
  }

  async modalClose(){
    this.activateAddEditStudentComponent = false;
    this.getStudent();
  }

  modalEdit(item:any){
    this.student = item;
    this.modalTitle = 'Edit student';
    this.activateAddEditStudentComponent = true;
  }

  async delete(item:any){
    if(confirm(`Esta seguro de eliminar al estudiante ${item.id}`)){
      this.studentModel = await this._studentService.deleteById(item.id);
      if(this.studentModel.objectResponse !== null){      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('delete-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      },4000)

      this.getStudent();

    }
    else{
      Swal.fire({
        title: 'Student',
        text: this.studentModel.message[0],
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      })     
    }
    }
  }

}
