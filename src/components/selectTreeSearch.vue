<template>
    <div id="selectTreeSearch">
        <div style="width:100%;" v-clickoutside="handleClose">
            <div ref="treeContent" class="treeContent" @click="clickHandel($event)">
                <div class="contInp" v-if="multiple">
                    <div class="item itemTag" v-for="item in selectTreeData">
                        <div class="itemIcon"><Icon type="md-person"/></div>
                        <div class="itemName">{{item.title}}</div>
                        <div class="itemClose"  @click.stop="deleteItem(item)"><Icon type="md-close" /></div>
                    </div>
                    <div class="item">
                        <Input 
                        ref="inp" 
                        size="small" 
                        :readonly="!isInput" 
                        @input="inputChange" 
                        :placeholder="placeholder"/>
                    </div>
                </div>
                <div class="contInp" v-if="!multiple">
                    <Input 
                        ref="inp" 
                        :readonly="!isInput" 
                        v-model="selData"
                        @input="inputChange" 
                        :placeholder="placeholder"/>
                </div>
                <div class="iconDiv"><Icon type="ios-arrow-down"></Icon></div>
                <div class="dropdownCont">
                    <div class="dropdown" v-show="show" @click="show=true">
                        <Tree :render="renderContent" :load-data="loadData"  :data="optionData"  @on-select-change="checkTree" ></Tree>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>

</template>
<script>




export default {
    name: 'select-tree-search',
    data(){
        return{
            selectData:[],//选择的数据title，用于显示
            selectTreeData:[],//选择的数据
            show: false,//是否显示下拉
            searchtimer:function(){},//输入的计时器
            selData:'',//单选时显示选择的数据title
            optionData:[]//下拉树的数据
        }
    },
    watch:{
        optionData(val){
            let _this = this;
            // if(_this.selLeaf){
            //     function getArray(data){
            //         for (var i in data) {
                        
            //             if (data[i].children && data[i].children.length > 0) {
            //                 data[i]['disableCheckbox'] = true;
            //                 getArray(data[i].children);
            //             }
            //         }
            //     }
            //     getArray(_this.optionData)
            // }
        },
        selectTreeData(val){
            
            let _this = this;
            _this.selectData = val;
            _this.selData = val.length>0?val[0][this.dataKey]:'';
            _this.$emit('select-change',_this.selectData );
            _this.inputFocus();
        }
    },
    props:{
        
        treeData: {//父组件传过来的树数据
            
        },
        isLoadData: {//是否异步加载数据
            
        },
        loadDataUrl: {//异步加载的借口地址
            
        },
        placeholder: {
            type: String,
            default: ''
        },
        dataKey: {//树形的数据key
            type: String,
            default: ''
        },
        selLeaf:{
            type: Boolean,
            default: false
        },
        isInput:{//是否支持输入搜索
            type: Boolean,
            default: false
        },
        multiple:{//是否支持多选
            type: Boolean,
            default: false
        },
        authority:{//是否有权限限制
            type: Boolean,
            default: true
        },
    },
    methods:{
         renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '80%'
                }
            }, [
                h('span',{
                      class:this.isSome(this.selectTreeData,node.node.id)?'ivu-tree-title selectClassTree':'ivu-tree-title',
                      on: {
                          click: () => { this.OnSelectChange(node.node) }
                      }
                    }, [
                    h('Icon', {
                        props: {
                            type: data.needData?'ios-person':'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span',  data.title)
                ])

            ]);
        },
        isSome(arr,id){
            
            let result = arr.some(item => {
                if(item.id == id){
                    return true
                }else{
                    return false
                }
            })
            return result
        },
        OnSelectChange(node){
            let flag = true;
            let indexArr = -1;
            let arr = []
            if(this.multiple){
                if(this.selectTreeData.length>0){
                    this.selectTreeData.forEach((item,index)=>{
                        if(node.id===item.id){ 
                            flag = false;
                            indexArr = index
                        }
                    });
                    if(flag){ 
                        if(node.needData){
                            this.selectTreeData.push(node);
                        }
                    }else{ 
                        if(node.needData){
                            this.selectTreeData.splice(indexArr,1);
                        }
                    }
                    flag = true;
                }else{
                    if(node.needData){
                        this.selectTreeData.push(node)
                    }
                }
            }else{
                this.selectTreeData = [];
                this.selectTreeData.push(node)
            }
            
            
        },
        deleteItem(node){
            let _this = this;
            let id = node.id;
            let index = _this.selectTreeData.findIndex((value, index, arr) => {return value.id == id});
            console.log(index)
            this.selectTreeData.splice(index,1);


            function getArray(data){
                for (var i in data) {
                    
                    if (data[i].id == id) {
                        data[i]['checked'] = false;
                    }else{
                        if (data[i].children && data[i].children.length > 0) {
                             getArray(data[i].children)
                        }
                       
                    }
                }
            }
            
            getArray(_this.optionData)
            
        },
        loadData (item, callback) {
            
            let _this = this;
            let params = {
                param:item.id,
				authority:_this.authority
            }
            _this.axios.get(_this.loadDataUrl,{params:params})
            .then(function (response) {
                if(response.data.meta.status != 0){callback([]); return}
                let data = response.data.data;
                for(let i=0;i<data.length;i++){
                    if(!!data[i].needData){
                        data[i] = {
                            title:data[i].title,
                            id:data[i].id,
                            account:data[i].account,
                            needData:true,
                        }
                    }
                }
                callback(data);
            });
            
        },
        selectTree(node){
            this.selectTreeData = node;
        },
        checkTree(node){
            
            if(this.selLeaf){
                let arr = [];
                for(let i=0;i<node.length;i++){
                    if(!!node[i].needData){
                        
                        arr.push(node[i]);
                    }
                }
                this.selectTreeData = arr;
            }else{
                this.selectTreeData = node;
            }
        },
        handleClose() {
            this.show = false;
            
        },
        clickHandel(event){
            // console.log(event)
            this.show = true;
            this.inputFocus();
        },
        inputChange(val){
            let _this = this;
            _this.show = true;
            
            
            if(_this.isLoadData){
                clearTimeout(_this.searchtimer);
                _this.searchtimer = setTimeout(function(){
                    _this.$emit('get-tree-data',val)
                }, 300);
            }else{
                clearTimeout(_this.searchtimer);
                _this.searchtimer = setTimeout(function(){
                    let tempTreeData = [];
                    let treeNodes = _this.util.convertTreeToListCurrency(_this.treeData);
                    for(let i=0;i<treeNodes.length;i++){
                        if(treeNodes[i][_this.dataKey].indexOf(val) != -1){
                            
                            tempTreeData.push(treeNodes[i]);
                        }
                    }
                    _this.optionData = tempTreeData;
                }, 300);
                
            }
            

        },
        inputFocus(){
            if(this.isInput){
                this.$refs.inp.focus();
            }
            
        }
    },
    mounted(){
        this.$nextTick(()=>{
            
            this.optionData = this.treeData
        })
    }
}

  
</script>

