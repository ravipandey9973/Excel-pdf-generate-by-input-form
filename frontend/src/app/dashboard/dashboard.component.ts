import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
 StudentList:any[]=[];
 RegNo:string="";
 Name:string="";
 Major:string="";
 DateOfJoining:string="";
 editData:any;

  constructor (private studentdata:ServicesService) {}

  ngOnInit(): void {
   this.getData(); 
  }
  getData()
  {
    this.studentdata.getstudent().subscribe((data)=>{

    this.StudentList=data;
    console.warn(data);
    });
  }
deletedata(id:any)
{
  this.studentdata.deletestudent(id.RegNo).subscribe((data)=>{
    alert("data deleted successfully");
    this.getData();
  })
}
updatedata(item:any)
{ var val={RegNo:this.editData.RegNo,Name:this.Name,major:this.Major,DateOfJoining:this.DateOfJoining};
  this.studentdata.updatestudent(val).subscribe((data)=>{
    alert("data update successfully");
    this.getData();
    this.editData=null;
  })
}
openModal()
{
  this.Name="";
  this.Major="";
  this.DateOfJoining="";
}

}
