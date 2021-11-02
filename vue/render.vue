<!-- 根据 props 生成标签 -->
<template>
  <div>
    <div v-if="level === 1"><slot></slot></div>
    <p v-else-if="level === 2"><slot></slot></p>
    <h1 v-else-if="level === 3"><slot></slot></h1>
    <h2 v-else-if="level === 4"><slot></slot></h2>
    <strong v-else-if="level === 5"> <slot></slot> </strong>
    <textarea v-else-if="level === 6"> <slot></slot> </textarea>
  </div>
</template>

<!-- 使用 render渲染函数 减少代码重复率 -->
<template>
  <div><child :level="level">Hello world</child></div>
</template>

<script type="text/javascript">
import Vue from 'vue';

Vue.component('child', {
  render(h) {
    const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level - 1];
    return h(tag, this.$slots.default);
  },
  props: {
    level: { type: Number, required: true },
  },
});

export default {
  name: 'hello',
  data() {
    return { level: 3 };
  },
};
</script>
