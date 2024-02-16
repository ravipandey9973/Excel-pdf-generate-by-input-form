import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  userList:any[]=[];
  RegNo:string="";
  Name:String="";
  Major:string="";
  DateOfJoining:string=""

  constructor (private studentdata:ServicesService) {}

  loginform = new FormGroup({
    Name: new FormControl('',[Validators.required]),
    Major: new FormControl('',[Validators.required]),
    DateOfJoining: new FormControl('',[Validators.required])
    
  })
get Namee()
{
  return this.loginform.get('Name');
}
get Majorr()
{
  return this.loginform.get('Major');
}
get DateOfJoiningg()
{
  return this.loginform.get('DateOfJoining');
}
  adddata()
  { var val={RegNo:this.RegNo,Name:this.Name,Major:this.Major,DateOfJoining:this.DateOfJoining}
   
     this.studentdata.addstudent(val).subscribe((data:any)=>{
      this.userList=data;
      alert("added successfully");
     });
  }

  downloadPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Adding a border around the page
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    const imgData = 'assets/lpulogo.png'; // Replace this with your image data
    doc.addImage(imgData, 'PNG', 45, 10, 20, 20);

    doc.setFontSize(16);
    doc.text('Student Details', 80, 20);

    const startY = 20;
    const lineHeight = 10;
    const xOffset = 30;
    const yOffset = 30;
  

    doc.setFontSize(12);
     doc.text(`Name: ${this.Name}`, xOffset, startY + yOffset);
    doc.text(`Major: ${this.Major}`, xOffset+100, startY + yOffset );
    doc.text(`Date Of Joining: ${this.DateOfJoining}`, xOffset, startY + yOffset + 2* lineHeight);

    doc.save('student_details.pdf');
  }

  downloadExcel() {
    const data = [{
      'Name': this.Name,
      'Major': this.Major,
      'Date Of Joining': this.DateOfJoining
    }];

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'student_details.xlsx');
  }


}
