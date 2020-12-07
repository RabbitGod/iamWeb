<template>
	<div class="home">
		<div class="leftCont">
			<div class="top" v-if="user != 'admin'">
				<a class="card" v-for="(item,index) in aData" :key="index" :href="item.path" target="_blank" >
					<div class="icon"  >
						<img :src="item.img">
					</div>
					<div class="name">{{item.name}}</div>
				</a>
			</div>
			<div class="foot" v-if="user != 'admin'">
				<div class="head">消息待办<span class="more" @click="newsModal = true">更多</span></div>
				<ul class="ul">
					<li v-for="(item,index) in news" class="li":key="index">
						<div class="dic"></div>
						<div :class="'title '+ 'color'+item.status">{{item.title}}</div>
						<div class="time">{{item.time}}</div>
						<div class="btns">
							<Poptip v-if="item.status == '1'"
								confirm
								title="通过后变动的人员账号将生效"
								ok-text="通过"
								@on-ok="pass">
								<span class="btn pass">通过</span>
							</Poptip>
							<Poptip width="400" class="homePop" v-model="item.popTip" v-if="item.status == '1'">
								<span  class="btn return"@click.stop @click="item.popTip = true">驳回</span>
								<div class="api" slot="content">
									<div class="return">
										<div class="title"><i class="iconfont icon-bohui"></i> 驳回原因</div>
										<div class="returnResult">
											<Input type="textarea" v-model="returnForm.result" />
										</div>
										<div class="title">
											<i class="iconfont icon-icon-test"></i> 附件列表
											<Upload
												multiple
												action="//jsonplaceholder.typicode.com/posts/">
												<Button type="primary"  icon="ios-cloud-upload-outline" size="small"></Button>
											</Upload>
										</div>
										<div class="returnResult">
											
										</div>
										<div class="fileList"></div>
										<div class="btns">
											<Button size="small" type="primary" @click="item.popTip = false">驳回</Button>
											<Button size="small" @click="item.popTip = false" >取消</Button>
										</div>
									</div>
								</div>
							</Poptip>
							<Poptip v-if="item.status == '2'"
								confirm
								title="密码重置后原始密码将失效，邮件发送给账号人员"
								ok-text="重置">
								<span  class="btn reset">重置</span>
							</Poptip>
							<span class="btn read" v-if="item.status == '3'">已读</span>
						</div>
					</li>
				</ul>
			</div>
			<div v-if="user == 'admin'" style="height:160px">
				<div class="task" >
					<div class="head">账号数</div>
					<div class="number">
						<Tooltip content="点击进入组织列表" placement="top">
                            <span @click="target('userUpdate')">123213</span>
                        </Tooltip>
					</div>
				</div>
				<div class="task"  style="margin-left:20px;">
					<div class="head">组织数</div>
					<div class="number">
						<Tooltip content="点击进入组织列表" placement="top">
                            <span @click="target('orgUpdate')">123213</span>
                        </Tooltip>
					</div>
				</div>
			</div>
			
			<div class="chart"  v-if="user == 'admin'">
				<div class="head">登录统计</div>
    			<div id="myChart" style="width:100%;height:calc(100% - 40px)"></div>
			</div>
			<div class="foot homeChart" v-if="user == 'admin'">
				<div class="head">最新操作<span class="more" @click="toAudit('auditLogin')">更多</span></div>
				<div style="padding:10px" class="rotation">
					<div class="title">
						<div class="td">操作人</div>
						<div class="td">操作时间</div>
						<div class="td">操作类型</div>
						<div class="td">客户端ip</div>
						<div class="td">内容</div>
					</div>
					<div class="box">
						<div class="content" id="content">
							<div class="list" v-for="(item,index) in listData" :key="index">
								<div class="td">{{item.user}}</div>
								<div class="td">{{item.time}}</div>
								<div class="td">{{item.type}}</div>
								<div class="td">{{item.ip}}</div>
								<div class="td">{{item.cont}}</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			
		</div>
		<div class="rightCount">
			<!-- 管理员 -->
			<div style="height:160px;position:relative;" v-if="user == 'admin'">
				<div class="task" >
					<div class="head">应用数</div>
					<div class="number" @click="toApps">
						<Tooltip content="点击进入应用列表" placement="top">
                            <span @click="toApps">123213</span>
                        </Tooltip>
					</div>
				</div>
			</div>
			<div class="news" v-if="user == 'admin'" >
				<div class="head">消息待办<span class="more" @click="newsModal = true">更多</span></div>
				<ul class="ul">
					<li v-for="(item,index) in news" class="li" :key="index">
						<div class="dic"></div>
						<div :class="'title '+ 'color'+item.status">{{item.title}}</div>
						<div class="time">{{item.time}}</div>
						<div class="btns">
							<Poptip v-if="item.status == '1'"
								confirm
								title="通过后变动的人员账号将生效"
								ok-text="通过"
								@on-ok="pass">
								<span class="btn pass">通过</span>
							</Poptip>
							<Poptip width="400" class="homePop" v-model="item.popTip" v-if="item.status == '1'">
								<span  class="btn return"@click.stop @click="item.popTip = true">驳回</span>
								<div class="api" slot="content">
									<div class="return">
										<div class="title"><i class="iconfont icon-bohui"></i> 驳回原因</div>
										<div class="returnResult">
											<Input type="textarea" v-model="returnForm.result" />
										</div>
										<div class="title">
											<i class="iconfont icon-icon-test"></i> 附件列表
											<Upload
												multiple
												action="//jsonplaceholder.typicode.com/posts/">
												<Button type="primary"  icon="ios-cloud-upload-outline" size="small"></Button>
											</Upload>
										</div>
										<div class="returnResult">
											
										</div>
										<div class="fileList"></div>
										<div class="btns">
											<Button size="small" type="primary" @click="item.popTip = false">驳回</Button>
											<Button size="small" @click="item.popTip = false" >取消</Button>
										</div>
									</div>
								</div>
							</Poptip>
							<Poptip v-if="item.status == '2'"
								confirm
								title="密码重置后原始密码将失效，邮件发送给账号人员"
								ok-text="重置">
								<span  class="btn reset">重置</span>
							</Poptip>
							<span class="btn read" v-if="item.status == '3'">已读</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="userFoot" v-if="user == 'admin'">
				<div class="title">个人信息</div>
				<div class="head">
					<div class="photo"><Icon type="md-person" /></div>
					<div class="user">
						<div class="name">寇向东</div>
						<div class="mail">xiangdong.cou@zejiaconsulting.com</div>
					</div>
				</div>
				
				<div class="list">
					<Button @click="modal = true" icon="ios-create" style="color:#fff;padding:0 40px;" type="primary">修改密码</Button>
					<div v-if="modal" class="ivu-poptip-popper" style="position: absolute; will-change: top, left; bottom: 110px; right: 15%;" x-placement="top-end" x-out-of-boundaries="">
						<div class="ivu-poptip-content">
							<div class="ivu-poptip-arrow"></div> 
							<div class="ivu-poptip-inner">
								<div class="ivu-poptip-body">
									<div class="ivu-poptip-body-content">
										<div style="width:400px;padding:20px;">
											<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
												<FormItem label="旧密码" prop="oldPassWard">
													<Input  v-model="formValidate.oldPassWard" placeholder=""></Input>
												</FormItem>
												<FormItem label="新密码" prop="newPassWard">
													<Input  v-model="formValidate.newPassWard" placeholder=""></Input>
												</FormItem>
												<FormItem label="重复密码" prop="newTooPassWard">
													<Input  v-model="formValidate.newTooPassWard" placeholder=""></Input>
												</FormItem>
												<FormItem>
													<Button @click="cancel('formValidate')">取消</Button>
													<Button type="primary" @click="handleSubmit('formValidate')" style="float: right">提交</Button>
												</FormItem>
											</Form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 其他人 -->
			<div class="userInfo" v-if="user != 'admin'">
				<div class="head">
					<div class="photo"><Icon type="md-person" /></div>
					<div class="user">
						<div class="name">寇向东</div>
						<div class="mail">xiangdong.cou@zejiaconsulting.com</div>
					</div>
				</div>
				<div class="list">
					<div class="title">编号：</div>
					<div class="info">9527</div>
				</div>
				<div class="list">
					<div class="title">组织：</div>
					<div class="info">西安分公司/研发部</div>
				</div>
				<div class="list">
					<div class="title">电话：</div>
					<div class="info">13379060797</div>
				</div>
				<div class="list">
					<div class="title">邮箱：</div>
					<div class="info">xiangdong.kou@zejiaconsulting.com</div>
				</div>
				<div class="list">
					<div class="title">QQ：</div>
					<div class="info">272204136</div>
				</div>
				<div class="list">
					<div class="title">微信：</div>
					<div class="info">kouxd</div>
				</div>
				<div class="list">
					<div class="title">钉钉：</div>
					<div class="info">9527</div>
				</div>
				<div class="list">
					<div class="title"></div>
					<div class=""><Button @click="modal = true" icon="ios-create" style="color:#6183ff" size="small" type="text">修改密码</Button></div>
					<div v-if="modal" class="ivu-poptip-popper" style="position: absolute; will-change: top, left; top: 300px; right: 22%;" x-placement="top-end" x-out-of-boundaries="">
						<div class="ivu-poptip-content">
							<div class="ivu-poptip-arrow"></div> 
							<div class="ivu-poptip-inner">
								<div class="ivu-poptip-body">
									<div class="ivu-poptip-body-content">
										<div style="width:400px;padding:20px;">
											<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
												<FormItem label="旧密码" prop="oldPassWard">
													<Input  v-model="formValidate.oldPassWard" placeholder=""></Input>
												</FormItem>
												<FormItem label="新密码" prop="newPassWard">
													<Input  v-model="formValidate.newPassWard" placeholder=""></Input>
												</FormItem>
												<FormItem label="重复密码" prop="newTooPassWard">
													<Input  v-model="formValidate.newTooPassWard" placeholder=""></Input>
												</FormItem>
												<FormItem>
													<Button @click="cancel('formValidate')">取消</Button>
													<Button type="primary" @click="handleSubmit('formValidate')" style="float: right">提交</Button>
												</FormItem>
											</Form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		 <Modal
			v-model="newsModal"
			footer-hide
			title="待办信息"
			class-name="newsModal"
			:styles="{width: '800px'}">
			<div  >
				<ul class="ul">
					<li class="li" style=" font-weight:bold;background:#deebf7;">
						<div class="dic">序号</div>
						<div class="title" style="font-size:14px;color:#515a6e;">标题</div>
						<div class="time" style="font-size:14px;color:#515a6e;">时间</div>
						<div class="oper">操作</div>
					</li>
					<li v-for="(item,index) in news" class="li" :key="index">
						<div class="dic">{{index+1}}</div>
						<div :class="'title '+ 'color'+item.status">{{item.title}}</div>
						<div class="time">{{item.time}}</div>
						<div>
							<Poptip v-if="item.status == '1'"
								confirm
								title="通过后变动的人员账号将生效"
								ok-text="通过"
								@on-ok="pass">
								<span class="btn pass">通过</span>
							</Poptip>
							<Poptip width="400" class="homePop"  v-model="item.popTipMore" v-if="item.status == '1'"placement="bottom-end">
								<span  class="btn return"@click.stop @click="item.popTipMore = true">驳回</span>
								<div class="api" slot="content">
									<div class="return">
										<div class="title"><i class="iconfont icon-bohui"></i> 驳回原因</div>
										<div class="returnResult">
											<Input type="textarea" v-model="returnForm.result" />
										</div>
										<div class="title">
											<i class="iconfont icon-icon-test"></i> 附件列表
											<Upload
												multiple
												action="//jsonplaceholder.typicode.com/posts/">
												<Button type="primary"  icon="ios-cloud-upload-outline" size="small"></Button>
											</Upload>
										</div>
										<div class="returnResult">
											
										</div>
										<div class="fileList"></div>
										<div class="btns">
											<Button size="small" type="primary" @click="item.popTipMore = false">驳回</Button>
											<Button size="small" @click="item.popTipMore = false" >取消</Button>
										</div>
									</div>
								</div>
							</Poptip>
							<Poptip v-if="item.status == '2'"
								confirm
								title="密码重置后原始密码将失效，邮件发送给账号人员"
								ok-text="重置">
								<span  class="btn reset">重置</span>
							</Poptip>
							<span class="btn read" v-if="item.status == '3'">已读</span>
						</div>
					</li>
				</ul>
			</div>
		</Modal>
	</div>
