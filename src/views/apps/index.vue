
<template> 
    <div class="cont apps" >
        <div class="content">
            <div class="cont_left " >
                <div><Input search enter-button="搜索" placeholder="搜索应用名称" /></div>
                <div class="menucont">
                    <div :class="(selNode.id == item.id)?'card active':'card'" v-for="(item,index) in apps" :style="item.status == '2'?cardStyle:{}" :title="item.status == '2'?'已停用':''" @click="handleSel(item,$event)" >
                        <div class="icon">
                            <span  class="iconfont icon-web2 icon" v-if="item.type == 'web'"></span>
                            <span  class="iconfont icon-mobile icon" v-if="item.type == 'Mobile'"></span>
                            <span  class="iconfont icon-computer icon" v-if="item.type == 'PC'"></span>
                        </div>
                        <div class="edit"><Icon type="ios-create" @click="editApp(item)" /></div>
                        <div class="stop" v-if="item.status == '1'" @click="switchIt(item)"><Icon type="md-pause" /></div>
                        <div class="start" v-if="item.status == '2'" @click="switchIt(item)"><Icon type="md-play" /></div>
                        <div class="img"></div>
                        <div class="content">
                            <div class="name">{{item.name}}</div>
                            <div class="text">{{item.introduce}}</div>
                        </div>
                    </div>
                </div>
                <div class="page">
                    <div class="previous">上一页</div>
                    <div class="next">下一页</div>
                </div>
                <div class="add" @click="addApp">添加应用</div>
            </div>
            <div class="cont_right"  v-if="selNode.name">
                <div class="info">
                    <div class="title">基本信息</div>
                    <div class="detailTable">
                        <div class="tableRow">
                            <div class="tit">名称</div>
                            <div class="contBox">{{selNode.name}}</div>
                        </div>
                        <div class="tableRow">
                            <div  class="tit">ID</div>
                            <div class="contBox">{{selNode.id}}</div>
                        </div>
                        <div class="tableRow">
                            <div  class="tit">协议</div>
                            <div class="contBox">{{selNode.agreement}}</div>
                        </div>
                        <div class="tableRow">
                            <div  class="tit">类型</div>
                            <div class="contBox">{{selNode.type}}</div>
                        </div>
                        <div class="tableRow" v-if="selNode.agreement == 'OIDC'">
                            <div  class="tit">模式</div>
                            <div class="contBox">{{selNode.pattern}}</div>
                        </div>
                        <div class="tableRow">
                            <div  class="tit">跳转URL</div>
                            <div class="contBox">{{selNode.url}}</div>
                        </div>
                        <div class="tableRow" v-if="selNode.agreement != 'Cookie' && selNode.agreement != 'session'">
                            <div  class="tit">Token周期</div>
                            <div class="contBox">{{selNode.token}}</div>
                        </div>
                        <div class="tableRow" v-if="selNode.agreement == 'Cookie' || selNode.agreement == 'session'">
                            <div  class="tit">Session周期</div>
                            <div class="contBox">{{selNode.session}}</div>
                        </div>
                        <div class="tableRow" v-if="selNode.agreement == 'OIDC'">
                            <div class="tit">刷新周期</div>
                            <div class="contBox">{{selNode.refresh}}</div>
                        </div>
                        <div class="tableRow">
                            <div class="tit">域名</div>
                            <div class="contBox">{{selNode.domain}}</div>
                        </div>
                        <div class="tableRow">
                            <div class="tit">IPS</div>
                            <div class="contBox">{{selNode.ips}}</div>
                        </div>
                        <div class="tableRow">
                            <div class="tit">运维电话</div>
                            <div class="contBox">{{selNode.OPTelephone}}</div>
                        </div>
                        <div class="tableRow">
                            <div class="tit">系统简介</div>
                            <div class="contBox">{{selNode.introduce}}</div>
                        </div>
                        <div class="bigRow">
                            <div  class="tit">图标</div>
                            <div  class="cont1">
                                <div class="img">
                                    <img src="../../assets/logo.png"/>
                                </div>
                                <!-- <div class="ud">
                                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                                        <Button type="primary">上传图标</Button>
                                    </Upload>
                                    <p>图片不大于1MB</p>
                                </div> -->
                            </div>
                            <div class="cont2"  >
                                <div class="row2">
                                    <div class="tit">secret</div>
                                    <div class="contBox">{{selNode.secret}}</div>
                                </div>
                                <div class="row2">
                                    <div class="tit">有效期</div>
                                    <div class="contBox">{{selNode.validity.join('——')}}</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                <div class="empower">
                    <div class="title">授权信息</div>
                    <Tabs value="name1">
                        <TabPane label="按组织" name="name1">
                            <div class="screen">
                                <Input search enter-button="搜索" @on-search="searchOrg" style="width:400px" placeholder="搜索组织名称" />
                            </div>
                            <Tree :data="orgData" show-checkbox @on-check-change="orgCheck"></Tree>
                        </TabPane>
                        <TabPane label="按组" name="name2">
                            <div class="screen">
                                <Input search enter-button="搜索" @on-search="searchGroup" style="width:400px" placeholder="搜索组名称" />
                            </div>
                            <Tree :data="btnData" show-checkbox @on-check-change="btnCheck"></Tree>
                        </TabPane>
                        <TabPane label="按角色" name="name3">
                            <div class="screen">
                                <Input search enter-button="搜索" @on-search="searchRole" style="width:400px" placeholder="搜索角色名称" />
                                <CheckboxGroup v-model="roleCheckAllGroup" @on-change="roleCheckGroupChange" style="padding-left:20px;line-height:32px;">
                                    <Checkbox label="已分配"></Checkbox>
                                    <Checkbox label="未分配"></Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div class="cargBox">
                                <div :class="item.isEempower?'card checked':'card disChecked'" v-for="(item,index) in roleData" :key="index">
                                    <div class="icon"><Icon type="ios-people" /></div>
                                    <div class="name">{{item.roleName}}</div>
                                    <div class="check" v-if="item.isEempower"><Icon type="md-checkmark" /></div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="按账号" name="name4">
                            <div class="screen">
                                <Input search enter-button="搜索" @on-search="searchAccount" style="width:400px" placeholder="搜索账户名称" />
                                <CheckboxGroup v-model="accountCheckAllGroup" @on-change="accountCheckGroupChange" style="padding-left:20px;line-height:32px;">
                                    <Checkbox label="已分配"></Checkbox>
                                    <Checkbox label="未分配"></Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div class="cargBox">
                                <div :class="item.isEempower?'card checked':'card disChecked'" v-for="(item,index) in accountData" :key="index">
                                    <div class="icon"><Icon type="md-person" /></div>
                                    <div class="name">{{item.accountName}}</div>
                                    <div class="check" v-if="item.isEempower"><Icon type="md-checkmark" /></div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <div class="cont_right" v-else>
                <div class="detail">
                    <div class="tips">
                        <Icon type="ios-bulb-outline" size="45" style="vertical-align: middle;" />
                        请选择左侧应用系统卡片，进行应用详细查看与配置。
                    </div>
                </div>
            </div>
        </div>

        <Drawer title="应用信息" :closable="false" width="400" v-model="drawer" class="appsDrawer">
            <div class="formBox">
                <Form :model="formData" label-position="right" :label-width="100" v-if="drawer">
                    <FormItem label="协议">
                        <Select v-model="formData.agreement">
                            <Option v-for="item in agreementList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="名称">
                        <Input v-model="formData.name" placeholder="请输入应用名称"></Input>
                    </FormItem>
                    <FormItem label="图标">
                        <div class="iconCont">
                            <div class="img">
                                <img v-if="formData.icon" src="../../assets/logo.png"/>
                            </div>
                            <div class="ud">
                                <Upload action="//jsonplaceholder.typicode.com/posts/">
                                    <Button type="primary" size="small">上传图标</Button>
                                </Upload>
                                <p>图片不大于1MB</p>
                            </div>
                        </div>
                    </FormItem>
                    <FormItem label="类型">
                        <RadioGroup v-model="formData.type">
                            <Radio label="web"></Radio>
                            <Radio label="PC"></Radio>
                            <Radio label="Mobile"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="跳转URL">
                        <Input v-model="formData.url" placeholder="请输入跳转URL"></Input>
                    </FormItem>
                    <FormItem label="模式" v-if="formData.agreement == 'OIDC'">
                        <Select v-model="formData.pattern">
                            <Option v-for="item in patternList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="Token周期" v-if="formData.agreement != 'Cookie' && formData.agreement != 'session'">
                        <Input v-model="formData.token" placeholder="请输入应Token周期"></Input>
                    </FormItem>
                    <FormItem label="Session周期" v-if="formData.agreement == 'Cookie' || formData.agreement == 'session'">
                        <Input v-model="formData.session" placeholder="请输入Session周期"></Input>
                    </FormItem>
                    <FormItem label="刷新周期" v-if="formData.agreement == 'OIDC'">
                        <Input v-model="formData.refresh" placeholder="请输入刷新周期"></Input>
                    </FormItem>
                    <FormItem label="域名">
                        <Input v-model="formData.domain" placeholder="请输入域名"></Input>
                    </FormItem>
                    <FormItem label="IPS">
                        <Input v-model="formData.ips" placeholder="请输入IP，用英文逗号隔开"></Input>
                    </FormItem>
                    <FormItem label="运维人">
                        <Input v-model="formData.OPUser"  placeholder="请输入运维人"></Input>
                    </FormItem>
                    <FormItem label="运维电话">
                        <Input v-model="formData.OPTelephone"  placeholder="请输入运维电话"></Input>
                    </FormItem>
                    <FormItem label="有效期">
                        <RadioGroup v-model="formData.forever" @on-change="foreverChange">
                            <Radio label="永久"></Radio>
                            <Radio label="非永久"></Radio>
                        </RadioGroup>
                        <DatePicker v-if="formData.forever == '非永久'" v-model="formData.validity" type="daterange" :start-date="new Date(2020, 4, 14)" placement="bottom-end" placeholder="选择日期" style="width: 360px"></DatePicker>
                    </FormItem>
                    <FormItem label="系统简介">
                        <Input v-model="formData.introduce"></Input>
                    </FormItem>
                </Form>
            </div>
            
            <div class="app-drawer-footer">
                <Button style="margin-right: 8px" @click="cancel">取消</Button>
                <Button type="primary" v-if="opr == 'add'" @click="submitAdd">提交</Button>
                <Button type="primary" v-if="opr == 'edit'" @click="submitEdit">提交</Button>
            </div>
        </Drawer>

    </div>
