实现一屏一屏滑动：
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
  <style type="text/css">
    *{margin:0;padding: 0}
    html{width: 100%;height: 100%;}
    body{width: 100%;height: 100%;}
  </style>
</head>
<body>
<div id="div" style="width:100%;height:100%"></div>
</body>
<script type="text/javascript">
  var oDiv = document.getElementById("div");
  var oWidth = oDiv.scrollWidth;
  var oHeight = oDiv.scrollHeight;
  console.log(oWidth);
  console.log(oHeight);
</script>
</html>
获取当前屏幕宽高，单位为px，再用js将四个section的宽高改为当前获得的宽高，
绑定touch事件，现将四个section的z-index移除，再将需要展示的section的z-index值设置高一点，改变四个section的父容器的style,transition: 0.5s ease; transform: translate3d(0px, -568px, 0px)中的translate3d的第二个参数值形成切换效果

运用到的css3技术：
@keyframes动画，animation动画简写属性
transform的translate3d、scale3d、preserve-3d、translateX、translateY等
