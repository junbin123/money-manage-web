<template>
  <div class="wrapper">
    <el-form label-width="5rem" class="flex flex-wrap">
      <el-form-item
        v-for="key in formList"
        :key="key"
        :label="columns[key].label"
        class="form-item-box"
      >
        <FormItem v-model="formValues[key]" :column="columns[key]" @onChange="handleChangeForm" />
      </el-form-item>
      <div class="pl-4">
        <el-button class="w-20" type="primary" @click="onSubmit" :loading="isLoading"
          >搜索</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
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
  },
  methods: {
    handleChangeForm({ key, value }) {
      console.log('handleChangeForm', { key, value })
      // this.$emit('onSubmit', this.formValues)
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
  width: 18rem;
  min-width: 14rem;
}
</style>
