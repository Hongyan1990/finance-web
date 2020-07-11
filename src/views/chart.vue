<template>
  <div style="padding: 10px;">
<!--    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>-->
    <div style="margin: 0 10px;box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2), 0px 3px 10px 0px rgba(0, 0, 0, 0.19);">
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
            { "date": "06-29", "PV": 680},
            { "date": "06-30", "PV": 367},
            { "date": "07-01", "PV": 822},
            { "date": "07-02", "PV": 604},
            { "date": "07-03", "PV": 847},
            { "date": "07-04", "PV": 570},
            { "date": "07-05", "PV": 1050}
          ]
        },
        chartData2: {
          columns: ['type', 'count'],
          rows: [
            { "type": "搜索引擎", "count": 501 },
            { "type": "视频广告", "count": 420 },
            { "type": "联盟广告", "count": 281 },
            { "type": "邮件营销", "count": 711 },
            { "type": "直接访问", "count": 312 }
          ]
        },
        loading: false,
        recommendData: [
          {"date": "2020-06-29", "pv": "680", "uv": "110", "ip": "521", "new_uv": "480", "count": "409"},
          {"date": "2020-06-30", "pv": "367", "uv": "390", "ip": "769", "new_uv": "588", "count": "301"},
          {"date": "2020-07-01", "pv": "822", "uv": "266", "ip": "441", "new_uv": "860", "count": "570"}
        ],
      }
    }
  }
</script>

<style scoped>

</style>