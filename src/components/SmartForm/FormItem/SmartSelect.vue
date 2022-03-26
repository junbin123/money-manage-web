<template>
  <el-select v-model="currentValue" v-bind="attributes">
    <el-option v-for="item in options" :key="item.value" v-bind="item" />
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    attributes: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    options({ attributes }) {
      return attributes.options || []
    },
  },
  methods: {},
}
</script>
