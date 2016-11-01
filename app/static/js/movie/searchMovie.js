/**
 * Created by huangrui on 2016/10/22.
 */
$(document).ready(function () {

    $("#mov_input").on('keyup',_.debounce(function(){
        var value = $(this).val();
            //判断条件之后可修改
        if (value != "") {
            searchEvent(value);
            listenInfinite();
        }else {
            searchEventClean();
        }
    },500));

    $(".search-out").children("div").hover(function () {
        $(this).addClass("touch");
    }, function () {
        $(this).removeClass("touch");
    });

    $(".search-out").children("div").click(function () {
        var str = $(this).attr("data-id");
        $(".input").val(str);
        $("#select").slideUp();
    });

    $(".search-out").children("div").on("touchstart", function () {
        $(this).addClass("touch");
    });

    $(".search-out").children("div").on("touchend", function () {
        $(this).removeClass("touch");
    });
});

function searchEvent(value) {

    $.ajax({
        url: '/selectMovieByName/' + value,
        type: 'GET',
        success: function (data) {
            $('.search-out').empty();
            // 开启滚动承载模块
            $(document.body).infinite();
            movies = data.movieList;
            for (var index in movies){
                var movie = movies[index];
                $('.search-out').append(
                '<div id="aa" data-id="'+ movie.movieid +'"> \
                    <a href="' + '/selectMovieById/' + movie.movieid + '" class="weui_media_box weui_media_appmsg"> \
                        <div style="height:90px;width:65px;"class="weui_media_hd"> \
                            <img style="height:90px;"class="weui_media_appmsg_thumb" src="' + movie.img + '"> \
                        </div> \
                        <div class="weui_media_bd"> \
                            <h5 class="weui_media_title">'+ movie.cnname +'</h5> \
                            <p class="movie-enname">' + movie.enname + '</p> \
                            <div style="display:inline"> \
                                <div class="table-title">导演:</div> \
                                <div class="table-value">&nbsp&nbsp' + movie.director + '</div> \
                            </div> \
                            <br> \
                            <div style="display:inline"> \
                                <div class="table-title">主演:</div> \
                                <div class="table-value">&nbsp&nbsp' + movie.actor + '</div> \
                            </div> \
                        </div> \
                    </a> \
                </div>')
            }
            $("#select").slideDown();
        }
    })
}

function searchEventClean() {
    $('.search-out').empty();
    // 关闭滚动承载模块
    $(document.body).destroyInfinite();
    $("#select").slideUp();
}

// 监听滚动事件
function listenInfinite(){
    var loading = false;  //状态标记
    $(document.body).infinite().on("infinite", function() {
      if(loading) return;
      loading = true;
      setTimeout(function() {
        $(".search-out").append("<p> 我是新加载的内容 </p>");
        loading = false;
      }, 1500);   //模拟延迟
    });
}



