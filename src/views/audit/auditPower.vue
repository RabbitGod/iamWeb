
<template> 
    <div class="auditLogin" >
        <div class="data">
            
            <div class="searchBox">
                <Input v-model="value" placeholder="请输入账号火用户名" style="width: 200px" />
                <Select v-model="system" style="width:200px;margin-left:20px;">
                    <Option v-for="item in roles" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <DatePicker type="daterange" :start-date="new Date(1991, 4, 14)" placement="bottom-end" placeholder="请选择时间区间" style="width: 220px;margin-left:20px;"></DatePicker>
                <CheckboxGroup v-model="disabledGroup"  style="display:inline-block;padding:0 20px" >
                    <Checkbox label="分配" ></Checkbox>
                    <Checkbox label="取消" ></Checkbox>
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
            roles: [
                {
                    value: 'role1',
                    label: '角色1'
                },
                {
                    value: 'role2',
                    label: '角色2'
                }
            ],
            system: '',
            columns:[
                    {
                        title: '授权类型',
                        width: 120,
                        key: 'type'
                    },
                    {
                        title: '名称',
                        minWidth: 220,
                        tooltip:true,
                        key: 'name'
                    },
                    {
                        title: '编号',
                        key: 'code',
                        width: 180,
                    },
                    {
                        title: '分配类型',
                        width: 120,
                        key: 'allocationType'
                    },
                    {
                        title: '角色',
                        width: 200,
                        key: 'role'
                    },
                    {
                        title: '操作时间',
                        width: 220,
                        key: 'operationTime',
                    },
                    {
                        title: '操作账号名称',
                        width: 220,
                        key: 'operationName',
                    },
                    {
                        title: '操作账号',
                        minWidth: 220,
                        key: 'operationAccount',
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
                    type:'组织',
                    name:'西安研发中心',
                    code:'10000001000001',
                    allocationType:'分配',
                    role:'财务-预算',
                    operationTime:'2020-06-01 12:21:12',
                    operationName:'管理员',
                    operationAccount:'admin',
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