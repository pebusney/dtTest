function mySlide(divId, imgWidth, prevId, nextId) {

    // 获取各个所需元素
    var oDiv = document.getElementById(divId); 
    var oUl = oDiv.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var aImg = oUl.getElementsByTagName('img');
    var oBtn = document.getElementById('btn');
    var aA = oBtn.getElementsByTagName('a');
    // 设置ul的宽度
    oUl.style.width = aImg.length * imgWidth + 'px';
    // 下方每个序号点击事件
    for (var i = 0; i < aA.length; i++) {
        aA[i].index = i;
        aA[i].onclick = function() {

            clearInterval(toRunTimer);

            for (var i = 0; i < aA.length; i++) {
                aA[i].id = '';
            }
            this.id = 'active';

            startMove(oUl, {
                left: -this.index * imgWidth
            });

        };
    }
    
    clearInterval(toRunTimer);
    var toRunTimer = setInterval(toRun, 3000);
    
    function toRun() {
        var hehe = document.getElementById("active").index;//获取当前视野内的图片是第几个
        var iNow = hehe;
        var iNow2 = hehe;
        //当当前图片是最后一个是，将第一张图片相对定位到最后一张图片后面，
        //并将iNow值改为0,即第一张图片显示时iNow的值，第一张图片移动结束后后，又立即取消其相对定位，
        //这样其后面的图片还会跟着轮播了，给人造成图片在无限轮播的感觉
        if (iNow == aLi.length - 1) {
            aLi[0].style.position = 'relative';
            aLi[0].style.left = aLi.length * imgWidth + 'px';
            iNow = 0;
        } else {
            iNow++;
        }

        iNow2++;

        for (var i = 0; i < aA.length; i++) {
            aA[i].id = '';
        }

        aA[iNow].id = 'active';

        startMove(oUl, {left: -iNow2 * imgWidth},function() {
            if (iNow == 0) {
                aLi[0].style.position = 'static';
                oUl.style.left = 0;
                iNow2 = 0;
            }

        });

    }
    // obj根据json以一定速度移动，并在结束时调用endFn
    function startMove(obj, json, endFn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var bBtn = true;
            for (var attr in json) {
                var iCur = 0;
                if (attr == 'opacity') {
                    if (Math.round(parseFloat(getStyle(obj, attr)) * 100) == 0) {
                        iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                    } else {
                        iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100) || 100;
                    }
                } else {
                    iCur = parseInt(getStyle(obj, attr)) || 0;
                }
                var iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iCur != json[attr]) {
                    bBtn = false;
                }
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                    obj.style.opacity = (iCur + iSpeed) / 100;

                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }
            if (bBtn) {
                clearInterval(obj.timer);
                if (endFn) {
                    endFn.call(obj);
                }
            }
        },
        30);
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }




    var oPrev = document.getElementById(prevId);
    oPrev.onclick = function(){
        clearInterval(toRunTimer);
        var hehe = document.getElementById("active").index;
        // console.log(hehe);
        var btnNow = hehe;
        var btnNow2 = hehe;
        if (btnNow == 0) {
            aLi[aLi.length - 1].style.position = 'relative';
            aLi[aLi.length - 1].style.left = -aLi.length * imgWidth + 'px';
            btnNow = aLi.length - 1;
        } else {
            btnNow--;
        }
        btnNow2--;
        for (var i = 0; i < aA.length; i++) {
            aA[i].id = '';
        }
        aA[btnNow].id = 'active';
        startMove(oUl, {
            left: -btnNow2 * imgWidth
        },
        function() {
            if (btnNow == aLi.length - 1) {
                aLi[aLi.length - 1].style.position = 'static';
                oUl.style.left = -(aLi.length - 1) * imgWidth + 'px';
                btnNow2 = aLi.length - 1;
            }
        });
    }

    var oNext = document.getElementById(nextId);
    oNext.onclick = function(){toRun()};
    oNext.onmouseover = function(){
        clearInterval(toRunTimer);
    } 
    oUl.onmouseout = function(){
        clearInterval(toRunTimer);//开启定时器之前须清除定时器，避免累加情况
        toRunTimer = setInterval(toRun, 3000);
    }

}