</template>

<script>
// @ is an alias to /src

import Cookies from 'js-cookie';
export default {
	name: 'home',
	data(){
		return {
			newsModal:false,
			interval:null,
			user:Cookies.get('userName'),
			echart:{},
			series:[],
            returnForm:{
                result:'',
                annex:[]
            },
			aData:[
				{
					path:"https://www.baidu.com/",
					img:"./baidu.jpg",
					name:"百度搜索"
				},
				{
					path:"https://www.qq.com/",
					img:"./tengxun.jpg",
					name:"腾讯"
				},
				{
					path:"https://cloud.tencent.com/",
					img:"./tengxunyun.jpg",
					name:"腾讯云"
				}
			],
			modal:false,
			formValidate: {
				oldPassWard: '',
				newPassWard: '',
				newTooPassWard: ''
			},
			ruleValidate: {//validateMobilePhone
				oldPassWard: [
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ min: 6,max:18, message: '需要6-18位', trigger: 'blur' },
					{ required: true, validator: this.validatenick, trigger: 'blur' }
				],
				newPassWard: [
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ min: 6,max:18, message: '需要6-18位', trigger: 'blur' },
					{ required: true, validator: this.validatenick, trigger: 'blur' },
					{ required: true, validator: this.validateAlike, trigger: 'blur' }
				],
				newTooPassWard: [
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ min: 6,max:18, message: '需要6-18位', trigger: 'blur' },
					{ required: true, validator: this.validatenick, trigger: 'blur' },
					{ required: true, validator: this.validatepassw, trigger: 'blur' }
				]
			},
			news:[
				{
					title:'寇向东账号信息修改审批',
					time:'2020-06-06 10:00:00',
					status:'1'
				},
				{
					title:'乔振峰密码忘记申请找回',
					time:'2020-06-06 10:00:00',
					status:'2'
				},
				{
					title:'目录服务器CPU使用率预警',
					time:'2020-06-06 10:00:00',
					status:'3'
				}
			],
			listData:[
				{
					user:'wangbaok',
					time:'2020-06-12',
					type:'登录',
					ip:'192.168.1.25',
					cont:'',
					status:'1'
				},
				{
					user:'wangbaok',
					time:'2020-06-12',
					type:'登录',
					ip:'192.168.1.25',
					cont:'',
					status:'1'
				},
				{
					user:'wangbaok',
					time:'2020-06-12',
					type:'登录',
					ip:'192.168.1.25',
					cont:'',
					status:'1'
				},
				{
					user:'wangbaok',
					time:'2020-06-12',
					type:'登录',
					ip:'192.168.1.25',
					cont:'',
					status:'1'
				},
				{
					user:'wangbaok',
					time:'2020-06-12',
					type:'登录',
					ip:'192.168.1.25',
					cont:'',
					status:'1'
				},
				{
					user:'wangbaok',
					time:'2020-06-12',
					type:'登录',
					ip:'192.168.1.25',
					cont:'',
					status:'1'
				},
				{
					user:'wangbaok',
					time:'2020-06-12',
					type:'登录',
					ip:'192.168.1.25',
					cont:'',
					status:'1'
				},
			],
			columns: [
                    {
                        title: '操作人',
                        key:'user'
                    },
                    {
                        title: '操作时间',
                        key: 'time'
                    },
                    {
                        title: '操作类型',
                        key: 'type'
                    },
                    {
                        title: '客户端ip',
                        key: 'ip'
                    },
                    {
                        title: '内容',
                        key: 'cont'
                    }
			]
		}
	},
	methods:{
		toAudit(name){
			this.$router.push({
				name:'audit',
				params:{
					name:name
				}
			})
		},
		pass(){

		},
		toApps(){
			this.$router.push({
				name:'apps',
			})
		},
		target(name){
			this.$router.push({
				name:'catalog',
				params:{
					name:name
				}
			})
		},
		queryData(){
            this.series = [
					{
						name: '失败',
						type: 'line',
						stack: '总量',
						data: [0, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '成功',
						type: 'line',
						stack: '总量',
						data: [0, 182, 191, 234, 290, 330, 310]
					}
				]
            this.setEchart(this.series);
            
        },
		setEchart(series){
            // 基于准备好的dom，初始化echarts实例
            this.echrat = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            var   option =  {
				title: {
					text: ''
				},
				
				dataZoom: [{
					type: 'inside'
				}, {
					type: 'slider'
				}],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['成功', '失败']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '15%',
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['2020/6/8', '2020/6/9', '2020/6/10', '2020/6/11', '2020/6/12']
				},
				yAxis: {
					type: 'value'
				},
				series:series
			};
            this.echrat.setOption(option);
        },
		handleSubmit (name) {
			let _this=this;
			
			_this.$refs[name].validate((valid) => {
				if (valid) {
					let oldPassWard = _this.util.encrypt(_this.formValidate.oldPassWard.trim());
					let newPassWard = _this.util.encrypt(_this.formValidate.newPassWard.trim());
					let map={
					oldPwd:oldPassWard,
					newPwd : newPassWard
					};
					let url='index/API/v1/reSetUserPwd';
					_this.axios.post(url,_this.util.qs(map))
					.then(function (response) {
						if(response.data.meta.status != 0){return}
						_this.$Modal.confirm({
						title: '提示',
						closable: false,
						content: '<p>密码修改成功，请重新登陆</p>',
						onOk: () => {
							Cookies.remove('token');
							Cookies.remove('userName');
							Cookies.remove('userId');
							_this.$router.push({
								name: 'login'
							});
						},
						onCancel: () => {
							Cookies.remove('token');
							Cookies.remove('userName');
							Cookies.remove('userId');
							_this.$router.push({
								name: 'login'
							});
						}
					});
					})
					.catch(function (error) {
					console.log(error);
					});
				}
			})
		},
		validatenick(rule, value, callback){
			let _this = this;
			let reg = /[\u4e00-\u9fa5]|[\（\）\《\》\——\；\，\。\“\”\<\>\！]/
			if(reg.test(value)){
				return callback(new Error('密码错误'))
			}else{
				callback();
			}
		},
		validatepassw(rule, value, callback){
			let _this = this;
			if(value && this.formValidate.newPassWard !== this.formValidate.newTooPassWard){
				return callback(new Error('第二次输入不通'))
			}else{
				callback();
			}
		},
		validateAlike(rule, value, callback){
			let _this = this;
			if(value && this.formValidate.newPassWard === this.formValidate.oldPassWard){
				return callback(new Error('和原密码相同'))
			}else{
				callback();
			}
		},
		cancel(){
			this.modal = false;
			this.$refs['formValidate'].resetFields();
		},
		handleReset () {
			this.$refs['formValidate'].resetFields();
		},
		
	},
		
	components: {

	},
	mounted(){
		this.queryData();
        const that = this;
        window.onresize = () => {
            that.echrat.resize();
		};
		let top = 0;
		let box = document.querySelector('.box');
		let content = document.querySelector('#content');
		if(!that.interval){
			setInterval(() => {
			if (top < that.listData.length*32 - 160){
				content.style.top = -(top+32)+'px'
				top+=32
			}
			
		}, 3000);
		}
		

		let index = 1;
		setInterval(() => {
			if (index >5) {
				return
			}
			let o = {
					user:'wangbaok_'+index,
					time:'2020-06-12',
					type:'登录',
					ip:'192.168.1.25',
					cont:''
				}
			this.listData.push(o)
			index++
		}, 3000);
	}
}
</script>

