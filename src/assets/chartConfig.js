const data = {
  // labels: ['2019/12/16', '2019/12/17', '2019/12/18', '2019/12/16'],
  labels: [],
  datasets: [
    {
      label: '收入',
      data: [],
      borderColor: '#38a169',
      backgroundColor: '#63BC8D',
      borderWidth: 1,
    },
    {
      label: '支出',
      // data: [-12, -19, -3, 5, 2, 3],
      data: [],
      borderColor: '#E74040',
      backgroundColor: '#EA7878',
    },
  ],
}
export const defaultConfig = {
  type: 'bar',
  data,
  options: {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  },
}
