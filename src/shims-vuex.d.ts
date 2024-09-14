// src/shims-vuex.d.ts

declare module '@/store/index.js' {
    import { Store } from 'vuex';
    const store: Store<any>;
    export default store;
  }
  