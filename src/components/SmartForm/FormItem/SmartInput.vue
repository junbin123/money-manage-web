<template>
  <el-input v-model="currentValue" v-bind="attributes" />
</template>

<script>
export default {
  props: ['value', 'attributes'],
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>

<style></style>
