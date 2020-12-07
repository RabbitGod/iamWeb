
<template> 
    <div class="auditCatalog" >
        <div class="data">
            <div :class="selected == '1'?'card active':'card'" @click="selected = '1'">
                <div class="number"><span>100</span></div>
                <div class="bottom">账号</div>
            </div>
            <div :class="selected == '2'?'card active':'card'" @click="selected = '2'">
                <div class="number"><span>100</span></div>
                <div class="bottom">内部</div>
            </div>
            <div :class="selected == '3'?'card active':'card'" @click="selected = '3'">
                <div class="number"><span>100</span></div>
                <div class="bottom">外部</div>
            </div>
            <div :class="selected == '4'?'card active':'card'" @click="selected = '4'">
                <div class="number"><span>100</span></div>
                <div class="bottom">停用</div>
            </div>
            <div class="searchBox">
                <Input v-model="value" placeholder="请输入账号火用户名" style="width: 260px" />
                <DatePicker type="daterange" :start-date="new Date(1991, 4, 14)" placement="bottom-end" placeholder="请选择时间区间" style="width: 360px;margin-left:20px;"></DatePicker>
                <CheckboxGroup v-model="disabledGroup"  style="display:inline-block;padding:0 20px" >
                    <Checkbox label="全部" ></Checkbox>
                    <Checkbox label="新增" ></Checkbox>
                    <Checkbox label="修改"></Checkbox>
                </CheckboxGroup>
                <Button type="primary" @click="queryData">查询</Button>
            </div>
            <div class="tableBox">
                <div v-if="tableData.length > 0">
                    <Table size="small" border stripe :columns="columns" :data="tableData"></Table>
                    <br>
                    <Page :current="currentPage" :total="total" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change='pageSizeChange' />
                </div>
                <div class="tips" v-else>
                    没有数据，请选择账号分类以及点击查询按钮
                </div>
                
            </div>
        </div>
        <Modal
			v-model="viewModal"
			footer-hide
			class-name="newsModal"
            transfer
			:styles="{width: '1000px'}">
			<div>
                <div style="padding:20px 0;font-size:16px;">
                    <b>账号名称：{{selNode.name}}<span style="width:40px;display:inline-block;"></span>账号：{{selNode.account}}</b>
                </div>
				<Table size="small" border stripe :columns="viewColumns" :data="viewData"></Table>
			</div>
		</Modal>
    </div>
</template>

<script>

import Cookies from 'js-cookie';

