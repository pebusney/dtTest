// JavaScript Document

function lunBo(divId, imgWidth, prevId, nextId) {
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

    var oDiv = document.getElementById(divId); //这里
    var oUl = oDiv.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var aImg = oUl.getElementsByTagName('img');

    var oBtn = document.getElementById('btn');
    var aA = oBtn.getElementsByTagName('a');

    oUl.style.width = aImg.length * imgWidth + 'px';

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
    var toRunTimer = setInterval(toRun, 3000);
    
    function toRun() {
        var hehe = document.getElementById("active").index;
        console.log(hehe);
        var iNow = hehe;
        var iNow2 = hehe;
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

        startMove(oUl, {
            left: -iNow2 * imgWidth
        },
        function() {

            if (iNow == 0) {
                aLi[0].style.position = 'static';
                oUl.style.left = 0;
                iNow2 = 0;
            }

        });

    }

    // $(document).on("click", ".prev",function() {
    var oPrev = document.getElementById(prevId);
    oPrev.onclick = function(){
        clearInterval(toRunTimer);
        var hehe = document.getElementById("active").index;
        console.log(hehe);
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

    // $(document).on("click", ".next", function() {
    var oNext = document.getElementById(nextId);
    oNext.onclick = function(){
        clearInterval(toRunTimer);
        var hehe = document.getElementById("active").index;
        console.log(hehe);
        var next = hehe;
        var next2 = hehe;
        if (next == aLi.length - 1) {
            aLi[0].style.position = 'relative';
            aLi[0].style.left = aLi.length * imgWidth + 'px';
            next = 0;
        } else {
            next++;
        }

        next2++;

        for (var i = 0; i < aA.length; i++) {
            aA[i].id = '';
        }

        aA[next].id = 'active';

        startMove(oUl, {
            left: -next2 * imgWidth
        },
        function() {

            if (next == 0) {
                aLi[0].style.position = 'static';
                oUl.style.left = 0;
                next2 = 0;
            }

        });

    }

    oNext.onmouseover = function(){
        clearInterval(toRunTimer);
    } 
    oUl.onmouseout = function(){
        clearInterval(toRunTimer);
        toRunTimer = setInterval(toRun, 3000);
    }
};