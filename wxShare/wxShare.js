export default {
    debug: '',
    appId: '',
    timestamp: '',
    nonceStr: '',
    signature: '',
    url : 'your route' + encodeURIComponent(window.location.href),
    link : '',  //分享链接 
    title : '',  //分享标题
    desc : '',  //分享描述
    imgUrl : '', //分享图标
    type : '', //分享类型,music、video或link，不填默认为link
    dataUrl : '', ////如果type是music或video，则要提供数据链接，默认为空
    success : function () {
        //alert('用户确认分享后执行的回调函数');
    }, 
    cancel: function () {
        //alert('用户取消分享后执行的回调函数');
    },

    data: '',
    QQData: '',
    TimeLineData: '',
    WeiBoData: '',

    setData: function(){
        var self = this;
        self.data = {
            title: self.title,
            desc: self.desc,
            link: self.link,
            imgUrl: self.imgUrl,
            type: self.type, // 分享类型,music、video或link，不填默认为link
            dataUrl: self.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: self.success,
            cancel: self.cancel
        };

        //深度克隆
        self.QQData = JSON.parse(JSON.stringify(self.data));
        self.TimeLineData = JSON.parse(JSON.stringify(self.data));  
        self.WeiBoData = JSON.parse(JSON.stringify(self.data));
            
        //反序列化
        self.QQData.success = self.success;
        self.TimeLineData.success = self.success;
        self.WeiBoData.success = self.success;
        self.QQData.cancel = self.cancel;
        self.TimeLineData.cancel = self.cancel;
        self.WeiBoData.cancel = self.cancel;
    },

    start : function(){
        var self = this;
        const {debug, appId, timestamp, nonceStr, signature} = self;
        wx.config({
            debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature,// 必填，签名，见附录1
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function(){
            wx.showOptionMenu();
            if(self.data == '') self.setData();
            wx.onMenuShareQQ(self.QQData);
            wx.onMenuShareAppMessage(self.data);
            wx.onMenuShareTimeline(self.TimeLineData);
            wx.onMenuShareWeibo(self.WeiBoData)
        });
    },

    init: function() {
        this.setData();
        this.start();
    }
}