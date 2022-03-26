<template>
  <div class="wrapper">
    <el-form label-width="7rem" class="flex flex-wrap">
      <el-form-item
        v-for="key in formList"
        :key="key"
        :label="columns[key].label"
        class="form-item-box"
      >
        <FormItem v-model="formValues[key]" :column="columns[key]" @onChange="handleChangeForm" />
      </el-form-item>
      <div class="pl-5">
        <el-button type="primary" @click="onSubmit">搜索</el-button>
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
    handleChangeForm({ key, value }) {},
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
  width: 20rem;
  min-width: 14rem;
}
</style>
