import dayjs from 'dayjs'
export const columns = {
  time: {
    label: '日期',
    formType: 'date-picker',
    key: 'time',
    form: {
      type: 'month',
      placeholder: '请选择月份',
      render: ({ time }) => {
        return dayjs(time).format('YYYY/MM/DD HH:mm')
      },
    },
  },
  type: {
    label: '收支类型',
    formType: 'select',
    key: 'type',
    form: {
      clearable: true,
      placeholder: '请选择收支类型',
      render: ({ type }) => ['支出', '收入'][type],
      options: [
        {
          label: '支出',
          value: 0,
        },
        {
          label: '收入',
          value: 1,
        },
      ],
    },
  },
  category: {
    label: '账单分类',
    key: 'category',
    formType: 'select',
    form: {
      clearable: true,
      placeholder: '请选择账单分类',
      options: [],
    },
  },
  categoryName: {
    label: '账单分类',
    key: 'categoryName',
  },
  amount: {
    label: '账单金额',
    key: 'amount',
    form: {
      render: ({ amount }) => {
        return '￥' + amount
      },
    },
  },
}
