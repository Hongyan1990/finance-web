<template>
  <div class="login-bg">
    <h1>家庭财务管理系统</h1>
    <form class="login" @submit="login">
      <h2 style="text-align: center;">
        <span>登&nbsp;&nbsp;录</span>
        <span class="error-msg" v-show="errMsg">{{errMsg}}</span>
      </h2>
      <input type="text" class="login-input" v-model="username" placeholder="用户名">
      <input type="password" class="login-input" v-model="password" placeholder="密码" autocomplete="new-password">
      <el-button type="success" round native-type="submit" size="small" style="width: 30%; margin: 20px auto;">{{state==="0"?'登 录':'注 册'}}</el-button>
      <el-link type="warning" @click="register">{{state==="0"?'注 册':'登 录'}}</el-link>
    </form>

  </div>
</template>

<script>
import cookie from '../util/cookie.js'
import {login, register} from "../model/client-model.js";
export default {
  name: 'Login',
  metaInfo: {
    title: 'Login vue'
  },
  data () {
    return {
      errMsg: '',
      username: '',
      password: '',
      state: '0'
    }
  },
  methods: {
    async login (e) {
    	e.preventDefault()
    	if(this.validteForm() && this.state === "0") {
        const res = await login({uname: this.username, upwd: this.password});
        console.log(res)
        if (res.state === '1') {
          this.errMsg = '用户不存在'
        }
        if (res.state === '2') {
          this.errMsg = '密码不正确'
        }
        if(res.state === '0') {
          this.errMsg = ''
          cookie.setCookie('username', this.username, 1)
          cookie.setCookie('uid', res.uid, 1)
          cookie.setCookie('auth', res.auth, 1)
          this.$router.push('/main')
        }
			  
    	} else if(this.validteForm() && this.state === "1") {
        const res = await register({uname: this.username, upwd: this.password});
        cookie.setCookie('username', this.username, 1)
        cookie.setCookie('uid', res.id, 1)
        cookie.setCookie('auth', res.auth, 1)
        this.$router.push('/main')
      }
    },
    register() {
      this.state =this.state === "1" ? "0" : "1";
    },
    validteForm () {
      if (!this.username) {
        this.errMsg = '用户名不能为空'
        return false
      }
      if (!this.password) {
        this.errMsg = '密码不能为空'
        return false
      }
      return true;
    }
  }
}
</script>

<style scoped>
.login {
  width: 400px;
  height: 250px;
  background-color: rgba(204, 204, 204, 0.7);
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}
  .login h2 {
    font-weight: normal;
    padding: 10px;
    margin: 0px;
  }
  .login h2 {
    color: #fff;
  }
  .login-input {
    margin: 10px auto;
    line-height: 30px;
    padding-left: 10px;
    width: 90%;
    border-radius: 2px;
    border: none;
  }
  .login-btn {
    width: 30%;
    line-height: 30px;
    margin: 20px auto;
    background-color: #5e99d5e8;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  .error-msg {
    font-size: 16px;
    color: red;
  }
  .login-bg {
    background-image: url("../static/login-bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: center;
  }
  .login-bg h1 {
    color: #fff;
    font-family: cursive;
  }
</style>
