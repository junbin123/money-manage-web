<template>
  <el-date-picker v-model="currentValue" v-bind="targetAttributes" />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Array],
      default: () => [],
    },
    attributes: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      defaultAttributes: {
        'value-format': 'x',
      },
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(val) {
        console.log('SmartDatePicker---', val)
        this.$emit('input', val)
      },
    },
    targetAttributes() {
      return {
        ...this.defaultAttributes,
        ...this.attributes,
      }
    },
  },
}
</script>

<style>
/* 解决el-date-picker不100%撑开 */
.form-wrapper .el-date-editor--day {
  width: 100% !important;
}
</style>
