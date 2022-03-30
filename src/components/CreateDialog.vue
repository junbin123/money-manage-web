<template>
  <Teleport to="body">
    <el-dialog
      v-model="showPop"
      center
      width="600px"
      class="max-w-full"
      @close="$emit('dialogClose')"
    >
      <SmartForm :value="inputValues" :columns="columnsTemp" :formList="createList" />
      <template #footer>
        <span class="dialog-footer bg-slate-400"> hello </span>
      </template>
    </el-dialog>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import SmartForm from './SmartForm/SmartForm.vue'
import { useProp } from '@/hooks'
const emit = defineEmits(['dialogClose', 'onSubmit'])
const props = defineProps({
  createValues: Object,
  createList: Array,
  columns: Object,
  isShow: Boolean,
})

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

const showPop = useProp('isShow')
const inputValues = useProp('createValues')
</script>

<style scoped>
.dialog ::v-deep(.el-dialog__header) {
  border-bottom: 1px solid #e6e6e6;
  padding: 24px;
}

.dialog ::v-deep(.el-dialog__footer) {
  padding: 48px;
}

.dialog ::v-deep(.el-dialog__headerbtn) {
  font-size: 24px;
}

.dialog ::v-deep(.el-dialog--center .el-dialog__body) {
  padding: 8px 0;
}

.dialog-container {
  background: lightgreen;
}
</style>
