'use client'

import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function DonutChart() {
  return (
    <div className="bg-white rounded-2xl w-full pt-5 px-6 shadow">
      <div className="border-b border-gray-200 pb-1">
        <h3 className="text-gray-500 text-lg">Statistics</h3>
        <h4 className="text-gray-800 text-xl font-bold">Scans per target</h4>
      </div>

      <div className="w-full flex items-center py-2">
        <ReactApexChart
          options={{
            ...(options as any),
            labels: ['Target 1', 'Target 2', 'Target 3', 'Target 4'],
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      label: '1.05',
                      formatter: () => 'Average range',
                      fontSize: 22,
                      fontWeight: 900,
                      color: 'black',
                    },
                  },
                },
              },
            },
          }}
          series={series}
          type="donut"
          width={375}
        />
      </div>
    </div>
  )
}

var series = [44, 55, 13, 33]
var options = {
  chart: {
    width: 380,
    type: 'donut',
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  legend: {
    position: 'right',
    offsetY: 0,
    height: 230,
  },
}
