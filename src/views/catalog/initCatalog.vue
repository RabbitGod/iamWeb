
<template> 
    <div class="init_cont" >
        <div class="init_content" v-if="loadingStatus == 'loading'">
            <div class="pageTitle">
                <div class="title"><Icon size="24" type="md-git-network" />目录初始化</div>
                <div class="pass">
                    <Button type="primary" icon="ios-skip-forward">跳过</Button>
                </div>
            </div>
            <div style="text-align:center;height:calc(100% - 700px); min-height:120px; padding-top:50px">
                <Upload
                    v-if="!file"
                    ref="upload"
                    accept=".xls,.xlsx"
                    :format="['.xls','.xlsx']"
                    :before-upload="handleUpload"
                    action="//jsonplaceholder.typicode.com/posts/">
                    <Button class="uploaBtn" ><i class="iconfont icon-shangchuan"></i>上传目录数据文件</Button>
                </Upload>
                <div class="selectedFile" v-if="file">
                    <svg t="1589339011439" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3511" width="48" height="48"><path d="M682.666667 42.666667H298.666667c-25.6 0-42.666667 17.066667-42.666667 42.666666v213.333334l426.666667 213.333333 170.666666 64 170.666667-64V298.666667l-341.333333-256z" fill="#21A366" p-id="3512"></path><path d="M256 298.666667h426.666667v213.333333H256z" fill="#107C41" p-id="3513"></path><path d="M1024 85.333333v213.333334h-341.333333V42.666667h298.666666c21.333333 0 42.666667 21.333333 42.666667 42.666666z" fill="#33C481" p-id="3514"></path><path d="M682.666667 512H256v426.666667c0 25.6 17.066667 42.666667 42.666667 42.666666h682.666666c25.6 0 42.666667-17.066667 42.666667-42.666666v-213.333334l-341.333333-213.333333z" fill="#185C37" p-id="3515"></path><path d="M588.8 256H256v597.333333h324.266667c29.866667 0 59.733333-29.866667 59.733333-59.733333V307.2c0-29.866667-21.333333-51.2-51.2-51.2z" opacity=".5" p-id="3516" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path><path d="M546.133333 810.666667H51.2C21.333333 810.666667 0 789.333333 0 759.466667V264.533333C0 234.666667 21.333333 213.333333 51.2 213.333333h499.2c25.6 0 46.933333 21.333333 46.933333 51.2v499.2c0 25.6-21.333333 46.933333-51.2 46.933334z" fill="#107C41" p-id="3517"></path><path d="M145.066667 682.666667L256 512 153.6 341.333333h81.066667l55.466666 106.666667c8.533333 12.8 8.533333 21.333333 12.8 25.6l12.8-25.6L375.466667 341.333333h76.8l-102.4 170.666667 106.666666 170.666667h-85.333333l-64-119.466667c0-4.266667-4.266667-8.533333-8.533333-17.066667 0 4.266667-4.266667 8.533333-8.533334 17.066667L226.133333 682.666667H145.066667z" fill="#FFFFFF" p-id="3518"></path><path d="M682.666667 512h341.333333v213.333333h-341.333333z" fill="#107C41" p-id="3519"></path></svg>
                    <span class="fileName">{{ file.name }} </span>
                    
                    <Poptip 
                        class="deletePop"
                        confirm
                        title="删除后将需要重新上传进行同步"
                        ok-text="确定"
                        @on-ok="deleteFile">
                        <Tooltip content="删除" placement="top">
                            <span class="delete"><Icon type="md-trash" size="34" /> </span>
                        </Tooltip>
                    </Poptip>
                    
                </div>
            </div>
            <div class="file" v-if="file == null">
                <div class="download">下载目录规范数据模板<Icon type="md-download" style="color:#2d8cf0" size="18" /></div>
                <div class="info">
                    <div class="info_left" style="padding-top:50px;">
                        <Icon type="md-bulb" size="80" />
                    </div>
                    <div class="info_right">
                        <div>
                            <p>目录初始化是指IAM系统中还没有目录数据信息，这个时候往往系统刚刚上线，需要进行大量目录数据初始化工作。</p>   
                            <p>目录初始化可以进行批量目录信息导入，<b>此操作需谨慎选择遇到DN的信息是否更新还是跳过！</b></p>    
                            <p>目录初始化组织和人员信息分开进行，系统不支持一次上传导入操作。</p>    
                            <p>特别注意：DN、UID、EMAIL、QQ、WX、DD值均为全局唯一</p>  
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="file !== null" class="file">
                <div style="text-align:left; width:80%;margin:20px auto">
                    <RadioGroup v-model="operType">
                        <Radio label="cover" operType>跳过</Radio>
                        <Poptip v-model="visible">
                            <Radio label="edit" operType>更新</Radio>
                            <div class="api" slot="content" style="display:flex;color:red;">
                                <div><Icon type="ios-warning-outline" size="60" /></div><div style="width:200px;word-wrap:break-word;white-space:normal;padding:10pox">您选择了更新DN，更新后历史数据将完全被覆盖！！！</div>
                            </div>
                        </Poptip>
                    </RadioGroup>
                </div>
                <div class="info">
                    <div class="info_left">
                        <Icon type="md-bulb" size="80" />
                    </div>
                    <div class="info_right">
                        
                        <div>
                            <p>您已成功选择了{{ file.name }}</p>
                            <p>请选择覆盖DN 或 修改DN 然后进入下一步。</p>
                        </div>
                    </div>
                </div>
                
                <div class="footOper">
                    <div class="next" v-if="conframe">
                        <Button type="primary" icon="ios-skip-forward" @click="upload">下一步</Button>
                    </div>
                    <Modal
                        v-model="logShow"
                        cancel-text="取消"
                        @on-ok="con_ok"
                        @on-cancel="con_cancel">
                        <div>
                            您已成公选择了泽佳科益科技有限公司目录组织主数据.xlsx。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。<br><br>
                            请选择覆盖DN 或 修改DN 然后进入下一步。
                        </div>
                    </Modal>
                </div>
            </div>
            
        
        </div>
        
        <div v-if="loadingStatus == 'error'" class="error">
            <div style="margin-right:40px; color:red"><Icon type="md-warning" size="60" /></div>
            <div style="line-height:60px" class="text">
                <p><span></span>导入失败</p>
            </div>
            <div>
                <Button @click="logShow = true">查看失败信息</Button>
            </div>
        </div>
        <div v-if="loadingStatus == 'success'" class="success">
            <div style="margin-right:40px; color:#00CC66"><Icon type="ios-happy" size="60" /></div>
            <div style="line-height:30px" class="text">
                <p><span></span>已成功导入目录输入1003条</p>
                <p><span></span>成功跳过目录30条</p>
            </div>
        </div>
        <div v-if="loadingStatus == 'success'" class="successBtn">
            <Button type="primary" icon="ios-skip-forward" @click="openCatalog" >进入目录</Button>
        </div>

        <div class="iam_loading" :style="{width:fullWidth+'px',height:fullHeight+'px'}" v-if="uploadLoading">
            <div class="loading">
                <img v-if="loadingStatus == 'loading'" :src="loadingImg"/>
                <!-- <Icon v-if="loadingStatus == 'success'" size="120" color="#00ea12" type="md-checkmark-circle" />
                <Icon v-if="loadingStatus == 'error'"  size="120" color="#ffd400" type="ios-warning" /> -->
            </div>
            <div class="text" v-if="loadingStatus == 'loading'">同步中,请稍等...</div>
            <!-- <div  v-if="loadingStatus == 'success'" style="width:600px;height:60px; text-align:center;">
                <Button @click="openCatalog"> 进入目录</Button>
            </div>
            <div  v-if="loadingStatus == 'error'" style="width:600px;height:60px; text-align:center;">
                <Button @click="openLog">查看失败详细信息</Button>
            </div> -->
        </div>
    </div>
