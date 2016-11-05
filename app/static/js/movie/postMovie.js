/**
 * Created by huangrui on 2016/10/22.
 */
$(document).ready(function () {

    $('#time').calendar();
    $('#ftime').calendar();
    $('.describe').focus(function () {
        console.log('1 ok');
        $(this).css({'background-color':'#234','color':'#fff'});
    });
    $('.describe').blur(function () {
        console.log('2 ok');
        $(this).css({'background-color':'#fff', 'color':'#000'});
    });

    init();
    postMovie();
});

// 初始化页面信息
function init() {
    var date = new Date();
    var month = date.getMonth() + 1;
    if (month < 10){
        month = '0' + month;
    }
    var day = date.getDate();
    if (day < 10){
        day = '0' + day;
    }
    var dateStr = date.getFullYear() + '-' + month + '-' + day;
    $('#time').val(dateStr);
    getLocation();
    $('#where').click(function () {
        getLocation();
    });
}

// 获取地理位置
function getLocation() {

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat),
                function(rs) {
                    var addComp = rs.addressComponents;
                    var data = '';
                    if (addComp.province != addComp.city){
                        data = addComp.province + addComp.city + addComp.district + addComp.street
                    } else{
                        data = addComp.city + addComp.district + addComp.street
                    }
                    $('#where').val(data);
                });

        } else {
             $.toast('获取地理位置失败！', 'forbidden');
        }
    });
}

//提交表单
function postMovie() {

    $('.foot-btn').click(function () {
        var date = $('#time').val() || false;
        var impression = $('#impression').val() || false;

        if (!date || !impression){
            if (date == ''){
                $.toast('没有填写观影日期！', 'forbidden');
            }

            if (impression == ''){
                $.toast('没有填写观影感想！', 'forbidden');
            }
        }
        else{
            $.ajax({
                url: '/postMovieInfo',
                type: 'POST',
                data: {
                    'impression': $('#impression').val(),
                    'date': $('#time').val(),
                    'featureDate': $('#ftime').val(),
                    'movieId': $(this).attr('data-id'),
                    'address': $('#where').val()
                },
                success: function (data) {
                    if (data.message == 'success'){
                        window.location.href = '/searchPage';
                    }
                }
            })
        }
    })
}
