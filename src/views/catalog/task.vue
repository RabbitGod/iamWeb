
<template> 
    <div class="maintain_cont" >
        
        <div class="maintain_content">
            
            <div class="">
                <Row style="border-bottom:1px solid #ccc;padding:20px;">
                    <i-col span="24">
                        <Button type="primary" style="margin-right:20px;" @click="create">新增</Button>
                        <Button type="primary" style="margin-right:20px;" @click="queryUserList">查询</Button>
                        <Select v-model="system" style="width:200px;margin-right:20px;" placeholder="请选择应用系统">
                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="status" style="width:200px" placeholder="请选择类型">
                            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
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
                    <Form ref="tiggerForm" :model="formData" :label-width="80" >
                        <FormItem label="名称" prop="name">
                            <Input v-model="formData.name"  placeholder="输入名称" ></Input>
                        </FormItem>
                        <FormItem label="系统" prop="system">
                            <Select v-model="formData.system" >
                                <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        
                        <FormItem label="目录类型" prop="catalogType">
                            <RadioGroup v-model="formData.catalogType" >
                                <Radio label="组织"></Radio>
                                <Radio label="账号"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="范围" prop="range">
                            <Select v-model="formData.range" placeholder="请选择范围">
                                <Option v-for="item in rangeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="周期类型" prop="cronType">
                            <RadioGroup v-model="formData.cronType" >
                                <Radio label="分发"></Radio>
                                <Radio label="获取"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="周期" prop="cron">
                            <cron v-model="formData.cron" ></cron>
                        </FormItem>
                        <FormItem label="描述" prop="description">
                            <Input v-model="formData.description" placeholder="输入描述"></Input>
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
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            orgTreeData:[],
            currentPage:1,
            pageSize:10,
            total:50,
            system:'',
            status:'',
            modal:false,
            oprType:'',
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
            statusList:[
                {
                    value:'1',
                    label:'通过'
                },
                {
                    value:'2',
                    label:'驳回'
                },
                {
                    value:'3',
                    label:'结束'
                }
            ],
            rangeList:[
                {
                    value:'1',
                    label:'范围1'
                },
                {
                    value:'2',
                    label:'范围2'
                },
                {
                    value:'3',
                    label:'范围3'
                }
            ],
            typeList:[
                {
                    value:'1',
                    label:'类型1'
                },
                {
                    value:'2',
                    label:'类型2'
                },
                {
                    value:'3',
                    label:'类型3'
                }
            ],
            formData:{
                name:'',
                system:'',
                range:'',
                catalogType:'',
                cronType:'',
                cron:'* * * ? * * *',
                type:'',
                description:''
            },
            userColumns: [
                    {
                        title: '名称',
                        key:'name'
                    },
                    {
                        title: '执行周期',
                        key: 'cron',
                        width:'300'
                    },
                    {
                        title: '目标系统',
                        key: 'system'
                    },
                    {
                        title: '目录范围',
                        key: 'rangeLabel'
                    },
                    {
                        title: '目录类型',
                        key: 'typeLabel'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width:'200px',
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
                                            this.tigger()
                                        }
                                    }
                                }, '触发'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            
                                        }
                                    }
                                }, '删除')
                            ]);
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
    components:{
        cron
    },
    methods: {
        
        cancel () {
            this.modal = false;
            this.oprType = '';
        },
        tigger(){
            
        },
        edit(row){
            this.oprType = 'edit'
            this.modal = true;
            this.formData.name = row.name;
            this.formData.system = row.system;
            this.formData.range = row.range;
            this.formData.cron = row.cron;
            this.formData.type = row.type;
            this.formData.description = row.description;
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
        queryUserList (){

            let _this = this;
            this.userList = [
                {
                    name: 'aaaa',
                    system:'oa',
                    cron: '01,02 0/5 0/3 ? 1-3 * 2020-2021',
                    range: '1',
                    type: '1',
                    description :'asdasdas',

                    systemName:'泽佳OA系统',
                    rangeLabel:'范围1',
                    typeLabel:'类型1'
                },
                {
                    name: 'aaaa',
                    system:'oa',
                    cron: '01,02 0/5 0/3 ? 1-3 * 2020-2021',
                    range: '1',
                    type: '1',
                    description :'asdasdas',

                    systemName:'泽佳OA系统',
                    rangeLabel:'范围1',
                    typeLabel:'类型1'
                },
                {
                    name: 'aaaa',
                    system:'oa',
                    cron: '01,02 0/5 0/3 ? 1-3 * 2020-2021',
                    range: '1',
                    type: '1',
                    description :'asdasdas',

                    systemName:'泽佳OA系统',
                    rangeLabel:'范围1',
                    typeLabel:'类型1'
                },
                {
                    name: 'aaaa',
                    system:'oa',
                    cron: '01,02 0/5 0/3 ? 1-3 * 2020-2021',
                    range: '1',
                    type: '1',
                    description :'asdasdas',

                    systemName:'泽佳OA系统',
                    rangeLabel:'范围1',
                    typeLabel:'类型1'
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