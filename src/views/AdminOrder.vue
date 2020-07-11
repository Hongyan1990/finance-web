<template>
	<div>
	  <el-main>
		  <el-row>
			<el-col :span="24">
				<div class="block">
					<el-avatar :size="100" :src="imgUrl"></el-avatar>
					<div class="user-info">
						<p>李四</p>
						<div class="guan-zhu">
							<p>
								<el-avatar style="background: #fff" :size="30" :src="gzUrl"></el-avatar>
								<span class="my-btn" @click="showMyAttention">我的关注</span>
							</p>
							<p>
								<el-avatar style="background: #fff" :size="30" :src="fansUrl"></el-avatar>
								<span class="my-btn" @click="showMyFans">我的粉丝</span>
							</p>
						</div>
					</div>
				</div>
			</el-col>
		  </el-row>
		  <el-row style="margin: 20px 0px;">
			<el-col :span="24" style="font-size: 14px; font-weight: 777;"><span >{{myTitle}}</span><span v-if="tab !== '0'" style="cursor: pointer;margin-left: 10px;color: #38a6d7;" @click="goBack" >返回全部</span></el-col>
		  </el-row>
		  <el-row>
			  <el-col style="text-align: center;margin-bottom: 10px;" :span="3" v-for="(o, index) in currentUser" :key="o.id" :offset="index%6 != 0 ? 1 : 0">
				  <el-card class="card">
					  <img :src="usersIcon[index%3]" class="image">
					  <div style="padding: 14px;">
						  <span>{{o.name}}</span>
						  <div class="bottom clearfix guzhu-btn">
							  <span v-if="!o.gz" @click="gzUser(o.id)">关注</span>
							  <span v-else @click="cancelUser(o.id)">取消关注</span>
						  </div>
					  </div>
					  <i v-if="o.gz" class="el-icon-success my-icon"></i>
				  </el-card>
			  </el-col>
		  </el-row>
		  <el-row style="margin-top: 20px;">
			  <el-col :span="24">
				  <el-pagination
						  layout="total, prev, pager, next"
						  :current-page="pageIndex"
						  @current-change="handleCurrentChange"
						  :total="2000">
				  </el-pagination>
			  </el-col>
		  </el-row>
	  </el-main>
	</div>
</template>
<script>
	import imgUrl from '../static/user.png'
	import gzUrl from '../static/gz.png'
	import fansUrl from '../static/fans.png'
	import url_1 from '../static/1.png'
	import url_2 from '../static/2.png'
	import url_3 from '../static/3.png'
	export default {
		name: 'adminorder',
		data () {
			return {
				imgUrl,
				gzUrl,
				fansUrl,
				usersIcon: [url_1, url_2, url_3],
				users: [
					{id: 'a01', name: '王宝强', gz: false, fans: false}, {id: 'a02', name: '周星驰', gz: false, fans: false},{id: 'a03', name: '刘德华', gz: false, fans: false},
					{id: 'a04', name: '赵本山', gz: false, fans: false},{id: 'a05', name: '巩俐', gz: false, fans: false},{id: 'a06', name: '冯巩', gz: false, fans: false},
					{id: 'a07', name: '李连杰', gz: false, fans: false},{id: 'a08', name: '周迅', gz: false, fans: false},{id: 'a09', name: '赵四', gz: false, fans: false},
					{id: 'a10', name: '刘能', gz: false, fans: true},{id: 'a11', name: '彪哥', gz: false, fans: true},{id: 'a12', name: '范伟', gz: false, fans: false},
					{id: 'a13', name: '王钢蛋', gz: false, fans: false}, {id: 'a14', name: '铁柱', gz: false, fans: true},{id: 'a15', name: '王五', gz: false, fans: true},
					{id: 'a16', name: '宋丹丹', gz: false, fans: false},{id: 'a17', name: '贾玲', gz: false, fans: false},{id: 'a18', name: '王迅', gz: false, fans: false},
					{id: 'a19', name: '沈腾', gz: false, fans: false},{id: 'a20', name: '周润发', gz: false, fans: false},{id: 'a21', name: '黄渤', gz: false, fans: false},{id: 'a22', name: '李连杰', gz: false, fans: false},{id: 'a23', name: '周迅', gz: false, fans: false},{id: 'a24', name: '赵四', gz: false, fans: false},
					{id: 'a25', name: '刘能', gz: false, fans: false},
				],
				currentUser: [],
				myTitle: '全部用户',
				pageIndex: 1,
				tab: '0'
			}
		},
		methods: {
			showMyAttention() {
				this.pageIndex = 1;
				this.tab = '1'
				this.myTitle = '我的关注'
				this.currentUser = this.users.filter(v => v.gz)
			},
			showMyFans() {
				this.pageIndex = 1;
				this.tab = '2'
				this.myTitle = '我的粉丝'
				this.currentUser = this.users.filter(v => v.fans)
			},
			goBack() {
				this.pageIndex = 1;
				this.tab = '0'
				this.myTitle = '全部用户'
				this.currentUser = this.users.slice(0, 12)
			},
			gzUser(id) {
				this.users.forEach(v => {
					if(v.id === id) {
						v.gz = true
					}
				})
			},
			cancelUser(id) {
				this.users.forEach(v => {
					if(v.id === id) {
						v.gz = false
					}
				})
				if(this.tab === '1') {
					this.currentUser = this.users.filter(v => v.gz)
				}
			},
			showAllUsers() {
				this.currentUser = this.users.slice(0, 12)
			},
			handleCurrentChange(val) {
				this.currentUser = this.users.slice((val-1)*12, (val-1)*12+12)
			}
		},
		mounted () {
			this.showAllUsers()
		}
	}
</script>
<style>
	.block {
		display: flex;
		padding: 5px;
		box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2), 0px 3px 10px 0px rgba(0, 0, 0, 0.19);
		border-radius: 5px;
	}
	.user-info {
		margin-left: 20px;
		padding: 10px 0px;
	}
	.guan-zhu {
		margin-top: 10px;
		display: flex;

	}
	.guan-zhu > p {
		display: flex;
		align-items: center;
		margin-right: 20px;
	}
	.guan-zhu > p > a {
		font-size: 14px;
		color: #555;
		margin-left: 10px;
	}
	.image {
		width: 50%;
	}
	.card {
		position: relative;
	}
	.my-icon {
		position: absolute;
		top: 5px;
		right: 5px;
		color: #67c23a;
		font-size: 20px;
	}
	.guzhu-btn {
		font-size: 12px;
		font-weight: 777;
		cursor: pointer;
	}
	.my-btn {
		font-size: 14px;
		color: #555;
		margin-left: 10px;
		cursor: pointer;
	}
</style>