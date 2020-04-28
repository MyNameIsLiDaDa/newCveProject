<template>
  <div class="box"></div>
</template>
<script>
import Tabs from "./components/Tabs";
export default {
  components: {
    Tabs
  },
  data() {
    return {
      zoom: null,
      jsonData: null,
      bool: false,
      contNum: 0
    };
  },
  created() {
    this.jsonData = require("./JSON/cce_info.json");
    this.init();
  },
  methods: {
    init() {
      this.contNum = 0;
      const pro = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.jsonData);
        }, 3000);
      });
      const pro1 = new Promise((resolve, resject) => {
        setTimeout(() => {
          resolve(this.jsonData);
        }, 6000);
      });
      const pro2 = new Promise((resolve, resject) => {
        setTimeout(() => {
          resolve(this.jsonData);
        }, 9000);
      });
      const pro3 = new Promise((resolve, resject) => {
        setTimeout(() => {
          resolve(this.jsonData);
        }, 12000);
      });
      pro
        .then(res => {
          console.log(res, "1");
          this.contNum += 1;
          pro1.then(res => {
            console.log(res, "2");
            this.contNum += 1;
            pro2.then(res => {
              console.log(res, "3");
              this.contNum += 1;
              pro3.then(res => {
                console.log(res, "4");
                this.contNum += 1;
              });
            });
          });
          // this.test();
        })
        .finally(() => {
          this.bool = true;
        });
    },
    test() {
      console.log("comming now!");
    }
  },
  watch: {
    contNum: function(values) {
      console.log(values);
      if (values === 4) {
        this.test();
      }
    }
  }
};
</script>
<style lang="less" scope>
.box {
  // max-width: 400px;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 100px auto;
}
</style>
