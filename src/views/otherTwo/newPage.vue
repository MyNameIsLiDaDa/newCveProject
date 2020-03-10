<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <!-- 选中表格start -->
      <div class="line-style">
        <!-- <label class="line-label-3">已选择:</label> -->
        <template v-for="(tag, index) in tags">
          <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
            <!-- <a-tag :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)"> -->
            <a-tag
              :key="tag"
              :closable="index !== 0"
              :afterClose="() => handleClose(tag)"
            >{{ `${tags.slice(0, 20)}...` }}</a-tag>
          </a-tooltip>
          <a-tag
            v-else
            :key="tag"
            :closable="index !== 0"
            :afterClose="() => handleClose(tag)"
          >{{ tag }}</a-tag>
        </template>
      </div>
      <!-- 选中表格end -->

      <!-- 厂商盒子start -->
      <div style="width: 100%; height: 200px; border-top: 1px solid #eee;overflow: hidden">
        <div style="display: block; width: 10%; float: left; padding: 10px 10px; background-color: #f3f3f3; height: 100%">
          <!-- <label class="line-label-1">供应商:</label> -->
          供应商:
        </div>
        <!-- <a href="javascript:;" style="float: right;"> more > </a> -->
        <div style="height: 30px; width: 100%;">
          <ul class="letter-style">
            <li v-for="item in letter" :class="[letterIndex === item.id ? 'letter-line' : '']" :key="item.id" @mouseenter="letterMouseenter(item)">{{ item.name }}</li>
          </ul>
        </div>
        <div class="line-style" style="width: 90%; float: right;">
          <el-radio-group size="small" v-model="vendorsObj" @change="radioButtonEvent(1, $event)">
              <!-- @click="radioButtonEvent(1, item)" -->
            <el-radio-button
              class="line-radio"
              :value="item.vendor"
              :title="item.vendor"
              v-for="item in VendorsData"
              :key="item.vendor"
              :label="item"
            >{{ item.vendor }}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!-- 厂商盒子end -->

      <!-- 其他数据start -->
      <div v-show="isTrue1" style="margin-top: 10px; border-top: 1px solid #eee;">
        <div style="width: 100%; height: 50px; overflow: hidden">
          <div style="display: block; width: 10%; float: left; padding: 10px 10px; background-color: #f3f3f3; height: 100%">
            商品:
          </div>
          <div class="box-style-productsData">
            <el-radio-group size="small" v-model="productsObj" @change="radioButtonEvent(2, $event)">
              <el-radio-button
                class="line-radio"
                :value="item"
                v-for="item in productsData"
                :key="item"
                :label="item"
              >{{ item }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>

      <div v-show="isTrue2" style="margin-top: 10px; border-top: 1px solid #eee;">
        <div style="width: 100%; height: 50px; overflow: hidden">
          <div style="display: block; width: 10%; float: left; padding: 10px 10px; background-color: #f3f3f3; height: 100%">
            版本:
          </div>
          <!-- <label class="line-label-2">版本:</label> -->
          <div class="box-style-productsData">
            <el-radio-group size="small" v-model="versionsObj" @change="radioButtonEvent(3, $event)">
              <el-radio-button
                class="line-radio"
                :value="item.version"
                v-for="item in versionsData"
                :key="item.cpe_id"
                :label="item"
              >{{ item.version }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>

      <!-- 其他数据end -->
      <div style="margin-top: 10px;">
        <a-button v-show="tags.length === 4" @click="initECharts">查看可视图</a-button>
      </div>
    </a-card>
    <div style="height: 20px; width: 100%; background-color: rgb(243, 243, 243);"></div>
    <!-- CvE详细数据start -->
    <a-card style="margin-top: 24px;" :bordered="false">
      <a-list size="large" rowKey="id" itemLayout="vertical" :dataSource="cveInfoData">
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <a-list-item-meta>
            <a slot="title" href="javascript:;" @click="cveClick(1, item)">{{ item.CVE_ID }}</a>
          </a-list-item-meta>
          <p style="margin: 10px 0;">
            <strong>Description:</strong>
            {{ item.Description }}
          </p>
        </a-list-item>
      </a-list>
    </a-card>
    <!-- CvE详细数据end -->

    <!-- CwE详细 弹出层start -->
    <a-modal title="cwe漏洞" v-model="cweVisible">
      <div class="cwe-style" style="height: 350px; overflow-y: auto;">
        <li v-for="item in cweInfoData" :key="item.id">
          <a slot="title" href="javascript:;" @click="cveClick(2, item)">{{ item.Name }}</a>
          <p>
            <strong>Description:</strong>
            {{ item.Description }}
          </p>
        </li>
      </div>
    </a-modal>
    <!-- CwE详细 弹出层end -->

    <!-- 攻击手段 弹出层start -->
    <a-modal title="capec攻击手段" v-model="attackVisible">
      <div class="cwe-style" style="height: 350px; overflow-y: auto;">
        <li v-for="item in data" :key="item.id">
          <h3>{{ item.Name }}</h3>
          <p>
            <strong>Description:</strong>
            {{ item.Description }}
          </p>
        </li>
      </div>
    </a-modal>
    <!-- 攻击手段 弹出层end -->

    <!-- ECharts 弹出层start -->
    <!-- <a-modal title="网络空间知识图谱" v-model="echartsVisible">
      <div style="widht: 800px; height: 450px" id="main"></div>
    </a-modal> -->
    <!-- ECharts 弹出层end -->
    <!-- new ECharts 弹出层 -->
    <div class="box" v-if="echartsVisible">
      <header>
        <div class="title">网络空间知识图谱</div>
        <div class="close" @click="closeBox">
          <a-icon type="close" />
        </div>
      </header>
      <div style="widht: 100%; height: 100%" id="main"></div>
    </div>
  </div>
</template>

<script>
import 'ant-design-vue/lib/date-picker/style/css';
import { Card, Tag, Radio, Button, List, Modal, Icon, Tooltip } from "ant-design-vue";
import { vendorsData, productsData, versionsData, CveData } from "@/api"
// import * as d3 from 'd3'
// const main = document.getElementById('main')
const echarts = require('echarts')
const letter = [
  { id: 0, name: 'all' },
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
  { id: 4, name: 'D' },
  { id: 5, name: 'E' },
  { id: 6, name: 'F' },
  { id: 7, name: 'G' },
  { id: 8, name: 'H' },
  { id: 9, name: 'I' },
  { id: 10, name: 'J' },
  { id: 11, name: 'K' },
  { id: 12, name: 'L' },
  { id: 13, name: 'M' },
  { id: 14, name: 'N' },
  { id: 15, name: 'O' },
  { id: 16, name: 'P' },
  { id: 17, name: 'Q' },
  { id: 18, name: 'R' },
  { id: 19, name: 'S' },
  { id: 20, name: 'T' },
  { id: 21, name: 'U' },
  { id: 22, name: 'V' },
  { id: 23, name: 'W' },
  { id: 24, name: 'X' },
  { id: 25, name: 'Y' },
  { id: 26, name: 'Z' },
  { id: 27, name: '应用程序', letter: 'a' },
  { id: 28, name: '硬件平台', letter: 'h' },
  { id: 29, name: '操作系统', letter: 'o' }
]
export default {
  components: {
    ACard: Card,
    ATag: Tag,
    AButton: Button,
    AList: List,
    AModal: Modal,
    AIcon: Icon,
    ATooltip: Tooltip,
    AListItem: List,
  },
  data () {
    return {
      VendorsData: [], // 厂商数据
      vendorsObj: null,
      VendorsObject: {}, // 厂商 o h s 查询数组;
      productsObj: null,
      VendorsDataClone: [], // 厂商数据克隆;
      versionsObj: null,
      productsData: [], // 供应商产品详细数据;
      versionsData: [], // 产品型号数据
      cveInfoData: [],
      cweInfoData: [],
      tags: ['已选择:'],
      tagsObj: {},
      loadingMore: false,
      optionTitle: '',
      isTrue1: false,
      isTrue2: false,
      // isTrue3: false,
      data: [],
      attackVisible: false,
      cweVisible: false,
      echartsVisible: false,
      echartsDom: echarts,
      letter: letter,
      letterIndex: 0,
    }
  },
  created () {
    this.getVendorsData()

  },
  methods: {
    getVendorsData () {

      // vendorsData().then(res => {
      //   if (res.status === 200) {
      //     const temp = {}
      //     const arr = []
      //     const VendorsObject = {} // a o h 专用;
      //     res.data.Data.forEach((v, index) => {
      //       if (VendorsObject[v.pattern]) {
      //         VendorsObject[v.pattern].push(v)
      //       } else {
      //         VendorsObject[v.pattern] = []
      //         VendorsObject[v.pattern].push(v)
      //       }
      //       if (!temp[v.vendor]) {
      //         temp[v.vendor] = true
      //         arr.push(v)
      //       }
      //     })
      //     this.VendorsData = arr // 一次性渲染数据;
      //     this.VendorsDataClone = arr // 克隆数据.
      //     this.VendorsObject = VendorsObject
      //   }
      // })
      // ---------------------------------------------------------------
      const res = require('./Json/vendors.json')
      const temp = {}
      const arr = []
      const VendorsObject = {} // a o h 专用;
      res.Data.forEach((v, index) => {
        if (VendorsObject[v.pattern]) {
          VendorsObject[v.pattern].push(v)
        } else {
          VendorsObject[v.pattern] = []
          VendorsObject[v.pattern].push(v)
        }
        if (!temp[v.vendor]) {
          temp[v.vendor] = true
          arr.push(v)
        }
      })
      this.VendorsData = arr // 一次性渲染数据;
      this.VendorsDataClone = arr // 克隆数据.
      this.VendorsObject = VendorsObject

    },
    getList () {
      // this.$http.get('/list/article').then(res => {
      //   console.log('res', res)
      //   this.data = res.result
      // })
      const res = require('./Json/cve_info.json')
      this.data = res.Data
    },
    loadMore () {
      this.loadingMore = true
      this.$http
        .get('/list/article')
        .then(res => {
          this.data = this.data.concat(res.result)
        })
        .finally(() => {
          this.loadingMore = false
        })
    },
    // radioChanged (num, e) {
    //   // console.log(num)
    //   // console.log(e)
    //   if (num === 1) {
    //     this.optionTitle = e.target.value
    //   } else if (num === 2) {
    //     // const inputValue = e.target.value
    //     // const tag = this.tags
    //     // if (inputValue && tag.indexOf(inputValue) === -1) {
    //     //   this.tags = [...tag, inputValue]
    //     // }
    //   }

    //   // Object.assign(this, {
    //   //   tags,
    //   //   inputVisible: false,
    //    //   inputValue: '',
    //   // });
    // },
    radioButtonEvent (num, item) {
      console.log(num, item)
      this.isTrue1 = false
      this.isTrue2 = false
      // this.isTrue3 = false
      // console.log(num)
      // console.log(item)
      // 插入 tags 数组 并且显示在页面上面;
      // this.$http ...
      if (num === 1) {
        this.tags = ['已选择:', item.vendor]
        // productsData(item.vendor).then(res => {
        //   this.productsData = res.data.Data || []
        //   this.isTrue1 = true
        // })
        if (item.vendor === 'google') {
          const res = require('./Json/products.json')
          this.productsData = res.Data
          this.isTrue1 = true
        }
      } else if (num === 2) {
        // versionsData(this.vendorsObj.vendor, item).then(res => {
        //   this.versionsData = res.data.Data
        //   this.isTrue1 = true
        //   this.isTrue2 = true
        //   this.tags[2] = item         
        // })
        const res = require('./Json/versions.json')
        this.versionsData = res.Data
        this.isTrue1 = true
        this.isTrue2 = true
        this.tags[2] = item
      } else if (num === 3) {
        
        // return
        // CveData(item.cpe_id).then(res => {
        //   this.isTrue1 = true
        //   this.isTrue2 = true
        //   this.tags[3] = item.version
        //   this.cveInfoData = res.data.Data
        // })
        const res = require('./Json/cve_info.json')
        this.isTrue1 = true
        this.isTrue2 = true
        this.tags[3] = item.version
        this.cveInfoData = res.Data
      }
      // else if (num === 4) {
      //   this.isTrue1 = true
      //   this.isTrue2 = true
      //   this.isTrue3 = true
      //   this.tags[4] = item.CVE_ID
      //   const res = require('./Json/cwe_info.json')
      //   this.cweInfoData = res.Data
      // }
    },
    cveClick (num, item) {
      if (num === 1) {
        const res = require('./Json/cwe_info.json')
        // console.log(res, 'res')
        this.cweInfoData = res.Data
        this.cweVisible = true
      } else if (num === 2) {
        this.attackVisible = true
        const res = require('./Json/capec_info.json')
        this.data = res.Data
      }
    },
    initECharts () {
      // echarts弹出层;
      this.echartsVisible = true
      const than = this
      setTimeout(() => {
        const main = document.getElementById('main')

        var myChart = this.echartsDom.init(main)
        // console.log(this.cveInfoData, 'cveInfoData')
        const eData = []
        eData.push({ name: this.tags[2], Vendors: this.tags[1], versions: this.tags[3], itemStyle: { normal: { color: '#e33a59' } } })

        // if (this.cveInfoData.length === 1) {
        //   eData.push({
        //     parentID: eData[0].name,
        //     name: this.cveInfoData[0].CVE_ID,
        //     itemStyle: {
        //       normal: {
        //         color: '#44aeae'
        //       }
        //     },
        //     Description: this.cveInfoData[0].Description,
        //     CVE_ID: this.cveInfoData[0].CVE_ID
        //   }) // cve
        // } else {
        this.cveInfoData.forEach(v => {
          eData.push({
            parentID: eData[0].name,
            name: v.CVE_ID,
            itemStyle: {
              normal: {
                color: '#44aeae'
              }
            },
            Description: v.Description,
            CVE_ID: v.CVE_ID
          }) // cve
        })
        // }

        const cwe = require('./Json/cwe_info.json').Data
        cwe.forEach((v, index) => {
          // cwe
          eData.push({
            parentID: eData[1].name,
            name: v.Name,
            itemStyle: {
              normal: {
                color: '#fdc72a'
              }
            },
            Description: v.Description,
            CWE_ID: v.CWE_ID
          })
        })

        const capec = require('./Json/capec_info.json').Data
        capec.forEach(v => {
          // capec
          eData.push({
            parentID: 'J2EE Misconfiguration: Data Transmission Without Encryption',
            name: v.Name,
            itemStyle: {
              normal: {
                color: '#3e7b91'
              }
            },
            CAPEC_ID: v.CAPEC_ID,
            Description: v.Description
          })
        })

        const cce = require('./Json/cce_info.json').Data
        cce.forEach(v => {
          console.log(v, 'vvv')
          // capec
          eData.push({
            parentID: eData[0].name,
            name: v.CCE_ID,
            itemStyle: {
              normal: {
                color: '#874c9c'
              }
            },
            Description: v.CCE_Description
          })
        })

        const eLinks = []
        eData.forEach(v => {
          if (v.parentID) {
            if (v.parentID.indexOf('CVE') === 0) {
              const obj = {}
              obj.source = v.parentID
              obj.target = v.name
              eLinks.push(obj)
            } else {
              const obj = {}
              obj.source = v.parentID
              obj.target = v.name
              eLinks.push(obj)
            }
          }
        })
        // console.log(eData)
        // console.log(eLinks)
        var option = {
          title: {
            text: ''
          },
          tooltip: {
            formatter: function (callback) {
              if (callback.data.parentID) {
                return `parent: ${callback.data.parentID} <br /> name: ${callback.data.name} <br /> Description: ${callback.data.Description.slice(0, 40)}...`
              } else {
                return `Vendors: ${callback.data.Vendors} <br /> 
                Name: ${callback.data.name} <br />
                Versions: ${callback.data.versions}
                `
              }
            }
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'force',
              symbolSize: 30,
              roam: true,
              label: {
                show: true,
                formatter: function (params) {
                  console.log(params.data)
                  if (params.data.parentID) {
                    if (params.data.CVE_ID) {
                      return `CVE_ID: ${params.data.CVE_ID}`
                    } else if (params.data.CWE_ID) {
                      return `CWE_ID: ${params.data.CWE_ID}`
                    } else if (params.data.CAPEC_ID) {
                      return `CAPEC_ID: ${params.data.CAPEC_ID}`
                    } else {
                      return params.name
                    }
                  } else {
                    return params.name
                  }
                }

              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [8, 14],
              edgeLabel: { // line上的文字
                fontSize: 0
              },
              data: eData,
              // data: [
              //   {
              //     name: '节点1',
              //     color: 'red'
              //   }, {
              //     name: '节点2',
              //     color: 'pink'
              //   }, {
              //     name: '节点3'
              //   }, {
              //     name: '节点4'
              //   }
              // ],
              // links: [],
              links: eLinks,
              // [
              //   {
              //     source: 0,
              //     target: 1,
              //     symbolSize: [5, 20]
              //     // label: {
              //     //   show: true
              //     // },
              //     // lineStyle: {
              //     //   width: 5,
              //     //   curveness: 0.2
              //     // }
              //   },
              //   {
              //     source: '节点2',
              //     target: '节点1'
              //     // label: {
              //     //   show: true
              //     // },
              //     // lineStyle: {
              //     //   curveness: 0.2
              //     // }
              //   },
              //   {
              //     source: '节点1',
              //     target: '节点3'
              //   },
              //   {
              //     source: '节点2',
              //     target: '节点3'
              //   },
              //   {
              //     source: '节点2',
              //     target: '节点4'
              //   },
              //   {
              //     source: '节点1',
              //     target: '节点4'
              //   }
              // ],
              lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          ]
        }

        myChart.setOption(option)
        myChart.on('click', function (param) {
          console.log(param.data)

          const h = than.$createElement
          than.$info({
            name: '',
            content: h('div', {}, [
              h('h2', `${param.data.name}`),
              h('p', `${param.data.Description}`)
            ])
          })
        })
      }, 500)
    },
    letterMouseenter (item) {
      this.letterIndex = item.id
      if (item.name === 'all') {
        this.VendorsData = this.VendorsDataClone
      } else if (item.letter) {
        this.VendorsData = this.VendorsObject[item.letter]
      } else {
        const arr = []
        this.VendorsDataClone.map(v => {
          if (v.vendor.toUpperCase().indexOf(item.name, 0) === 0) {
            arr.push(v)
          }
        })
        this.VendorsData = arr
      }
    },
    closeBox () {
      this.echartsVisible = false
    }
  },
}
</script>

<style lang="less">
  ul {
    list-style: none;
  }
.line-style { // 厂商
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  max-height: 200px;
  overflow-y: auto;
  .cwe-style {
    height: 200px;
    overflow: hidden;
  }
}
.letter-style > li{
  float: left;
  height: 35px;
  padding: 0 10px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
}
.letter-line {
  border: 1px solid #ccc;
  color: #1890ff;
}
.box-style-productsData {
  height: 50px;
  padding: 3px 0;
  border-bottom: 1px solid #eee;
  max-height: 50px;
  overflow-y: auto;
}
.line-radio {
  margin: 5px 10px !important;
}
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  max-width: 1100px;
  min-width: 520px;
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 5px #888888;
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
header {
  height: 40px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  width: 100%;
.title {
  float: left;
  font-size: 18px;
  color: #000;
}
.close {
  float: right;
  cursor: pointer;
}
}
</style>