</template>

<script>

import loadingImg from '@/assets/loading.gif';

import Cookies from 'js-cookie';

export default {
    data () {
        return {
            visible:false,
            loadingImg :loadingImg,
            fullHeight:document.documentElement.clientHeight,
            fullWidth:document.documentElement.clientWidth,
            orgDrawer:false,//编辑创建组织抽屉
            userDrawer: false,//编辑创建用户抽屉
            conframe:false,//是否显示下一步按钮
            conModal:false,//勾选覆盖是二次确认框
            logShow:false,//是否显示log
            loading:false,//提交loading
            uploadLoading:false,//是否显示loading
            loadingStatus: 'loading',//加载状态和结果是否成功 loading加载中，error失败,success成功
            file: null,//上传的文件
            operType: '',
            
        };
    },
    created(){
        
    },
    watch:{
        operType(val){
            if(val =='cover'){
                // this.conModal = true;
                this.conframe = true;
                this.visible = false;
            }else{
                this.conframe = true;
                this.visible = true;
            }
        }
    },
    methods: {
        deleteFile(){
            this.file = null
        },
        openCatalog(){
            this.uploadLoading = false;
            this.loadingStatus = 'loading';
            this.$emit('menu','maintainCatalog')
        },
        openLog(){
            this.logShow = true;
            this.uploadLoading = false;
            this.loadingStatus = 'loading';
        },
        con_ok(){
            this.conframe = true;
        },
        con_cancel(){
            this.conModal = false;
            this.operType = 'edit';
            this.conframe = true;
        },
        handleUpload (file) {
            this.file = file;
            return false;
        },
        upload () {
            this.uploadLoading = true;
            // this.$refs.upload.post(this.file);
            setTimeout(() => {
                // this.file = null;
                this.loadingStatus = 'success';
                this.uploadLoading = false;
            }, 2500);
        },
       
    },
    mounted(){
        const that = this;
        window.onresize = () => {
            return (() => {
                that.fullHeight = document.documentElement.clientHeight;
                that.fullWidth = document.documentElement.clientWidth;
            })()
        }
    }
};
</script>

