
<template> 
    <div class="maintain_cont" >
        
        <div class="maintain_content">
            
            <div class="left ">
                <Tree :data="orgTreeData" :render="renderContent" @on-select-change="selectChange"></Tree>
            </div>
            <div class="right">
                <Row style="border-bottom:1px solid #ccc;padding:20px;" v-if="JSON.stringify(selNode) != '{}' && selNode.type != 'page'">
                    <i-col>
                        <Select ref="user" v-model="selsetedUser" :label-in-value="true" style="width:260px" @on-change="seleceUser" :clearable="true">
                            <Option v-for="item in userOption" :value="item.account" :key="item.account">{{ item.name }}</Option>
                        </Select>
                        <Button type="primary" style="margin-left:20px;" @click="cancelUser">取消审批人</Button>
                    </i-col>
                </Row>
                
                <div style="padding:20px;" class="userCont">
                    <div class="userCard">
                        <div class="icon"><Icon type="ios-contact" size="36" /></div>
                        <div class="body">
                            <div class="name">管理员 <span>admin</span></div>
                            <div class="account">具有所有组织人员变动审批权限</div>
                        </div>
                        
                    </div>
                    
                    <div class="userCard" v-for="(item,index) in users">
                        <div class="icon">
                            <Icon type="ios-contact" size="36" />
                        </div>
                        <div class="body">
                            <div class="name">{{item.name}}<span>{{item.account}}</span></div>
                            <div class="account">{{item.discription}}</div>
                        </div>
                        <div class="close" >
                            <!-- <Icon type="md-close-circle" size="18" /> -->
                            <Poptip 
                                class="deletePop"
                                confirm
                                transfer
                                title="删除后此账号将没有此组织人员变动审批权限"
                                ok-text="确定"
                                @on-ok="removeUser(index)">
                                <Tooltip content="删除" placement="top">
                                    <span class="delete"><Icon type="md-close-circle" size="18" /> </span>
                                </Tooltip>
                            </Poptip>
                        </div>
                    </div>
                </div>
                <div style="padding:20px;display:none;">
                    <Alert show-icon closable>
                        <template slot="desc">
                            <Icon type="ios-disc" />可以为每个组织选择一个或者多个审批人min0 Max4，组织如果未选择分配审批人审批人将是系统内置Console管理员。设置好审批人后也可以通过按钮及审批人头像右上方按钮对其进行取消。管理员从顶级集成来的不能取消。
                            <br><Icon type="ios-disc" />操作前先选择要设置的组织节点
                            <br><Icon type="ios-disc" />审批人采用组织就近原则，同一级多个审批人情况同时出现待办、谁先审批算谁审批、重新提交同理。

                        </template>
                    </Alert>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>

import loadingImg from '@/assets/loading.gif';
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            orgTreeData:[],
            selNode:{},
            oldUsers:[
                {
                    account:'admin',
                    name:'管理员',
                    discription:'具有所有组织人员变动审批权限'
                }
            ],
            users:[],
            selsetedUser:'',
            userOption:[
                {
                    account:'kouxiangdong',
                    name:'寇向东',
                    discription:'具有所有组织人员变动审批权限'
                },
                {
                    account:'wangbaokang',
                    name:'王宝康',
                    discription:'具有所有组织人员变动审批权限'
                }
            ]
        }
    },
    created(){
        this.queryorgList();
    },
    watch:{
        
    },
    methods: {
        cancelUser(){
            this.users = [];
        },
        removeUser(index){
            this.users.splice(index,1)
        },
        seleceUser(node){
                
            
            if(node && !(this.users.find((value, index, arr) => value.account == node.value))){
                let user = this.userOption.find((value, index, arr) => value.account == node.value)
                this.users.push(user)
            }
            this.$refs.user.clearSingleSelect();
            
            
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
        selectChange(nodes){
            if(nodes.length >0){
                let node = nodes[0];
                this.selNode = node;
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
        height:calc(100% - 42px);
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
    .userCont{
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
    }
    .userCont .userCard{
        border: 1px solid #cccccc;
        padding: 10px;
        border-radius: 5px;
        margin-right: 15px;
        margin-bottom: 15px;
        position: relative;
        transition: top 0.3s;
        -moz-transition: top 0.3s;	
        -webkit-transition: top 0.3s;
        -o-transition: top 0.3s;
    }
    .userCont .userCard:hover{
        border: 1px solid #cccccc;
        padding: 10px;
        border-radius: 5px;
        margin-right: 15px;
        position: relative;
        box-shadow: 2px 2px 10px #ccc;
        top: -2px;
    }
    .userCont .userCard .icon{
        float: left;
        width: 40px;
        margin-top: 10px;
        color: #2d8cf0;
    }
    .userCont .userCard .body{
        float: left;
        width: 120px;
        width: 240px;
    }
    .userCont .userCard .body .name{
        font-weight:bold;
        margin-bottom: 10px;
    } 
    .userCont .userCard .body .name span{
        margin-left: 10px;
    }   
    .userCont .userCard .close{
        position: absolute;
        right:2px;
        top:2px;
        color:#ccc;
        cursor: pointer;
    }
    .userCont .userCard .close:hover{
        color:#515a6e
    }

</style>