export default {
    data () {
        return {
            tableData:[],
            currentPage:1,
            pageSize:10,
            total:0,
            selected:'',
            viewModal:false,
            columns:[
                {
                        title: '账号名称',
                        width: 90,
                        key: 'name'
                    },
                    {
                        title: '账号',
                        key: 'account',
                        width: 180,
                    },
                    {
                        title: '组织',
                        minWidth: 280,
                        tooltip:true,
                        key: 'org'
                    },
                    {
                        title: '来源',
                        width: 80,
                        key: 'source'
                    },
                    {
                        title: '最新变更人',
                        width: 100,
                        key: 'changeUser',
                        
                    },
                    {
                        title: '最新变更时间',
                        width: 120,
                        key: 'chengeTime',
                        
                    },
                    {
                        title: '最新审批时间',
                        width: 120,
                        key: 'approvalTime',
                        
                    },
                    {
                        title: '历史变更记录',
                        align:'center',
                        width: 80,
                        fixed:'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:'inline-block'
                                    },
                                    on: {
                                        click: () => {
                                            this.view(params.row)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    },
                    {
                        title: '类型',
                        width: 180,
                        key: 'type',
                        
                    }
            ],
            viewData:[
                {
                    source:'导入',
                    changeUser:'管理员',
                    changeTime:'2020-06-12',
                    approvalUser:'管理员2',
                    approvalTime:'2020-06-12',
                    type:'导入-新增',
                    org:'西安分公司/研发部',
                    phone:'18799999999',
                    weChart:'18799999998',
                    qq:'4545454445',
                    dingding:'454546'
                },
                {
                    source:'导入',
                    changeUser:'管理员',
                    changeTime:'2020-06-12',
                    approvalUser:'管理员2',
                    approvalTime:'2020-06-12',
                    type:'导入-新增',
                    org:'西安分公司/研发部',
                    phone:'18799999999',
                    weChart:'18799999998',
                    qq:'4545454445',
                    dingding:'454546'
                },
                {
                    source:'导入',
                    changeUser:'管理员',
                    changeTime:'2020-06-12',
                    approvalUser:'管理员2',
                    approvalTime:'2020-06-12',
                    type:'导入-新增',
                    org:'西安分公司/研发部',
                    phone:'18799999999',
                    weChart:'18799999998',
                    qq:'4545454445',
                    dingding:'454546'
                },
                {
                    source:'导入',
                    changeUser:'管理员',
                    changeTime:'2020-06-12',
                    approvalUser:'管理员2',
                    approvalTime:'2020-06-12',
                    type:'导入-新增',
                    org:'西安分公司/研发部',
                    phone:'18799999999',
                    weChart:'18799999998',
                    qq:'4545454445',
                    dingding:'454546'
                },
            ],
            viewColumns:[
                    {
                        title: '编号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '来源',
                        key: 'source',
                        width: 80,
                    },
                    {
                        title: '变更人',
                        width: 100,
                        key: 'changeUser'
                    },
                    {
                        title: '变更时间',
                        width: 100,
                        key: 'changeTime'
                    },
                    {
                        title: '审批人',
                        width: 100,
                        key: 'approvalUser',
                        
                    },
                    {
                        title: '审批时间',
                        width: 100,
                        key: 'approvalTime',
                        
                    },
                    {
                        title: '类型',
                        width: 120,
                        key: 'type',
                    },
                    {
                        title: '组织',
                        minWidth: 180,
                        tooltip:true,
                        key: 'org',
                        
                    },
                    {
                        title: '电话',
                        width: 120,
                        key: 'phone',
                        
                    },
                    {
                        title: '微信',
                        width: 120,
                        key: 'weChart',
                        
                    },
                    {
                        title: 'QQ',
                        width: 120,
                        key: 'qq',
                        
                    },
                    {
                        title: '钉钉',
                        width: 120,
                        key: 'dingding',
                        
                    }
            ],
            selNode:{}

        }
    },
    created(){
        
    },
    watch:{
      
    },
    computed:{
        
    },
    methods: {
        view(row){
            this.selNode = row;
            this.viewModal=true;
        },
        queryData(){
            this.tableData = [
                {
                    name:'寇向东',
                    account:'10000001000001',
                    org:'西安分公司/研发部',
                    source:'导入',
                    changeUser:'管理员',
                    chengeTime:'2020-06-01',
                    approvalTime:'2020-06-01',
                    type:'导入-新增'
                },
                {
                    name:'寇向东',
                    account:'10000001000001',
                    org:'西安分公司/研发部',
                    source:'导入',
                    changeUser:'管理员',
                    chengeTime:'2020-06-01',
                    approvalTime:'2020-06-01',
                    type:'导入-新增'
                },
                {
                    name:'寇向东',
                    account:'10000001000001',
                    org:'西安分公司/研发部',
                    source:'导入',
                    changeUser:'管理员',
                    chengeTime:'2020-06-01',
                    approvalTime:'2020-06-01',
                    type:'导入-新增'
                },
                {
                    name:'寇向东',
                    account:'10000001000001',
                    org:'西安分公司/研发部',
                    source:'导入',
                    changeUser:'管理员',
                    chengeTime:'2020-06-01',
                    approvalTime:'2020-06-01',
                    type:'导入-新增'
                },
                {
                    name:'寇向东',
                    account:'10000001000001',
                    org:'西安分公司/研发部',
                    source:'导入',
                    changeUser:'管理员',
                    chengeTime:'2020-06-01',
                    approvalTime:'2020-06-01',
                    type:'导入-新增'
                },
                {
                    name:'寇向东',
                    account:'10000001000001',
                    org:'西安分公司/研发部',
                    source:'导入',
                    changeUser:'管理员',
                    chengeTime:'2020-06-01',
                    approvalTime:'2020-06-01',
                    type:'导入-新增'
                },
            ];
            this.total = 50;
        },
        pageSizeChange(val){
            this.pageSize = val;
            this.queryData();
        },
        pageChange(val){
            this.currentPage = val;
            this.queryData();
        },
    },
    components:{
        
    },
    mounted(){
        
    }
};
</script>

<style lang="less" scoped>
    .auditCatalog{
        width: 100%;
        height: calc(100% - 50px);
        .data{
            width: calc(100% - 20px);
            height: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap:wrap;
            justify-content:space-between;
            padding: 20px;
            .card{
                width: calc(25% - 10px);
                height: 90px;
                border-width: 8px 1px 1px 1px;
                border-color: #DEEBF7;
                border-style: solid;
                text-align: center;
                border-radius: 3px;
                .number{
                    height: 62px;
                    line-height: 62px;
                    span{
                        font-size: 24px;
                        font-weight: bold;
                        color:#2d8cf0;
                    }
                }
                .bottom{
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    background: #DEEBF7;
                }
            }
            .active{
                border-color: #2d8cf0;
                .bottom{
                    background: #2d8cf0;
                    color:#fff;
                }
            }
            .searchBox{
                width:100%;
                padding: 10px 0;
            }
            .tableBox{
                width: 100%;
                height: calc(100% - 200px);
                position: relative;
                .tips{
                    width: 100%;
                    text-align: center;
                    position:absolute;
                    top:45%;
                    color:#DAE3F3;
                }
            }
            
        }
    }
    


</style>
<style>

    
    
</style>