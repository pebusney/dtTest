$(document).on("click", can.submitId,function(){ajaxSubmit(can)});
function ajaxSubmit(can) {
  var data = $(can.formId).serializeArray();
  var dataArr = [];
  for(item in data){
    var hehe = data[item].name+'"'+":"+'"'+data[item].value;
    console.log(hehe);
    dataArr.push(hehe);
  }
  console.log(dataArr);
  $.ajax({  
    type: can.type,  
    url: can.url,
    data: dataArr, 
    success: function(data){  
      can.successFunc(data);
    },
    error: function() {
      can.errorFunc();
    }
  });
}