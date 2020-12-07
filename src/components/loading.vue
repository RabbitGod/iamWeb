<template>
	<div class="hello">
		<div class="iam_loading" :style="{width:fullWidth+'px',height:fullHeight+'px'}">
            <div class="loading">
                <img :src="loadingImg"/>
            </div>
                <div class="text">loading...</div>
        </div>
	</div>
</template>

<script>
import loadingImg from '@/assets/loading.gif';
export default {
	data(){

	},
	name:'loading',
    mounted(){
        const that = this;
        window.onresize = () => {
            return (() => {
                that.fullHeight = document.documentElement.clientHeight;
                that.fullWidth = document.documentElement.clientWidth;
            })()
        }
    }
}
</script>

<style scoped lang="scss">
	.iam_loading{
        background: rgba(0,0,0,0.5);
        position: fixed;
        top:0;
        left:0;
        z-index: 99999999999999;
        display: flex;
        flex-direction: column;  /* 子元素横向排列 */
        justify-content: center; /* 相对父元素水平居中 */
        align-items: center; /*  子元素相对父元素垂直居中 */
    }
    .iam_loading .loading{
        width: 120px;
        height: 140px;
    }
    .iam_loading .text{
        text-align: center;
        color: #fff;
    }
</style>
