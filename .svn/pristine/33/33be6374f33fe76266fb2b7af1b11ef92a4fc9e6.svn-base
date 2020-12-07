
<template> 
    <div class="maintain_cont" >
        
        <div class="maintain_content">
            
            <div class="">
                <Row style="border-bottom:1px solid #ccc;padding:20px;">
                    <i-col span="24">
                        <Input v-model="keyword" style="width:200px;margin-right:20px;" placeholder="输入组织编号或名称"/>
                        <Button type="primary" style="margin-right:20px;" @click="queryOrgList">查询</Button>
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
                    :styles="styles"
                >
                    <Form ref="orgForm" :model="orgData" :rules="ruleOrg" :label-width="80" >
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
                        <Button  type="primary" v-if="oprType == 'create'" @click="sunmitCreate" >提交</Button>
                        <Button  type="primary" v-if="oprType == 'edit'" @click="sunmitEdit">提交</Button>
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
            orgTreeData:[],
            currentPage:1,
            pageSize:10,
            total:50,
            keyword:'',
            status:'',
            modal:false,
            oprType:'',
            styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
            
            treeData:[

            ],
            orgData: {
                partent:'',
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
                        title: '编号',
                        key:'number',
                        width:'160px',
                        fixed:'left'
                    },
                    {
                        title: '名称',
                        key:'orgName',
                        width:'260px',
                        tooltip:true,
                        fixed:'left'
                    },
                    {
                        title: '邮箱',
                        key: 'mail',
                        width:'260px'
                    },
                    {
                        title: '电话',
                        key: 'telephoneNumber',
                        width:'160px'
                    },
                    {
                        title: '传真',
                        key: 'facsimileTelephoneNumber',
                        width:'160px'
                    },
                    {
                        title: '区号',
                        key: 'postalCode',
                        width:'160px'
                    },
                    {
                        title: '省市',
                        key: 'city',
                        width:'160px'
                    },
                    {
                        title: '街道',
                        key: 'street',
                        width:'260px',
                        tooltip:true
                    },
                    {
                        title: '邮址',
                        key: 'postalAddress',
                        width:'260px',
                        tooltip:true
                    },
                    {
                        title: '路径',
                        key: 'URL',
                        width:'260px',
                        tooltip:true
                    }
                ],
            userList: []
        }
    },
    created(){
        this.queryOrgList();
        this.queryParentList();
    },
    watch:{
        
    },
    computed:{

    },
    components:{
        selectTree
    },
    methods: {
        schange(){},
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
            this.queryOrgList();
        },
        pageChange(val){
            this.currentPage = val;
            this.queryOrgList();
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
        queryOrgList (){

            let _this = this;
            this.userList = [
                {
                    orgName:'aaa',//组织 organization的单词首字母
                    number:'465',//编号
                    mail:'zejiaconsultion.com',//邮箱地址
                    facsimileTelephoneNumber:'029-88888888',//传真
                    telephoneNumber:'029-88888888',//电话
                    postalCode:'710000',//邮政编码
                    city:'西安市',//城市/所在地（location）
                    street:'西安市高新区 xxx街道 xxx号',//街道地址
                    url:'',//组织路径
                    postalAddress:'西安市高新区',//邮政地址
                    description:''//描述
                },
                {
                    orgName:'aaa',//组织 organization的单词首字母
                    number:'465',//编号
                    mail:'zejiaconsultion.com',//邮箱地址
                    facsimileTelephoneNumber:'029-88888888',//传真
                    telephoneNumber:'029-88888888',//电话
                    postalCode:'710000',//邮政编码
                    city:'西安市',//城市/所在地（location）
                    street:'西安市高新区 xxx街道 xxx号',//街道地址
                    url:'',//组织路径
                    postalAddress:'西安市高新区',//邮政地址
                    description:''//描述
                },
                {
                    orgName:'aaa',//组织 organization的单词首字母
                    number:'465',//编号
                    mail:'zejiaconsultion.com',//邮箱地址
                    facsimileTelephoneNumber:'029-88888888',//传真
                    telephoneNumber:'029-88888888',//电话
                    postalCode:'710000',//邮政编码
                    city:'西安市',//城市/所在地（location）
                    street:'西安市高新区 xxx街道 xxx号',//街道地址
                    url:'',//组织路径
                    postalAddress:'西安市高新区',//邮政地址
                    description:''//描述
                },
                {
                    orgName:'aaa',//组织 organization的单词首字母
                    number:'465',//编号
                    mail:'zejiaconsultion.com',//邮箱地址
                    facsimileTelephoneNumber:'029-88888888',//传真
                    telephoneNumber:'029-88888888',//电话
                    postalCode:'710000',//邮政编码
                    city:'西安市',//城市/所在地（location）
                    street:'西安市高新区 xxx街道 xxx号',//街道地址
                    url:'',//组织路径
                    postalAddress:'西安市高新区',//邮政地址
                    description:''//描述
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

</style>