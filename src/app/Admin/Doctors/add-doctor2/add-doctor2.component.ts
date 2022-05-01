import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-add-doctor2',
  templateUrl: './add-doctor2.component.html',
  styleUrls: ['./add-doctor2.component.css']
})
export class AddDoctor2Component implements OnInit {

  constructor(private ar : ActivatedRoute , private service :AdminService , private userService : UserServiceService ,  private router : Router) 
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
  idExpertAjouterActuellement : number ; 
  test : any ; 
  uploadImageData : any 
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  id : number ;
  admin : any ; 
  expert : any ; 
  imagePath : any ;
  imagePath1 : any ;
  username : string ;  
  role : string ;
  roleMedical :string ="";
  roleDigital :string =""; 

  ngOnInit(){
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
    this.imagePath1="./assets/imagesD/faces/user.jpg" ;
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
      console.log((localStorage.getItem("idAdmin")))
      this.test=res ; 
      console.log(this.test.role);
      if(this.test.role === "Admin Medical Manager"){
        this.roleMedical =this.test.role ; 
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
          this.roleDigital =this.test.role ; 
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
     /****code input image *********************/
 
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
    
    /* if (event.target.files && event.target.files[0]) {
       var reader = new FileReader();
       reader.onload = function(event) {
         $('#imagePreview').css('background-image', 'url('+(<FileReader>event.target).result+')');
         $('#imagePreview').hide();
         $('#imagePreview').fadeIn(650);
     }}
     //reader.readAsDataURL(event.files[0]); 
       reader.readAsDataURL(event.target.files[0]); // read file as data url
       this.selectedFile = event.target.files[0];
       reader.onload = (event) => { // called once readAsDataURL is completed
         this.imagePath1 = reader.result;
       }*/
      

     
 
 
  registre(fl: NgForm){
    this.uploadImageData = new FormData();
    this.uploadImageData.append('imageFile', this.selectedFile);
    this.expert ={
      "email": fl.value.email,
      "username": fl.value.nom,
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
  this.uploadImageData.append('imageFile', this.selectedFile);
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
      this.router.navigate(['/All-Doctors']);
    } 
    ,err=>{
  
    alert(" Username de Dr Ophtalmologue Expert  ou Email existent dejaa !!!!");
    //this.invalidLogin = true
    }
 )}
 else{
   alert("verifier le mot de passe Svp !! ") ; 
  /*console.log("error")
  Swal.fire({
    title: 'Vérifier votre mot de passe Svp !!',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  }) */
this.test=true;}
}

modifierProfile(f:NgForm){
    this.service.updatedata(this.id , f.value).subscribe(()=>{
      console.log(f.value)
      console.log(this.selectedFile);
       this.uploadImageData = new FormData();
       this.uploadImageData.append('imageFile', this.selectedFile);
       console.log(this.selectedFile)
       this.service.updateImage(this.id ,this.uploadImageData).subscribe((response) => {}
         
       /* ,error =>{
          alert(" probléme dans modifier l'image ")
        }*/
       );
       this.router.navigate(['/PageProfile/'+this.id])
      /* Swal.fire({
        icon: 'success',
        title: 'Votre Profile  a changer ',
        showConfirmButton: false,
        timer: 2000
      })*/
    } , err=>{
      alert("Opps il y 'a un Probléme , username  ou email  existent déja ")
    })
  }
  
 /*readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(event) {
          $('#imagePreview').css('background-image', 'url('+(<FileReader>event.target).result+')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]); } }
$("#imageUpload").change(function() {
  readURL(this);
});*/
logout() {
  localStorage.removeItem('nameAdmin');
  localStorage.removeItem('role');
  localStorage.removeItem('emailAdmin');
  localStorage.removeItem('idAdmin');
  this.service.islogin = false;
  this.router.navigate(['']);
  window.localStorage.clear();
    //location.reload();
}
}
