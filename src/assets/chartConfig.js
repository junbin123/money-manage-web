const data1 = {
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
      data: [],
      borderColor: '#E74040',
      backgroundColor: '#EA7878',
    },
  ],
}
export const defaultConfig1 = {
  type: 'bar',
  data: data1,
  options: {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 1,
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

const data2 = {
  labels: [],
  datasets: [
    {
      label: '支出金额',
      data: [],
      borderColor: '#E74040',
      backgroundColor: '#EA7878',
    },
  ],
}

export const defaultConfig2 = {
  type: 'bar',
  data: data2,
  options: {
    elements: {
      bar: {
        borderWidth: 1,
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
