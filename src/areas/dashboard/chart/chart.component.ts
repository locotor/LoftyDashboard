import { Component, ElementRef, OnInit } from "@angular/core";
import echarts from "echarts";

@Component({
  selector: "chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"]
})
export class ChartComponent implements OnInit {
  constructor(private el: ElementRef) {
    console.log(el.nativeElement);
  }

  ngOnInit (): void {
    var posList: string[] = [
      "left", "right", "top", "bottom",
      "inside",
      "insideTop", "insideLeft", "insideRight", "insideBottom",
      "insideTopLeft", "insideTopRight", "insideBottomLeft", "insideBottomRight"
    ];
    let componentEl: any = this.el.nativeElement;
    let myChart: any = echarts.init(componentEl.firstChild.childNodes[1]);
    let option: any = {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: "shadow"        // 默认为直线，可选为："line" | "shadow"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    myChart.setOption(option);
  }

  // single = [
  //   {
  //     "name": "11月",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "10月",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "9月",
  //     "value": 7200000
  //   }
  // ];
  // multi = [
  //   {
  //     "name": "villas",
  //     "series": [
  //       {
  //         "name": "9月",
  //         "value": 6300000
  //       },
  //       {
  //         "name": "10月",
  //         "value": 6800000
  //       },
  //       {
  //         "name": "11月",
  //         "value": 7300000
  //       },
  //       {
  //         "name": "12月",
  //         "value": 8940000
  //       }
  //     ]
  //   },

  //   {
  //     "name": "hotel",
  //     "series": [
  //       {
  //         "name": "9月",
  //         "value": 7300000
  //       },
  //       {
  //         "name": "10月",
  //         "value": 7500000
  //       },
  //       {
  //         "name": "11月",
  //         "value": 7870000
  //       },
  //       {
  //         "name": "12月",
  //         "value": 8270000
  //       }
  //     ]
  //   },

  //   {
  //     "name": "apartment",
  //     "series": [
  //       {
  //         "name": "9月",
  //         "value": 7300000
  //       },
  //       {
  //         "name": "10月",
  //         "value": 6300000
  //       },
  //       {
  //         "name": "11月",
  //         "value": 8000002
  //       },
  //       {
  //         "name": "12月",
  //         "value": 7800000
  //       }
  //     ]
  //   }
  // ];
}
