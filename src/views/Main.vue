<template>
	<div style="padding: 10px;">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-form-item label="统计方式">
        <el-select v-model="form.type" placeholder="请选择统计方式" @change="changeType">
          <el-option label="收入统计" value="0"></el-option>
          <el-option label="支出统计" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支出方式" v-if="form.type==='1'">
        <el-select v-model="form.payType" placeholder="请选择支出方式">
          <el-option label="微信" value="0"></el-option>
          <el-option label="支付宝" value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="display: flex;justify-content: space-around;">
      <div style="width: 80%; margin-top: 20px;box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2), 0px 3px 10px 0px rgba(0, 0, 0, 0.19);">
        <ve-line :data="chartData1" :settings="chartSettings"></ve-line>
      </div>
    </div>
	</div>
</template>

<script>
  import cookie from '../util/cookie.js'
  import {getBooks, getBookTypes, queryCarId, addBookToCar, queryCarBooks} from "../model/client-model.js";
  import imgUrl from "../static/no-data2.png"
	export default {
		name: "myMain",
    data() {
      this.chartSettings = {
        labelMap: {
          'PV': '日平均pv量'
        },
        itemStyle: {
          color: "#ffa2a2"
        }
      }
      return {
        imgUrl,
        carId: null,
        form: {
          type: "0",
          payType: "0"
        },
        chartData1: {
          columns: ['date', 'PV'],
          rows: [
            { "date": "2013-09-18", "PV": 12},
            { "date": "2013-09-19", "PV": 12.2},
            { "date": "2013-09-20", "PV": 12.5},
            { "date": "2013-09-21", "PV": 14},
            { "date": "2013-09-22", "PV": 7},
            { "date": "2013-09-23", "PV": 7.5},
            { "date": "2013-09-24", "PV": 12.3}
          ]
        },
      }
    },
    mounted() {
    },
    computed: {
      auth () {
        return cookie.getCookie("auth")
      }
    },
    methods: {
      changeType() {

      }
    }
	}
</script>

<style scoped>

</style>