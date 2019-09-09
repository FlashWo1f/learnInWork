export default {
    deviceType() {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        var isIOS = /iphone|ipad|ipod/.test(ua);
        var isAndroid = /android/.test(ua);
        return {
            isIOS,
            isAndroid
        }
    },
    // 监听输入框的软键盘弹起和收起事件
    listenKeyboard(inpt) {
        if (this.deviceType().isIOS) {
            let winHeight = window.innerHeight;
            inpt.addEventListener('focus', () => {
                setTimeout(() => {
                    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    let keyboardHeight = winHeight - window.innerHeight
                    window.scrollTo({
                        top: scrollTop + keyboardHeight
                    })
                }, 50);
            }, false)
            inpt.addEventListener('blur', () => {
                setTimeout(() => {
                    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    let keyboardHeight = winHeight - window.innerHeight
                    window.scrollTo({
                        top: scrollTop - keyboardHeight
                    })
                }, 50);
            })
        }
        if (this.deviceType().isAndroid) {
            let originHeight = document.documentElement.clientHeight || document.body.clientHeight;
            window.addEventListener('resize', () => {
                let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if (originHeight - resizeHeight > 140) {
                    this.activeElementScrollIntoView(inpt, 50);
                } else {
                    window.scrollTo({
                        top: 0
                    })
                }
                originHeight = resizeHeight;
            }, false)
        }
    },
    // 获取到焦点元素滚动到可视区
    activeElementScrollIntoView(activeElement, delay) {
        var editable = activeElement.getAttribute('contenteditable')
        if (activeElement.tagName == 'INPUT' || activeElement.tagName == 'TEXTAREA' || editable === '' || editable) {
            setTimeout(function () {
                activeElement.scrollIntoViewIfNeeded();
            }, delay)
        }
    }
}