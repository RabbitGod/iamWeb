
<template>
    <div class="login" @keydown.enter="handleSubmit"  id="particles">
        <div class="bg" >
            
        </div>
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    <b>统一认证中心</b>
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input :maxlength="100" :readonly="slidShow" v-model="form.userName" placeholder="请输入用户名" icon="md-person"/>
                        </FormItem>
                        <FormItem prop="password">
                            <Input :maxlength="100" :readonly="slidShow" type="password" v-model="form.password" placeholder="请输入密码" icon="md-lock"/>
                        </FormItem>
                        <FormItem>
                            <slide-verify 
                            style="padding-bottom:10px;"
                            v-if="slidShow"
                            :l="42"
                            :r="10"
                            :w="310"
                            :h="155"
                            slider-text="向右滑动"
                            :imgs="imgs"
                            @success="onSuccess"
                            @fail="onFail"
                            @refresh="onRefresh"
                            ></slide-verify>
                            <Button :disabled="slidShow" :loading="loading" @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                        <FormItem>
                            <a > 忘记密码</a>
                        </FormItem>
                    </Form>

                </div>
            </Card>
        </div>
    </div>
</template>

<script>



import Cookies from 'js-cookie';
import crypto from'@/common/crypto'
//import particles from 'particles.js'

import img01 from '@/assets/slideVerify/01.jpg';
import img02 from '@/assets/slideVerify/02.jpg';
import img03 from '@/assets/slideVerify/03.jpg';
import img04 from '@/assets/slideVerify/04.jpg';
import img05 from '@/assets/slideVerify/05.jpg';
import img06 from '@/assets/slideVerify/06.jpg';
import img07 from '@/assets/slideVerify/07.jpg';

console.log(crypto)
export default {
    data () {
        return {
            loading:false,
            sysName:'',
            sysLogo:'',
            sysVersion:'',
            msg:'',
            slidShow:false,
            imgs: [
                  img01,
                  img02,
                  img03,
                  img04,
                  img05,
                  img06,
                  img07,
                ],
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    created(){
        
    },
    methods: {
        onSuccess(){
            this.login ();
        },
        onFail(){
            this.msg = ''
        },
        onRefresh(){
            this.msg = ''
        },
        handleSubmit () {
            let _this = this;
            _this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.slidShow = true;
                }
            });
        },
        login () {
            
            let _this = this;
            let params = {
                userName : _this.form.userName,
                passWord : crypto.Encrypt(_this.form.password)
            };

            
            let url = 'api/login';
            _this.loading = true;

            //TODO
                _this.loading = false;
                _this.slidShow = false;
                _this.$store.commit('userName', {
                    userName: _this.form.userName
                });
                _this.$store.commit('userId', {
                    userId: ''
                });
                _this.$store.commit('userPhoto', {
                    userPhoto: './baidu.jpg'
                });
                Cookies.set('userId',_this.form.userId );
                Cookies.set('userName',_this.form.userName );
                Cookies.set('token',_this.form.userName );
                _this.$router.push({
                    name: 'home'
                });
            return
            _this.axios.post(url,params)
            .then(function (response) {
                _this.loading = false;
                _this.slidShow = false;
                if(response.data.meta.status != 0){return}
                _this.$store.commit('userName', {
                    userName: _this.form.userName
                });
                _this.$store.commit('userId', {
                    userId: ''
                });
                _this.$store.commit('userPhoto', {
                    userPhoto: './assets/logo.png'
                });
                Cookies.set('userId',_this.form.userId );
                Cookies.set('userName',_this.form.userName );
                Cookies.set('token',_this.form.userName );
                _this.$router.push({
                    name: 'home'
                });
            }).catch(function(){
                _this.loading = false;
                _this.slidShow = false;
            })
        },
       
    },
    mounted(){
    }
};
</script>

<style lang="less">
#app{
    margin: 0;
    padding:0;
}
body{
    margin: 0;
}

.login{
    width: 100%;
    height: 100%;
    background-color: #04314e;
    position: relative;
    // 
    background-size: cover;
    &-con{
        position: absolute;
        right: 200px;
        top: 50%;
        transform: translateY(-60%);
        width: 360px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}
.login .bg{
  width: 50%;
  height: 100%;
  background: url(../../assets/bg.jpg) no-repeat center center;
}
</style>
