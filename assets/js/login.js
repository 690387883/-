$(function () {
  $("#go_register").on("click", function () {
    $(".login_denglu").hide().siblings(".login_zhuce").show();
  });
  $("#gologin").on("click", function () {
    $(".login_zhuce").hide().siblings(".login_denglu").show();
  });
  layui.form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  $("#forms").on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $("#forms [name=username]").val(),
      password: $("#forms [name=password]").val(),
    };
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data,
      success(res) {
        if (
          $("#psw [name=username]").val() !== $("#pswag [name=username]").val()
        ) {
          return layui.layer.msg("两次密码不一样");
        }
        if (res.status == 1) {
          return layui.layer.msg("用户名被占用");
        }
        $("#gologin").click();
        return layui.layer.msg("注册成功");
      },
    });
  });
  $("#login_form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: $(this).serialize(),
      success(res) {
        if (res.status == 1) {
          return layui.layer.msg("登录失败");
        }
        console.log(res);
        localStorage.setItem("token", res.token);
        location.href = "../../index.html";
      },
    });
  });
});