<style scoped  lang="scss">
$trans: 0.8;
.home{
	width: 100%;
	min-width: 1200px;
	padding: 20px;
	height: 100%;
}
.home .leftCont{
	width: 66.66%;
	height: 100%;
	float: left;
	padding-right:10px;
	.top{
		height: calc(100% - 280px);
		background: rgba(255, 255, 255,$trans);
		border:1px solid #dcdee2;
		overflow-y: auto;
		border-radius: 3px;
	}
	.foot{
		height:260px;
		margin-top: 20px;
		background: rgba(255, 255, 255,$trans);
		border:1px solid #dcdee2;
		border-radius: 3px;
		.head{
			width: 100%;
			height:40px;
			border-bottom:1px solid #dcdee2;
			line-height: 40px;
			padding: 0 20px;
			font-weight: bold;
			.more{
				color: #2d8cf0;
				display: inline-block;
				float: right;
				cursor: pointer;
			}
			
		}
		.ul{
				padding: 10px 20px;
			.li{
				display: flex;
				line-height: 150%;
				.dic{
					width: 10px;
					height: 10px;
					margin: 6px 5px 0 0;
					border-radius: 100%;
					background:#767171 ;
				}
				.title{
					width: auto;
					min-width: calc(100% - 150pc);
					display: block;
					color: #2d8cf0;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.color1{
					color: #2F5597;
				}
				.color2{
					color:#843C0C;
				}
				.color3{
					color:#C00000;
				}
				.time{
					width: 150px;
					font-size: 12px;
					color: #767171;
					padding-left: 10px;
				}
				.btn{
					padding:0 5px;
					display: inline-block;
					font-size: 12px;
					cursor: pointer;
				}
				.return{
					color:#ed4014;
				}
				.pass{
					color:#2d8cf0;
				}
				.read{
					color:#2d8cf0;
				}
				.reset{
					color:#2d8cf0;
				}
			}
		}
		.rotation{
			height:206px;
			overflow: hidden;
			.title{
				height:32px;
				display: flex;
				background: #deebf7;
				.td{
					padding: 5px 10px;
					width: 20%;
					font-weight: bold;
				}
			}
			.box{
				height:274px;
				width: 100%;
				overflow: hidden;
				position: relative;
				.content{
					transition: top 1s;
					width: 100%;
					position: absolute;
					left: 0;
					top:0;
					.list{
						height:32px;
						display: flex;
						.td{
							padding: 5px 10px;
							width: 20%;
						}
					}
					.list:nth-child(even) {
						background: #f6f8fc;
					}
				}
				
			}
		}
	}
	
	.task{
		transition: margin-top 0.3s;
		width: calc( 50% - 10px);
		height:160px;
		border-radius: 3px;
		background: rgba(255, 255, 255,$trans);
		border-top:5px solid #2d8cf0 ;
		border-left:1px solid #dcdee2;
		border-right:1px solid #dcdee2;
		border-bottom:1px solid #dcdee2;
		float: left;
		.head{
			width: 100%;
			height:40px;
			border-bottom:1px solid #dcdee2;
			line-height: 40px;
			padding: 0 20px;
			font-weight: bold;
		}
		.number{
			width: 100%;
			text-align: center;
			line-height: 40px;
			font-size: 30px;
			font-weight: bold;
			color:#2d8cf0;
			padding-top: 32px;
		}
	}
	.task:hover{
		box-shadow: 2px 2px 15px #666;
		margin-top: -5px;
		cursor: pointer;
		.number{
			color: #0a4b90;
			
		}
	}
	.chart{
		width: 100%;
		min-height: 200px;
		height: calc( 100% - 460px);
		margin-top: 20px;
		border-radius: 3px;
		background: rgba(255, 255, 255,$trans);
		border:1px solid #dcdee2;
		.head{
			width: 100%;
			height:40px;
			border-bottom:1px solid #dcdee2;
			line-height: 40px;
			padding: 0 20px;
			font-weight: bold;
			.more{
				color: #2d8cf0;
				display: inline-block;
				float: right;
				cursor: pointer;
			}
		}
	}
}

