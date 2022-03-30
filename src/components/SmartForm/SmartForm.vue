<template>
  <div class="form-wrapper">
    <el-form
      label-width="5rem"
      class="flex flex-wrap"
      :model="formValues"
      :class="{ 'flex-col': layout === 'column' }"
    >
      <el-form-item
        v-for="key in formList"
        :key="key"
        :label="columns[key].label"
        :class="{ 'w-72': layout === 'row' }"
        class="form-item-box"
        :required="!!columns[key].form.required"
      >
        <FormItem v-model="formValues[key]" :column="columns[key]" @onChange="handleChangeForm" />
      </el-form-item>

      <div v-if="isSubmitButton" :class="{ 'pl-6': layout === 'row' }">
        <el-button class="w-20" type="primary" @click="onSubmit" :loading="isLoading">
          搜索
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// 对element表单组件的封装
import FormItem from './FormItem/FormItem.vue'
export default {
  components: {
    FormItem,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Object,
      default: () => ({}),
    },
    formList: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isSubmitButton: {
      type: Boolean,
      default: false,
    },
    layout: {
      // 布局
      type: String,
      default: 'row', // column
    },
  },
  data() {
    return {}
  },
  computed: {
    formValues: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    rules() {
      const res = {}
      this.formList.forEach((key) => {
        const item = this.columns[key]
        if (item.form?.rules) {
          res[key] = item.form?.rules
        }
      })
      return res
    },
  },

  methods: {
    handleChangeForm({ key, value }) {
      this.$emit('onChange', this.formValues)
    },
    onSubmit() {
      this.$emit('onSubmit', this.formValues)
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
}
.form-item-box {
  min-width: 14rem;
}
</style>
