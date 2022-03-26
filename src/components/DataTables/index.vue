<template>
  <div :class="['datatables', {'app-container': isPage}]">
    <!--工具栏-->
    <div ref="header" :class="{'head-container': isPage}">
      <SmartForm
        v-if="filterList.length && hasRelation"
        v-model="filterValues"
        :not-rule="true"
        :inline="true"
        :columns="filterColumnsList"
        :form-list="filterList"
        :label-width="formLabelWidth"
        :button-list="filterButtonList"
      />
    </div>
    <slot name="tableTop" />
    <div
      v-if="isToolbar"
      class="table-toolbar-wrapper"
    >
      <div
        v-for="align in ['left', 'right']"
        :key="align"
        :class="align"
      >
        <button-list
          v-if="toolbarList && toolbarList.length"
          class="right"
          :button-list="setToolbarList(align)"
        />
        <slot :name="align | setSlotName" />
      </div>
    </div>
    <!-- 表格渲染 -->
    <data-table
      v-if="showTable"
      ref="datatable"
      :is-selection="isSelection"
      :loading="loading"
      :table-list="tableList"
      :columns="columnsList"
      :table-data="currentTableData"
      :table-height="tableClientHeight"
      :operation-list="operationList"
      :operation-width="operationWidth"
      :is-operation-fixed="isOperationFixed"
      :is-serial="isSerial"
      :cell-style="cellStyle"
      :stripe="stripe"
    >
      <template v-slot="{ prop, content }">
        <el-table-column
          v-if="content.render"
          :fixed="content.fixed"
          :align="content.align || 'center'"
          :min-width="content.width"
          :label="content.label"
          :show-overflow-tooltip="content.overflow"
          :sortable="content.sort ? 'custom' : null"
        >
          <template v-slot="{row, $index}">
            <InfoRender
              :name="prop"
              :data="row[prop]"
              :row="row"
              :index="$index"
              :render="content.render"
              :columns="columnsList"
              :column="columnsList[prop]"
            />
          </template>
        </el-table-column>
      </template>
    </data-table>
    <div v-if="isPagination" class="footer">
      <!-- 分页组件 -->
      <pagination
        :page-size="pageSize"
        :total="total"
        :is-total="isTotal"
        @handleChange="onPaginationChange"
      />
    </div>
    <el-dialog
      class="table-dialog"
      :append-to-body="dialogAppendToBody"
      :width="dialogWidth"
      :title="dialogLabel"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <slot v-if="dialogVisible" name="dialogSlot" />
      <SmartForm
        v-if="dialogVisible && hasRelation"
        ref="dialogForm"
        v-model="dialogFormValues"
        :form-list.sync="dialogFormList"
        :columns="columnsList"
        :label-width="formLabelWidth"
      />
      <ButtonList
        slot="footer"
        :button-list="[...dialogButtonInitList, ...dialogButtonList]"
      />
    </el-dialog>
    <slot />
  </div>
</template>

<script>

import SmartForm from '@/components/SmartForm'
import DataTable from './DataTable'
import Pagination from './Pagination'
import InfoRender from './InfoRender'
import ButtonList from '@/components/ButtonList'
import request from '@/utils/request'
import { getRelation, getTableList } from '@/service/table'
import { isFunction } from '@/utils/common'
// import { deepClone } from '@/utils'

