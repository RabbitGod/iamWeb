
<template> 
    <div class="auditLogin" >
        <div class="data">
            
            <div class="searchBox">
                <DatePicker type="daterange" :start-date="new Date(1991, 4, 14)" placement="bottom-end" placeholder="请选择时间区间" style="width: 400px;"></DatePicker>
                <CheckboxGroup v-model="disabledGroup"  style="display:inline-block;padding:0 20px" >
                    <Checkbox label="成功" ></Checkbox>
                    <Checkbox label="失败" ></Checkbox>
                    <Checkbox label="恶意"></Checkbox>
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
                    没有数据，点击查询按钮查询
                </div>
                
            </div>
        </div>
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
            systems: [
                {
                    value: 'system1',
                    label: '系统1'
                },
                {
                    value: 'system2',
                    label: '系统2'
                }
            ],
            system: '',
            columns:[
                {
                        title: '账号名称',
                        width: 120,
                        key: 'name'
                    },
                    {
                        title: '账号',
                        key: 'account',
                        width: 180,
                    },
                    {
                        title: '账号状态',
                        width: 120,
                        key: 'state',
                        
                    },
                    {
                        title: '登录状态',
                        width: 120,
                        key: 'loginState',
                        
                    },
                    {
                        title: '访问时间',
                        width: 220,
                        key: 'visitTime'
                    },
                    {
                        title: '访问地址',
                        minWidth: 220,
                        tooltip:true,
                        key: 'visitUrl'
                    },
                    {
                        title: '访问状态',
                        width: 180,
                        key: 'visitState',
                        
                    }
            ],

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
                    state:'正常',
                    loginState:'一登录',
                    visitTime:'2020-06-01 12:12:12',
                    visitState:'成功',
                    visitUrl:'www.iam.com'
                },
                {
                    name:'寇向东',
                    account:'10000001000001',
                    state:'正常',
                    loginState:'一登录',
                    visitTime:'2020-06-01 12:12:12',
                    visitState:'成功',
                    visitUrl:'www.iam.com'
                },
                {
                    name:'寇向东',
                    account:'10000001000001',
                    state:'正常',
                    loginState:'一登录',
                    visitTime:'2020-06-01 12:12:12',
                    visitState:'成功',
                    visitUrl:'www.iam.com'
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
    .auditLogin{
        width: 100%;
        height: calc(100% - 50px);
        .data{
            width: calc(100% - 20px);
            height: 100%;
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
                padding: 10px 0 20px;
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