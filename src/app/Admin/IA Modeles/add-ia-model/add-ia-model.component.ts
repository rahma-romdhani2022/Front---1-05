import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-ia-model',
  templateUrl: './add-ia-model.component.html',
  styleUrls: ['./add-ia-model.component.css']
})
export class AddIAModelComponent implements OnInit {

  constructor(private service : AdminService , private router : Router) { }
 test : any ; 
  retrieveResponse: any={};
  base64Data: any;
  id : number ;
  admin : any ; 
  imagePath : string ;
  username : string ;  
  role : string ;
  adminDigital:string ="adminDigital";
  adminMedical:string="adminMedical"
  roleMedical :string ="";
  roleDigital :string =""; 
  ngOnInit(){
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
     this.test=res ; 
     console.log(this.test.role);
     if(this.test.role === "Admin Medical Manager"){
       this.roleMedical=this.test.role ; 
      this.username = localStorage.getItem("nameAdmin");
      console.log(parseInt(localStorage.getItem('idAdmin')))
      console.log(localStorage.getItem("nameAdmin"))
      this.service.getAdminMedicall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
        this.admin=data
              if(this.admin.image ==null){
                this.imagePath="./assets/imagesD/faces/user.jpg"
              }
              else{
              this.retrieveResponse = this.admin;
              this.base64Data = this.retrieveResponse.image;
              this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
              console.log(this.imagePath)
              this.role=this.admin.role;  }) ;
     }
     else{
       if(this.test.role === "Admin Digital Manager"){
        this.roleDigital=this.test.role ; 
        this.username = localStorage.getItem("nameAdmin");
        console.log(parseInt(localStorage.getItem('idAdmin')))
        console.log(localStorage.getItem("nameAdmin"))
        this.service.getAdminDigitall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
          this.admin=data
                if(this.admin.image ==null){
                  this.imagePath="./assets/imagesD/faces/user.jpg"
                }
                else{
                this.retrieveResponse = this.admin;
                this.base64Data = this.retrieveResponse.image;
                this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
                console.log(this.imagePath)
                this.role=this.admin.role;  }) ;
       }
     }
    })
  }

  logout() {
    localStorage.removeItem('nameAdmin');
    this.service.islogin = false;
    this.router.navigate(['']);
    window.localStorage.clear();
      //location.reload();
  }
}
