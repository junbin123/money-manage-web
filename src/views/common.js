export const columns = {
  time: {
    label: '选择月份',
    formType: 'date-picker',
    key: 'time',
    form: {
      type: 'month',
      placeholder: '请选择月份',
    },
  },
  type: {
    label: '账单类型',
    formType: 'select',
    key: 'type',
    form: {
      clearable: true,
      placeholder: '请选择账单类型',
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
  },
  amount: {
    label: '账单金额',
    key: 'amount',
  },
}
