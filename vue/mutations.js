import Vue from 'vue';

/**
 * 通过使用Observable API我们可以应对一些简单的跨组件数据状态共享的情况。
 */


/**指向数据 */
export const store = Vue.observable({ count: 0 });

/**指向处理方法 */
export const mutations = {
  setCount(count) {
    state.count = count;
  },
};

/**
 * <template>
 *   <div>
 *      <p>{{count}}</p>
 *      <button @click="setCount(count + 1)">+1</button>
 *      <button @click="setCount(count - 1)">-1</button>
 *   </div>
 * </template>
 *
 * <script>
 *   import {store, mutations} from './store';
 *   export default {
 *       computed: {
 *            count(){
 *                  return store.count
 *            }
 *       },
 *       methods: {
 *          setCount: mutations.setCount
 *       }
 *   }
 * </script>
 */
