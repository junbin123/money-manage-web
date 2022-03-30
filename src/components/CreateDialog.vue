<template>
  <Teleport to="body">
    <div class="dialog-box">
      <el-dialog
        title="添加账单"
        v-model="showPop"
        center
        width="600px"
        @close="$emit('dialogClose')"
      >
        <SmartForm :value="inputValues" :columns="columnsTemp" :formList="createList" />
        <template #footer>
          <div class="w-full flex justify-end">
            <el-button plain @click="showPop = false">取消</el-button>
            <el-button type="primary" @click="onCreate" :loading="isLoading">添加账单</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </Teleport>
</template>

<script setup>
import SmartForm from './SmartForm/SmartForm.vue'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
import { useProp } from '@/hooks'

const emit = defineEmits(['dialogClose', 'onCreate'])
const props = defineProps({
  createValues: Object,
  createList: Array,
  columns: Object,
  isShow: Boolean,
  isLoading: Boolean,
})
const showPop = useProp('isShow')
const inputValues = useProp('createValues')

function onCreate() {
  const { category, amount, createTime } = inputValues.value
  console.log({ category, amount, createTime })
  if (!(category && amount && createTime)) {
    ElMessage.error('请填写账单信息')
    return
  }
  const money = Math.round(parseFloat(amount) * 100) / 100
  if (isNaN(money)) {
    ElMessage.error('请输入正确的金额')
    inputValues.value.amount = ''
    return
  }
  inputValues.value.amount = money
  emit('onCreate', inputValues)
}

const columnsTemp = computed(() => {
  const res = {}
  props.createList.forEach((key) => {
    res[key] = {
      ...props.columns[key],
      form: {
        ...props.columns[key].form,
        clearable: false,
      },
    }
  })
  return res
})
</script>

<style scoped></style>
