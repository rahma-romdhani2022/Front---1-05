import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {

  test : any ; 
  retrieveResponse: any={};
  base64Data: any;
  id : number ;
  admin : any ; 
  imagePath : string ;
  username : string ;  
  role : string ;
  patientASupprimer : any ; 
  adminDigital:string ="adminDigital";
  adminMedical:string="adminMedical"
  constructor(private ar : ActivatedRoute , private dialog: MatDialog , private service : AdminService ,
     private router : Router , private servicePatient : PatientService) 
     {
      ar.params.subscribe(val => {
        this.ngOnInit();
      })
    }
  
    ngOnInit(){
      this.servicePatient.lengthTabPatients = this.servicePatient.patients.length;
      this.ar.paramMap.subscribe((x)=>{
        this.id =+ x.get('id');
    }) ; 
    console.log(this.servicePatient.patients)
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
      this.test=res ; 
      console.log(this.test.role);
      if(this.test.role === "Admin Medical Manager"){
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

this.servicePatient.getAllPatients().subscribe(data=>{
  this.servicePatient.patients=data ; 
  this.servicePatient.lengthTabPatients = this.servicePatient.patients.length;
  console.log(this.servicePatient.patients)

})
  }

  deletePatient(cin :number){
    this.servicePatient.getPatient(cin).subscribe(data=>{
      this.patientASupprimer = data
     
      
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "de supprimer patient : " +  this.patientASupprimer.username,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.servicePatient.deletePatient(cin).subscribe(()=>{this.getAllPatientss()})
          Swal.fire(
            'Supprimé !',
            'Médecin  a été supprimé.',
            'success'
          )}
        });
      });
    }
      
      getAllPatientss(){
        this.servicePatient.getAllPatients().subscribe(data=>{
          this.servicePatient.patients=data;
          this.servicePatient.lengthTabPatients =this.servicePatient.patients.length; })
        }
   details(){
    Swal.fire({
      background: '#1A202E',
      title: 'Custom animation with Animate.css',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
      
    })
}

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