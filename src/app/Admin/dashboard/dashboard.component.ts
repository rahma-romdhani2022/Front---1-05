import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as echarts from 'echarts';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private ar : ActivatedRoute , private service : AdminService ,private userService :UserServiceService ,  private router : Router) 
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
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
        this.roleDigital=this.test.role  , 
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
               // console.log(this.imagePath)
                this.role=this.admin.role;  }) ;
       }
     }
    })

    /***** */
    $('.counter').each(function() {
      var $this = $(this),
          countTo = $this.attr('data-count');
      
      $({countNum: $this.text()}).animate({
        countNum: countTo
      },
    
      {
    
        duration: 3000,
        easing:'linear',
        step: function() {
          $this.text(Math.floor(parseInt(this.countNum)));
        },
        complete: function() {
          $this.text(this.countNum);
          //alert('finished');
        }
    
      });  
      
      
    
    }); 
  
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom, 'dark');
    var option: EChartsOption;
    
    option = {
      backgroundColor:'rgb(25,28,36)',
      title: {
//text: 'Stacked Area Chart'
      },
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
        data: ['Patients', 'Age Patient']
      },
      toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            //dataView : {readOnly:false},
            magicType : {show: true, type: ['line', 'bar'/*, 'stack'*/]},
            restore : {show: true},
            saveAsImage : {show: true}
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
          data: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']
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
          emphasis: {
            focus: 'series'
          },
          data: [100, 258, 181, 230, 188, 127,150, 256, 151, 200, 106, 198]
        },
         
        {
          name: 'Age Patient',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
           focus: 'series'
          },
          data: [15, 20, 25, 30,35,40,45,50,55,60,65,70]
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


