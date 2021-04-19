<template>
  <div style="padding: 10px;">
<!--    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>-->
    <div style="margin: 20px 10px;box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2), 0px 3px 10px 0px rgba(0, 0, 0, 0.19);">
      <el-table
          :data="recommendData"
          v-loading="loading"
          max-height="500px"
          stripe
          style="width: 100%">
        <template slot="empty">
          <p style="margin: 0; line-height: 30px">暂无数据</p>
        </template>
        <el-table-column
            label="日期">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="浏览次数（PV）">
          <template slot-scope="scope">
            <span>{{scope.row.pv}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="独立访客（UV）">
          <template slot-scope="scope">
            <span>{{scope.row.uv}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="IP">
          <template slot-scope="scope">
            <span>{{scope.row.ip}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="新独立访客">
          <template slot-scope="scope">
            <span>{{scope.row.new_uv}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="访问次数">
          <template slot-scope="scope">
            <span>{{scope.row.count}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;justify-content: space-around;">
      <div style="width: 48%; margin-top: 20px;box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2), 0px 3px 10px 0px rgba(0, 0, 0, 0.19);">
        <ve-histogram :data="chartData1" :settings="chartSettings"></ve-histogram>
      </div>
      <div style="width: 48%;  margin-top: 20px;box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2), 0px 3px 10px 0px rgba(0, 0, 0, 0.19);">
        <ve-pie :data="chartData2" :settings="chartSettings1"></ve-pie>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chart",
    data () {
      this.chartSettings = {
        labelMap: {
          'PV': '日平均pv量'
        },
        itemStyle: {
          color: "#ffa2a2"
        }
      }
      this.chartSettings1 = {
        labelMap: {
          'type': '类别',
          'count': '访问用户'
        }
      }
      return {
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
        chartData2: {
          columns: ['type', 'count'],
          rows: [
            { "type": "搜索引擎", "count": 501 },
            { "type": "视频广告", "count": 300 },
            { "type": "联盟广告", "count": 290 },
            { "type": "邮件营销", "count": 480 },
            { "type": "直接访问", "count": 479 }
          ]
        },
        loading: false,
        recommendData: [
          {"date": "1001", "pv": "4702", "uv": "3096", "ip": "2880", "new_uv": "2506", "count": "3773"},
          {"date": "1002", "pv": "7528", "uv": "4860", "ip": "4435", "new_uv": "4209", "count": "5975"},
          {"date": "1003", "pv": "7286", "uv": "4741", "ip": "4409", "new_uv": "4026", "count": "5817"}
        ],
      }
    }
  }
</script>

<style scoped>

</style>