.home .leftCont .card{
	margin: 20px;
	display: block;
	color: #444;
	width: 180px;
	height: 180px;
	float: left;
	text-align: center;
	background: rgba(0,0,0,0.3);
	border-radius: 10%;
	overflow: hidden;
	box-shadow: 2px 2px 6px 5px rgba(0,0,0,0.1);
}
.home .card:hover{

}
.home .card .icon{
	width: 180px;
	height: 180px;
	background: rgba(255, 255, 255,1);
	display: flex;
	align-items: center;
	transition: height .5s;
	-moz-transition: height .5s;	
	-webkit-transition: height .5s;	
	-o-transition: height .5s;	
	border-radius: 0 0 10% 10%;
}
.home .card:hover .icon{
	height: 140px;
	line-height: 140px;
}
.home .card .icon img{
	height: 60%;
	margin: 0 auto;
}
.home .card .name{
	width: 100%;
	height:40px;
	text-align: center;
	font-size: 14px;
	color: #fff;
	line-height: 40px;
	font-weight: bold;
}

.home .rightCount{
	width:33.33%;
	padding-left: 10px;
	min-width: 400px;
	height: 100%;
	float: right;
	.userInfo{
		height: 100%;
		background: rgba(255, 255, 255,$trans);
		border:1px solid #dcdee2;
		padding: 20px;
		overflow-y: auto;
		border-radius: 3px;
		.head{
			width:100%;
			display: flex;
			.photo{
				width: 60px;
				height: 60px;
				border-radius: 100%;
				border:2px solid #2d8cf0;
				text-align: center;
				line-height: 60px;
				font-size: 50px;
				overflow: hidden;
				color:#2d8cf0;
			}
			.user{
				padding:10px 15px;
				.name{
					font-weight: bold;
				}
			}
		}
		.list{
			width:100%;
			display: flex;
			padding: 10px 0;
			.title{
				width: 80px;
				text-align: right;
				padding:10px;
				overflow: hidden;
			}
			.info{
				width: calc( 100% - 80px );
				padding:10px;
				border-bottom: 1px solid #dcdee2;
			}
		}
		button {outline:none;border: none;}
		button:focus {outline:none;border: none;} /*IE、Chrome*/
		button::-moz-focus_inner {border-color:transparent;} /*Firefox*/
		.top,.bottom{
			text-align: center;
		}
		.center{
			width: 300px;
			margin: 10px auto;
			overflow: hidden;
		}
		.center-left{
			float: left;
		}
		.center-right{
			float: right;
		}
	}
	.task{
		transition: margin-top 0.3s;
		position: absolute;
		width: 100%;
		height:160px;
		border-radius: 3px;
		background: rgba(255, 255, 255,$trans);
		border-top:5px solid #2d8cf0 ;
		border-left:1px solid #dcdee2;
		border-right:1px solid #dcdee2;
		border-bottom:1px solid #dcdee2;
		.head{
			width: 100%;
			height:40px;
			border-bottom:1px solid #dcdee2;
			line-height: 40px;
			padding: 0 20px;
			font-weight: bold;
			.more{
				color: #2d8cf0;
				display: inline-block;
				float: right;
				cursor: pointer;
			}
		}
		.number{
			width: 100%;
			text-align: center;
			line-height: 40px;
			font-size: 30px;
			font-weight: bold;
			color:#2d8cf0;
			padding-top: 32px;
		}
	}
	.task:hover{
		box-shadow: 2px 2px 15px #666;
		margin-top: -5px;
		cursor: pointer;
		.number{
			color: #0a4b90;
		}
		
	}
	.news{
		width: 100%;
		min-height: 200px;
		height: calc( 100% - 460px);
		margin-top: 20px;
		border-radius: 3px;
		background: rgba(255, 255, 255,$trans);
		border:1px solid #dcdee2;
		.head{
			width: 100%;
			height:40px;
			border-bottom:1px solid #dcdee2;
			line-height: 40px;
			padding: 0 20px;
			font-weight: bold;
			.more{
				color: #2d8cf0;
				display: inline-block;
				float: right;
				cursor: pointer;
			}
		}
		.ul{
				padding: 10px 20px;
			.li{
				display: flex;
				line-height: 150%;
				.dic{
					width: 10px;
					height: 10px;
					margin: 6px 5px 0 0;
					border-radius: 100%;
					background:#767171 ;
				}
				.title{
					width: auto;
					min-width: calc(100% - 230px);
					display: block;
					color: #2d8cf0;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.btns{
					width:80px;
				}
				.color1{
					color: #2F5597;
				}
				.color2{
					color:#843C0C;
				}
				.color3{
					color:#C00000;
				}
				.time{
					width: 140px;
					font-size: 12px;
					color: #767171;
					padding-left: 10px;
				}
				.btn{
					padding:0 5px;
					display: inline-block;
					font-size: 12px;
					cursor: pointer;
				}
				.return{
					color:#ed4014;
				}
				.pass{
					color:#2d8cf0;
				}
				.read{
					color:#2d8cf0;
				}
				.reset{
					color:#2d8cf0;
				}
			}
		}
	}
	.userFoot{
		height:260px;
		margin-top: 20px;
		background: rgba(255, 255, 255,$trans);
		border:1px solid #dcdee2;
		border-radius: 3px;
		.title{
			width: 100%;
			height:40px;
			border-bottom:1px solid #dcdee2;
			line-height: 40px;
			padding: 0 20px;
			font-weight: bold;
		}
		.head{
			width:100%;
			display: flex;
			padding: 20px;
			.photo{
				width: 60px;
				height: 60px;
				border-radius: 100%;
				border:2px solid #2d8cf0;
				text-align: center;
				line-height: 60px;
				font-size: 50px;
				overflow: hidden;
				color:#2d8cf0;
			}
			.user{
				padding:10px 15px;
				.name{
					font-weight: bold;
				}
			}
		}
		.list{
			width:100%;
			padding:10px;
			text-align: center;
		}
	}
}
.homePop .title{
	padding: 10px;
}
.homePop .btns{
	text-align: right;

}
.homePop .fileList{
	width: 100%;
	height: 60px;
}
.homePop .btns button{
	margin: 10px;
}
.homePop .ivu-upload{
	display: inline-block;
}
.newsModal{
	
	.ul{
				padding: 10px 20px;
			.li{
				display: flex;
				line-height: 150%;
				padding: 8px;
				.dic{
					width: 60px;
					text-align: center;
				}
				.title{
					width: 350px;
					min-width: calc(100% - 150pc);
					display: block;
					color: #2d8cf0;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.color1{
					color: #2F5597;
				}
				.color2{
					color:#843C0C;
				}
				.color3{
					color:#C00000;
				}
				.time{
					width: 150px;
					font-size: 12px;
					color: #767171;
					padding-left: 10px;
				}
				.btn{
					padding:0 5px;
					display: inline-block;
					font-size: 12px;
					cursor: pointer;
				}
				.return{
					color:#ed4014;
				}
				.pass{
					color:#2d8cf0;
				}
				.read{
					color:#2d8cf0;
				}
				.reset{
					color:#2d8cf0;
				}
			}
			.li:nth-child(even){
				background: #f6f8fc;
			}
		}
}
.iconfont {
	vertical-align: middle;
}
</style>
<style lang="scss">
	
	.homeChart .ivu-table td, .ivu-table th{
		height:31px !important
	}
	.newsModal{
		.ivu-modal{
			height:500px;
			top: calc( 50% - 250px);
			.ivu-modal-content{
				height:100%;
				overflow-y: auto;
			}
		}
	}
</style>