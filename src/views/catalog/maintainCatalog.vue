
<template> 
    <div class="maintain_cont" >
        
        <div class="maintain_content">
            
            <div class="left ">
                <Input search enter-button="搜索" placeholder="" />
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
                        <i-col span="3">编码</i-col>
                        <i-col span="5">{{selNode.data.number}}</i-col>
                        <i-col span="3">名称</i-col>
                        <i-col span="5">{{selNode.title}}</i-col>
                        <i-col span="3">邮箱</i-col>
                        <i-col span="5">{{selNode.data.mail}}</i-col>
                    </Row>
                    <Row class="tableRow" v-if="selNode.data">
                        <i-col span="3">电话</i-col>
                        <i-col span="5">{{selNode.data.telephoneNumber}}</i-col>
                        <i-col span="3">传真</i-col>
                        <i-col span="5">{{selNode.data.facsimileTelephoneNumber}}</i-col>
                        <i-col span="3">区号</i-col>
                        <i-col span="5">{{selNode.data.postalCode}}</i-col>
                    </Row>
                    <Row class="tableRow" v-if="selNode.data">
                        <i-col span="3">省市</i-col>
                        <i-col span="21">{{selNode.data.i}}</i-col>
                    </Row>
                    <Row class="tableRow" v-if="selNode.data">
                        <i-col span="3">街道</i-col>
                        <i-col span="21">{{selNode.data.street}}</i-col>
                    </Row>
                    <Row class="tableRow" v-if="selNode.data">
                        <i-col span="3">邮址</i-col>
                        <i-col span="21">{{selNode.data.postalAddress}}</i-col>
                    </Row>
                    <Row class="tableRow" v-if="selNode.data">
                        <i-col span="3">路径</i-col>
                        <i-col span="21">{{selNode.data.url}}</i-col>
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
                        <i-col span="3">邮箱</i-col>
                        <i-col span="5">{{selNode.data.mail}}</i-col>
                    </Row>
                    <Row class="tableRow" v-if="selNode.data">
                        <i-col span="3">电话</i-col>
                        <i-col span="5">{{selNode.data.telephoneNumber}}</i-col>
                        <i-col span="3">手机</i-col>
                        <i-col span="5">{{selNode.data.mobile}}</i-col>
                        <i-col span="3">QQ</i-col>
                        <i-col span="5">{{selNode.data.qq}}</i-col>
                    </Row>
                    <Row class="tableRow" v-if="selNode.data">
                        <i-col span="3">微信</i-col>
                        <i-col span="5">{{selNode.data.wechart}}</i-col>
                        <i-col span="3">钉钉</i-col>
                        <i-col span="5">{{selNode.data.dingding}}</i-col>
                        <i-col span="3">状态</i-col>
                        <i-col span="5">{{selNode.data.st == 1?'启用':'停用'}}</i-col>
                    </Row>
                    <Row class="tableRow" v-if="selNode.data">
                        <i-col span="3">组织</i-col>
                        <i-col span="21">{{selNode.data.o}}</i-col>
                    </Row>
                    <br>
                    <Row class="userTab">
                        <Tabs type="card">
                            <TabPane label="客户端系统">
                                <div style="text-align:center;line-height:100px; width:100%">
                                    <Icon type="ios-bulb-outline" size="45" style="vertical-align: middle;color:#b0bcd2;" />
                                    <span class="info" >此账号没有任何分配信息的系统</span>
                                </div>
                            </TabPane>
                            <TabPane label="所属角色">
                                <div style="text-align:center;line-height:100px; display:none;" >
                                    <Icon type="md-person" size="60"  style="vertical-align: middle;color:#b0bcd2;" />
                                    <span class="info" >此账号没有分配任何角色</span>
                                </div>
                                <div class="cont">
                                    <div class="card">
                                        <div class="icon"><Icon type="ios-people" size="36" /></div>
                                        <div class="body">
                                            <div class="name">普通财务人员角色</div>
                                            <div class="account">财务、物资等系统使用</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </TabPane>
                            <TabPane label="所属组织">
                                <div class="orgList"><span  class="iconfont icon-shuzhuangtu_o icon" style="color:#0099FF;"></span><span class="text">北京泽佳科益科技有限公司 / 财务部</span></div>
                            </TabPane>
                            <TabPane label="所属组">
                                <div style="text-align:center;line-height:100px;">
                                    <Icon type="ios-bulb-outline" size="45" style="vertical-align: middle; color:#b0bcd2;" />
                                    <span class="info"  >此账号没有分配任何组</span>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Row>
                </div>
                <div v-if="selNode.type == 'page'" style="padding:20px;">
                    <Table size="small" border :columns="userColumns" stripe :data="userList"></Table>
                </div>
                <Drawer
                    title="组织机构"
                    v-model="orgDrawer"
                    width="400"
                    :closable="false"
                    :mask-closable="false"
                    :styles="styles"
                >
                    
                    <Form ref="orgForm" :model="orgData" :rules="ruleOrg" :label-width="80" v-if="orgDrawer" >
                        <FormItem label="所属组织" prop="parent">
                            <select-tree
                            data-key="title" 
                            :sel-leaf="true"
                            :is-input="false"
                            :multiple="false"
                            :treeData="treeData"
                            @select-change="schange" 
                            placeholder="请选择所属组织"></select-tree>
                        </FormItem>
                        <FormItem label="组织名称" prop="orgName">
                            <Input v-model="orgData.orgName" placeholder="输入组织机构名称"></Input>
                        </FormItem>
                        <FormItem label="组织编号" prop="number">
                            <Input v-model="orgData.number" placeholder="输入组织编号"></Input>
                        </FormItem>
                        <FormItem label="邮箱" prop="mail">
                            <Input v-model="orgData.mail" placeholder="输入邮箱所在地"></Input>
                        </FormItem>
                        <FormItem label="传真" prop="facsimileTelephoneNumber">
                            <Input v-model="orgData.facsimileTelephoneNumber" placeholder="输入传真"></Input>
                        </FormItem>
                        <FormItem label="电话" prop="telephoneNumber">
                            <Input v-model="orgData.telephoneNumber" placeholder="输入电话"></Input>
                        </FormItem>
                        <FormItem label="区号" prop="postalCode">
                            <Input v-model="orgData.postalCode" placeholder="输入区号"></Input>
                        </FormItem>
                        <FormItem label="城市" prop="city">
                            <Input v-model="orgData.city" placeholder="输入城市"></Input>
                        </FormItem>
                        <FormItem label="街道" prop="street">
                            <Input v-model="orgData.street" placeholder="输入街道"></Input>
                        </FormItem>
                        <FormItem label="组织路径" prop="url">
                            <Input v-model="orgData.url" placeholder="输入组织路径"></Input>
                        </FormItem>
                        <FormItem label="邮政地址" prop="postalAddress">
                            <Input v-model="orgData.postalAddress" placeholder="输入邮政地址"></Input>
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
                        <FormItem label="所属组织" prop="parent">
                            <select-tree
                            data-key="title" 
                            :sel-leaf="true"
                            :is-input="false"
                            :multiple="false"
                            :authority="authority"
                            :treeData="treeData"
                            @select-change="schange" 
                            :placeholder="placeholder"></select-tree>
                            
                        </FormItem>
                        <FormItem label="用户名" prop="userName">
                            <Input v-model="userData.userName"  placeholder="输入用户名" ></Input>
                        </FormItem>
                        <FormItem label="员工编号" prop="employeeNumber">
                            <Input v-model="userData.employeeNumber" placeholder="输入员工编号"></Input>
                        </FormItem>
                        <FormItem label="邮箱" prop="mail">
                            <Input v-model="userData.mail" placeholder="输入邮箱"></Input>
                        </FormItem>
                        <FormItem label="电话" prop="telephoneNumber">
                            <Input v-model="userData.telephoneNumber" placeholder="输入电话"></Input>
                        </FormItem>
                        <FormItem label="手机" prop="mobile">
                            <Input v-model="userData.mobile" placeholder="输入手机"></Input>
                        </FormItem>
                        <FormItem label="QQ" prop="qq">
                            <Input v-model="userData.qq" placeholder="输入QQ"></Input>
                        </FormItem>
                        <FormItem label="微信" prop="wechart">
                            <Input v-model="userData.wechart" placeholder="输入微信"></Input>
                        </FormItem>
                        <FormItem label="钉钉" prop="dingding">
                            <Input v-model="userData.dingding" placeholder="输入钉钉"></Input>
                        </FormItem>
                        <FormItem label="状态" prop="status">
                            </RadioGroup>
                            <RadioGroup v-model="userData.status">
                                <Radio label="1">启用</Radio>
                                <Radio label="2">停用</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="组织" prop="orgName">
                            <Input v-model="userData.orgName" placeholder="输入组织"></Input>
                        </FormItem>
                    </Form>
                    <div class="demo-drawer-footer">
                        <Button style="margin-right: 8px" @click="cancel">取消</Button>
                        <Button @click="createOrg" type="primary" :loading="loading">提交</Button>
                    </div>
                </Drawer>    
                
            </div>
        </div>
    </div>
