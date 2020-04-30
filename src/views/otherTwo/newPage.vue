<template>
  <div class="big-box">
    <el-tabs v-model="activeName" class="tabStyle" @tab-click="handleClick">
      <el-tab-pane label="正序" name="first">
        <a-card :bordered="false" class="ant-pro-components-tag-select">
          <!-- 选中表格start -->
          <div class="line-style">
            <!-- <label class="line-label-3">已选择:</label> -->
            <template v-for="(item, index) in tags">
              <a-tooltip v-if="item.length > 20" :key="item">
                <!-- <a-tag :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)"> -->
                <a-tag
                  :key="item"
                  :closable="index !== 0"
                  :afterClose="() => handleClose(item)"
                  :title="tags"
                >{{ `${item.slice(0, 100)}...` }}</a-tag>
              </a-tooltip>
              <a-tag
                v-else
                :title="item"
                :key="item"
                :closable="index !== 0"
                :afterClose="() => handleClose(item)"
              >{{ item }}</a-tag>
            </template>
          </div>
          <!-- 选中表格end -->

          <!-- 厂商盒子start -->
          <div style="width: 100%; height: 230px; border-top: 1px solid #eee;overflow: hidden">
            <div
              style="display: block; width: 10%; float: left; padding: 10px 10px; background-color: #f3f3f3; height: 100%"
            >
              <!-- <label class="line-label-1">供应商:</label> -->
              供应商:
            </div>
            <!-- <a href="javascript:;" style="float: right;"> more > </a> -->
            <div style="height: 60px; width: 100%; box-sizing: border-box">
              <div class="vendor-search">
                <i
                  class="el-icon-search"
                  style="height: 30px;line-height: 30px;text-align: center;padding: 0 10px;"
                ></i>
                <el-input
                  size="mini"
                  :clearable="true"
                  v-model="searchData"
                  placeholder="请输入内容..."
                  style="width: 45%"
                ></el-input>
                <el-button size="mini" @click="vendorSearch">查 询</el-button>
              </div>
              <ul class="letter-style">
                <li style="height: 30px; widht: 3%">
                  <i class="el-icon-menu"></i>
                </li>
                <li
                  v-for="item in letter"
                  :class="[letterIndex === item.id ? 'letter-line' : '']"
                  :key="item.id"
                  @mouseenter="letterMouseenter(item)"
                >{{ item.name }}</li>
              </ul>
            </div>
            <div class="line-style" style="width: 90%; float: right; height: 170px;">
              <el-radio-group
                size="small"
                v-model="vendorsObj"
                @change="radioButtonEvent(1, $event)"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
              >
                <!-- v-infinite-scroll="load" infinite-scroll-disabled="disabled" -->
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
              <p class="loadP" v-if="vendorsNoMore">没有更多了</p>
              <p class="loadP" v-if="vendorsLoading">加载中...</p>
            </div>
          </div>
          <!-- 厂商盒子end -->

          <!-- 其他数据start -->
          <div v-show="isTrue1" style="margin-top: 10px; border-top: 1px solid #eee;">
            <div style="width: 100%; height: 50px; overflow: hidden">
              <div
                style="display: block; width: 10%; float: left; padding: 10px 10px; background-color: #f3f3f3; height: 100%"
              >商品:</div>
              <div class="box-style-productsData">
                <el-radio-group
                  size="small"
                  v-model="productsObj"
                  @change="radioButtonEvent(2, $event)"
                >
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
              <div
                style="display: block; width: 10%; float: left; padding: 10px 10px; background-color: #f3f3f3; height: 100%"
              >版本:</div>
              <!-- <label class="line-label-2">版本:</label> -->
              <div class="box-style-productsData">
                <el-radio-group
                  size="small"
                  v-model="versionsObj"
                  @change="radioButtonEvent(3, $event)"
                >
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
            <!-- <a-button @click="initECharts">查看可视图</a-button> -->
          </div>
        </a-card>
        <div style="height: 10px; width: 100%; background-color: rgb(243, 243, 243);"></div>
        <!-- CvE详细数据start -->
        <a-card style="margin-top: 24px;" :bordered="false">
          <!-- <a-list size="large" rowKey="id" itemLayout="vertical" :dataSource="cveInfoData">
            <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <a slot="title" href="javascript:;" @click="cveClick(1, item)">{{ item.CVE_ID }}</a>
              </a-list-item-meta>
              <p style="margin: 10px 0;">
                <strong>Description:</strong>
                {{ item.Description }}
              </p>
              <div style="width: 100%; height: 1px; background-color: #eee;"></div>
            </a-list-item>
          </a-list>-->
          <el-collapse v-model="cveListNum" accordion>
            <template v-for="item in cveInfoData">
              <el-collapse-item :key="item.id" :title="item.CVE_ID" :name="item.id">
                <a slot="title" href="javascript:;" @click="cveClick(1, item)">{{ item.CVE_ID }}</a>
                <div>
                  <div>
                    <strong>CVE_ID:</strong>
                    {{ item.CVE_ID }}
                  </div>
                  <div>
                    <strong>Publish_Date:</strong>
                    {{ item.Publish_Date || null }}
                  </div>
                  <div>
                    <strong>Update_Date:</strong>
                    {{ item.Update_Date || null }}
                  </div>
                  <div>
                    <strong>Description:</strong>
                    {{ item.Description || null }}
                  </div>
                </div>
              </el-collapse-item>
            </template>
          </el-collapse>
        </a-card>
        <!-- CvE详细数据end -->

        <!-- CwE详细 弹出层start -->
        <a-modal title="cwe漏洞" v-model="cweVisible" @ok="cweVisible = false">
          <!-- <div class="cwe-style" style="height: 350px; overflow-y: auto;">
            <li v-for="item in cweInfoData" :key="item.id">
              <a slot="title" href="javascript:;" @click="cveClick(2, item)">{{ item.Name }}</a>
              <p>
                <strong>Description:</strong>
                {{ item.Description }}
              </p>
            </li>
          </div>-->
          <div class="cweList">
            <el-collapse v-model="cweListNum" accordion>
              <template v-for="item in cweInfoData">
                <el-collapse-item :key="item.id" :title="item.Name" :name="item.id">
                  <a slot="title" href="javascript:;" @click="cveClick(2, item)">{{ item.Name }}</a>
                  <!-- <template slot-scope="item"> -->
                  <div v-for="(value, name, index) in item" :key="index">
                    <div>
                      <strong>{{ name }}:</strong>
                      {{ value === null? 'null' : value }}
                    </div>
                  </div>
                  <!-- </template> -->
                </el-collapse-item>
              </template>
            </el-collapse>
          </div>
        </a-modal>
        <!-- CwE详细 弹出层end -->

        <!-- 攻击手段 弹出层start -->
        <a-modal title="capec攻击手段" v-model="attackVisible" @ok="attackVisible = false">
          <!-- <div class="cwe-style" style="height: 350px; overflow-y: auto;">
            <li v-for="item in data" :key="item.id">
              <h3>{{ item.Name }}</h3>
              <p>
                <strong>Description:</strong>
                {{ item.Description }}
              </p>
            </li>
          </div>-->
          <div class="cweList">
            <el-collapse v-model="capecListNum" accordion>
              <template v-for="item in data">
                <el-collapse-item :key="item.id" :title="item.Name" :name="item.id">
                  <a slot="title" href="javascript:;" @click="cveClick(2, item)">{{ item.Name }}</a>
                  <!-- <template slot-scope="item"> -->
                  <div v-for="(value, name, index) in item" :key="index">
                    <div>
                      <strong>{{ name }}:</strong>
                      {{ value === null? 'null' : value }}
                    </div>
                  </div>
                  <!-- </template> -->
                </el-collapse-item>
              </template>
            </el-collapse>
          </div>
        </a-modal>
        <!-- 攻击手段 弹出层end -->

        <!-- ECharts 弹出层start -->
        <!-- <a-modal title="网络空间知识图谱" v-model="echartsVisible">
          <div style="widht: 800px; height: 450px" id="main"></div>
        </a-modal>-->
        <!-- ECharts 弹出层end -->
        <!-- new ECharts 弹出层 -->
      </el-tab-pane>
      <transition name="el-fade-in-linear">
        <div class="box" v-show="echartsVisible">
          <header>
            <h3 class="title">网络空间知识图谱</h3>
            <div class="close" @click="closeEcharts">
              <a-icon type="close" />
            </div>
          </header>
          <!-- <div style="widht: 100%; height: 100%" id="main"></div> -->
          <div style="widht: 600px; min-height: 640px;" id="main"></div>
          <!-- <div> -->
          <!-- <svg width="960" height="600"></svg> -->
          <!-- </div> -->
          <!-- <footer style="z-index: 99999;position: absolute;bottom: 0px;right: 0;">
            <el-button
              size="mini"
              v-show="activeName === 'second'"
              @click="reSetEcharts"
              type="primary"
            >ReSet</el-button>
          </footer>-->
        </div>
      </transition>
      <!-- next page start -->
      <el-tab-pane label="倒序" name="second">
        <!-- 提示选择框 -->
        <el-dialog
          title="战术选择"
          :visible.sync="selectTactics"
          width="74%"
          :before-close="handleClose"
        >
          <el-radio-group v-model="selectTacticsObj" @change="radioButtonEvent(4, $event)">
            <el-radio-button
              class="line-radio"
              style="margin: 10px"
              size="small"
              v-for="item in selectTacticsList"
              :key="item.tId"
              :label="item"
            >{{ item.tId }}</el-radio-button>
          </el-radio-group>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" @click="selectTactics = false">确 定</el-button> -->
          </span>
        </el-dialog>
        <div class="d3-box">
          <div id="last-echarts" style="min-width: 1324px; width:100%; min-height: 640px"></div>
          <footer style="z-index: 99999;position: absolute;bottom: 0px;right: 0;">
            <el-button
              size="mini"
              v-show="activeName === 'second'"
              @click="reSetEcharts"
              type="primary"
            >ReSet</el-button>
          </footer>
        </div>
      </el-tab-pane>
      <!-- next page end -->
    </el-tabs>

    <el-dialog title="详细配置信息" :visible.sync="dialogTableVisible" width="50%">
      <!-- table 自动增加列 -->
      <!-- <el-table :data="gridData" border height="400">
        <el-table-column property="name" label="名称" width="80"></el-table-column>
        <el-table-column property="description" label="描述" width="400"></el-table-column>
        <template v-if="dialogTableData.length >= 1">
          <el-table-column 
            v-for="(item, index) in dialogTableData"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            width="300"
          >
          </el-table-column>
        </template>
      </el-table>-->
      <ul class="configuration-ul">
        <li v-for="(value, name, index) in gridData" :key="index">
          <div>{{ name }}</div>
          <div>{{ value }}</div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import "ant-design-vue/lib/date-picker/style/css";
