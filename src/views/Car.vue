<template>
	<div style="padding: 10px;">
		<el-row :gutter="20"   v-for="(item, index) in carInfo" :key="item.batchId">
			<el-col :span="24" >
				<el-card  shadow="always">
					<div class="car-item">
						<el-checkbox v-model="item.checked"></el-checkbox>
						<div>
			      	<el-image
					      style="width: 100px; height: 100px"
					      :src="'http://localhost:8080/pic/'+item.img"
					      fit="fill"></el-image>
			      </div>
			      <div style="width: 200px; max-width: 200px;">
			      	<p class="intr">《{{item.bookName}}》</p>
			      	<p class="intr">{{item.introduction}}</p>
			      </div>
			      <div>￥{{item.price}}</div>
			      <div><el-input-number @change="handleChange(item.batchId, item.count)" style="width: 90px;" :min="1" :max="10" size="mini" v-model="item.count"></el-input-number></div>
			      <div><el-link icon="el-icon-delete" @click="removeBatch(item.batchId)">删除</el-link></div>
					</div>
		      
		    </el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4" style="text-align: right;margin-top: 20px;">
				<span>总金额：￥{{total}}</span>
			</el-col>
			<el-col :span="20" style="text-align: right;margin-top: 20px;">
				<el-button type="primary" @click="saveOrder">提交订单</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import cookie from '../util/cookie.js'
	import {queryCarBooks, removeBatch, updateBatch, saveOrder} from "../model/client-model.js";
	export default {
		name: "car",
		data () {
			return {
				checked: true,
				carInfo: [],
				carId: null,
			}
		},
		mounted() {
			this.carId = cookie.getCookie("cid");
			this.queryCarBooks(this.carId);
		},
		computed: {
			total () {
				let total = 0;
				this.carInfo.filter(v => v.checked).forEach(i => {
					total += i.count * i.price;
				})
				return total;
			}
		},
		methods: {
			async queryCarBooks(carId) {
        const res = await queryCarBooks(carId, 0);
        this.carInfo = res.map(v => ({...v, checked: false}));
        this.$store.dispatch('saveCarBookCount', res.length);
      },
      async removeBatch(batchId) {
      	const res = await removeBatch(batchId);
      	this.queryCarBooks(this.carId);
      },
      async updateBatch(data) {
      	const res = await updateBatch(data);
      	this.queryCarBooks(this.carId);
      },
      handleChange(batchId, count) {
      	let data = {batchId, count};
      	this.updateBatch(data);
      },
      async saveOrder() {
      	let uid = cookie.getCookie("uid");
      	// let data = {
      	// 	"userId": uid,
      	// 	"carId": this.carId,
      	// 	"total": this.total,
      	// 	"state": 1

      	// }
      	// const res = await saveOrder(data);
      	for(let i=0; i<this.carInfo.length; i++) {
      		let v = this.carInfo[i];
      		if(v.checked) {
      			const res = await updateBatch({batchId: v.batchId, count: v.count, state: 1});
      		}
      	}
      	this.queryCarBooks(this.carId)
      	this.$message({
          message: '已提交订单',
          type: 'success'
        });

      }
		}
	}
</script>

<style scoped>
	.car-item {
		display: flex;
    justify-content: space-between;
    align-items: center;
	}
	.intr {
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>