</template>

<script>

import selectTree from '@/components/selectTreeSearch.vue'
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            fullHeight:document.documentElement.clientHeight,
            fullWidth:document.documentElement.clientWidth,
            orgDrawer:false,//编辑创建组织抽屉
            userDrawer: false,//编辑创建用户抽屉
            loading:false,
            orgTreeData:[],
            selNode:{},
            treeData:[],
            selOData:{
                orgName:'',//组织 organization的单词首字母
                number:'',//编号
                mail:'zejiaconsultion.com',//邮箱地址
                facsimileTelephoneNumber:'029-88888888',//传真
                telephoneNumber:'029-88888888',//电话
                postalCode:'710000',//邮政编码
                city:'西安市',//城市/所在地（location）
                street:'西安市高新区 xxx街道 xxx号',//街道地址
                url:'',//组织路径
                postalAddress:'',//邮政地址
                description:''//描述

            },
            selUData:{
                userId:'',//用户名。应该是用到验证的用户名，与我们在数据库中用于登陆的用户名一样。
                employeeNumber:'00001',//员工编号
                mail:'abcd.com',//邮箱地址
                telephoneNumber:'029-66666666',//电话
                mobile:'18766666666',//移动电话号码
                qq:'1126241111',
                wechart:'wx45465',
                dingding:'dd564564',
                status:'1',//状态，用户的使用状态(status)
                orgName:'',
                systems:[],
                roles:[],
                orgs:[]

                

            },
            styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
            orgData: {
                parent:'',
                orgName:'',//组织 organization的单词首字母
                number:'',//编号
                mail:'',//邮箱地址
                facsimileTelephoneNumber:'',//传真
                telephoneNumber:'',//电话
                postalCode:'',//邮政编码
                city:'',//城市/所在地（location）
                street:'',//街道地址
                url:'',//组织路径
                postalAddress:'',//邮政地址
                description:''//描述

            },
            ruleValidate: {
                o: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                    { required: true, type: 'string', max: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            },
            userData: {
                parent:'',
                userName:'',//用户名。应该是用到验证的用户名，与我们在数据库中用于登陆的用户名一样。
                employeeNumber:'',//员工编号
                mail:'',//邮箱地址
                telephoneNumber:'',//电话
                mobile:'',//移动电话号码
                qq:'',
                wechart:'',
                dingding:'',
                status:'',//状态，用户的使用状态(status)
                orgName:'',




            },
            ruleUser: {
                orgName: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ],
                number: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ],
                mail: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ],
                orgName: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ]
            },
            ruleOrg: {
                userName: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ],
                employeeNumber: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ],
                mail: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ],
                url: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ],
                postalAddress: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: 'cannot be empty', trigger: 'blur' },
                ]
            },
            userColumns: [
                    {
                        title: '姓名',
                        key:'userName',
                        width:'120px',
                        fixed:'left'
                    },
                    {
                        title: '账号',
                        key: 'account',
                        width:'220px',
                        fixed:'left'
                    },
                    {
                        title: '组织',
                        key: 'orgName',
                        width:'420px',
                        tooltip:true
                    },
                    {
                        title: '电话',
                        key: 'telephoneNumber',
                        width:'160px'
                    },
                    {
                        title: '手机',
                        key: 'mobile',
                        width:'160px'
                    },
                    {
                        title: '邮箱',
                        key: 'mail',
                        width:'260px'
                    },
                    {
                        title: 'QQ',
                        key: 'qq',
                        width:'120px'
                    },
                    {
                        title: '钉钉',
                        key: 'dingding',
                        width:'160px'
                    },
                    {
                        title: '微信',
                        key: 'wechart',
                        width:'160px'
                    },
                ],
            userList: [
                {
                    userName:'张三',//用户名。应该是用到验证的用户名，与我们在数据库中用于登陆的用户名一样。
                    account:'afgg003',//员工编号
                    mail:'asdasdasd@zj.com',//邮箱地址
                    telephoneNumber:'029-88888888',//电话
                    mobile:'18292999999',//移动电话号码
                    qq:'455656646',
                    wechart:'aas454564',
                    dingding:'ad4564645',
                    status:'1',//状态，用户的使用状态(status)
                    orgName:'zejia',
                },
                {
                    userName:'张三',//用户名。应该是用到验证的用户名，与我们在数据库中用于登陆的用户名一样。
                    account:'adf003',//员工编号
                    mail:'asdasdasd@zj.com',//邮箱地址
                    telephoneNumber:'029-88888888',//电话
                    mobile:'18292999999',//移动电话号码
                    qq:'455656646',
                    wechart:'aas454564',
                    dingding:'ad4564645',
                    status:'1',//状态，用户的使用状态(status)
                    orgName:'zejia',
                },
                {
                    userName:'张三',//用户名。应该是用到验证的用户名，与我们在数据库中用于登陆的用户名一样。
                    account:'asd003',//员工编号
                    mail:'asdasdasd@zj.com',//邮箱地址
                    telephoneNumber:'029-88888888',//电话
                    mobile:'18292999999',//移动电话号码
                    qq:'455656646',
                    wechart:'aas454564',
                    dingding:'ad4564645',
                    status:'1',//状态，用户的使用状态(status)
                    orgName:'zejia',
                },
                {
                    userName:'张三',//用户名。应该是用到验证的用户名，与我们在数据库中用于登陆的用户名一样。
                    account:'aa003',//员工编号
                    mail:'asdasdasd@zj.com',//邮箱地址
                    telephoneNumber:'029-88888888',//电话
                    mobile:'18292999999',//移动电话号码
                    qq:'455656646',
                    wechart:'aas454564',
                    dingding:'ad4564645',
                    status:'2',//状态，用户的使用状态(status)
                    orgName:'zejia',
                },
                {
                    userName:'张三',//用户名。应该是用到验证的用户名，与我们在数据库中用于登陆的用户名一样。
                    account:'a003',//员工编号
                    mail:'asdasdasd@zj.com',//邮箱地址
                    telephoneNumber:'029-88888888',//电话
                    mobile:'18292999999',//移动电话号码
                    qq:'455656646',
                    wechart:'aas454564',
                    dingding:'ad4564645',
                    status:'1',//状态，用户的使用状态(status)
                    orgName:'zejia',
                },
            ]
        };
    },
    created(){
        this.queryorgList();
        this.queryParentList();
    },
    watch:{
        operType(val){
            if(val =='cover'){
                this.conModal = true;
                this.conframe = false;
            }else{
                this.conframe = true;
            }
        }
    },
    
    components:{
        selectTree
    },
    methods: {
       
        queryParentList(){
            
            let _this = this;
            this.treeData = [
                {
                    title:'泽佳科益科技有限公司',
                    id:'1',
                    children:[
                        {
                            title:'西安分公司',
                            id:'2',
                        },
                        {
                            title:'成都分公司',
                            id:'3',
                        }
                    ]
                }
            ]
        },
        schange(){},
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
                                    type:'page',
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
            ];
            _this.selNode = _this.orgTreeData[0]
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
    .maintain_cont{
        width: 100%;
    height: calc(100% - 42px);
    }
    .maintain_cont .left{
        width: 240px;
        height: 100%;
        padding: 10px;
        overflow: auto;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        float: left;
    }
    .maintain_cont .right{
        width: calc(100% - 240px);
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
    
    

    .maintain_content{
        width: 100%;
        height: 100%;
        background: #fff;
            overflow-y: auto;
    }

    .orgCont{
        padding:20px;
        font-size: 14px;
    }
    .orgCont .tableRow{
        margin-top: 2px;
    }
    .orgCont .tableRow:nth-child(odd) {
        // background: #f1f1f1;
    }
    .orgCont .tableRow:nth-child(even) {

    }
    .orgCont .tableRow .ivu-col{
        height:42px;
        line-height: 32px;
        padding: 5px 10px;
    }
    .orgCont .tableRow .ivu-col:nth-child(odd){
        // background: #d7d7de;
        font-weight: bold;
    }
    .orgCont .tableRow .ivu-col:nth-child(even){
        border:1px solid #dcdee2;
    }
    
.orgCont .tableRow{
    padding: 5px 10px;
}
.orgCont .tableRow .ivu-col {
        height: 32px !important;
        line-height: 20px;
        border-radius: 3px;
    }
  .orgCont .tableRow .ivu-col-span-3{
      width: 80px;;
  }
  .orgCont .tableRow .ivu-col-span-5{
      width: calc( 33.33% - 80px );
  }
  .orgCont .tableRow .ivu-col-span-13{
      width: calc( 66.66% - 80px );
  }
  .orgCont .tableRow .ivu-col-span-21{
      width: calc( 100% - 80px );
  }
.orgCont .userTab .info{
    vertical-align: middle;
    color: #b0bcd2;
    line-height:60px;
    display: inline-block;
    padding: 0 20px;
}
.orgCont .userTab .orgList{
    background: #f9fbfd;
    border-bottom: 1px solid #B4C7E7;
    }
.orgCont .userTab .orgList .icon{
    font-size: 18px;
    padding-right: 10px;
}
.orgCont .userTab .card{

}
.cont{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
	align-items: flex-start;
}
.orgCont  .userTab .cont .card{
    border: 1px solid #ADB9CA;
    padding: 10px;
    border-radius: 5px;
    margin-right: 15px;
    position: relative;
}
.orgCont .userTab .cont .card .icon{
    float: left;
    width: 40px;
    margin-top: 10px;
    color: #2d8cf0;
}
.orgCont .userTab .cont .card .body{
    float: left;
    width: 120px;
    width: 240px;
}
.orgCont .userTab .cont .card .body .name{
    font-weight:bold;
    margin-bottom: 10px;
} 
.orgCont .userTab .cont .card .body .name span{
    margin-left: 10px;
}   
.orgCont .userTab .cont .card .close{
    position: absolute;
    right:2px;
    top:2px;
    color:#ccc;
    cursor: pointer;
}
.orgCont .userTab .cont .card .close:hover{
    color:#515a6e
}
</style>
<style>
</style>