import { test } from "@/api";
import {
  Card,
  Tag,
  Radio,
  Button,
  List,
  Modal,
  Icon,
  Tooltip
} from "ant-design-vue";
import {
  vendorsData,
  productsData,
  versionsData,
  CveData,
  CweData,
  capecData,
  cceData,
  vendorSearchApi,
  allTactics,
  techniquesNext,
  capec_info,
  cwe_info,
  cve_info,
  cpe_info,
  vendor_detail,
  techniquesData,
  tacticsData,
  groups,
  softwares
} from "@/api";
// import * as d3 from 'd3'
// const main = document.getElementById('main')
const echarts = require("echarts");
const letter = [
  { id: 0, name: "all" },
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
  { id: 5, name: "E" },
  { id: 6, name: "F" },
  { id: 7, name: "G" },
  { id: 8, name: "H" },
  { id: 9, name: "I" },
  { id: 10, name: "J" },
  { id: 11, name: "K" },
  { id: 12, name: "L" },
  { id: 13, name: "M" },
  { id: 14, name: "N" },
  { id: 15, name: "O" },
  { id: 16, name: "P" },
  { id: 17, name: "Q" },
  { id: 18, name: "R" },
  { id: 19, name: "S" },
  { id: 20, name: "T" },
  { id: 21, name: "U" },
  { id: 22, name: "V" },
  { id: 23, name: "W" },
  { id: 24, name: "X" },
  { id: 25, name: "Y" },
  { id: 26, name: "Z" },
  { id: 27, name: "应用程序", letter: "a" },
  { id: 28, name: "硬件平台", letter: "h" },
  { id: 29, name: "操作系统", letter: "o" }
];
export default {
  components: {
    ACard: Card,
    ATag: Tag,
    AButton: Button,
    AList: List,
    AModal: Modal,
    AIcon: Icon,
    ATooltip: Tooltip,
    AListItem: List
  },
  data() {
    return {
      searchData: "", // 搜索框数据
      VendorsData: [], // 厂商数据
      vendorsObj: null, // v-model
      vendorsLoading: false, // 刷新元素
      vendorPage: 1, // 厂商页码
      vendorSearchPage: 1,
      VendorsObject: {}, // 厂商 o h s 查询数组;
      productsObj: null,
      VendorsDataClone: [], // 厂商数据克隆;
      vendors: [], // 源数据;--- 刷新用 未处理格式之前的数据;
      versionsObj: null,
      productsData: [], // 供应商产品详细数据;
      versionsData: [], // 产品型号数据
      cveInfoData: [],
      cweInfoData: [],
      tags: ["已选择:"],
      cpe_id: "",
      // tagsObj: {},
      // loadingMore: false,
      // optionTitle: "",
      isTrue1: false,
      isTrue2: false,
      // isTrue3: false,
      data: [],
      attackVisible: false,
      cweVisible: false,
      echartsVisible: false,
      // echartsDom: echarts,
      letter: letter,
      letterIndex: 0,
      // next page data ---------------------
      activeName: "first", // tab栏属性
      selectTactics: false, // 选择所有任务;
      selectTacticsObj: null, // 选中的任务;
      selectTacticsList: [], // 所有任务数据;
      dialogTableVisible: false,
      gridData: {},
      dialogTableData: [],
      cveListNum: "",
      cweListNum: "",
      capecListNum: "",
      eCharts: null
    };
  },
  created() {
    this.getVendorsData(this.vendorPage);
    this.getAllTactics();
  },
  methods: {
    getVendorsData(page) {
      vendorsData(page).then(res => {
        if (res.data.Code === 0) {
          const temp = {};
          const arr = [];
          const VendorsObject = {}; // a o h 专用;

          if (page === 1) {
            this.vendors = res.data.Data;
            res.data.Data.forEach((v, index) => {
              if (VendorsObject[v.pattern]) {
                VendorsObject[v.pattern].push(v);
              } else {
                VendorsObject[v.pattern] = [];
                VendorsObject[v.pattern].push(v);
              }
              if (!temp[v.vendor]) {
                temp[v.vendor] = true;
                arr.push(v);
              }
            });
          } else {
            this.vendors.push(...res.data.Data);

            this.vendors.forEach((v, index) => {
              if (VendorsObject[v.pattern]) {
                VendorsObject[v.pattern].push(v);
              } else {
                VendorsObject[v.pattern] = [];
                VendorsObject[v.pattern].push(v);
              }
              if (!temp[v.vendor]) {
                temp[v.vendor] = true;
                arr.push(v);
              }
            });
          }
          this.VendorsData = arr; // 一次性渲染数据;
          this.VendorsDataClone = arr; // 克隆数据.
          this.VendorsObject = VendorsObject;
        }
      });
    },
    getAllTactics() {
      allTactics().then(res => {
        if (res.data.Code === 0) {
          res.data.Data.forEach(v => {
            v["tId"] = v.external_references[0].external_id;
            if (v.external_references.length > 1) {
              v.external_references.forEach(item => {
                if (item.external_id.indexOf("T") === 0) {
                  v["tId"] = item.external_id;
                }
              });
            }
          });
          this.selectTacticsList = res.data.Data;
        }
      });
      // const res = require("./Json/all_tactics.json").Data;
      // res.forEach(v => {
      //   v["tId"] = v.external_references[0].external_id;
      //   if (v.external_references.length > 1) {
      //     v.external_references.forEach(item => {
      //       if (item.external_id.indexOf("T") === 0) {
      //         v["tId"] = item.external_id;
      //       }
      //     });
      //   }
      // });
      // this.selectTacticsList = res;
    },
    radioButtonEvent(num, item) {
      // 插入 tags 数组 并且显示在页面上面;
      if (num === 1) {
        this.tags = ["已选择:", item.vendor];
        this.cweInfoData = [];
        this.versionsData = [];
        this.cveInfoData = [];
        this.isTrue2 = false;
        productsData(item).then(res => {
          this.productsData = res.data.Data || [];
          this.isTrue1 = true;
        });
      } else if (num === 2) {
        this.tags[2] = item;
        versionsData(this.vendorsObj.vendor, item).then(res => {
          this.versionsData = res.data.Data;
          this.isTrue1 = true;
          this.isTrue2 = true;
        });
      } else if (num === 3) {
        /**
         * 随时删除;
         */
        // item.cpe_id = 426113
        this.cpe_id = item.cpe_id;
        CveData(item.cpe_id).then(res => {
          this.isTrue1 = true;
          this.isTrue2 = true;
          this.tags[3] = item.version;
          this.cveInfoData = res.data.Data;
        });
      } else if (num === 4) {
        this.selectTactics = false;
        // this.echartsVisible = true
        this.nextPageInitECharts(item);
      }
    },
    cveClick(num, item) {
      if (num === 1) {
        CweData(item.CVE_ID).then(res => {
          if (res.data.Code === 0) {
            this.cweInfoData = res.data.Data;
            this.cweVisible = true;
          }
        });
      } else if (num === 2) {
        this.attackVisible = true;
        /**
         * 随时删除
         */
        // item.CWE_ID = 285
        capecData(item.CWE_ID).then(res => {
          this.data = res.data.Data;
        });
      }
    },
    initECharts() {
      // echarts弹出层;
      this.echartsVisible = true;
      // this.eCharts.showLoading();
      const than = this;
      const eData = [];
      const eLinks = [];
      let searchData = {};
      eData.push({
        id: `CPE_ID${this.cpe_id}`,
        name: this.tags[2],
        Vendors: this.tags[1],
        versions: this.tags[3],
        itemStyle: { normal: { color: "#e33a59" } }
      });
      // vendor_detail({vendor: this.tags[1], versions: this.tags[3]}).then(({ data }) => {
      //   let temp = data.Data[0];
      //   let obj = {
      //     ...temp,
      //     name: `CPE${v.CPE_ID}`,
      //     id: v.CPE_ID,
      //     parentID: value.id
      //   };
      //   nodes.push(obj);
      // });
      cceData(this.cpe_id).then(res => {
        res.data.Data.forEach(ev => {
          eData.push({
            ...ev,
            id: ev.CCE_ID,
            parentID: eData[0].id,
            name: ev.CCE_ID,
            itemStyle: {
              normal: {
                color: "#874c9c"
              }
            }
          });
        });
      });
      // cve数据...
      this.cveInfoData.forEach((v, index) => {
        v["name"] = v.CVE_ID;
        v["id"] = screenData(eData, v.CVE_ID);
        eData.push({
          ...v,
          parentID: eData[0].id,
          itemStyle: { normal: { color: "#44aeae" } },
          description: v.Description
        }); // cve

        CweData(v.CVE_ID).then(res => {
          if (res.data.Code === 0) {
            res.data.Data.forEach(item => {
              item["name"] = `CWE_Id:${item.CWE_ID}`;
              item["id"] = `CWE_ID:${item.CWE_ID}`;
              item["id"] = screenData(eData, item).id;
              // id 是自定义的所以 如果想标记出现次数就必须在还没有push进数组中的时候就进行数据格式;
              // 这样往下面传递的parentID也是修改好的;
              item["showName"] = item.Name;
              eData.push({
                ...item,
                parentID: v.CVE_ID,
                itemStyle: {
                  normal: {
                    color: "#fdc72a"
                  }
                },
                description: item.Description
              });

              capecData(item.CWE_ID).then(res => {
                res.data.Data.forEach(val => {
                  // capec
                  val["name"] = `CAPEC_ID:${val.CAPEC_ID}`;
                  val["id"] = `CAPEC_ID:${val.CAPEC_ID}`;
                  val["id"] = screenData(eData, val).id;
                  val["showName"] = val.Name;
                  eData.push({
                    ...val,
                    parentID: item.id,
                    itemStyle: {
                      normal: {
                        color: "#3e7b91"
                      }
                    },
                    description: val.Description
                  });

                  techniquesData(val.CAPEC_ID).then(({ data }) => {
                    if (data.Code === 0) {
                      data.Data.forEach(v => {
                        v["groups_softwares_id"] = v.id;
                        v.kill_chain_phases.forEach(item1 => {
                          if (item1.phase_name) {
                            v["phase_name"] = item1.phase_name;
                          }
                        });
                        v.external_references.forEach(item => {
                          if (item.external_id) {
                            if (item.external_id.indexOf("T") === 0) {
                              v.tId = item.external_id;
                              v["showName"] = v.name;
                              v["name"] = v.tId;
                              v["id"] = v.tId;
                              v["id"] = screenData(eData, v).id;
                              eData.push({
                                ...v,
                                parentID: val.id,
                                description: v.description,
                                itemStyle: { normal: { color: "#E8E22F" } }
                              });
                            }
                          }
                        });
                        groups(v.groups_softwares_id).then(({ data }) => {
                          data.Data.forEach(val1 => {
                            val1.external_references.forEach(value => {
                              if (value.external_id) {
                                val1.tId = value.external_id;
                              }
                            });
                            val1["showName"] = v.name;
                            val1["name"] = val1.tId;
                            val1["id"] = `groups${val1.tId}`;
                            val1["id"] = screenData(eData, val1).id;

                            nodes.push({
                              ...val1,
                              parentID: v.id,
                              description: v.description,
                              itemStyle: { normal: { color: "#31C9E8" } }
                            });
                          });
                        });
                        softwares(v.groups_softwares_id).then(({ data }) => {
                          data.Data.forEach(val2 => {
                            val2.external_references.forEach(value => {
                              if (value.external_id) {
                                val2.tId = value.external_id;
                              }
                            });
                            val2["showName"] = v.name;
                            val2["name"] = val2.tId;
                            val2["id"] = `softwares${val2.tId}`;
                            val2["id"] = screenData(eData, val2).id;
                            nodes.push({
                              ...val2,
                              parentID: v.id,
                              description: v.description,
                              itemStyle: { normal: { color: "#874c9c" } }
                            });
                          });
                        });
                        tacticsData(v.phase_name).then(({ data }) => {
                          data.Data.forEach(value => {
                            value["showName"] = value.id;
                            value.external_references.forEach(e => {
                              if (e.external_id) {
                                value["tId"] = e.external_id;
                                value["name"] = e.external_id;
                                value["id"] = e.external_id;
                                value["id"] = screenData(eData, value).id;
                                eData.push({
                                  ...value,
                                  parentID: v.tId,
                                  description: value.description,
                                  itemStyle: { normal: { color: "#874c2c" } }
                                });
                              }
                            });
                          });
                        });
                      });
                    }
                  });
                });
              });
            });
          }
        });
      });
      var createEcharts = () => {
        eData.forEach(v => {
          if (v.parentID) {
            // if (v.parentID.indexOf("CVE") === 0) {
            //   const obj = {};
            //   obj.source = v.parentID;
            //   obj.target = v.id;
            //   eLinks.push(obj);
            // } else {
            const obj = {};
            obj.source = v.parentID;
            obj.target = v.id;
            eLinks.push(obj);
            // }
          }
        });
        // console.log(eData, eLinks);
        // var myChart = echarts.init(document.getElementById("main"));
        // console.log(eData, eLinks);
        if (!this.eCharts)
          this.eCharts = echarts.init(document.getElementById("main"));
        this.eCharts.setOption(this.eChartsData(eData, eLinks));
        this.eCharts.on("click", this.makeData);
      };
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
      setTimeout(() => {
        createEcharts();
        console.log(123);
        // this.eCharts.hideLoading();
      }, 15000);
    },
    letterMouseenter(item) {
      this.letterIndex = item.id;
      if (item.name === "all") {
        this.VendorsData = this.VendorsDataClone;
      } else if (item.letter) {
        this.VendorsData = this.VendorsObject[item.letter];
      } else {
        const arr = [];
        this.VendorsDataClone.map(v => {
          if (v.vendor.toUpperCase().indexOf(item.name, 0) === 0) {
            arr.push(v);
          }
        });
        this.VendorsData = arr;
      }
    },
    load() {
      if (this.searchData == "") {
        this.vendorPage += 1;
        this.getVendorsData(this.vendorPage);
      } else {
        this.vendorSearchPage += 1;
        this.vendorSearch();
      }

      this.vendorsLoading = true;
      setTimeout(() => {
        this.vendorsLoading = false;
      }, 2000);
    },
    vendorSearch() {
      this.letterMouseenter({ id: 0, name: "all" }); // 拼音选择为all
      if (this.searchData == "") {
        this.vendorPage = 1;
        this.getVendorsData(this.vendorPage);
      }
      // searchData
      vendorSearchApi(this.searchData, this.vendorSearchPage).then(res => {
        if (res.status === 200) {
          if (res.data.Data.length === 0) {
            this.$message({ message: "暂无此数据", type: "warning" });
            return;
          }
          const temp = {};
          const arr = [];
          const VendorsObject = {}; // a o h 专用;

          if (this.vendorSearchPage === 1) {
            this.vendors = res.data.Data;
            res.data.Data.forEach((v, index) => {
              if (VendorsObject[v.pattern]) {
                VendorsObject[v.pattern].push(v);
              } else {
                VendorsObject[v.pattern] = [];
                VendorsObject[v.pattern].push(v);
              }
              if (!temp[v.vendor]) {
                temp[v.vendor] = true;
                arr.push(v);
              }
            });
          } else {
            this.vendors.push(...res.data.Data);

            this.vendors.forEach((v, index) => {
              if (VendorsObject[v.pattern]) {
                VendorsObject[v.pattern].push(v);
              } else {
                VendorsObject[v.pattern] = [];
                VendorsObject[v.pattern].push(v);
              }
              if (!temp[v.vendor]) {
                temp[v.vendor] = true;
                arr.push(v);
              }
            });
          }
          this.VendorsData = arr; // 一次性渲染数据;
          this.VendorsDataClone = arr; // 克隆数据.
          this.VendorsObject = VendorsObject;
        }
      });
    },
    handleClick(tab, event) {
      this.echartsVisible = false;
      if (this.activeName === "second") {
        // this.selectTacticsObj = null
        this.selectTactics = true;
        if (!this.eCharts)
          this.eCharts = echarts.init(document.getElementById("last-echarts"));
      } else {
        if (!this.eCharts)
          this.eCharts = echarts.init(document.getElementById("main"));
      }
    },
    handleClose() {
      if (this.selectTacticsObj === null) {
        this.$message({ message: "请选择战术", type: "warning" });
        return;
      }
    },
    nextPageInitECharts(config) {
      // this.echartsVisible = true;
      // 显示的名称用name,
      // 给原本的id另外一个统一的字段保存;
      // id指定给对应的spe- sve - cwe - capec - cce 等... 描述统一description;
      // 颜色需要提前交代好;
      var nodes = [];
      var edges = [];
      config["showName"] = config.name;
      config["id"] = config.tId;
      nodes.push({
        ...config,
        name: config.tId,
        description: config.description,
        itemStyle: { normal: { color: "#e33a59" } }
      });
      techniquesNext(config.showName).then(({ data }) => {
        if (data.Code === 0) {
          data.Data.forEach(v => {
            v["groups_softwares_id"] = v.id;
            v.external_references.forEach(item => {
              if (item.external_id) {
                if (item.external_id.indexOf("T") === 0) {
                  v.tId = item.external_id;
                  v["showName"] = v.name;
                  v["id"] = v.tId;
                  nodes.push({
                    ...v,
                    parentID: nodes[0].id,
                    name: v.tId,
                    description: v.description,
                    itemStyle: { normal: { color: "#E8E22F" } }
                  });
                }
                if (item.external_id.indexOf("CAPEC") === 0) {
                  v.capecId = item.external_id;
                  // 技术
                }
              }
            });
            groups(v.groups_softwares_id).then(({ data }) => {
              data.Data.forEach(val1 => {
                val1.external_references.forEach(value => {
                  if (value.external_id) {
                    val1.tId = value.external_id;
                  }
                });
                val1["showName"] = v.name;
                val1["name"] = val1.tId;
                val1["id"] = `groups${val1.tId}`;
                nodes.push({
                  ...screenData(nodes, val1),
                  parentID: v.id,
                  description: v.description,
                  itemStyle: { normal: { color: "#31C9E8" } }
                });
              });
            });
            softwares(v.groups_softwares_id).then(({ data }) => {
              data.Data.forEach(val2 => {
                val2.external_references.forEach(value => {
                  if (value.external_id) {
                    val2.tId = value.external_id;
                  }
                });
                val2["showName"] = v.name;
                val2["name"] = val2.tId;
                val2["id"] = `softwares${val2.tId}`;
                nodes.push({
                  ...screenData(nodes, val2),
                  parentID: v.id,
                  description: v.description,
                  itemStyle: { normal: { color: "#874c9c" } }
                });
              });
            });

            // 没有capecId筛选掉;
            if (v.capecId) {
              // capec
              capec_info(v.capecId).then(({ data }) => {
                data.Data.forEach(ev => {
                  ev["id"] = `CAPEC${ev.CAPEC_ID}`;
                  ev["showName"] = ev.Name;
                  ev["name"] = `CAPEC${ev.CAPEC_ID}`;
                  screenData(nodes, ev);
                  nodes.push({
                    ...screenData(nodes, ev),
                    parentID: v.id,
                    description: ev.Description,
                    itemStyle: { normal: { color: "#2DE8BD" } }
                  });
                  // cwe;
                  cwe_info(ev.CAPEC_ID).then(({ data }) => {
                    data.Data.forEach((val, index) => {
                      val["id"] = `CWE${val.CWE_ID}`;
                      val["showName"] = val.Name;
                      val["name"] = `CWE${val.CWE_ID}`;
                      nodes.push({
                        ...screenData(nodes, val),
                        parentID: ev.id,
                        description: val.Description,
                        itemStyle: { normal: { color: "#4030E8" } }
                      });
                      // cve;
                      cve_info(val.CWE_ID).then(({ data }) => {
                        data.Data.forEach((value, index) => {
                          value["id"] = value.CVE_ID;
                          value["name"] = val.CVE_ID;
                          nodes.push({
                            ...screenData(nodes, value),
                            parentID: val.id,
                            description: value.Description,
                            itemStyle: { normal: { color: "#3e7b91" } }
                          });
                          // cpe_info;
                          cpe_info(value.CVE_ID).then(res => {
                            res.data.Data.forEach(v => {
                              vendor_detail(v).then(({ data }) => {
                                let temp = data.Data[0];
                                temp["id"] = v.CPE_ID;
                                temp["name"] = `CPE${v.CPE_ID}`;
                                let obj = {
                                  ...screenData(nodes, temp),
                                  vendor: v.vendor,
                                  product: v.product,
                                  version: v.version,
                                  parentID: value.id
                                };
                                nodes.push(obj);
                              });
                              cceData(v.CPE_ID).then(({ data }) => {
                                data.Data.forEach(ev => {
                                  ev["name"] = ev.CCE_ID;
                                  nodes.push({
                                    ...screenData(nodes, ev),
                                    parentID: v.CPE_ID,
                                    description: ev.Description,
                                    itemStyle: { normal: { color: "#874c9c" } }
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            }
          });
        } else {
          this.$message.error("数据库请求失败");
        }
      });

      var createEcharts = () => {
        nodes.forEach(v => {
          if (v.parentID) {
            if (v.parentID.indexOf("CVE") === 0) {
              const obj = {};
              obj.source = v.parentID;
              obj.target = v.id;
              edges.push(obj);
            } else {
              const obj = {};
              obj.source = v.parentID;
              obj.target = v.id;
              edges.push(obj);
            }
          }
        });
        // var myChart = echarts.init(document.getElementById("last-echarts"));
        this.eCharts.setOption(this.eChartsData(nodes, edges));
        this.eCharts.on("click", this.makeData);
        // function chartssize (container, charts) {
        //   function getStyle(el, name) {
        //     if (window.getComputedStyle) {
        //       return window.getComputedStyle(el, null);
        //     } else {
        //       return el.currentStyle;
        //     }
        //   }
        //   var wi = getStyle(container, 'width').width;
        //   var hi = getStyle(container, 'height').height;
        //   charts.style.width = wi
        //   charts.style.height = hi
        // }

        // window.onresize = function() {
        //   chartssize(chartBox, myChartsize)
        //   myChart.resize();
        // };
      };
      function screenData(arr, node) {
        // 对数组进行查重处理, 有的情况下clone;
        if (arr.length === 0) return [];
        arr.forEach(v => {
          if (node.id === v.id) {
            if (node.id.indexOf("(") === 0 && node.name.indexOf("(") === 0) {
              let newId = node[Number(node.id.indexOf("(") + 1)];
              let newName = node[Number(node.name.indexOf("(") + 1)];
              node["id"] = `${node.id}${Number(newId + 1)}`;
              node["name"] = `${node.name}${Number(newName + 1)}`;
            } else {
              node["id"] = `${node.id}(0)`;
              node["name"] = `${node.name}(0)`;
            }
            return node;
          }
        });
        return node;
      }
      setTimeout(() => {
        createEcharts();
      }, 15000);
    },

    // 传入 所有节点的 data, 和连线逻辑link
    eChartsData(eData = [], eLinks = []) {
      var option = {
        title: {
          text: ""
        },
        tooltip: {
          // formatter: function (callback) {
          //   if (callback.data.parentID) {
          //     return `parent: ${callback.data.parentID} <br />
          //      name: ${callback.data.name} <br />
          //       Description: ${callback.data.Description.slice(0, 40)}...`
          //   } else {
          //     return `Vendors: ${callback.data.Vendors} <br />
          //     Name: ${callback.data.name} <br />
          //     Versions: ${callback.data.versions}
          //     `
          //   }
          // }
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            legendHoverLink: true, //是否启用图例 hover(悬停) 时的联动高亮。
            hoverAnimation: true, //是否开启鼠标悬停节点的显示动画
            coordinateSystem: null, //坐标系可选
            xAxisIndex: 0, //x轴坐标 有多种坐标系轴坐标选项
            yAxisIndex: 0, //y轴坐标
            force: {
              repulsion: 200, //相距距离
              edgeLength: [100, 150],
              layoutAnimation: true
            },
            roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            nodeScaleRatio: 0.6, //鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
            draggable: true, //节点是否可拖拽，只在使用力引导布局的时候有用。
            focusNodeAdjacency: true,
            symbolSize: 30,
            roam: true,
            label: {
              show: true,
              formatter: function(params) {
                // if (params.data.parentID) {
                //   if (params.data.CVE_ID) {
                //     return `CVE_ID: ${params.data.CVE_ID}`;
                //   } else if (params.data.CWE_ID) {
                //     return `CWE_ID: ${params.data.CWE_ID}`;
                //   } else if (params.data.CAPEC_ID) {
                //     return `CAPEC_ID: ${params.data.CAPEC_ID}`;
                //   } else {
                //     return params.name;
                //   }
                // } else {
                return params.name;
                // }
              }
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [8, 14],
            edgeLabel: {
              // line上的文字
              fontSize: 12
            },
            data: eData,
            links: eLinks,
            lineStyle: {
              opacity: 0.9,
              width: 1,
              curveness: 0
            },
            circleStyle: {
              width: 10
            }
          }
        ]
      };
      return option;
    },
    // 自动生成element ui table 列;
    makeData({ data = {} }) {
      let arr = {};
      for (let v in data) {
        if (v !== "description" && v !== "tId" && v !== "itemStyle") {
          if (!Array.isArray(data[v])) {
            arr[v] = data[v];
          }
        }
      }
      if (this.activeName === "first") {
        this.gridData = arr;
      } else {
        if (data.vendor) {
          this.gridData = require("./Json/vendor_detail(vendor_version).json").Data[0];
        } else {
          this.gridData = arr;
        }
      }
      this.dialogTableVisible = true;
    },
    reSetEcharts() {
      this.selectTactics = true;
    },
    closeEcharts() {
      this.echartsVisible = false;
      this.eCharts.clear();
    }
  },
  computed: {
    vendorsNoMore() {
      return this.count >= 10000;
    },
    disabled() {
      return this.vendorsLoading || this.vendorsNoMore;
    }
  },
  watch: {
    searchData(value) {
      this.vendorSearchPage = 1;
    }
  }
};
</script>

<style lang="less">
.big-box {
  min-width: 1410px;
}
.line-style {
  // 厂商
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  max-height: 200px;
  overflow-y: auto;
  .cwe-style {
    height: 200px;
    overflow: hidden;
  }
}
.letter-style {
  position: relative;
  height: 30px;
  width: 90%;
}
.letter-style > li {
  float: left;
  height: 30px;
  padding: 0 10px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.letter-line {
  border: 1px solid #ccc;
  color: #1890ff;
}
.vendor-search {
  height: 30px;
  width: 40%;
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
  border-left: 1px solid #ccc;
  border-radius: 0px !important;
}
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  max-width: 1300px;
  min-width: 1300px;
  height: 666px;
  border: 1px solid #000;
  border-radius: 3px;
  box-shadow: 5px 5px 5px #888888;
  padding: 10px;
  background-color: #fff;
  overflow: hidden;
}
header {
  height: 30px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  width: 100%;
  line-height: 30px;
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
.loadP {
  text-align: center;
  color: #000;
  font-weight: 700;
}
.tabStyle {
  padding: 10px;
}
.configuration-ul {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
}

.configuration-ul > li {
  display: flex;
  width: 100%;
  box-sizing: border-box;
}
.configuration-ul > li div {
  border: 1px solid #000;
  font-weight: 700;
}
.configuration-ul > li div:nth-child(1) {
  width: 25%;
  padding: 10px;
  text-align: center;
  background-color: #fdc72a;
}
.configuration-ul > li div:nth-child(2) {
  width: 75%;
  padding: 10px;
  background-color: #31c9e8;
}
.cweList {
  max-height: 400px;
  overflow: auto;
}
.d3-box {
  position: relative;
  padding: 10px;
  min-width: 1324px;
  width: 100%;
  min-height: 640px;
  border: 1px solid #aaa;
}
</style>
