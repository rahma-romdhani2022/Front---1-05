import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-stat-app',
  templateUrl: './stat-app.component.html',
  styleUrls: ['./stat-app.component.css']
})
export class StatAppComponent implements OnInit {
 test : any ; 
  retrieveResponse: any={};
  base64Data: any;
  id : number ;
  admin : any ; 
  imagePath : string ;
  username : string ;  
  role : string ;
  adminDigital:string ="adminDigital";
  adminMedical:string="adminMedical" ; 
  roleDigital :string ="";
  roleMedical :string ="" ; 
  constructor(private service : AdminService , private router : Router , private ar : ActivatedRoute)  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }

 

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

 

  var echarts = require('echarts');

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom, 'dark');
var option;

option = {
  backgroundColor:'#1A202E',
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      'Jan',
      'Fev',
      'Mar',
      'Avr',
      'Mai',
      'Jui',
      'Juil',
      'Aou',
      'Oct',
      'Nov',
      'Dec'
    ]
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}'
    }
  },
  series: [
    {
      name: 'Nombre des télechargements',
      type: 'line',
      color: '',
      data: [155, 100, 80, 250, 220, 260, 240, 369, 485, 122],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    }
  ]
};

option && myChart.setOption(option);
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
