import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogConfig } from "@angular/material";
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatDialogRef , MAT_DIALOG_DATA} from "@angular/material/dialog";
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  doneImage : any ; 
  experts : any ; 
fileData: File = null;
 url : FileReader ;
 selectedFile: File;
 imagePath1 : any ;
 uploadImageData : any ;
 expert : any ; 
 idExpertAjouterActuellement : number ; 
 test : any ;
 constructor(private dialog: MatDialog ,private service :AdminService , private userService : UserServiceService ,  
             private router : Router ,@Inject(MAT_DIALOG_DATA)  public data,
             public dialogRef:MatDialogRef<AddDoctorComponent> ) {}

  ngOnInit() {
    this.imagePath1="./assets/imagesD/faces/user.jpg" ;
   /***********************  checkbox de eye de password 1 ************/
  $(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
   /***********************  checkbox de eye de password  2 ************/
  $(".toggle-password2").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
 
}

onSelectFile(event ) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url
    this.selectedFile = event.target.files[0];
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.imagePath1 = reader.result;
    }
  }
}
  
  registre(fl: NgForm){
    this.uploadImageData = new FormData();
    this.uploadImageData.append('imageFile', this.selectedFile);
    this.expert ={
      "email": fl.value.email,
      "username": fl.value.username,
      "password": fl.value.pwd,
      "role" : "Expert",
      "gender":fl.value.gender,
      "telephone":fl.value.telephone,
     // "image":this.uploadImageData,     
}
if (fl.value.pwd==fl.value.pwdc){ 
  console.log(this.expert)
  console.log(localStorage.getItem('idAdmin'))
  console.log(fl.value.nom)
  this.uploadImageData = new FormData();
  if(this.selectedFile== null){
    this.doneImage = null ;
    console.log(this.doneImage) }
    else{
      this.doneImage=this.selectedFile
    }
   this.uploadImageData.append('imageFile', this.doneImage);
  //this.uploadImageData.append('imageFile', this.selectedFile);
  console.log(this.uploadImageData)    
    this.service.AddExpertAvecAdmin(parseInt(localStorage.getItem('idAdmin'))  ,  this.expert ).
    subscribe( data => {
      this.idExpertAjouterActuellement = data ; 
      console.log( this.idExpertAjouterActuellement);
      if(this.selectedFile != null){
      this.service.updateImageExpert( this.idExpertAjouterActuellement , this.uploadImageData).subscribe();}
      console.log(this.expert)
      console.log(localStorage.getItem('idAdmin'))
      console.log(this.uploadImageData )
      console.log(fl.value.nom)
      
     this.service.getAllExperts("expert").subscribe(
      response =>{this.service.expertsData = response;
      this.service.testTab = this.service.expertsData.length;}
     );
     this.dialogRef.close();
     this.router.navigate(['/All-Doctors']);
    } 
    ,err=>{
  
      alert(" Username de Dr Ophtalmologue Expert  ou Email existent déjaa !!!!");
    //this.invalidLogin = true
    }
 )}
 else{
   alert("verifier le mot de passe Svp !! ") ; 
 
this.test=true;}
}
 /*getAllDrsExperts(){
      this.service.getAllExperts("expert").subscribe(data=>{
        this.experts=data;
      });
    }*/
    getAllDrsExperts(){
      this.service.getAllExperts("expert").subscribe(data=>{
      this.service.expertsData=data;
      this.service.testTab = this.service.expertsData.length;})
      }
  onClear(){

 /*autre code */

    this.onClose11();
 }
 onClose11(){
   this.dialogRef.close();
 }
}