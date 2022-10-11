import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentComponent } from './Components/student/student.component';
import { ShowStudentComponent } from './Components/student/show-student/show-student.component';
import { AddEditStudentComponent } from './Components/student/add-edit-student/add-edit-student.component';

import { StudentApiService } from './Services/student-api.service'

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    ShowStudentComponent,
    AddEditStudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StudentApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
