import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/data-structures/interfaces/student';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { StudentApiService } from 'src/app/Services/student-api.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent implements OnInit {

  constructor(private _studentService: StudentApiService,private fb: FormBuilder) { }

  public formClient!: FormGroup;
  studentModel? : Partial<BasicResponse<Student>>;

  mobSoloLetras = "[a-zA-Z ]{2,254}";  
  mobSoloNumero = "^([0-9])*$"

  @Input() student:any;
  id: number = 0;
  firtsName: string = "";
  lastName: string = "";
  userName: string = "";
  age: number = 0;
  career: string = "";

  ngOnInit(): void {
    this.id = this.student.id;
    this.age = this.student.age;
    this.userName = this.student.userName;
    this.firtsName = this.student.firstName;
    this.lastName = this.student.lastName;
    this.career = this.student.career;
    this.createForm(); 
    if(this.student.id !=0){
      this.LlenarFormulario();
    }
  }

  createForm() {    
    this.formClient = this.fb.group({
      userName: ['', [this.noWhitespaceValidator,Validators.required]],         
      firstName: ['', [this.noWhitespaceValidator,Validators.required, Validators.pattern(this.mobSoloLetras)]], 
      lastName: ['', [this.noWhitespaceValidator,Validators.pattern(this.mobSoloLetras)]],       
      age: ['', [this.noWhitespaceValidator,Validators.required,Validators.pattern(this.mobSoloNumero)]],
      career: ['', [this.noWhitespaceValidator,Validators.pattern(this.mobSoloLetras)]],       
    });
  }

  LlenarFormulario()
  {
    this.formClient.setValue({userName:this.student.userName,age: this.student.age,
                              firstName:this.student.firstName, lastName: this.student.lastName,
                              career: this.student.career});
  }

  public noWhitespaceValidator(control: FormControl) {     
    if(control.value && control.value.length > 0){
      const isWhitespace = (control.value || '').trimStart().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
    }      
    return false;       
  }  

  async addStudent(){
    const studentSave = this.llenarStudent();    
    this.studentModel = await this._studentService.registerStudent(studentSave);
    if(this.studentModel.objectResponse !== null){      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      },4000)

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

  async UpdateStudent(){
    const studentSave = this.llenarStudent();    
    studentSave.id = this.id;
    this.studentModel = await this._studentService.updateStudent(studentSave);
    if(this.studentModel.objectResponse !== null){      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('update-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      },4000)

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

  public llenarStudent(){
    const studentAdd: Student = {
      id: 0,
      age: this.formClient.get('age')?.value,
      career: this.formClient.get('career')?.value,
      firstName: this.formClient.get('firstName')?.value,
      lastName: this.formClient.get('lastName')?.value,
      userName: this.formClient.get('userName')?.value,
    }
    return studentAdd;
  }
}
