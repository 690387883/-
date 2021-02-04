$(function () {
  getRander();
  $("#esc").on("click", function () {
    layui.layer.confirm(
      "您确定退出吗",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        location.href = "../../login.html";
        layer.close(index);
      }
    );
  });
});
function getRander() {
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success(res) {
      randerUser(res.data);
    },
  });
}
function randerUser(data) {
  var name = data.nickname || data.username;
  $(".welcome").html(name);
  if (data.user_pic == null) {
    var filst = name[0].toUpperCase();
    $(".uesrinfo img").hide();
    $(".text-avatar").html(filst).show();
  } else {
    $(".uesrinfo img").show().prop("src", data.user_pic);
    $(".text-avatar").hide();
  }
}
