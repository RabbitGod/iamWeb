
<template> 
    <div class="cont" >
        <div class="left org">
            <Tree :data="orgTreeData" :render="renderContent" @on-select-change="selectChange"></Tree>
        </div>
        <div class="right">
            <Row style="border-bottom:1px solid #ccc;padding:20px;" v-if="JSON.stringify(selNode) != '{}' && selNode.type != 'page'">
                <i-col span="24">
                    <Button icon="md-add-circle" @click="orgDrawer = true" type="primary" v-if="selNode.type == 'org'">新建组织机构</Button>  
                    <Button icon="md-person-add" @click="userDrawer = true" type="primary" style="margin-left:20px;" v-if="selNode.type == 'org'">添加人员</Button>
                    <Button icon="md-checkmark-circle" @click="selNode.data.st = 1" type="success" v-if="selNode.type == 'user' && selNode.data.st ==0">启用</Button>
                    <Button icon="md-close-circle" @click="selNode.data.st = 0" type="primary" v-if="selNode.type == 'user' && selNode.data.st ==1">停用</Button>
                    <Button icon="md-create" @click="editOrg" type="primary" style="margin-left:20px;" v-if="selNode.type == 'org'">编辑</Button>
                    <Button icon="md-create" @click="editUser" type="primary" style="margin-left:20px;" v-if="selNode.type == 'user'">编辑</Button>
                </i-col>
            </Row>
            <div class="orgCont" v-if="selNode.type == 'org'">
                <Row class="tableRow"v-if="selNode.data">
                    <i-col span="3">组织机构名称</i-col>
                    <i-col span="5">{{selNode.title}}</i-col>
                    <i-col span="3">组织单元</i-col>
                    <i-col span="5">{{selNode.data.ou}}</i-col>
                    <i-col span="3">所在地</i-col>
                    <i-col span="5">{{selNode.data.i}}</i-col>
                </Row>
                <Row class="tableRow" v-if="selNode.data">
                    <i-col span="3">传真</i-col>
                    <i-col span="5">{{selNode.data.facsimileTelephoneNumber}}</i-col>
                    <i-col span="3">电话</i-col>
                    <i-col span="5">{{selNode.data.telephoneNumber}}</i-col>
                    <i-col span="3">邮箱</i-col>
                    <i-col span="5">{{selNode.data.mail}}</i-col>
                </Row>
                <Row class="tableRow" v-if="selNode.data">
                    <i-col span="3">描述</i-col>
                    <i-col span="21">{{selNode.data.description}}</i-col>
                </Row>
            </div>
            <div class="orgCont" v-if="selNode.type == 'user'">
                <Row class="tableRow"v-if="selNode.data">
                    <i-col span="3">用户名</i-col>
                    <i-col span="5">{{selNode.title}}</i-col>
                    <i-col span="3">员工编号</i-col>
                    <i-col span="5">{{selNode.data.employeeNumber}}</i-col>
                    <i-col span="3">员工类型</i-col>
                    <i-col span="5">{{selNode.data.employeeType}}</i-col>
                </Row>
                <Row class="tableRow" v-if="selNode.data">
                    <i-col span="3">街道地址</i-col>
                    <i-col span="5">{{selNode.data.street}}</i-col>
                    <i-col span="3">电话</i-col>
                    <i-col span="5">{{selNode.data.telephoneNumber}}</i-col>
                    <i-col span="3">邮箱</i-col>
                    <i-col span="5">{{selNode.data.mail}}</i-col>
                </Row>
                <Row class="tableRow" v-if="selNode.data">
                    <i-col span="3">状态</i-col>
                    <i-col span="5">{{selNode.data.st == 1?'启用':'停用'}}</i-col>
                    <i-col span="3">全局ID</i-col>
                    <i-col span="5">{{selNode.data.entryUUID}}</i-col>
                    <i-col span="3">唯一标识</i-col>
                    <i-col span="5">{{selNode.data.entryDN}}</i-col>
                </Row>
                <Row class="tableRow" v-if="selNode.data">
                    <i-col span="3">邮政地址</i-col>
                    <i-col span="5">{{selNode.data.postalAddress}}</i-col>
                    <i-col span="3">邮政编码</i-col>
                    <i-col span="5">{{selNode.data.postalCode}}</i-col>
                    <i-col span="3">住宅电话</i-col>
                    <i-col span="5">{{selNode.data.mail}}</i-col>
                </Row>
                <Row class="tableRow" v-if="selNode.data">
                    <i-col span="3">描述</i-col>
                    <i-col span="21">{{selNode.data.description}}</i-col>
                </Row>
            </div>
            <div v-if="selNode.type == 'page'" style="padding:20px;">
                {{selNode.title}}条数据
            </div>
            <Drawer
                title="组织机构"
                v-model="orgDrawer"
                width="400"
                :closable="false"
                :mask-closable="false"
                :styles="styles"
            >
                
                 <Form ref="orgForm" :model="orgData" :rules="ruleValidate" :label-width="80" v-if="orgDrawer" >
                    <!-- <FormItem label="父级" prop="pName">
                        <Input v-model="orgData.pName" readonly ></Input>
                    </FormItem> -->
                    <FormItem label="组织名称" prop="o">
                        <Input v-model="orgData.o" placeholder="输入组织机构名称"></Input>
                    </FormItem>
                    <FormItem label="组织单元" prop="ou">
                        <Input v-model="orgData.ou" placeholder="输入组织单元"></Input>
                    </FormItem>
                    <FormItem label="所在地" prop="i">
                        <Input v-model="orgData.i" placeholder="输入所在地"></Input>
                    </FormItem>
                    <FormItem label="传真" prop="facsimileTelephoneNumber">
                        <Input v-model="orgData.facsimileTelephoneNumber" placeholder="输入传真"></Input>
                    </FormItem>
                    <FormItem label="电话" prop="telephoneNumber">
                        <Input v-model="orgData.telephoneNumber" placeholder="输入电话"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="mail">
                        <Input v-model="orgData.mail" placeholder="输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="描述" prop="description">
                        <Input v-model="orgData.description" placeholder="输入描述"></Input>
                    </FormItem>
                </Form>
                <div class="demo-drawer-footer">
                    <Button style="margin-right: 8px" @click="cancel">取消</Button>
                    <Button @click="createOrg" type="primary" :loading="loading">提交</Button>
                </div>
            </Drawer>    
            <Drawer
                title="人员"
                v-model="userDrawer"
                width="400"
                :closable="false"
                :mask-closable="false"
                :styles="styles"
            >
                
                 <Form ref="userForm" :model="userData" :rules="ruleUser" :label-width="80" v-if="userDrawer" >
                    <FormItem label="用户名" prop="uid">
                        <Input v-model="userData.uid"  placeholder="输入用户名" ></Input>
                    </FormItem>
                    <FormItem label="员工编号" prop="employeeNumber">
                        <Input v-model="userData.employeeNumber" placeholder="输入编号"></Input>
                    </FormItem>
                    <FormItem label="员工类型" prop="employeeType">
                        <Input v-model="userData.employeeType" placeholder="输入员工类型"></Input>
                    </FormItem>
                    <FormItem label="电话" prop="mobile">
                        <Input v-model="userData.mobile" placeholder="输入电话"></Input>
                    </FormItem>
                    <FormItem label="通讯地址" prop="postalAddress">
                        <Input v-model="userData.postalAddress" placeholder="输入通讯地址"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="mail">
                        <Input v-model="userData.mail" placeholder="输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="账户" prop="photo">
                        <Upload 
                            action="//jsonplaceholder.typicode.com/posts/"
                            accept="image/png, image/jpeg"
                        >
                            <Button icon="ios-cloud-upload-outline">上传头像</Button>
                        </Upload>
                    </FormItem>
                </Form>
                <div class="demo-drawer-footer">
                    <Button style="margin-right: 8px" @click="cancel">取消</Button>
                    <Button @click="createOrg" type="primary" :loading="loading">提交</Button>
                </div>
            </Drawer>    
            
        </div>
        <div class="iam_loading" :style="{width:fullWidth+'px',height:fullHeight+'px'}">
            <div class="loading">
                <img :src="loadingImg"/>
            </div>
                <div class="text">同步中,请稍等...</div>
        </div>
    </div>
