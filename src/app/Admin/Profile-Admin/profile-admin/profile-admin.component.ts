import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
toggleProperty = false;
admin : any ; 
clicked : string="false" ; 
imageAdmin : any ;
image : any ;
retrieveResponse: any={};
base64Data: any;
test : any ; 
username : string ;  
role : any ; 
selectedFile: File;
uploadImageData : any ;
doneImage: any ; 
roleMedical:string ="" ; 
roleDigital : string ="";
  constructor(private service : AdminService , private ar : ActivatedRoute  , private router : Router)
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }

  ngOnInit() {
    $(".toggle-password").click(function() {

      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
   this.clicked="false"
    //console.log("adminnn connecte " , this.service.AdminConnecte)
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
      this.test=res ; 
      console.log(this.test.role);
      if(this.test.role === "Admin Medical Manager"){
        this.roleMedical= this.test.role ; 
       this.username = localStorage.getItem("nameAdmin");
       console.log(parseInt(localStorage.getItem('idAdmin')))
       console.log(localStorage.getItem("nameAdmin"))
       this.service.getAdminMedicall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
        // this.admin=data
         this.service.AdminConnecte=data ; 
         this.admin = this.service.AdminConnecte ; 
               if(this.admin.image ==null){
                 this.image="./assets/imagesD/faces/user.jpg"
                 this.imageAdmin="./assets/imagesD/faces/user.jpg"
               }
               else{
               this.retrieveResponse = this.service.AdminConnecte ;
               this.base64Data = this.retrieveResponse.image;
               this.imageAdmin = 'data:image/jpeg;base64,' + this.base64Data;
               this.image = 'data:image/jpeg;base64,' + this.base64Data;}
               console.log(this.imageAdmin)
               this.role=this.admin.role;  }) ;
      }
      else{
        if(this.test.role === "Admin Digital Manager"){
          this.roleDigital= this.test.role ; 
         this.username = localStorage.getItem("nameAdmin");
         console.log(parseInt(localStorage.getItem('idAdmin')))
         console.log(localStorage.getItem("nameAdmin"))
         this.service.getAdminDigitall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
          // this.admin=data
          this.service.AdminConnecte = data ;
          this.admin=this.service.AdminConnecte ;
                 if(this.admin.image ==null){
                   this.imageAdmin="./assets/imagesD/faces/user.jpg"
                 }
                 else{
                 this.retrieveResponse = this.service.AdminConnecte;
                 this.base64Data = this.retrieveResponse.image;
                 this.imageAdmin = 'data:image/jpeg;base64,' + this.base64Data; }
               //  console.log(this.imageAdmin)
                 this.role= this.service.AdminConnecte.role;  }) ;
        }
      }
     })

   
}
onSelectFile(event ) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    this.selectedFile = event.target.files[0];
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.image = reader.result;
      this.clicked="true"
    }
  }
}


// Edit profile 
modifierProfileAdminnn(f : NgForm){
  this.uploadImageData = new FormData();
  this.uploadImageData.append('imageFile', this.selectedFile);
  if(this.selectedFile !== null)
   {this.service.updateImageProfileAdminMedical(parseInt(localStorage.getItem("idAdmin")),this.uploadImageData).subscribe(
    data=>{
           this.service.AdminConnecte=data ; 
           console.log("update sarrr ")
         this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(data=>{
           this.service.AdminConnecte=data ; 
         })
           this.ngOnInit() ; 
           this.toggle();
     },
   err=>{
    alert("Opps il y 'a un Probl??me , username  ou email  existent d??ja ")
  })
}

}

retourPageProfil(){
  this.service.clicker();
  this.ngOnInit();
}
retourPageEdit(){
  this.service.clicker();
  this.ngOnInit();
}

toggle() {
  this.toggleProperty = !this.toggleProperty;
}
clickerProfile(){
  $('.cardFlip1').toggleClass('flipped');
}
clickerEdite(){
  $('.cardFlip').toggleClass('flipped');
}


}