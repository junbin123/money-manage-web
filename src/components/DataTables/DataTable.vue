<template>
  <el-table
    ref="table"
    v-loading="isLoading"
    class="table"
    style="width: 100%"
    border
    :stripe="stripe"
    size="medium"
    header-row-class-name="table-header"
    :data="currentTableData"
    :cell-style="cellStyle"
    @cell-dblclick="handleCellDblclick"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
  >
    <el-table-column
      v-if="isSelection"
      type="selection"
      fixed="left"
      width="50"
      align="center"
    />
    <el-table-column
      v-if="isSerial"
      type="index"
      label="序号"
      width="50"
      align="center"
    />
    <template v-if="hasColumns">
      <slot
        v-for="(key) in tableList"
        :prop="key"
        :content="columns[key]"
      >
        <el-table-column
          :prop="key"
          :column-key="key"
          :label="columns[key].label"
          :fixed="columns[key].fixed"
          :min-width="columns[key].width"
          :align="columns[key].align || 'center'"
          :show-overflow-tooltip="columns[key].overflow"
          :formatter="columns[key].formatter"
          :sortable="columns[key].sort ? 'custom' : null"
        />
      </slot>
    </template>
    <el-table-column
      v-if="hasColumns && hasOperation"
      :label="operationOption.label"
      :fixed="operationOption.fixed"
      :width="operationOption.width"
    >
      <template slot-scope="scope">
        <ButtonList :button-list="operationList | setOperationList(scope.row, $parent)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ButtonList from '@/components/ButtonList'
import clip from '@/utils/clipboard' // use clipboard directly

export default {
  components: {
    ButtonList
  },
  filters: {
    setOperationList (operationList, data, $parent) {
      const resOperationList = operationList.reduce((res, operation) => {
        if (!operation.isShow || operation.isShow(data, operation)) {
          const extendOption = operation.extend ? {
            extend: operation.extend.reduce((resExtend, item) => {
              if (!item.isShow || item.isShow(data, item)) {
                resExtend.push({
                  ...item,
                  size: 'mini',
                  funcProps: {
                    table: $parent,
                    ...item.funcProps,
                    data
                  }
                })
              }
              return resExtend
            }, [])
          } : {}
          res.push({
            ...operation,
            size: 'mini',
            funcProps: {
              table: $parent,
              ...operation.funcProps,
              data
            },
            ...extendOption
          })
        }
        return res
      }, [])
      return resOperationList
    }
  },
  props: {
    isSerial: {
      type: Boolean,
      default: false
    },
    operationList: {
      type: Array,
      default: () => []
    },
    tableList: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Object,
      default: () => ({})
    },
    operationWidth: {
      type: [Number, String],
      default: 100
    },
    loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    },
    tableHeight: {
      type: Number,
      default: 300
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    isOperationFixed: {
      type: String,
      default: ''
    },
    cellStyle: {
      type: Function,
      default: null
    },
    stripe: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isLoading () {
      return this.loading
    },
    currentTableData () {
      return this.tableData
    },
    tableClientHeight () {
      return this.tableHeight
    },
    hasColumns () {
      return this.columns && Object.keys(this.columns).length
    },
    hasOperation () {
      return this.operationList && this.operationList.length
    },
    operationOption () {
      return {
        name: 'operation',
        label: '操作栏',
        width: this.operationWidth,
        fixed: this.isOperationFixed || false
      }
    }
  },
  methods: {
    // 默认双击复制当前内容
    handleCellDblclick (data, columns, $el, e) {
      if (columns.label === '操作栏') {
        return false
      }
      if ($el.innerText) {
        clip($el.innerText, e)
        // copy($el.innerText).then(() => {
        //   this.$notify({
        //     title: '提示',
        //     message: '复制成功',
        //     type: 'success'
        //   })
        // })
      }
    },
    // 多选操作方法
    handleSelectionChange (data) {
      this.$parent.selectionList = data
    },
    // 触发排序方法
    handleSortChange ({ column, prop, order }) {
      this.$parent.onOrderChange({
        name: prop,
        value: {
          'ascending': 'asc',
          'descending': 'desc'
        }[order]
      })
    }
  }
}
</script>
