<template>
	<div style="padding: 20px;">
		<el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="收件人">
		    <el-input v-model="form.recipient"></el-input>
		  </el-form-item>
		  <el-form-item label="地址">
		    <el-input v-model="form.address"></el-input>
		  </el-form-item>
		  <el-form-item label="电话">
		    <el-input v-model="form.phone"></el-input>
		  </el-form-item>
		  <el-form-item label="订单详情">
		    <div>
		    	<div v-for="book in carInfos">
		    		<span>《{{book.bookName}}》</span>&nbsp;&nbsp;
		    		<span> ￥{{book.price}}</span>&nbsp;&nbsp;
		    		<span> x{{book.count}}</span>
		    	</div>
		    	
		    </div>
		  </el-form-item>
		  <el-form-item label="总金额">
		    <span>￥{{total}}</span>
		  </el-form-item>
		</el-form>
		<div style="text-align: right;"><el-button>取消支付</el-button><el-button type="primary" @click="saveOrder">支付订单</el-button></div>
	</div>
</template>

<script>
	import cookie from '../util/cookie.js'
  import {queryCarBooks, saveOrder, updateBatch} from "../model/client-model.js";
	export default {
		name: "order",
		data () {
			return {
				form: {
					recipient: "",
					address: "",
					phone: ""
				},
				carInfos: [],
				userId: null,
				carId: null
			}
		},
		computed: {
			total () {
				let total = 0;
				this.carInfos.forEach(i => {
					total += i.count * i.price;
				})
				return total;
			}
		},
		mounted() {
      this.userId = cookie.getCookie("uid");
      this.carId = cookie.getCookie("cid");
      this.queryOrder()
    },
    methods: {
      async queryOrder() {
        const res = await queryCarBooks(this.carId, 1);
        this.carInfos = res;
      },
      async saveOrder() {
      	let data = {
      		"userId": this.userId,
      		"carId": this.carId,
      		"total": this.total,
      		"state": 1,
      		...this.form
      	}
      	for(let i=0; i<this.carInfos.length; i++) {
      		let v = this.carInfos[i];
      		const res = await updateBatch({batchId: v.batchId, count: v.count, state: 2});
      	}
      	const res = await saveOrder(data);
      	this.queryOrder();
      	this.$message({
          message: '订单支付成功',
          type: 'success'
        });
      }
    }
	}
</script>

<style>
	
</style>