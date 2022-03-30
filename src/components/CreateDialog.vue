<script setup>
// 添加账单弹窗组件

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

// 点击添加按钮方法
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
  emit('onCreate', inputValues.value)
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

<template>
  <Teleport to="body">
    <div class="dialog-box">
      <el-dialog
        title="添加账单"
        v-model="showPop"
        center
        @close="$emit('dialogClose')"
        width="fit-content"
      >
        <div class="pop-box">
          <SmartForm
            :value="inputValues"
            :columns="columnsTemp"
            :formList="createList"
            layout="column"
          />
        </div>
        <template #footer>
          <div class="w-full flex justify-end">
            <el-button class="w-28" @click="showPop = false">取消</el-button>
            <el-button class="w-28" type="primary" @click="onCreate" :loading="isLoading">
              添加账单
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </Teleport>
</template>

<style scoped>
.dialog-box {
  width: 800px;
}
.pop-box {
  padding: 0 1.25rem;
  width: 600px;
  max-width: 100vw;
}

:deep(.el-dialog__body) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
