
<template> 
    <div class="maintain_cont" >
        
        <div class="maintain_content">
            
            <div class="">
                <Row style="border-bottom:1px solid #ccc;padding:20px;">
                    <i-col span="24">
                        <Button type="primary" style="margin-right:20px;" @click="create">新增</Button>
                        <Button type="primary" style="margin-right:20px;" @click="queryUserList">查询</Button>
                        <Select v-model="type" style="width:200px" placeholder="请选择类型">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </i-col>
                </Row>
                
                <div style="padding:20px;">
                    <Table size="small" border stripe :columns="userColumns" :data="listData"></Table>
                    <br>
                    <Page :current="currentPage" :total="total" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change='pageSizeChange' />
                </div>

                <Drawer
                    v-model="modal"
                    width="400"
                    :closable="false"
                    :mask-closable="false"
                    :styles="styles"
                >
                    <Form ref="tiggerForm" :model="formData" :label-width="80" >
                        <FormItem label="类型" prop="type">
                            <Select v-model="formData.type"  style="width:260px">
                                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="BASE" prop="base" class="bottom">
                            <Input v-model="formData.base" placeholder="输入端口" style="width:260px"></Input>
                            <Tooltip max-width="300"  placement="bottom-end" theme="light" transfer>
                                <Icon type="ios-help-circle-outline" size="18" color="#2d8cf0" style="margin-left:5px" />
                                <div slot="content" style="width:260px">
                                    <p>BASE是指：数据库SID、LDAP的BASEDN；当类型为接口类类型时候不用填写，接口类型主要是指web Service、Socket、RestFull。</p>
                                </div>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="host" prop="host" class="bottom">
                            <Input v-model="formData.host" placeholder="输入端口" style="width:260px"></Input>
                            <Tooltip max-width="300" placement="bottom-end" theme="light" transfer>
                                <Icon type="ios-help-circle-outline" size="18" color="#2d8cf0" style="margin-left:5px" />
                                <div slot="content" style="width:260px">
                                    <p>HOST特指IP或者域名。</p>
                                </div>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="端口" prop="port">
                            <Input v-model="formData.port" placeholder="输入ip" style="width:260px"></Input>
                        </FormItem>
                        <FormItem label="账号" prop="account">
                            <Input v-model="formData.account" placeholder="输入账号" style="width:260px"></Input>
                        </FormItem>
                        </FormItem>
                        <FormItem label="密码" prop="password">
                            <Input v-model="formData.password" placeholder="输入密码" style="width:260px"></Input>
                        </FormItem>
                        <FormItem label="系统" prop="system" class="bottom">
                            <Input v-model="formData.system" placeholder="输入密码" style="width:260px"></Input>
                            <Tooltip max-width="300" placement="bottom-end" theme="light" transfer>
                                <Icon type="ios-help-circle-outline" size="18" color="#2d8cf0" style="margin-left:5px" />
                                <div slot="content" style="width:260px">
                                    <p>系统是指数据库服务器、目录LDAP服务器、接口服务器的描述</p>
                                </div>
                            </Tooltip>
                        </FormItem>
                    </Form>
                        
                        <div>
                            <div style="padding:10px 12px 10px 10px;text-align:right;width:80px; float:left;">
                                <Button  type="primary" @click="test" >测试</Button>
                            </div>
                            <div style="padding:10px 12px 10px 10px;text-align:right; float:left;">
                                <p v-if="testResult == 'success'" style="color:#00ca22;font-size:16px;">连接成功！</p>
                                <p v-if="testResult == 'error'" style="color:#ff2828;font-size:16px;">链接失败！</p>
                                <p v-if="testResult == 'error'" style="color:#ff2828">{{testResultMsg}}</p>
                            </div>
                            <div style="clear:both;"></div>
                        </div>
                    <div class="demo-drawer-footer">
                        <Button style="margin-right: 8px" @click="cancel">取消</Button>
                        <Button  type="primary" v-if="oprType == 'create'" @click="sunmitCreate" >提交</Button>
                        <Button  type="primary" v-if="oprType == 'edit'" @click="sunmitEdit">提交</Button>
                    </div>
                </Drawer>
                <Modal v-model="modelModal" footer-hide width="1000px" >
                    <Tabs>
                        <TabPane label="组织模型" name="name1">
                            <Row style="border-bottom:1px solid #ccc;padding:20px;">
                                <i-col span="24">
                                    <Button type="primary" style="margin-right:20px;" @click="createOrgModel">新增</Button>
                                    <!-- <Button type="primary" style="margin-right:20px;" @click="deleteOrgModel">删除</Button> -->
                                    <Select v-model="modelObj" style="width:200px" placeholder="请选择模型对象">
                                        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </i-col>
                            </Row>
                            
                            <div style="padding:20px;">
                                <Table size="small" border stripe :columns="orgMOdelColumns" :data="orgMOdelList" v-if="tableIsLive"></Table>
                                <br>
                                <Page :current="orgModelCurrentPage" :total="orgModelTotal" show-elevator show-total show-sizer @on-change="orgModelPageChange" @on-page-size-change='orgModelPageSizeChange' />
                            </div>
                        </TabPane>
                        <TabPane label="账号模型" name="name2">
                            标签二的内容
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>

