
<template> 
    <div class="maintain_cont" >
        
        <div class="maintain_content">
            
            <div class="">
                <Row style="border-bottom:1px solid #ccc;padding:20px;">
                    <i-col span="24">
                        <Button type="primary" style="margin-right:20px;" @click="queryUserList">查询</Button>
                        <Input v-model="queryName" placeholder="人名或账号" style="width:260px;margin-right:20px;" />
                        <DatePicker v-model="queryDate" type="daterange" show-week-numbers placement="bottom-end" placeholder="日期区间" style="width: 200px"></DatePicker>
                    </i-col>
                </Row>
                
                <div style="padding:20px;">
                    <Table size="small" border stripe :columns="userColumns" :data="userList"></Table>
                    <br>
                    <Page :current="currentPage" :total="total" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change='pageSizeChange' />
                </div>
            </div>
        </div>
        <Modal v-model="returnModal" footer-hide width="800px" >
            <div class="api" >
                <div class="return">
                    <div class="title"><i class="iconfont icon-bohui"></i> 驳回原因</div>
                    <div class="returnResult">
                        <Input type="textarea" v-model="returnForm.result" readonly />
                    </div>
                    <div class="title">
                        <i class="iconfont icon-icon-test"></i> 附件列表
                        
                    </div>
                    <div class="returnResult">
                        
                    </div>
                    <div class="fileList"style="min-height:80px"></div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>

import loadingImg from '@/assets/loading.gif';
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            orgTreeData:[],
            currentPage:1,
            pageSize:10,
            total:50,
            queryName:'',
            queryDate:['',''],
            returnModal:false,
            returnForm:{
                result:'不符合要求',
            },
            userColumns: [
                    {
                        title: '编号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '申请时间',
                        key: 'creatTime',
                        sortable:true
                    },
                    {
                        title: '人员名称',
                        key: 'userName'
                    },
                    {
                        title: '人员账号',
                        key: 'account'
                    },
                    {
                        title: '结果',
                        key: 'result',
                        
                    },
                    {
                        title:'操作',
                        width:'100px',
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
                                            this.returnModal = true;
                                        }
                                    }
                                }, '详情'),
                            ])
                        }
                    }
                ],
            userList: []
        }
    },
    created(){
        this.queryUserList();
    },
    watch:{
        
    },
    computed:{
    },
    methods: {
        pageSizeChange(val){
            this.pageSize = val;
            this.queryUserList();
        },
        pageChange(val){
            this.currentPage = val;
            this.queryUserList();
        },
        queryUserList (){

            let _this = this;
            this.userList = [
                {
                    creatTime: '2016-10-03 12:00',
                    userName: '张三',
                    account: 'zhangsan',
                    result: '驳回'
                },
                {
                    creatTime: '2016-10-03 12:00',
                    userName: '张三',
                    account: 'zhangsan',
                    result: '驳回'
                },
                {
                    creatTime: '2016-10-03 12:00',
                    userName: '张三',
                    account: 'zhangsan',
                    result: '驳回'
                },
                {
                    creatTime: '2016-10-03 12:00',
                    userName: '张三',
                    account: 'zhangsan',
                    result: '驳回'
                },
                {
                    creatTime: '2016-10-03 12:00',
                    userName: '张三',
                    account: 'zhangsan',
                    result: '驳回'
                },
                {
                    creatTime: '2016-10-03 12:00',
                    userName: '张三',
                    account: 'zhangsan',
                    result: '驳回'
                },
            ]
        },
       
        
    
       
    },
    mounted(){
       
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
.return{
            padding: 10px;
        .title{
            padding: 10px;
        }
        .returnResult{
            padding: 10px;
        }
            .title{
                padding: 10px;
            }
            .btns{
                text-align: right;

            }
            .fileList{
                width: 100%;
                height: 60px;
            }
            .btns button{
                margin: 10px;
            }
            .ivu-upload{
                display: inline-block;
            }
    }
</style>