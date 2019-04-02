$(() => {

    //判断免登录否，是则跳到主页
    let user = localStorage.getItem('user');
    // console.log(user);
    if (!user) {
        user = {};
    } else {
        user = JSON.parse(user);
    };
    console.log(user);

    if (user.token) {
        $.ajax({
            type: 'POST',
            url: '/verify',
            data: 'token=' + user.token,
            success: function (res) {
                console.log(res);
                if (res.status == 200) {
                    location.href = "html/center.html";
                };
            }
        });
    };

    $('#btn').on('click', () => {
        let username = $.trim($('#username').val());
        let password = $.trim($('#password').val());
        console.log($('#checked').prop('checked'));
        if (username && password) {
            // 不为空
            $.ajax({
                type: 'POST',
                url: '/login',
                data: `username=${username}&password=${password}`,
                success: function (str) {
                    // let arr = JSON.parse(str);
                    console.log(str.code);
                    if (str.code == 200) {
                        if ($('#checked').prop('checked')) {
                            localStorage.setItem('user', JSON.stringify(str));
                            location.href = 'html/center.html';
                        } else {
                            sessionStorage.setItem('user', JSON.stringify(str));
                            location.href = 'html/center.html';
                        };
                    } else {
                        alert('用户名或密码不正确');
                    };
                }
            });
        } else {
            alert('输入内容不能为空');
        };
    });
});