<style>
    #selectTreeSearch{
        display: inline-block;
        cursor: pointer;
        vertical-align: middle;
        width: 100%;
        background: #fff;
        position: relative;
    }
    #selectTreeSearch .ivu-input{
      border: none;
      
    }
    #selectTreeSearch  .treeContent{
        width: 100%;
        border: 1px solid #dcdee2;
        border-radius: 3px;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
    }
     #selectTreeSearch .dropdownCont{
        widows: 100%;
        height: 1px;
        position: relative;
    }
    #selectTreeSearch  .treeContent .dropdown{
        position: absolute;
        width: 100%;
        left: 0; 
        top:0px;
        border: 1px solid #dcdee2;
        background: #fff;
        z-index: 100;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        overflow: auto;
        max-height: 300px;
    }
   
    #selectTreeSearch .ivu-input{
      cursor: pointer;
    }
    #selectTreeSearch .ivu-input:focus{
      border: none;
      box-shadow: 0px 0px 0px 0px #fff;
    }
    #selectTreeSearch .multipleClass .ivu-tree-title-selected,#selectTreeSearch .multipleClass .ivu-tree-title:hover,#selectTreeSearch .multipleClass .ivu-tree-title-selected:hover{
        background-color: #fff;
            color: #515a6e;
    }
    #selectTreeSearch .contInp{
        width: calc(100% - 30px);
        display: inline-block;
        padding: 0 3px;
        vertical-align: middle;
        overflow: auto;
        max-height: 300px;
    }
    #selectTreeSearch .contInp .itemTag{
        vertical-align: middle;
        border: 1px solid #e8eaec;
        border-radius: 3px;
        background: #f7f7f7;
        padding: 0 8px;
        margin: 2px 2px 2px 0;
    }
    #selectTreeSearch .contInp .item{
        float: left;
        height: 29px;
        line-height: 22px;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
    }
    #selectTreeSearch .itemName{
        /* width:60px; */
        height:20px;
        display: inline-block;
        vertical-align: middle;
        line-height: 18px;
    }
   #selectTreeSearch .itemIcon{
        height:20px;
        width: 20px;
        border-radius: 50%;
        text-align: center;
        font-size: 16px;
        line-height: 16px;
        display: inline-block;
        background: #fff;
        vertical-align: middle;
   }
   #selectTreeSearch .itemClose{
        height:16px;
        width: 16px;
        border-radius: 50%;
        border: 1px solid #ccc;
        text-align: center;
        font-size: 14px;
        line-height: 10px;
        display: inline-block;
        background: #fff;
        vertical-align: middle;
        margin-left: 3px;
        color: #ccc;
   }
    #selectTreeSearch .itemClose:hover{
        border: 1px solid #aaa;
        color: #aaa;
   }


    #selectTreeSearch .iconDiv{
        width: 20px;
        display: inline-block;
    }
</style>