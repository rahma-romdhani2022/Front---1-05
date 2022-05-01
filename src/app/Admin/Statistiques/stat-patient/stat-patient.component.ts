import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-stat-patient',
  templateUrl: './stat-patient.component.html',
  styleUrls: ['./stat-patient.component.css']
})
export class StatPatientComponent implements OnInit {
 test : any ; 
  retrieveResponse: any={};
  base64Data: any;
  id : number ;
  admin : any ; 
  imagePath : string ;
  username : string ;  
  role : string ;
  adminDigital:string ="admiDigital";
  adminMedical:string="adminMedical" ;
  roleMedical:string ="";
  roleDigital:string ="";
  constructor(private service : AdminService , private router : Router , private ar : ActivatedRoute)
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
    data: ['Patients']
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
      data: ['Lun', 'Mar', 'Merc', 'Jeu', 'Vend', 'Samd', 'Dem']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Patients',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      color: '#5D6E69',
      emphasis: {
        focus: 'series'
      },
      data: [210, 200, 222, 219, 210, 199, 210]
    }
  ]
};

option && myChart.setOption(option);
/******** chart 2 */

var app = {};

var chartDom = document.getElementById('main2');
var myChart = echarts.init(chartDom, 'dark');
var option;

option = {
  backgroundColor:'#1A202E',
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      saveAsImage: { show: true }
    }
  },
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', 'Homme', 'Femme'],
      ['Lun', 40, 30],
      ['Mar', 20, 34],
      ['Mer', 46, 25],
      ['Jeu', 24, 39],
      ['Ven', 14, 11],
      ['Sam', 24, 39],
      ['Dim', 24, 39]
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
    { type: 'bar', color: '#599AF3' },
    { type: 'bar', color: '#FB8E99' }
  ]
};

option && myChart.setOption(option);
/********************* chart 3 */

var chartDom = document.getElementById('main3');
var myChart = echarts.init(chartDom, 'dark');
var option;

option = {
  backgroundColor:'#1A202E',
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    top: 440,
    data: [
      'Patients Patologiques',
      'Patients Sains',
      'Patologie 1',
      'Patologie3',
      'Patologie 5',
      'Patients Saines',
      'Patologie 2',
      'Patologie 4',
    ]
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],
      label: {
        position: 'inner',
        fontSize: 14
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1480, name: 'Patients Sains' },
        { value: 800, name: 'Patients Malades' , selected: true}
      ]
    },
    {
      name: 'Patients',
      type: 'pie',
      radius: ['45%', '60%'],
      labelLine: {
        length: 30
      },
      label: {
        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 22,
            align: 'center'
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0
          },
          b: {
            color: '#4C5058',
            fontSize: 14,
            fontWeight: 'bold',
            lineHeight: 33
          },
          per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [3, 4],
            borderRadius: 4
          }
        }
      },
      data: [
        { value: 1048, name: 'Patients Saines' },
        { value: 310, name: 'Patologie 1' },
        { value: 251, name: 'Patologie 2' },
        { value: 234, name: 'Patologie3' },
        { value: 147, name: 'Patologie 4' },
        { value: 135, name: 'Patologie 5' },
      ]
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
