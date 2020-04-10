<template>
  <div class="box">
    <Tabs></Tabs>
  </div>
</template>
<script>
import Tabs from './components/Tabs' 
export default {
  components: {
    Tabs
  },
  data() {
    return {

    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scope>
    .box {
        max-width: 400px;
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 10px;
        margin: 100px auto;
    }
</style>
