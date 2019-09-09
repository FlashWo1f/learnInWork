# learnInWork
实习期间新知识


## 微信分享
~ activities_new 中quoter的微信分享  自定义微信分享出去标题和概图
在react入口 index.js中引入initShare.js   并在index组件外执行该导出函数

initshare({
    title: '测测你家装修需要花多少钱？', 
    desc: '输入面积，最快10秒获取装修报价。', 
    imgUrl: 'https://img.asman.com.cn/assets/1567650078410_59619.png',
    link: `https://m.niuniuda.com/quoter?channel=${getQueryString('channel')}#/`,
})

这样子实现微信分享自定义title desc imgUrl link等字段

## 移动端监听软键盘的弹出和收起
先判断device 再根据不同的device做不同的监听操作