<style lang="less" scoped>
    .init_cont{
        width: 100%;
        height: calc(100% - 60px);
    }
    .init_cont .left{
        width: 240px;
        height: 100%;
        padding: 10px;
        overflow: auto;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        float: left;
    }
    .init_cont .right{
        width: calc(100% - 480px);
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

    

.init_content{
    width: 100%;
    height: 100%;
    background: #fff;
        overflow-y: auto;
}
.uploaBtn{
    height: auto;
    width:460px;
    padding: 15px;
    border:1px dashed #BDD7EE;
    font-size: 24px;
}
.uploaBtn i{
    font-size: 40px;
    vertical-align: middle;
    color:#2d8cf0;
    padding-right: 15px;
}

.pageTitle{
    height:60px;
    padding:10px 20px;
    border-bottom:2px solid #ccc;
    margin-bottom: 20px;
}
.pageTitle .title{
    float: left;
    line-height: 40px;
    font-size: 20px;
}
.pageTitle .pass{
    float: right;
}
.pageTitle .pass .ivu-btn{
    width: 80px;
    height: 40px;
}
.init_content .ivu-upload{
    text-align: center;
}
.init_content .download{
    text-align: right;
    width: 80%;
    margin: 20px auto 0;
    cursor: pointer;
}
.init_content .selectedFile{
    border: 1px dashed #BDD7EE;
    padding: 15px 120px;
    width: auto;
    display: inline-block;
    margin: 0 auto;
}
.init_content .file{
    text-align: center;
    padding: 15px;
    position: relative;
    padding-top: 50px;
}
.init_content svg{
    vertical-align: middle;
}
.init_content .fileName{
    vertical-align: middle;
    padding-left: 20px;
    font-size: 20px;
    color: #00B050;
    margin-right: 40px;
}
.init_content  .delete{
    vertical-align: middle;
    font-size: 20px;
    color: #caead9;
    cursor: pointer;
}
.init_content .selectedFile:hover{
    .delete{
        color: #d2691f;
    }
}
.init_content .file .info{
    width: 80%;
    margin: 20px auto 0;
    background: #F0F4FA;
    padding: 20px;
    display: flex;
    justify-init_content: center;
    flex-direction: row;
    border: 1px solid #DEEBF7;
    border-radius: 5px;
}

.init_content .file .info .info_left{
    width:120px;
    line-height:150px;
    color:#2d8cf0;
}
.init_content .file .info .info_right{
    width: calc(100% - 160px);
    text-align: left;
}
.init_content .file .info .info_right p{
    font-size: 16px;
    padding: 10px;
}
.init_content .file .footOper{
    bottom: 20px;
    width: 80%;
    height: 60px;
    margin: 40px auto 0 auto;
    text-align: left;
}
.init_content .file .footOper .next{
    float: right;
}
.init_cont .error{
    width: 80%;
    margin: 200px auto 0;
    background: #F0F4FA;
    padding: 20px;
    display: flex;
    justify-init_content: center;
    flex-direction: row;
    border: 1px solid #DEEBF7;
    border-radius: 5px;
}
.init_cont .success{
    width: 80%;
    margin: 200px auto 0;
    background: #F0F4FA;
    padding: 20px;
    display: flex;
    justify-init_content: center;
    flex-direction: row;
    border: 1px solid #DEEBF7;
    border-radius: 5px;
}
.init_cont .error .text{
    width: calc(100% - 120px);
}
.init_cont .error .text p span{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 6px 15px 0 0;
    border-radius: 100%;
    background:#767171 ;
}
.init_cont .success .text p span{
    width: 10px;
    height: 10px;
    margin: 6px 15px 0 0;
    border-radius: 100%;
    background:#767171 ;
    display: inline-block;
}
.init_cont .successBtn{
    text-align: right;
    width: 80%;
    margin: 80px auto 0;
}
.init_cont .deletePop .ivu-poptip-popper .ivu-icon{
    top:25px;
    left:20px;
}
</style>
<style >
.init_cont .deletePop .ivu-poptip-popper .ivu-icon{
    top:25px;
    left:20px;
}
</style>
