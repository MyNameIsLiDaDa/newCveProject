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
    // this.init();
    this.test();
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
      let arr = [];
      let searchData = {};
      let data = [
        {
          id: 1,
          name: "kpp",
          Description: "sdlkfjsdlfjsdlkjflsdjflsdjflsdflksdsdlfjsdjlkdjfkjsdl"
        },
        {
          id: 2,
          name: "wzq",
          Description: "sdlkfjsdlfjsdlkjflsdjflsdjflsdflksdsdlfjsdjlkdjfkjsdl"
        },
        {
          id: 2,
          name: "wzq",
          Description: "sdlkfjsdlfjsdlkjflsdjflsdjflsdflksdsdlfjsdjlkdjfkjsdl"
        },
        {
          id: 2,
          name: "wzq",
          Description: "sdlkfjsdlfjsdlkjflsdjflsdjflsdflksdsdlfjsdjlkdjfkjsdl"
        },
        {
          id: 3,
          name: "zxq",
          Description: "sdlkfjsdlfjsdlkjflsdjflsdjflsdflksdsdlfjsdjlkdjfkjsdl"
        },
        {
          id: 3,
          name: "zxq",
          Description: "sdlkfjsdlfjsdlkjflsdjflsdjflsdflksdsdlfjsdjlkdjfkjsdl"
        },
        {
          id: 3,
          name: "zxq",
          Description: "sdlkfjsdlfjsdlkjflsdjflsdjflsdflksdsdlfjsdjlkdjfkjsdl"
        },
        {
          id: 3,
          name: "zxq",
          Description: "sdlkfjsdlfjsdlkjflsdjflsdjflsdflksdsdlfjsdjlkdjfkjsdl"
        }
      ];

      data.forEach(v => {
        arr.push(screenData(arr, v));
      });

      /**
       * this argrument[0] is array; argrument[1] is object;
       *  
       */
      function screenData(arr, node) {
        if (arr.length === 0) return node;
        for (let i = 0; i < arr.length; i++) {
          if (node.name === arr[i].name) {
            if (searchData[`${node.name}`]) {
              let num = (searchData[`${node.name}`] += 1);
              node["id"] = `${node.id}(${num})`;
            } else {
              searchData[`${node.name}`] = 1;
              node["id"] = `${node.id}(1)`;
            }
            return node;
          }
        }
        return node;
      }
      console.log(arr, "是否");
    }
    // initECharts() {
    //       // echarts弹出层;
    //       this.echartsVisible = true;
    //       const eData = [];
    //       const eLinks = [];
    //       eData.push({
    //         id: this.cpe_id,
    //         name: this.tags[2],
    //         Vendors: this.tags[1],
    //         versions: this.tags[3],
    //         itemStyle: { normal: { color: "#e33a59" } }
    //       });
    //       // vendor_detail({vendor: this.tags[1], versions: this.tags[3]}).then(({ data }) => {
    //       //   let temp = data.Data[0];
    //       //   let obj = {
    //       //     ...temp,
    //       //     name: `CPE${v.CPE_ID}`,
    //       //     id: v.CPE_ID,
    //       //     parentID: value.id
    //       //   };
    //       //   nodes.push(obj);
    //       // });
    //       cceData(this.cpe_id).then(res => {
    //         res.data.Data.forEach(ev => {
    //           eData.push({
    //             ...ev,
    //             id: ev.CCE_ID,
    //             parentID: eData[0].id,
    //             name: ev.CCE_ID,
    //             itemStyle: {
    //               normal: {
    //                 color: "#874c9c"
    //               }
    //             }
    //           });
    //         });
    //       });
    //       // cve数据...
    //       let cweArray = [] // cwe的promise.all
    //       let cweIdArray = [] // cwe的promise.all
    //       this.cveInfoData.forEach((v, index) => {
    //         v["name"] = v.CVE_ID;
    //         v["id"] = v.CVE_ID;
    //         eData.push({
    //           ...v,
    //           parentID: eData[0].id,
    //           itemStyle: { normal: { color: "#44aeae" } },
    //           description: v.Description
    //         }); // cve
    //         cweArray.push(CweData(v.CVE_ID))
    //         cweIdArray.push(v.CVE_ID)
    //       })
    //       Promise.all(cweArray).then(resolve => {

    //       })
    //         // CweData(v.CVE_ID).then(res => {
    //         //   if (res.data.Code === 0) {
    //         //     res.data.Data.forEach(item => {
    //         //       item["id"] = `CWE_ID${item.CWE_ID}`;
    //         //       item["showName"] = item.Name;
    //         //       eData.push({
    //         //         ...item,
    //         //         parentID: v.CVE_ID,
    //         //         name: `CWE_Id:${item.CWE_ID}`,
    //         //         itemStyle: {
    //         //           normal: {
    //         //             color: "#fdc72a"
    //         //           }
    //         //         },
    //         //         description: item.Description
    //         //       });
    //         //       capecData(item.CWE_ID).then(res => {
    //         //         res.data.Data.forEach(val => {
    //         //           // capec
    //         //           val["id"] = `CAPEC_ID${val.CAPEC_ID}`;
    //         //           val["showName"] = val.Name;
    //         //           eData.push({
    //         //             ...val,
    //         //             parentID: item.id,
    //         //             name: `CAPEC_ID${val.CAPEC_ID}`,
    //         //             itemStyle: {
    //         //               normal: {
    //         //                 color: "#3e7b91"
    //         //               }
    //         //             },
    //         //             description: val.Description
    //         //           });

    //         //           techniquesData(val.CAPEC_ID).then(({ data }) => {
    //         //             if (data.Code === 0) {
    //         //               data.Data.forEach(v => {
    //         //                 v["groups_softwares_id"] = v.id;
    //         //                 v.kill_chain_phases.forEach(item1 => {
    //         //                   if (item1.phase_name) {
    //         //                     v["phase_name"] = item1.phase_name;
    //         //                   }
    //         //                 });
    //         //                 v.external_references.forEach(item => {
    //         //                   if (item.external_id) {
    //         //                     if (item.external_id.indexOf("T") === 0) {
    //         //                       v.tId = item.external_id;
    //         //                       v["showName"] = v.name;
    //         //                       v["id"] = v.tId;
    //         //                       eData.push({
    //         //                         ...v,
    //         //                         parentID: val.id,
    //         //                         name: v.tId,
    //         //                         description: v.description,
    //         //                         itemStyle: { normal: { color: "#E8E22F" } }
    //         //                       });
    //         //                     }
    //         //                   }
    //         //                 });
    //         //                 // groups_softwares(v.groups_softwares_id).then(
    //         //                 //   ({ data }) => {
    //         //                 //     data.Data.group.forEach(val1 => {
    //         //                 //       val1.external_references.forEach(value => {
    //         //                 //         if (value.external_id) {
    //         //                 //           val1.tId = value.external_id;
    //         //                 //         }
    //         //                 //       });
    //         //                 //       val1["showName"] = v.name;
    //         //                 //       eData.push({
    //         //                 //         ...val1,
    //         //                 //         parentID: v.id,
    //         //                 //         name: val1.tId,
    //         //                 //         description: v.description,
    //         //                 //         itemStyle: { normal: { color: "#31C9E8" } }
    //         //                 //       });
    //         //                 //     });
    //         //                 //     data.Data.software.forEach(val2 => {
    //         //                 //       val2.external_references.forEach(value => {
    //         //                 //         if (value.external_id) {
    //         //                 //           val2.tId = value.external_id;
    //         //                 //         }
    //         //                 //       });
    //         //                 //       val2["showName"] = v.name;
    //         //                 //       eData.push({
    //         //                 //         ...val2,
    //         //                 //         parentID: v.id,
    //         //                 //         name: val2.tId,
    //         //                 //         description: v.description,
    //         //                 //         itemStyle: { normal: { color: "#874c9c" } }
    //         //                 //       });
    //         //                 //     });
    //         //                 //   }
    //         //                 // );
    //         //                 tacticsData(v.phase_name).then(({ data }) => {
    //         //                   data.Data.forEach(value => {
    //         //                     value["showName"] = value.id;
    //         //                     value.external_references.forEach(e => {
    //         //                       if (e.external_id) {
    //         //                         value["tId"] = e.external_id;
    //         //                         value["name"] = e.external_id;
    //         //                         eData.push({
    //         //                           ...value,
    //         //                           parentID: v.id,
    //         //                           name: value.tId,
    //         //                           description: value.description,
    //         //                           itemStyle: { normal: { color: "#874c2c" } }
    //         //                         });
    //         //                       }
    //         //                     });
    //         //                   });
    //         //                 });
    //         //               });
    //         //             }
    //         //           });
    //         //         });
    //         //       });
    //         //     });
    //         //   }
    //         // });
    //       // });
    //       var createEcharts = () => {
    //         eData.forEach(v => {
    //           if (v.parentID) {
    //             // if (v.parentID.indexOf("CVE") === 0) {
    //             //   const obj = {};
    //             //   obj.source = v.parentID;
    //             //   obj.target = v.id;
    //             //   eLinks.push(obj);
    //             // } else {
    //             const obj = {};
    //             obj.source = v.parentID;
    //             obj.target = v.id;
    //             eLinks.push(obj);
    //             // }
    //           }
    //         });
    //         var myChart = echarts.init(document.getElementById("last-echarts"));
    //         myChart.setOption(this.eChartsData(eData, eLinks));
    //         myChart.on("click", this.makeData);
    //       }
    //       function screenData(arr, node) {
    //         // 对数组进行查重处理, 有的情况下clone;
    //         if (arr.length === 0) return [];
    //         arr.forEach(v => {
    //           if (node.id === v.id) {
    //             if (node.id.indexOf("(") === 0 && node.name.indexOf("(") === 0) {
    //               let newId = node[Number(node.id.indexOf("(") + 1)];
    //               let newName = node[Number(node.name.indexOf("(") + 1)];
    //               node["id"] = `${node.id}${Number(newId + 1)}`;
    //               node["name"] = `${node.name}${Number(newName + 1)}`;
    //             } else {
    //               node["id"] = `${node.id}(0)`;
    //               node["name"] = `${node.name}(0)`;
    //             }
    //             return node;
    //           }
    //         });
    //         return node;
    //       }
    //       setTimeout(() => {
    //         createEcharts();
    //       }, 50000);
    //     }
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
