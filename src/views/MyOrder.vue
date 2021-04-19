<template>
	<div>
		<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-table
          :data="props.row.books"
          style="width: 100%">
        <el-table-column
            prop="bookName"
            label="图书名">
          </el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            >
          </el-table-column>
          <el-table-column
            prop="count"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
        prop="orderId"
        label="订单id">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="日期">
        <template slot-scope="scope">
          {{scope.row.createTime|filterDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="total"
        label="金额">
      </el-table-column>
      
      <el-table-column
        prop="recipient"
        label="接收人">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.state|stateFilter}}
        </template>
      </el-table-column>
      <el-table-column
      label="操作"
      width="180"
      v-if="auth==='0'"
      align="left">
      <template slot-scope="scope">
        <el-link :disabled="scope.row.state===2" type="primary" @click="editOrder(scope.row)">发货</el-link>
      </template>
    </el-table-column>
    </el-table>
	</div>
</template>

<script>
  import moment from 'moment'
  import cookie from '../util/cookie.js'
  import {queryOrder, editOrder} from "../model/client-model.js";
	export default {
		name: "myorder",
		data () {
			return {
				tableData: [],
        userId: ""
			}
		},
    filters: {
      filterDate(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      stateFilter(state) {
        let map = {
          1: '已支付，待发货',
          2: '已发货'
        }
        return map[state]
      }
    },
    computed: {
      auth () {
        return cookie.getCookie("auth")
      }
    },
    mounted() {
      this.userId = cookie.getCookie("uid");
      if(this.auth === '1') {
        this.queryOrder()
      } else {
        this.queryAllOrder()
      }
      
    },
    methods: {
      //moment(this.topic.publishTime).format('YYYY-MM-DD HH:mm:ss')
      async queryOrder() {
        const res1 = await queryOrder(this.userId, 1);
        const res2 = await queryOrder(this.userId, 2);
        this.tableData = res1.data.list.concat(res2.data.list);
      },
      async queryAllOrder() {
        const res1 = await queryOrder();
        this.tableData = res1.data.list;
      },
      async editOrder(row) {
        let data = {
          orderId: row.orderId,
          state: 2
        }
        const res = await editOrder(data);
        if(this.auth === '1') {
          this.queryOrder()
        } else {
          this.queryAllOrder()
        }
        this.$message({
          message: '修改订单成功',
          type: 'success'
        });
      }
    }
	}
</script>

<style scoped>
	
</style>