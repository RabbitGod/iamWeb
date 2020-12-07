
<template> 
    <div class="maintain_cont" >
        
        <div class="maintain_content">
            
            <div class="left ">
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
                
                <div v-if="selNode.type == 'page'" style="padding:20px;">
                    <Table size="small" border :columns="userColumns" :data="userList"></Table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import loadingImg from '@/assets/loading.gif';
import Cookies from 'js-cookie';
export default {
    name:'maintainCatalog',
    data () {
        return {
            orgTreeData:[]
        }
    },
    created(){
        this.queryorgList();
    },
    watch:{
        
    },
    methods: {
       
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
       
    }
};
</script>

<style lang="less" scoped>
    .maintain_cont{
        width: 100%;
        height:100%;
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