/**
 * render渲染函数
 */
import Vue from 'vue';

Vue.component('anchored-header', {
  render: function (createElement) {
    /**
     * @param 标签名称
     * @param 子节点数组
     */
    return createElement('h' + this.level, this.$slots.default);
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
});
