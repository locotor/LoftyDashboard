import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  single = [
    {
      "name": "11月",
      "value": 8940000
    },
    {
      "name": "10月",
      "value": 5000000
    },
    {
      "name": "9月",
      "value": 7200000
    }
  ];
  multi = [
    {
      "name": "villas",
      "series": [
        {
          "name": "9月",
          "value": 6300000
        },
        {
          "name": "10月",
          "value": 6800000
        },
        {
          "name": "11月",
          "value": 7300000
        },
        {
          "name": "12月",
          "value": 8940000
        }
      ]
    },

    {
      "name": "hotel",
      "series": [
        {
          "name": "9月",
          "value": 7300000
        },
        {
          "name": "10月",
          "value": 7500000
        },
        {
          "name": "11月",
          "value": 7870000
        },
        {
          "name": "12月",
          "value": 8270000
        }
      ]
    },

    {
      "name": "apartment",
      "series": [
        {
          "name": "9月",
          "value": 7300000
        },
        {
          "name": "10月",
          "value": 6300000
        },
        {
          "name": "11月",
          "value": 8000002
        },
        {
          "name": "12月",
          "value": 7800000
        }
      ]
    }
  ];

  // options
  chartView = [800,350];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'month';
  showYAxisLabel = true;
  yAxisLabel = 'visit-amount';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // line, area
  autoScale = true;

}
