<template>
  <div>
    <SmartForm
      v-model:value="formValues"
      :columns="columns"
      :formList="formList"
      @onSubmit="onFormSubmit"
    />
  </div>
  
</template>

<script setup>
import SmartForm from './SmartForm/SmartForm.vue'
import { ref } from 'vue'
const formValues = ref({
  time: '',
  type: '',
})
const columns = {
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
}
const formList = ['time', 'type']
function onFormSubmit(val) {
  console.log('onFormSubmit', val)
}
</script>

<style scoped></style>
