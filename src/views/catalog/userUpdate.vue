
<template> 
    <div class="maintain_cont" >
        
        <div class="maintain_content">
            
            <div class="">
                <Row style="border-bottom:1px solid #ccc;padding:20px;">
                    <i-col span="24">
                        <Input v-model="keyword" style="width:200px;margin-right:20px;" placeholder="输入人员账号或名称"/>
                        <Button type="primary" style="margin-right:20px;" @click="queryUserList">查询</Button>
                        <Button type="primary" style="margin-right:20px;" @click="create">新增</Button>
                    </i-col>
                </Row>
                
                <div style="padding:20px;">
                    <Table size="small" border stripe :columns="userColumns" :data="userList"></Table>
                    <br>
                    <Page :current="currentPage" :total="total" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change='pageSizeChange' />
                </div>

                <Drawer
                    v-model="modal"
                    width="400"
                    :closable="false"
                    :mask-closable="false"
                    :styles="styles" >
                    <Form ref="userForm" :model="userData" :rules="ruleUser" :label-width="80" >
                        <FormItem label="所属组织" prop="partent">
                            <select-tree
                            data-key="title" 
                            :sel-leaf="true"
                            :is-input="false"
                            :multiple="false"
                            :treeData="treeData"
                            @select-change="schange" 
                            placeholder="请选择所属组织"></select-tree>
                            
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
                        <Button  type="primary" v-if="oprType == 'create'" @click="sunmitCreate" >提交</Button>
                        <Button  type="primary" v-if="oprType == 'edit'" @click="sunmitEdit">提交</Button>
                    </div>
                </Drawer>
            </div>
        </div>
    </div>
</template>

<script>

import cron from '@/components/cron/cronSelect'
import selectTree from '@/components/selectTreeSearch.vue'
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            orgTreeData:[],
            currentPage:1,
            pageSize:10,
            total:50,
            keyword:'',
            status:'',
            modal:false,
            oprType:'',
            treeData:[],
            styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
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
                    {
                        title: '操作',
                        align: 'center',
                        width:'100px',
                        fixed:'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.status=='1'?'none':'block'
                                    },
                                    on: {
                                        click: () => {
                                            params.row.status = '1'
                                        }
                                    }
                                }, '启用'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.status=='1'?'block':'none'
                                    },
                                    on: {
                                        click: () => {
                                            params.row.status = '2'
                                        }
                                    }
                                }, '停用')
                            ]);
                        }
                    }
                ],
            userList: []
        }
    },
    created(){
        this.queryUserList();
        this.queryParentList();
    },
    watch:{
        
    },
    computed:{

    },
    components:{
        cron,
        selectTree
    },
    methods: {
        
        cancel () {
            this.modal = false;
            this.oprType = '';
        },
        tigger(){
            
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
        queryUserList (){

            let _this = this;
            this.userList = [
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

</style>