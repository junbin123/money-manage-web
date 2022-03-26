<!--
 * @Author: 黄丰瑞 <13433840491@163.com>
 * @Date: 2020-05-08 16:00:10
 * @LastEditors: 黄丰瑞 <13433840491@163.com>
 * @LastEditTime: 2020-05-08 10:04:07
 * @Description: 分页
 -->
<template>
  <el-pagination
    background
    :page-sizes="[20, 50, 100, 200]"
    :layout="`${isTotal ? 'total ,' : ''} prev, pager, next, sizes`"
    :page-size="currentPageSize"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  props: {
    isTotal: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 100000
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      currentPageSize: this.pageSize,
      pageIndex: 1
    }
  },
  methods: {
    handleCurrentChange (number) {
      this.pageIndex = number
      this.$emit('handleChange', {
        pageSize: this.currentPageSize,
        pageIndex: this.pageIndex
      })
    },
    handleSizeChange (number) {
      this.currentPageSize = number
      this.$emit('handleChange', {
        pageSize: this.currentPageSize,
        pageIndex: this.pageIndex
      })
    }
  }
}

</script>
