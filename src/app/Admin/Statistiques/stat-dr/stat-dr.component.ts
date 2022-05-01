import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-stat-dr',
  templateUrl: './stat-dr.component.html',
  styleUrls: ['./stat-dr.component.css']
})
export class StatDrComponent implements OnInit {
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
  roleDigital :string="" ;
  roleMedical :string =""; 

  constructor(private service : AdminService  , private router : Router , private ar : ActivatedRoute) 
  {
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
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Dr Ophtalmologue Expert', 'Médecin']
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dem']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Dr Ophtalmologue Expert',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [22, 20, 29, 20, 23, 20, 15]
    },

    {
      name: 'Médecin',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [25, 33, 20, 25, 25, 25, 21]
    }
  ]
};

option && myChart.setOption(option);
/******************************** Chart Categories ****************/

var app = {};

var chartDom = document.getElementById('main2');
var myChart = echarts.init(chartDom, 'dark');
var option;

option = {
  backgroundColor:'#1A202E',
  legend: {},
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  dataset: {
    source: [
      ['product', 'Homme', 'Femme'],
      ['Médecins', 50, 70],
      ['Ophtalmologues',50, 80]
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
    { type: 'bar' },
    {
      type: 'bar',
      itemStyle: {
        color: '#a90000'
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
