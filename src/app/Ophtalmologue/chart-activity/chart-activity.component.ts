import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as echarts from 'echarts';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-chart-activity',
  templateUrl: './chart-activity.component.html',
  styleUrls: ['./chart-activity.component.css']
})
export class ChartActivityComponent implements OnInit {
  name  = '';
imagePath :string=null;
user :any={};
expert : any={};
retrieveResponse: any={};
base64Data: any;
test : string = "rahma" ; 
nom_Expert : string="" ; 
id : number ; 
  constructor(private service : UserServiceService , private router : Router , private ar : ActivatedRoute)
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
  ngOnInit() {
    this.id=parseInt(localStorage.getItem("id")) ;  
    this.service.getData(parseInt(localStorage.getItem('id'))).subscribe(data=>{
      this.user=data
            if(this.user.image ==null){
              this.imagePath="./assets/imagesD/faces/user1.png"
            }
            else{
              this.imagePath=this.imagePath ; 
            
            this.retrieveResponse = this.user;
            this.base64Data = this.retrieveResponse.image;
            this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
    
  }) ;
    $( "#menu" ).on( "click", function()
    {
      $( "#menu23" ).fadeToggle( "fast" );
    });

    /// chart
    var echarts = require('echarts');
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    
    setTimeout(function () {
      option = { 
        textStyle :{
            fontSize :'15', 
          },
          
        legend: {},
        tooltip: {
         
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [   
            ['product', 'Janv', 'Fevr', 'Mar', 'Avr', 'Mai', 'Jui'],
            ['Demandes d avis ont été répondues', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
            ['Demandes d avis envoyée', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],

          //  ['Patients', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
          //  ['Walnut Brownie', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
         /* {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          }*/,
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '29%'],
            emphasis: {
              focus: 'self'
            },
            label: {
              color:"#000",
              fontStyle: 'normal',
              fontWeight: 'normal',
              formatter: '{b}: {@Janv} ({d}%)'
            },
            encode: {
              itemName: 'product',
              value: 'Janv',
              tooltip: 'Janv'
            }
          }
        ]
      };
      myChart.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          });
        }
      });
      myChart.setOption(option);
    });
    
    option && myChart.setOption(option);
    
  }
  logout() {
    localStorage.removeItem('name');
    this.service.islogin = false;
  this.router.navigate(['']);
      ///location.reload();
  }
}
