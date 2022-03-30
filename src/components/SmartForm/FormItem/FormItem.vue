<template>
  <component
    class="w-full"
    :is="componentName"
    v-model="currentValue"
    :attributes="column.form"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { ref } from 'vue'
export default {
  components: {
    SmartInput: defineAsyncComponent(() => import('./SmartInput.vue')),
    SmartSelect: defineAsyncComponent(() => import('./SmartSelect.vue')),
    SmartDatePicker: defineAsyncComponent(() => import('./SmartDatePicker.vue')),
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    column: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  computed: {
    componentName({ column }) {
      const type = column.formType
      return `smart-${type}`
    },
    currentValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('onChange', {
          key: this.column.key,
          value: val,
        })
      },
    },
  },
  methods: {},
}
</script>
<style scoped></style>