export default {
  filters: {
    setSlotName (name) {
      const resName = name[0].toLocaleUpperCase() + name.slice(1)
      return `toolbar${resName}`
    }
  },
  components: {
    SmartForm,
    DataTable,
    ButtonList,
    Pagination,
    InfoRender
  },
  props: {
    viewList: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    labelName: {
      type: String,
      default: ''
    },
    createResource: {
      type: String,
      default: ''
    },
    updateResource: {
      type: String,
      default: ''
    },
    // 自定义获取列表方法
    customGetFunc: {
      type: Function,
      default: null
    },
    // 自定义编辑请求方法
    customUpdateFunc: {
      type: Function,
      default: null
    },
    // 自定义新增请求方法
    customCreateFunc: {
      type: Function,
      default: null
    },
    // 自定义删除请求方法
    customDeleteFunc: {
      type: Function,
      default: null
    },
    // 自定义编辑请求方法
    customUpdateSubmit: {
      type: Function,
      default: null
    },
    resource: {
      type: String,
      default: ''
    },
    columns: {
      type: Object,
      default: () => ({}),
      required: true
    },
    tableData: {
      type: Array,
      default: () => []
    },
    operationWidth: {
      type: Number,
      default: 100
    },
    tableList: {
      type: Array,
      default: () => []
    },
    filterList: {
      type: Array,
      default: () => []
    },
    createList: {
      type: Array,
      default: () => []
    },
    updateList: {
      type: Array,
      default: () => []
    },
    toolbar: {
      type: Array,
      default: () => []
    },
    operation: {
      type: Array,
      default: () => []
    },
    extendFilterButtonList: {
      type: Array,
      default: () => []
    },
    filterFormValues: {
      type: Object,
      default: () => ({})
    },
    filterAlwaysValues: {
      type: Object,
      default: () => ({})
    },
    createFormValues: {
      type: Object,
      default: () => ({})
    },
    updateFormValues: {
      type: Object,
      default: () => ({})
    },
    formLabelWidth: {
      type: Number,
      default: 80
    },
    dialogWidth: {
      type: String,
      default: '55%'
    },
    tableHeight: {
      type: Number,
      default: 0
    },
    isPage: {
      type: Boolean,
      default: true
    },
    isToolbar: {
      type: Boolean,
      default: true
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    isOperationFixed: {
      type: String,
      default: ''
    },
    isPagination: {
      type: Boolean,
      default: true
    },
    isSerial: {
      type: Boolean,
      default: false
    },
    isTotal: {
      type: Boolean,
      default: false
    },
    customRelation: {
      type: Function,
      default: null
    },
    extendParams: { // 扩展请求参数
      type: Object,
      default: () => ({})
    },
    dialogAppendToBody: {
      type: Boolean,
      default: false
    },
    defaultPageSize: {
      type: Number,
      default: 20
    },
    isUpdatePassword: { // 编辑操作是否需要密码
      type: Boolean,
      default: false
    },
    cellStyle: {
      type: Function,
      default: null
    },
    stripe: {
      type: Boolean,
      default: true
    },
    doLayout: { // 对 Table 进行重新布局
      type: Boolean,
      default: false
    },
    // 扩展弹窗中的按钮
    dialogButtonList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      relationData: {}, // 字典
      otherData: {},
      hasRelation: false,
      pageSize: this.defaultPageSize,
      pageIndex: 1,
      currentTableData: [],
      total: 0,
      loading: false,
      columnsList: {},
      filterBy: '',
      orderBy: '',
      filterButtonList: [{
        label: '搜索',
        icon: 'search',
        type: 'primary',
        func: ({ data }) => {
          this.onFilterChange(data)
        }
      }, {
        label: '重置',
        icon: 'refresh',
        func: ({ el }) => {
          this.filterValues = {}
          this.onFilterChange({})
        }
      }, ...this.extendFilterButtonList.map(item => ({
        ...item,
        funcProps: {
          ...item.funcProps,
          table: this
        }
      }))],
      filterValues: this.filterFormValues,
      dialogVisible: false,
      dialogLabel: '',
      dialogFormValues: {},
      dialogButtonInitList: [{
        label: '取消',
        func: () => {
          this.dialogVisible = false
        }
      }],
      createButtonList: [{
        label: '提交',
        type: 'primary',
        func: async (button) => {
          const { dialogForm } = this.$refs
          const props = {
            ...button,
            el: dialogForm,
            data: dialogForm.formValues
          }
          await dialogForm.validate()
          this.onCreateSubmit(props)
        }
      }],
      updateButtonList: [{
        label: '提交',
        type: 'primary',
        func: async (button) => {
          const updateFunc = async () => {
            const { dialogForm } = this.$refs
            const props = {
              ...button,
              el: dialogForm,
              data: dialogForm.formValues
            }
            await dialogForm.validate()
            const submit = this.customUpdateSubmit || this.onUpdateSubmit
            submit(props)
          }
          if (this.isUpdatePassword) {
            try {
              const { value } = await this.$prompt('敏感操作，请验证口令', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              })
              if (value === 'hdcj123') {
                updateFunc()
              } else {
                this.$message({ type: 'error', message: '口令不正确' })
              }
            } catch (err) {
              console.log(err)
            }
          } else {
            updateFunc()
          }
        }
      }],
      tableClientHeight: this.tableHeight || document.body.clientHeight - 340,
      selectionList: [], // 选中的数据
      showTable: true
    }
  },
  computed: {
    toolbarList () {
      return this.toolbar.reduce((res, toolbar) => {
        if (toolbar.isShow === undefined || toolbar.isShow === true || toolbar.isShow(toolbar)) {
          res.push({
            ...toolbar,
            label: isFunction(toolbar.label) ? toolbar.label({ table: this }) : toolbar.label,
            funcProps: {
              ...toolbar.funcProps,
              table: this
            }
          })
        }
        return res
      }, [])
    },
    operationList () {
      return this.operation.map((item) => ({
        ...item,
        size: 'mini',
        funcProps: {
          ...item.funcProps,
          table: this
        }
      }))
    },
    filterColumnsList () { // 筛选的字段列表
      return Object.keys(this.columnsList).reduce((res, key) => {
        const { options } = this.columnsList[key]
        const optionsDict = options ? {
          options: options.map(({ disabled, ...item }) => item)
        } : {}
        res[key] = {
          ...this.columnsList[key],
          form: this.columnsList[key].filter || this.columnsList[key].form,
          ...optionsDict
        }
        return res
      }, {})
    }
  },
  watch: {
    dialogVisible (val) {
      this.$emit('changeDialogVisible', val, this)
    },
    updateFormValues (values) {
      this.hasRelation = false
      this.dialogFormValues = {
        ...this.dialogFormValues,
        ...values
      }
      this.hasRelation = true
    },
    createList (val) {
      this.dialogFormList = val
    },
    updateList (val) {
      this.dialogFormList = val
      this.setRelationList(this.columns, this.relationData)
    },
    viewList (val) {
      this.dialogFormList = val
    },
    otherData (data) {
      this.$emit('getOtherData', data)
    }
    // filterFormValues: {
    //   immediate: true,
    //   handler (data) {
    //     console.log(this.filterBy)
    //   }
    // }
  },
  async created () {
    await this.getRelation()
    await this.getData()
  },
  mounted () {
    this.setTableClientHeight()
    window.onresize = () => {
      this.setTableClientHeight()
    }
  },
  methods: {
    async getRelation () {
      // if (!this.isRelation) {
      //   this.hasRelation = true
      //   this.columnsList = this.columns
      //   return false
      // }
      const relation = this.getRelationList(this.columns)
      const relationFunc = this.customRelation || getRelation
      const data = await relationFunc(relation)
      this.relationData = data.data
      this.setRelationList(this.columns, data.data)
      this.setFilterBy(this.filterFormValues)
      this.hasRelation = true
    },
    async getData () {
      // 判断如果有自定义数据
      if (this.tableData && this.tableData.length) {
        this.currentTableData = this.tableData
      } else {
        try {
          this.loading = true
          const filterAlwaysBy = Object.keys(this.filterAlwaysValues).map(key => `${key}|eq|${this.filterAlwaysValues[key]}`).join(';')
          const sep = this.filterBy && filterAlwaysBy ? ';' : ''
          const filterBy = filterAlwaysBy + sep + this.filterBy
          const defaultFunc = this.resource ? getTableList : () => {
            return {
              data: [],
              count: 0
            }
          }
          const getDataFunc = this.customGetFunc || defaultFunc(this.resource)
          const { data = [], count, ...otherData } = await getDataFunc({
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
            filterBy,
            orderBy: this.orderBy,
            ...this.extendParams
          })
          this.otherData = otherData
          this.currentTableData = data
          if (this.doLayout) {
            console.log('触发表格重新布局')
            this.showTable = false
            this.$nextTick(() => {
              this.showTable = true
            })
          }
          // this.currentTableData = data.map(item => {
          //   const res = item
          //   list.forEach(ele => {
          //     if (this.columns[ele]?.options) { // 前端写死的字典
          //       res[ele] = this.columns[ele]?.options.find(i => i.value === res[ele])?.label ?? res[ele]
          //     } else { // 接口获取的字典
          //       res[ele] = deepClone(this.relationData)[ele].find(i => i.value === res[ele])?.label ?? res[ele]
          //     }
          //   })
          //   return res
          // })
          this.total = count
          this.loading = false
        } catch (err) {
          this.loading = false
          console.log('err', err)
        }
      }
      this.$nextTick(() => {
        if (this.$refs.datatable) {
          this.$refs.datatable.$refs.table.doLayout()
        }
      })
    },
    getRelationList (columns) {
      const columnsList = Object.keys(columns).reduce((res, item) => {
        if (columns[item].relation) {
          res.push(columns[item].relation)
        }
        return res
      }, [])
      return columnsList.join(',')
    },
    setRelationList (columns, relationData) {
      const columnsList = Object.keys(columns).reduce((res, item) => {
        const relationKey = columns[item].relation
        res[item] = columns[item]
        if (relationKey) {
          res[item]['options'] = relationData[relationKey]
        }
        return res
      }, {})
      this.columnsList = columnsList
    },
    onPaginationChange ({ pageIndex, pageSize }) {
      this.pageSize = pageSize
      this.pageIndex = pageIndex
      this.getData()
    },
    onFilterChange (data) {
      this.setFilterBy(data)
      this.pageIndex = 1 // 初始化
      this.getData()
    },
    onOrderChange ({ name, value }) {
      this.orderBy = value ? `${name}|${value}` : ''
      this.getData()
    },
    onCreateSubmit ({ data, button }) {
      button.loading = true
      // 初始新增方法
      const createFunc = () => request({
        url: this.createResource || this.resource,
        method: 'post',
        data
      })
      const func = this.customCreateFunc || createFunc
      func(data).then((res) => {
        button.loading = false
        this.dialogVisible = false
        this.dialogFormValues = this.createFormValues
        this.getData()
        this.$message.success(res.msg)
      }).catch((err) => {
        button.loading = false
        err.msg && this.$message.error(err.msg)
      })
    },
    onUpdateSubmit ({ data, button }) {
      button.loading = true
      // 初始编辑方法
      const updateFunc = () => request({
        url: `${this.updateResource || this.resource}/${data.id}`,
        method: 'put',
        data
      })
      console.log('this.customUpdateFunc', this.customUpdateFunc)
      const func = this.customUpdateFunc || updateFunc
      func(data).then(() => {
        button.loading = false
        this.dialogVisible = false
        this.getData()
      }).catch(() => {
        button.loading = false
      })
    },
    setFilterBy (data) {
      this.filterBy = Object.keys(data).reduce((res, item) => {
        const column = this.columnsList[item]
        const { filter = {}} = column
        const isRange = filter.type === 'range'
        console.log('isRange', isRange)
        const isCustomRange = column.form
          ? ['dateTimeRange', 'dateRange'].includes(column.form.type)
          : false
        const isNumberData = typeof data[item] === 'number' ? true : data[item]
        if ((isRange || isCustomRange) ? data[item].length : isNumberData) {
          // if (isRange) {
          //   const setValue = (value) => {
          //     const { dateType } = column.filter
          //     return dateType === 'X' ? Number((value / 1000).toFixed(0)) : value
          //   }
          //   res.push({
          //     name: `${item}`,
          //     type: 'gt',
          //     value: setValue(data[item][0])
          //   })
          //   res.push({
          //     name: `${item}`,
          //     type: 'lt',
          //     value: setValue(data[item][1])
          //   })
          // } else
          if (isRange || isCustomRange) {
            res.push({
              name: `${item}Start`,
              type: column.filterType || 'eq',
              value: filter.formatter ? filter.formatter(data[item][0]) : data[item][0]
            })
            res.push({
              name: `${item}End`,
              type: column.filterType || 'eq',
              value: filter.formatter ? filter.formatter(data[item][1]) : data[item][1]
            })
          } else {
            res.push({
              name: item,
              type: column.filterType || 'eq',
              value: filter.formatter ? filter.formatter(data[item]) : data[item]
            })
          }
        }
        return res
      }, []).map(({ name, type, value }) => `${name}|${type}|${value}`).join(';')
    },
    setTableClientHeight () {
      if (this.tableHeight) {
        this.tableClientHeight = this.tableHeight
      } else {
        const clientHeight = document.body.clientHeight
        this.tableClientHeight = clientHeight - 340
      }
    },
    setToolbarList (name) {
      const resToolBarList = this.toolbarList.reduce((res, item) => {
        item.align = item.align || 'left'
        if (item.align === name) {
          res.push(item)
        }
        return res
      }, [])
      return resToolBarList
    }
  }
}
</script>

<style lang="scss" scoped>
// .app-container {
//   background: #f0f0f0;
// }
.datatables {
  width: 100%;
}
.table-toolbar-wrapper {
  width: 100%;
  min-height: 50px;
  background: #E4E7ED;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
}
.footer {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
