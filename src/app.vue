<template>
	<div class="my-box">
		<div class="content" :style="{height: localHeight + 'px'}">
			<order-header></order-header>
			<!-- <div class="main" :style="{height: localHeight - 90 + 'px'}">
				
			</div> -->
			<el-container class="main"  :style="{height: localHeight - 90 + 'px'}">
		    <el-aside width="200px">
		    	<el-menu
			      default-active="1"
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose">
			      <el-menu-item index="1">
			        <i class="el-icon-menu"></i>
			        <span slot="title">主页</span>
			      </el-menu-item>
			      <el-menu-item index="2" >
			        <i class="el-icon-document"></i>
			        <span slot="title">收入/支出</span>
			      </el-menu-item>
			      <el-menu-item index="3">
			        <i class="el-icon-setting"></i>
			        <span slot="title">统计</span>
			      </el-menu-item>
			      <el-menu-item index="4">
			        <i class="el-icon-setting"></i>
			        <span slot="title">家庭管理</span>
			      </el-menu-item>
			    </el-menu>
		    </el-aside>
		    <el-main>
		    	<router-view></router-view>
		    </el-main>
		  </el-container>
		</div>	
	</div>
</template>

<script>
	import cookie from './util/cookie.js'
	import OrderHeader from './views/OrderHeader.vue'
	export default {
		name: 'app',
		components: {
			OrderHeader
		},
		data () {
			return {
				activeIndex2: "1",
				userName: "",
				auth: ""
			}
		},
		computed: {
			showHeader () {
				return cookie.getCookie('username')
			},
			localHeight () {
				return window.innerHeight;
			},
			count () {
				return this.$store.state.count;
			}
		},
		mounted () {
			console.log(this.$route.path)
			this.auth =cookie.getCookie("auth") 
		},
		watch: {
      $route() {
        let path = this.$route.path.replace(/\//g, "");
        this.userName = cookie.getCookie('username');
        this.auth =cookie.getCookie("auth") 
        if(path) {
        	switch(path) {
        		case "main":
        			this.activeIndex2 = "1";
        			break;
        		case "car":
        			this.activeIndex2 = "2";
        			break;
        		case "order":
        			this.activeIndex2 = "3";
        			break;
        		case "myOrder":
        			this.activeIndex2 = "6";
        			break;
        		case "manager":
        			this.activeIndex2 = "4";
        			break;
        		case "login":
        			this.activeIndex2 = "5";
        			break;
        		default:
        			this.activeIndex2 = "1";
        	}
        }
      },
    },
    methods: {
    	handleSelect() {},
    	loginOut () {
        cookie.delCookie('username')
        cookie.delCookie('uid')
        this.$router.replace('/login')
      }
    }
	}
</script>

<style >
	.content {
		background: #f2f6fc;
	}
	.main {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    margin-top: 20px;
    overflow: auto;
    background-color: #fff;
	}
	.el-menu-demo {
		width: 80%;
		margin: 0 auto;
	}
	.item .el-badge__content{
		top: 15px;
	}
	.el-menu-vertical-demo {
		height: 100%;
	}
</style>