</template>

<script>

import loadingImg from '@/assets/loading.gif';
import Cookies from 'js-cookie';
console.log(crypto)
export default {
    data () {
        return {
            loadingImg :loadingImg,
            fullHeight:document.documentElement.clientHeight,
            fullWidth:document.documentElement.clientWidth,
            loading:false,
            orgDrawer:false,
            userDrawer: false,
            orgTreeData:[],
            selNode:{},
            selOData:{
                o:'',//组织 organization的单词首字母
                ou:'',//组织单位 organization unit的两个单词首字母
                i:'西安市',//城市/所在地（location）
                facsimileTelephoneNumber:'029-88888888',//传真
                telephoneNumber:'029-88888888',//电话
                mail:'zejiaconsultion.com',//邮箱地址
                description:'',//描述
            },
            selUData:{
                uid:'',//用户名。应该是用到验证的用户名，与我们在数据库中用于登陆的用户名一样。
                c:'中国',//国家（country）
                cn:'',//用户全名
                sn:'',//用户名中的姓
                st:'1',//状态，用户的使用状态(status)
                givenName:'',//用户名中的名字
                employeeNumber:'00001',//员工编号
                employeeType:'',//员工类型
                description:'正式员工',//描述
                mail:'abcd.com',//邮箱地址
                telephoneNumber:'029-66666666',//电话
                mobile:'18766666666',//移动电话号码
                photo:'',//相片（应该是存放相片的字节流）
                postalAddress:'西安市高新区 xxx xxx',//邮政地址
                postalCode:'710000',//邮政编码
                homePhone:'029-66666666',//住宅电话号码
                roomNumber:'',//门牌号
                preferredLanguage:'',//母语
                street:'西安市高新区 xxx街道 xxx号'//街道地址

            },
            styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
            orgData: {
                name: '',
                pName: '',
                pId:'',
                ou:'',
                i:'',
                facsimileTelephoneNumber:'',
                telephoneNumber:'',
                mail:'',
                description:'',

            },
            ruleValidate: {
                o: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                    { required: true, type: 'string', max: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            },
            userData: {
                uid: '',
                employeeNumber: '',
                employeeType:'',
                mobile:'',
                postalAddress:'',
                photo:'',
                mail:''




            },
            ruleUser: {
                uid: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                    { required: true, type: 'string', max: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            }
        };
    },
    created(){
        this.queryorgList();
        
    },
    methods: {
        editOrg(){
            this.orgDrawer = true;
            this.orgData = this.selNode.data;
            this.orgData.o = this.selNode.title;
        },
        editUser(){
            this.userDrawer = true;
            this.userData = this.selNode.data;
            this.userData.uid = this.selNode.title;
        },
        cancel () {
            // this.$refs['orgForm'].resetFields();
            // this.$refs['userForm'].resetFields();
            this.userDrawer = false;
            this.orgDrawer = false;
        },
        createOrg () {
            let _this = this;
            _this.$refs.orgForm.validate((valid) => {
                if (valid) {
                    let params = {
                        pid :  _this.orgData.pId,
                        name : _this.orgData.name
                    };

                    let url = 'api/org/create';
                    _this.loading = true;
                    _this.axios.post(url,params).then((response) => {
                        _this.loading = false;
                        if(response.data.meta.status != 0){return}
                        _this.queryOrgList();
                        
                    }).catch(function(){
                        _this.loading = false;
                    })
                    
                }
            });
        },
        queryorgList (){
            let _this = this;
            _this.orgTreeData = [
                {
                    title:'泽佳',
                    id:'1',
                    type:'org',
                    expand:true,
                    data:_this.selOData,
                    children:[
                        {
                            title:'泽佳西安',
                            id:'2',
                            type:'org',
                            expand:true,
                            data:_this.selOData,
                            children:[
                                {
                                    title:'1-4',
                                    id:'4',
                                    type:'page',
                                    
                                    children:[]
                                },
                                {
                                    title:'5-6',
                                    id:'5',
                                    children:[
                                        ]
                                }
                            ]
                        },
                        {
                            title:'泽佳成都',
                            id:'3',
                            type:'org',
                            expand:true,
                            data:_this.selOData,
                            children:[]
                        }
                    ]

                }
            ]
        },
        selectChange(nodes){
            if(nodes.length >0){
                let node = nodes[0];
                this.selNode = node;
                this.orgData.pId = node.id;
                this.orgData.pName = node.title;
                let type = nodes[0].type;
                if(type == 'page'){
                    nodes[0].children = this.queryUser();
                    nodes[0].expand = true;
                }
            }
            
        },
        queryUser(){
            let _this = this;
            let list = [
                        {
                            title:'乔振峰',
                            id:'4-1',
                            type:'user',
                            data:_this.selUData,
                        },
                        {
                            title:'寇向东',
                            type:'user',
                            id:'4-2',
                            data:_this.selUData,
                        },
                        {
                            title:'王宝康',
                            type:'user',
                            id:'4-3',
                            data:_this.selUData,
                        },
                        {
                            title:'孙晓云',
                            type:'user',
                            id:'4-4',
                            data:_this.selUData,
                        }
                    ]
            return list;
        },
        renderContent (h, { root, node, data }) {
            let _this = this;
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '90%'
                    },
                    class:node.node.id == _this.selNode.id?'ivu-tree-title ivu-tree-title-selected':'ivu-tree-title',
                    on: {
                        click: () => { _this.selectChange([node.node]) }
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: data.type == 'org'?'md-cube':data.type == 'user'?'md-person':'md-people',
                                size:'16'
                            },
                            style: {
                                marginRight: '8px',
                                color:'#2d8cf0'
                            }
                        }),
                        h('span', {
                        
                        }, [
                            h('span', data.title)
                        ])
                    ])

                ]);
            },
       
    },
    mounted(){
        const that = this;
        window.onresize = () => {
            return (() => {
                that.fullHeight = document.documentElement.clientHeight;
                that.fullWidth = document.documentElement.clientWidth;
            })()
        }
    }
};
</script>

<style lang="less" scoped>
    .cont{
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .cont .left{
        width: 300px;
        height: 100%;
        padding: 10px;
        overflow: auto;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        float: left;
    }
    .cont .right{
        width: calc(100% - 300px);
        height: 100%;
        overflow-y: auto;
        float: left;
    }
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
    .orgCont{
        padding:20px;
        font-size: 14px;
    }
    .orgCont .tableRow{
        margin-top: 2px;
    }
    .orgCont .tableRow:nth-child(odd) {
        background: #f1f1f1;
    }
    .orgCont .tableRow:nth-child(even) {

    }
    .orgCont .tableRow .ivu-col{
        height:60px;
        line-height: 40px;
        padding: 10px;
    }
    .orgCont .tableRow .ivu-col:nth-child(odd){
        background: #d7d7de;
        font-weight: bold;
    }
    .orgCont .tableRow .ivu-col:nth-child(even){
    }
    
</style>
<style >

.org .ivu-tree-arrow{
    line-height: 37px;
}
.org .ivu-tree ul li{
        margin: 0;
    }
.org .ivu-tree-title{
    padding: 8px 4px !important;
}
.org .ivu-tree-title .ivu-tree-title-selected{
    background-color: #d5e8fc;
    }
</style>