import Cookies from 'js-cookie';
export default {
    data () {
        return {
            tableIsLive:true,
            orgTreeData:[],
            currentPage:1,
            pageSize:10,
            total:50,
            system:'',
            type:'',
            modal:false,
            oprType:'',
            testResult:'',
            testResultMsg:'',

            //模型
            modelModal:false,
            orgModelCurrentPage:1,
            orgModelPageSize:10,
            orgModelTotal:50,

            
            modelObj:'',
            styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
            systemList:[
                {
                    value:'basic',
                    label:'泽佳基础开发平台'
                },
                {
                    value:'oa',
                    label:'泽佳OA系统'
                }
            ],
            typeList:[
                {
                    value:'LDAP',
                    label:'LDAP'
                },
                {
                    value:'MySQL',
                    label:'MySQL'
                },
                {
                    value:'Oracle',
                    label:'Oracle'
                },
                {
                    value:'SQLServer',
                    label:'SQLServer'
                },
                {
                    value:'DB2',
                    label:'DB2'
                },
                {
                    value:'WebSever',
                    label:'WebSever'
                },
                {
                    value:'RestFull',
                    label:'RestFull'
                }
            ],

            //model_s
            
            systemList_M:[
                {
                    value:'USER_ID',
                    label:'USER_ID'
                },
                {
                    value:'ORG_ID',
                    label:'ORG_ID'
                }
            ],
            dataTypeList_M:[
                {
                    value:'Vachar(32)',
                    label:'Vachar(32)'
                },
                {
                    value:'char',
                    label:'char'
                }
            ],
            localList_M:[
                {
                    value:'UID',
                    label:'UID'
                },
                {
                    value:'OID',
                    label:'OID'
                }
            ],
            localTypeList_M:[
                {
                    value:'String',
                    label:'String'
                },
                {
                    value:'Number',
                    label:'Number'
                }
            ],
            //model_e
            formData:{
                system:'',
                type:'',
                base:'',
                host:'',
                port:'',
                account:'',
                password:''
            },
            userColumns: [
                    {
                        title: '序号',
                        type:'index',
                        width:'65px',
                        align:'center'
                    },
                    {
                        title: 'base库',
                        key:'base',
                        width:'160',
                        ellipsis:true
                    },
                    {
                        title: '类型',
                        width:'100',
                        key: 'type',
                        ellipsis:true
                    },
                    {
                        title: 'IP',
                        key: 'ip',
                        width:'160',
                        ellipsis:true
                    },
                    {
                        title: '端口',
                        key: 'port',
                        width:'80',
                    },
                    {
                        title: '账号',
                        key: 'account',
                        width:'160',
                        ellipsis:true
                    },
                    {
                        title: '密码',
                        key: 'password',
                        width:'160',
                        ellipsis:true
                    },
                    {
                        title: '系统名称',
                        key: 'systemName',
                        tooltip:true,
                        minWidth:360
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width:'260px',
                        fixed:'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row);
                                        }
                                    }
                                }, '编辑'),
                                
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row);
                                        }
                                    }
                                }, '停用'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.stop()
                                        }
                                    }
                                }, '测试'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.model();
                                        }
                                    }
                                }, '模型')
                            ]);
                        }
                    }
                ],
            orgMOdelColumns: [
                    {
                        title: '序号',
                        type:'index',
                        width:'65px',
                        align:'center'
                    },
                    {
                        title: '应用系统字段',
                        render: (h, params) => {
                            return h('div', [
                                h('Select', {
                                    props: {
                                        value: params.row.system, 
                                        size: 'small'
                                    },
                                    style:{
                                        display:params.row.edit?'block':'none'
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.system = e 
                                        }
                                    }
                                    }, this.systemList_M.map((item) => { 
                                        return h('Option', { 
                                            props: {
                                                value: item.value,
                                                label: item.label
                                            }
                                        })
                                    }),
                                ),
                                h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.edit?'none':'block'
                                    },
                                }, params.row.system),
                                
                            ]);
                        }

                    },
                    {
                        title: '应用系统数据类型',
                        render: (h, params) => {
                            return h('div', [
                                h('Select', {
                                    props: {
                                        value: params.row.dataType, 
                                        size: 'small'
                                    },
                                    style:{
                                        display:params.row.edit?'block':'none'
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.system = e 
                                        }
                                    }
                                    }, this.dataTypeList_M.map((item) => { 
                                        return h('Option', { 
                                            props: {
                                                value: item.value,
                                                label: item.label
                                            }
                                        })
                                    }),
                                ),
                                h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.edit?'none':'block'
                                    },
                                }, params.row.dataType),
                                
                            ]);
                        }
                        
                    },
                    {
                        title: '本地字段',
                        render: (h, params) => {
                            return h('div', [
                                h('Select', {
                                    props: {
                                        value: params.row.local, 
                                        size: 'small'
                                    },
                                    style:{
                                        display:params.row.edit?'block':'none'
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.system = e 
                                        }
                                    }
                                    }, this.localList_M.map((item) => { 
                                        return h('Option', { 
                                            props: {
                                                value: item.value,
                                                label: item.label
                                            }
                                        })
                                    }),
                                ),
                                h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.edit?'none':'block'
                                    },
                                }, params.row.local),
                                
                            ]);
                        }
                    },
                    {
                        title: '本地类型',
                        render: (h, params) => {
                            return h('div', [
                                h('Select', {
                                    props: {
                                        value: params.row.localType, 
                                        size: 'small'
                                    },
                                    style:{
                                        display:params.row.edit?'block':'none'
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.system = e 
                                        }
                                    }
                                    }, this.localTypeList_M.map((item) => { 
                                        return h('Option', { 
                                            props: {
                                                value: item.value,
                                                label: item.label
                                            }
                                        })
                                    }),
                                ),
                                h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.edit?'none':'block'
                                    },
                                }, params.row.localType),
                                
                            ]);
                        }
                    },
                    {
                        title: '备注',
                        key: 'account'
                    },
                     {
                        title: '操作',
                        align: 'center',
                        width:'260px',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            params.row.edit = true
                                        }
                                    }
                                }, '编辑'),
                                
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            params.row.edit = false
                                        }
                                    }
                                }, '保存'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            
                                        }
                                    }
                                }, '删除'),
                               
                            ]);
                        }
                    }
                ],
            listData: []
        }
    },
    created(){
        this.queryUserList();
        this.queryOrgModelList();
    },
    watch:{
        
    },
    computed:{

    },
    components:{
        
    },
    methods: {
        
        createOrgModel(){
            let _this = this;
            let o = {
                system: '',
                dataType:'',
                local:'',
                localType: '',
                remarks: '',
                edit:true
            };
            
            this.orgMOdelList.unshift(o)
            this.tableIsLive = false;
            this.$nextTick(() => {
                    _this.tableIsLive = true;
            })

        },
        deleteOrgModel(){

        },
        model(){
             this.modelModal = true;
        },
        test(){
            this.testResult = 'success';
            this.testResultMsg = '连接成功';
        },
        cancel () {
            this.modal = false;
            this.oprType = '';
        },
        stop(){
            
        },
        edit(row){
            this.oprType = 'edit'
            this.modal = true;
            this.formData.system = row.system;
            this.formData.base = row.base;
            this.formData.host = row.host;
            this.formData.type = row.type;
            this.formData.ip = row.ip;
            this.formData.port = row.port;
            this.formData.account = row.account;
            this.formData.password = row.password;
        },
        sunmitEdit(){

            this.oprType = '';
        },
        create(){
            this.oprType = 'create'
            this.modal = true;
        },
        sunmitCreate(){

            this.oprType = '';
        },
        pageSizeChange(val){
            this.pageSize = val;
            this.queryUserList();
        },
        pageChange(val){
            this.currentPage = val;
            this.queryUserList();
        },
        orgModelPageSizeChange(val){//组织模型
            this.orgModelPageSize = val;
            this.queryOrgModelList();
        },
        orgModelPageChange(val){//组织模型
            this.orgModelCurrentPage = val;
            this.queryOrgModelList();
        },
        userMOdelPageSizeChange(val){//账号模型
            this.pageSize = val;
            this.queryUserList();
        },
        suerModelPageChange(val){//账号模型
            this.currentPage = val;
            this.queryUserList();
        },
        queryUserList (){

            let _this = this;
            this.listData = [
                {
                    base: 'aaaa',
                    type:'LDAP',
                    host:'192.168.1.1',
                    system:'oa',
                    ip: '192.168.1.1',
                    port: '8080',
                    account: '1',
                    password :'asdasdas',
                    typeName:'LDAP',
                    systemName:'泽佳OA系统',
                },
                {
                    base: 'aaaa',
                    type:'LDAP',
                    host:'192.168.1.1',
                    system:'oa',
                    ip: '192.168.1.1',
                    port: '8080',
                    account: '1',
                    password :'asdasdas',
                    typeName:'LDAP',
                    systemName:'泽佳OA系统',
                },
                {
                    base: 'aaaa',
                    type:'LDAP',
                    host:'192.168.1.1',
                    system:'oa',
                    ip: '192.168.1.1',
                    port: '8080',
                    account: '1',
                    password :'asdasdas',
                    typeName:'LDAP',
                    systemName:'泽佳OA系统',
                },
                {
                    base: 'aaaa',
                    type:'LDAP',
                    host:'192.168.1.1',
                    system:'oa',
                    ip: '192.168.1.1',
                    port: '8080',
                    account: '1',
                    password :'asdasdas',
                    typeName:'LDAP',
                    systemName:'泽佳OA系统',
                },
            ]
        },
        queryOrgModelList (){

            let _this = this;
            this.orgMOdelList = [
                
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                },
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                },
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                },
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                },
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                },
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                },
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                },
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                },
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                },
                {
                    system: 'USER_ID',
                    dataType:'Vachar(32)',
                    local:'UID',
                    localType: 'String',
                    remarks: 'asdasdasdasd',
                    edit:false
                }
            ]
        },
       
        
    
       
    },
    mounted(){
    //    this.formData.cron = '01,02 0/5 0/3 ? 1-3 * 2020-2021'
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
    .top,.bottom{
        text-align: center;
    }
    .center{
        width: 300px;
        margin: 10px auto;
        overflow: hidden;
    }
    .center-left{
        float: left;
    }
    .center-right{
        float: right;
    }
</style>