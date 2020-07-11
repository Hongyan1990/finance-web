<template>
    <header>
        <!--<h1 :class="$style.myTitle">积分商城</h1>-->
      <div class="my-header">
        <div class="logo" style="color: #555"><span class="logo-icon"></span>数据统计</div>
        <div class="user-info"><span class="login-out" @click="loginOut">退出</span></div>
      </div>
    </header>
</template>

<script>
  import cookie from '../util/cookie.js'

  export default {
    name: 'order-header',
    data() {
      return {
        
      }
    },
    computed: {
      userName() {
        return cookie.getCookie('username')
      }
    },
    methods: {
      loginOut () {
        cookie.delCookie('username')
        this.$router.replace('/login')
      }
    }
  }
</script>

<style  scoped>
  .logo-icon {
    width: 40px;
    height: 40px;
    display: inline-block;
    background: url("../static/re.png") center no-repeat;
    background-size: contain;
  }
  .my-header {
    padding: 0 5px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #555;
    font-weight: 777;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2), 0px 3px 10px 0px rgba(0, 0, 0, 0.19);
  }
  .logo {
    align-items: center;
    display: flex;
    font-family: fantasy;
  }
  .login-out {
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
    font-weight: 777;
  }
</style>