</template>

<script>

import Cookies from 'js-cookie';

export default {
    data () {
        return {
            drawer:false,
            opr:'add',
            selNode:{},
            roleCheckAllGroup:[],
            accountCheckAllGroup:[],
            formData:{
                agreement:'',
                name:'',
                icon:'',
                type:'',
                url:'',
                pattern:'',
                token:'',
                session:'',
                refresh:'',
                domain:'',
                ips:'',
                OPUser:'',
                OPTelephone:'',
                introduce:'',
                forever:'永久'
            },
            agreementList:[
                {
                    value:'JWT',
                    label:'JWT'
                },
                {
                    value:'CAS',
                    label:'CAS'
                },
                {
                    value:'OIDC',
                    label:'OIDC'
                },
                {
                    value:'Cookie',
                    label:'Cookie'
                },
                {
                    value:'session',
                    label:'session'
                }
            ],
            patternList:[
                {
                    value:'1',
                    label:'授权码'
                },
            ],
            apps:[
                {
                    image:'',
                    name:'物资集约化管理系统1',
                    status:'1',
                    id:'213123213213',
                    agreement:'JWT',
                    url:'www.zejia.com',
                    type:'web',
                    pattern:'授权码',
                    refresh:'',
                    domain:'www.zejia.com',
                    ips:'192.168.1.1',
                    telephone:'010-88888888',
                    introduce:'集采、合同、评价等',
                    validity:['2020-05-05','2022-08-05'],
                    OPUser:'寇向东',
                    OPTelephone:'18888888888',
                    forever:''

                },
                {
                    image:'',
                    name:'物资集约化管理系统2',
                    status:'2',
                    id:'213123213212',
                    agreement:'OIDC',
                    type:'Mobile',
                    pattern:'授权码',
                    refresh:'',
                    url:'www.zejia.com',
                    domain:'www.zejia.com',
                    ips:'192.168.1.1',
                    telephone:'010-88888888',
                    introduce:'集采、合同、评价等',
                    validity:['2020-05-05','2022-08-05'],
                    OPUser:'寇向东',
                    OPTelephone:'18888888888',
                    forever:''
                },
                {
                    image:'',
                    name:'物资集约化管理系统2',
                    status:'1',
                    id:'213123213212',
                    agreement:'Cookie',
                    type:'PC',
                    pattern:'授权码',
                    refresh:'',
                    url:'www.zejia.com',
                    domain:'www.zejia.com',
                    ips:'192.168.1.1',
                    telephone:'010-88888888',
                    introduce:'集采、合同、评价等',
                    validity:['2020-05-05','2022-08-05'],
                    OPUser:'寇向东',
                    OPTelephone:'18888888888',
                    forever:''
                }
            ],
            orgData:[
                {
                    title:'北京泽佳科益科技有限公司',
                    orgName:'北京泽佳科益科技有限公司',
                    orgId:'1',
                    isEempower:false,
                    expand: true,
                    children:[
                        {   
                            title:"成都分公司",
                            orgName:'成都分公司',
                            orgId:'2',
                            isEempower:false,
                            expand: true,
                            children:[
                                
                            ]
                        },
                        {
                            title:'西安分公司',
                            orgName:'西安分公司',
                            orgId:'3',
                            isEempower:false,
                            expand: true,
                            children:[
                                 {
                                    title:'研发部',
                                    orgName:'研发部',
                                    orgId:'31',
                                    isEempower:false,
                                    expand: true,
                                    children:[
                                        
                                    ]
                                },
                                {
                                    title:'人力资源部',
                                    orgName:'人力资源部',
                                    orgId:'32',
                                    isEempower:false,
                                    expand: true,
                                    children:[
                                        
                                    ]
                                },
                                {
                                    title:'咨询部',
                                    orgName:'咨询部',
                                    orgId:'33',
                                    isEempower:false,
                                    expand: true,
                                    children:[
                                        
                                    ]
                                }
                            ]
                        },
                        {
                            title:'销售部',
                            orgName:'销售部',
                            orgId:'4',
                            isEempower:false,
                            expand: true,
                            children:[
                                
                            ]
                        }
                    ]
                }
            ],
            btnData:[
                {
                    title:'北京泽佳科益科技有限公司',
                    orgName:'北京泽佳科益科技有限公司',
                    orgId:'1',
                    isEempower:false,
                    expand: true,
                    children:[
                        {   
                            title:"总经理秘书组",
                            orgName:'总经理秘书组',
                            orgId:'2',
                            isEempower:false,
                            expand: true,
                        },
                        {
                            title:'副总组',
                            orgName:'副总组',
                            orgId:'3',
                            isEempower:false,
                            expand: true,
                        },
                        {
                            title:'财务预算组',
                            orgName:'财务预算组',
                            orgId:'4',
                            isEempower:false,
                            expand: true,
                        },
                        {
                            title:'财务成本会计组',
                            orgName:'财务成本会计组',
                            orgId:'5',
                            isEempower:false,
                            expand: true,
                        },
                        {
                            title:'研发IAM开发组',
                            orgName:'研发IAM开发组',
                            orgId:'6',
                            isEempower:false,
                            expand: true,
                        },
                        {
                            title:'系统Console组',
                            orgName:'系统Console组',
                            orgId:'7',
                            isEempower:false,
                            expand: true,
                        }
                    ]
                }
            ],
            roleData:[
                {
                    roleName:'角色1',
                    roleId:'1',
                    isEempower:false
                },
                {
                    roleName:'角色2',
                    roleId:'2',
                    isEempower:true
                },
                {
                    roleName:'角色3',
                    roleId:'3',
                    isEempower:true
                },
                {
                    roleName:'角色4',
                    roleId:'4',
                    isEempower:true
                },
                {
                    roleName:'角色5',
                    roleId:'5',
                    isEempower:false
                },
                {
                    roleName:'角色6',
                    roleId:'6',
                    isEempower:false
                },
                {
                    roleName:'角色7',
                    roleId:'7',
                    isEempower:false
                },
                {
                    roleName:'角色8',
                    roleId:'8',
                    isEempower:false
                },
                {
                    roleName:'角色9',
                    roleId:'9',
                    isEempower:false
                },
                {
                    roleName:'角色10',
                    roleId:'10',
                    isEempower:false
                },
            ],
            accountData:[
                {
                    accountName:'寇向东',
                    accountId:'1',
                    isEempower:false
                },
                {
                    accountName:'寇向东',
                    accountId:'2',
                    isEempower:true
                },
                {
                    accountName:'寇向东',
                    accountId:'3',
                    isEempower:true
                },
                {
                    accountName:'寇向东',
                    accountId:'4',
                    isEempower:true
                },
                {
                    accountName:'寇向东',
                    accountId:'5',
                    isEempower:false
                },
                {
                    accountName:'王宝康',
                    accountId:'6',
                    isEempower:false
                },
                {
                    accountName:'王宝康',
                    accountId:'7',
                    isEempower:false
                },
                {
                    accountName:'王宝康',
                    accountId:'8',
                    isEempower:false
                },
                {
                    accountName:'王宝康',
                    accountId:'9',
                    isEempower:false
                },
                {
                    accountName:'王宝康',
                    accountId:'10',
                    isEempower:false
                },
            ]
        }
    },
    created(){
        
    },
    watch:{
       
    },
    computed:{
        cardStyle(){
            return {
                opacity: 0.5
            }
        }
    },
    methods: {
        foreverChange(a){
            console.log(a)
        },
        cancel(){
            this.drawer = false;
        },
        submitAdd(){
            this.drawer = false;
        },
        submitEdit(){
            this.drawer = false;
        },
        addApp(){
            this.formData.agreement='JWT';
            this.formData.name='';
            this.formData.icon='';
            this.formData.type='';
            this.formData.url='';
            this.formData.pattern='';
            this.formData.token='';
            this.formData.session='';
            this.formData.refresh='';
            this.formData.domain='';
            this.formData.ips='';
            this.formData.OPUser='';
            this.formData.OPTelephone='';
            this.formData.introduce='';
            this.drawer = true;
        },
        editApp(node){
            this.selNode = node;
            this.formData.agreement=this.selNode.agreement;
            this.formData.name=this.selNode.name;
            this.formData.icon=this.selNode.icon;
            this.formData.type=this.selNode.type;
            this.formData.url=this.selNode.url;
            this.formData.pattern=this.selNode.pattern;
            this.formData.token=this.selNode.token;
            this.formData.session=this.selNode.session;
            this.formData.refresh=this.selNode.refresh;
            this.formData.domain=this.selNode.domain;
            this.formData.ips=this.selNode.ips;
            this.formData.OPUser=this.selNode.OPUser;
            this.formData.OPTelephone=this.selNode.OPTelephone;
            this.formData.introduce=this.selNode.introduce;
            this.drawer = true;
        },
        searchOrg(){

        },
        searchGroup(){

        },
        searchRole(){

        },
        searchAccount(){

        },
        roleCheckGroupChange(){
            
        },
        accountCheckGroupChange(){
            
        },
        btnCheck(){

        },
        orgCheck(){

        },
        switchIt(node){
            
            node.status = node.status == '1'?'2':'1'
        },
        handleSel(node,e){
            if(e.target.className.indexOf('edit') != '-1' || e.target.className.indexOf('start') != '-1' || e.target.className.indexOf('stop') != '-1'){
                return
            };
            this.selNode = node;
        },
    },
    components:{
        
    }
};
</script>

