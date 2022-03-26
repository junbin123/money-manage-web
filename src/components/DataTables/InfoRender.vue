<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-16 12:00:28
 * @Author: huangfengrui
 * @Date: 2020-01-16 10:41:19
 * @Description:
 -->
<script>
import { isObject } from '@/utils/common'
import { Image } from 'element-ui'
import moment from 'moment'
export default {
  name: 'InfoRender',
  props: {
    name: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => ({})
    },
    render: {
      type: [Function, Object],
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    },
    data: {
      type: [String, Number, Boolean, Array],
      default: ''
    },
    columns: {
      type: Object,
      default: () => ({})
    },
    column: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    image (h, props) {
      const data = this.data
      if (!data) {
        return ''
      }
      return h(Image, {
        style: {
          width: props.width || '60px',
          height: props.height || '60px'
        },
        props: {
          previewSrcList: [data],
          src: data,
          fit: 'fit'
        }
      })
    },
    select (h, props) {
      const data = this.data
      if (data !== 0 && !data) {
        return ''
      }
      if (!this.column.options) {
        return data
      }
      const { label = '', tagType } = this.column.options.find(item => item.value === this.data) || {}
      return tagType
        ? (<el-tag type={tagType}>{label}</el-tag>)
        : (<span>{label}</span>)
    },
    time (h, { format = 'YYYY-MM-DD' }) {
      const time = `${this.data}`.length === 10 ? Number(this.data + '000') : Number(this.data)
      return (<span>{moment(time).format(format)}</span>)
      // return moment()
    }
  },
  render (h) {
    if (isObject(this.render)) {
      const { type, ...arg } = this.render
      return this[type](h, arg)
    }
    const params = {
      data: this.data,
      row: this.row,
      index: this.index,
      name: this.name
    }
    return this.render(h, params)
  }
}
</script>
<style>
/* 点击透明遮罩区域关闭 */
.el-image-viewer__close{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  z-index: 0;
}
</style>