<style lang="less" scoped>
    .cont{
        width: 100%;
        height: 100%;
        padding: 20px 20px 20px 20px;
    }
    .cont .content{
        height:100%;
    }
    .cont .cont_left{
        width: 320px;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        float: left;
        background: #fff;
        border-radius: 5px;
        position: relative;
        transition: width  .3s;
        overflow: hidden;
    }
    .cont .cont_left .menucont{
        width: 300px;
        height: calc( 100% - 110px;);
        padding: 0px;
        overflow: auto;
        box-sizing: border-box;
        float: left;
        background: #fff;
        border-radius: 5px;
        position: relative;
        padding: 10px 0;
        
    }
    .cont .cont_left .menucont .card{
        width: 100%;
        height: 100px;
        border-radius: 3px;
        border:1px solid #B4C7E7;
        display: flex;
        padding:25px 10px 15px;
        position: relative;
        margin-bottom: 15px;
        .img{
            width: 50px;
            height: 50px;
            background: #ccc;
            image{
                width: 100%;
                height:100%;
            }
        }
        .content{
            .name{
                padding: 0 10px 15px;
                font-weight: bold;
                overflow: hidden;
            }
            .text{
                padding: 0 10px;
                overflow: hidden;
            }
        }
        .icon{
            position: absolute;
            top:0px;
            left:5px;
            font-size: 16px;
            color: #B4C7E7;
        }
        .edit{
            position: absolute;
            top:-5px;
            right:5px;
            font-size: 20px;
            color: #B4C7E7;
            cursor: pointer;
        }
        .stop{
            position: absolute;
            top:-5px;
            right:25px;
            font-size: 20px;
            color: #B4C7E7;
            cursor: pointer;
        }
        .start{
            position: absolute;
            top:-5px;
            right:25px;
            font-size: 20px;
            color: #B4C7E7;
            cursor: pointer;
        }
    }
    .cont .cont_left .menucont .card:hover{
        box-shadow: 2px 2px 10px #446aa9;
        border-color: #446aa9;
    }
    .cont .cont_left .menucont .active{
        box-shadow: 2px 2px 10px #446aa9;
        border-color: #446aa9;
    }
    .cont .cont_left{
        .page{
            width: 100%;
            display: flex;
            .previous{
                width: 50%;
                text-align: center;
                cursor: pointer;
                height: 30px;
                line-height: 30px;
                border: 1px solid #B4C7E7;
            }
            .next{
                width: 50%;
                text-align: center;
                cursor: pointer;
                height: 30px;
                line-height: 30px;
                border: 1px solid #B4C7E7;
                border-left: 0px;
            }
        }
        .add{
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #2d8cf0;
            color:#fff;
            cursor: pointer;
        }
    }
    .cont .cont_right{
        width: calc(100% - 340px);
        min-width: 900px;
        height: 100%;
        overflow-y: auto;
        float: left;
        margin-left:20px ;
        border-radius: 5px;
        transition: width  .3s;
        .detail{
            width: 100%;
            height: 100%;
            padding: 10px;
            background: #fff;
            .tips{
                padding-top:20%;
                height: 80px;
                line-height: 80px;
                text-align: center;
                font-size: 16px;
                color: #b0bcd2;
            }
        }
        .info{
            width: 100%;
            height: 320px;
            padding: 10px;
            background: #fff;
            .title{
                font-weight: bold;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #D6DCE5;
            }
        }
        .empower{
            width: 100%;
            min-height: calc(100% - 340px);
            margin-top:20px;
            padding: 10px;
            background: #fff;
            .title{
                font-weight: bold;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #D6DCE5;
            }
        }
    }
    .cont .cont_right .screen{
        padding: 0 10px 10px 10px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .cont .cont_right .cargBox{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .card{
            width: calc(20% - 20px);
            min-width: 200px;
            height: 62px;
            border-radius: 3px;
            margin: 10px ;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            .icon{
                width:60px;
                height:60px;
                line-height: 60px;
                text-align: center;
                font-size: 36px;
            }
            .name{
                width:calc(100% - 100px);
                height:60px;
                line-height: 60px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow:ellipsis;
            }
            .check{
                width:40px;
                height:60px;
                line-height: 60px;
                text-align: center;
                font-size: 30px;
            }
        }
        .checked{
            border:1px solid #1890FF;
            .icon{
                color: #1890FF;
            }
            .name{
                
            }
            .check{
                color: #1890FF;
            }
        }
        .disChecked{
            border:1px solid #ADB9CA;
            .icon{
                color:#DAE3F3;
            }
            .name{
                
            }
            .check{
                display: none;
            }
        }
    }
    .detailTable{
        padding-top:5px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .detailTable .tableRow{
        width: 33.33%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .tit{
            height:32px;
            line-height: 22px;
            font-weight: bold;
            width: 120px;
            padding: 5px 10px;
            text-align: right;
        }
        .contBox{
            width: calc(100% - 120px);
            height:32px;
            line-height: 22px;
            border:1px solid #dcdee2;
            box-sizing: border-box;
            padding: 5px 10px;
            overflow: hidden;
        }
    }
    
    .detailTable .tableRow{
        padding: 5px;
    }

    .bigRow{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .tit{
            width: 100px;
            text-align: right;
            height:60px;
            line-height: 40px;
            padding: 10px;
            font-weight: bold;
        }
        .cont1{
            width: calc( 33.33% - 100px );
            padding: 5px;
            display: flex;
            .ud{
                padding: 0 0 20px 20px;
            }
            .img{
                width: 80px;
                height:80px;
                border: 1px solid #ccc;
                overflow: hidden;
                border-radius: 5px;
                img{
                    width: 100%;
                }
            }
        }
        .cont2{
            width: calc( 66.66% - 100px );
            width:66.66%;
            padding: 5px;
            .row2{
                width: 100%;
                padding-bottom: 20px;
                display: flex;
                flex-wrap: wrap;
                align-content: flex-start;
                .tit{
                    height:32px;
                    line-height: 22px;
                    font-weight: bold;
                    width: 100px;
                    padding: 5px 10px;
                    text-align: right;
                }
                .contBox{
                    width: calc(100% - 100px);
                    height:32px;
                    line-height: 22px;
                    border:1px solid #dcdee2;
                    box-sizing: border-box;
                    padding: 5px 10px;
                    overflow: hidden;
                }
            }
        }
    }
    .iconCont{
        width: 100%;
        padding: 10px;
        display: flex;
        .ud{
            padding: 0 0 20px 20px;
        }
        .img{
            width: 80px;
            height:80px;
            border: 1px solid #ccc;
            overflow: hidden;
            border-radius: 5px;
            img{
                width: 100%;
            }
        }
    }
    .formBox{
        padding: 20px;
        height: calc(100% - 40px);
        overflow-y: auto;
    }
</style>
<style>
.appsDrawer .ivu-drawer-body{
        padding: 0;
    }
.app-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>