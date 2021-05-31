var VIDEO_URL = window.location.origin + '/v1/course/video/RESOURCE_ID?type=2&pro_id=PRODUCT_ID&from_multi_course=1';
var ALIVE_PARAM = '{"type":12,"resource_type":4,"resource_id":"RESOURCE_ID","product_id":"","app_id":"APPID","extra_data":0}';
var ALIVE_URL = window.location.origin + '/content_page/BASE64?entry=3&entry_type=0&pro_id=PRODUCT_ID';


var APPID = window.location.hostname.split('.')[0];
var CURR_PAGE;

setInterval(function() {
    var path = window.location.pathname;
    var page = path.startsWith('/v1/course/video') ? 'video' : '';
        page = path.startsWith('/v1/course/alive') ? 'alive-detail' : page;
        page = path.startsWith('/v1/course/column') ? 'course' : page;
        page = path.startsWith('/content_page') ? 'alive' : page;
        page = path.startsWith('/evaluation_wechat/exerciseAnswer') ? 'writeHomework' : page;

    if (page != CURR_PAGE) {
        //页面改变，执行初始化
        CURR_PAGE = page;

        // 取请求参数pro_id作为productId
        var args = window.location.search.substr(1).match(new RegExp("(^|&)pro_id=([^&]*)(&|$)"));
        productId = decodeURIComponent(args && args[2]);
        // 取Restful请求路径作为productId
        productId = !productId ? window.location.pathname.split('/').pop() : productId;
        init(page, productId);
    }

}, 100);


var init = function (page, productId) {
    $('body').attr('mama', page);

    if (page == '') {
        var render = function(productId) {
            if ($('.right').size() == 0) {
                setTimeout(function(){
                    render(productId);
                }, 1000);
            } else {
                $('.right').append('<div class="discussionArea">隐藏讨论区</div>');
                $('.discussionArea').on('click',function(){
                    var text = $('.discussionArea').text();
                    if (text == '隐藏讨论区') {
                        $('.outWrapper').css("max-width","100%");
                        $('.interactionView').hide();
                        $('.discussionArea').text("显示讨论区");
                    } else if (text == '显示讨论区') {
                        $('.outWrapper').css("max-width","calc(100% - 470px)");
                        $('.interactionView').show();
                        $('.discussionArea').text("隐藏讨论区");
                    }
                });
            }
        };

        setTimeout(function(){
            render(productId);
        }, 1000);
    }

    if (page == 'alive-detail') {
        try {
            var resourceId = window.location.pathname.split('/').pop();
            var param = ALIVE_PARAM.replace('RESOURCE_ID', resourceId).replace('APPID', APPID);
            var url = ALIVE_URL.replace('BASE64', $.base64.encode(param)).replace('PRODUCT_ID', productId);
            window.location.href = url;
        } catch (e) {
            console.error(e);
        }
    }
    //
    // if (productId) {
    //     var LINK = '<a class="course-link FINISHED" href="HREF" update="UPDATE_AT" start="START_AT">TITLE</a>';
    //
    //     $.post('/column_more_data_v2/column_more_data', { "bizData[isDesc]": 1, "bizData[page_size]": 0, "bizData[product_id]": productId }, function(result) {
    //         if (result && result.data && result.data.contentData && result.data.contentData.contentInfo) {
    //             var list = result.data.contentData.contentInfo;
    //             list.forEach(function(i) {
    //                 var url;
    //                 if (i.srcType == 3) {
    //                     url = VIDEO_URL.replace(/RESOURCE_ID/, i.availableInfo.resourceId)
    //                                    .replace(/PRODUCT_ID/, productId);
    //                 } else if (i.srcType == 4) {
    //                     var param = ALIVE_PARAM.replace(/RESOURCE_ID/, i.availableInfo.resourceId)
    //                                            .replace(/APPID/, APPID);
    //                     url = ALIVE_URL.replace(/BASE64/, $.base64.encode(param))
    //                                    .replace(/PRODUCT_ID/, productId);
    //                 }
    //
    //                 // var item = {
    //                 //     title: i.title,
    //                 //     url: url,
    //                 //     updated_at: i.updated_at,
    //                 //     start_at: i.start_at
    //                 // };
    //
    //                 var link = LINK.replace(/HREF/, url)
    //                                .replace(/FINISHED/, i.updated_at ? '' : 'comming')
    //                                .replace(/UPDATE_AT/, i.updated_at)
    //                                .replace(/START_AT/, i.start_at)
    //                                .replace(/TITLE/, i.title);
    //
    //                 console.log(link);
    //             });
    //         }
    //     });
    //
    // }

    if (page == 'video') {
        var render = function(productId) {
            if ($('.video-header-detail-data .detail-title').size() == 0) {
                setTimeout(function(){
                    render(productId);
                }, 1000);
            } else {
                var courseTitle = $('.video-header-detail-data .detail-title').text()
                var courseHome = '<div class="course-home">' +
                                    '<a href="/v1/course/column/PRODUCT_ID?type=3">' +
                                    '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA5ODU2MDc1Mjc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM3NzkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMzcwLjEgMzcxLjVoLTQ5LjZjLTMuMSAwLTUuNy0yLjUtNS43LTUuN3YtNDkuNmMwLTMuMSAyLjUtNS43IDUuNy01LjdoNDkuNmMzLjEgMCA1LjcgMi41IDUuNyA1Ljd2NDkuNmMwIDMuMS0yLjYgNS43LTUuNyA1Ljd6IG0zMzMuNS03LjZINDYwLjVjLTMuMSAwLTUuNy0yLjUtNS43LTUuN3YtMzQuNWMwLTMuMSAyLjUtNS43IDUuNy01LjdoMjQzLjJjMy4xIDAgNS43IDIuNSA1LjcgNS43djM0LjVjLTAuMSAzLjItMi43IDUuNy01LjggNS43ek0zNzAuMSA3MTIuNGgtNDkuNmMtMy4xIDAtNS43LTIuNS01LjctNS43di00OS42YzAtMy4xIDIuNS01LjcgNS43LTUuN2g0OS42YzMuMSAwIDUuNyAyLjUgNS43IDUuN3Y0OS42YzAgMy4yLTIuNiA1LjctNS43IDUuN3ogbTMzMy41LTcuNUg0NjAuNWMtMy4xIDAtNS43LTIuNS01LjctNS43di0zNC41YzAtMy4xIDIuNS01LjcgNS43LTUuN2gyNDMuMmMzLjEgMCA1LjcgMi41IDUuNyA1Ljd2MzQuNWMtMC4xIDMuMS0yLjcgNS43LTUuOCA1Ljd6TTM3MC4xIDU0Mi41aC00OS42Yy0zLjEgMC01LjctMi41LTUuNy01Ljd2LTQ5LjZjMC0zLjEgMi41LTUuNyA1LjctNS43aDQ5LjZjMy4xIDAgNS43IDIuNSA1LjcgNS43djQ5LjZjMCAzLjEtMi42IDUuNy01LjcgNS43eiBtMzMzLjUtNy42SDQ2MC41Yy0zLjEgMC01LjctMi41LTUuNy01Ljd2LTM0LjVjMC0zLjEgMi41LTUuNyA1LjctNS43aDI0My4yYzMuMSAwIDUuNyAyLjUgNS43IDUuN3YzNC41Yy0wLjEgMy4yLTIuNyA1LjctNS44IDUuN3oiIHAtaWQ9IjM3ODAiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48cGF0aCBkPSJNODQ3LjEgNTYwLjRWMjUwLjFzMC0yNC43LTE0LTQ2LjRjLTEwLjgtMTYuOC0zMC0zMS44LTY0LjItMzEuOGgtMjYxYy0wLjIgMC0wLjMgMC0wLjUgMC4xSDI1NXMtNzguMSAwLTc4LjEgNzguMWwwLjEgMjEzLjRWNzc0czAgMjQuNyAxMy45IDQ2LjNjMTAuOCAxNi44IDMwIDMxLjggNjQuMiAzMS44aDI2MS4xYzAuMiAwIDAuMyAwIDAuNS0wLjFINzY5czc4LjEgMCA3OC4xLTc4LjFsLTAuMS0yMTMuNCAwLjEtMC4xeiBtLTM5IDIxMy42Yy0xLjMgMzguNS0zOC45IDM5LTM4LjkgMzloLTUxNGMtMS4zLTAuMS0yLjUtMC4yLTMuOC0wLjMtNS40LTEuMS0xNS43LTQuMS0yMy45LTExLjctOS05LjctMTEuMi0yMi4zLTExLjctMjYuMXYtMC43bDAuMS01MjQuMmMxLjMtMzguNSAzOC45LTM5IDM4LjktMzloNTE0YzEuMyAwLjEgMi41IDAuMiAzLjcgMC4zIDUuNCAxLjEgMTUuNyA0LjEgMjMuOSAxMS43IDkgOS43IDExLjIgMjIuMiAxMS43IDI2IDAgMC4yIDAgMC41IDAuMSAwLjdsLTAuMSA1MjQuM3oiIHAtaWQ9IjM3ODEiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4=" class="icon-home"/>' +
                                    '课程目录</a>' +
                                '</div>'.replace(/PRODUCT_ID/, productId);

                 $('.public-top .x-title').text(courseTitle);
                 $('.public-top').append(courseHome);
            }
        };

        setTimeout(function(){
            render(productId);
        }, 1000);
    }

    if (page == 'alive') {
        $(document).ready(function(){
            var initData = $('#initData').val();
            if (initData) {
                initData = JSON.parse(initData);

                // 机构头像
                var courseTitle = document.title;
                var orgAvanta = initData.bizData.pageData.wx_app_avatar;
                var courseSummary = initData.bizData.pageData.summary;

                var header = '<div class="public-top">' +
                                '<div class="x-home">' +
                                    '<img src="COURSE_ORG_IMG" class="public-top-icon"/>' +
                                    '<span class="x-title">COURSE_NAME</span>' +
                                '</div>' +
                                '<div class="course-home">' +
                                    '<a href="/v1/course/column/PRODUCT_ID?type=3">' +
                                    '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA5ODU2MDc1Mjc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM3NzkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMzcwLjEgMzcxLjVoLTQ5LjZjLTMuMSAwLTUuNy0yLjUtNS43LTUuN3YtNDkuNmMwLTMuMSAyLjUtNS43IDUuNy01LjdoNDkuNmMzLjEgMCA1LjcgMi41IDUuNyA1Ljd2NDkuNmMwIDMuMS0yLjYgNS43LTUuNyA1Ljd6IG0zMzMuNS03LjZINDYwLjVjLTMuMSAwLTUuNy0yLjUtNS43LTUuN3YtMzQuNWMwLTMuMSAyLjUtNS43IDUuNy01LjdoMjQzLjJjMy4xIDAgNS43IDIuNSA1LjcgNS43djM0LjVjLTAuMSAzLjItMi43IDUuNy01LjggNS43ek0zNzAuMSA3MTIuNGgtNDkuNmMtMy4xIDAtNS43LTIuNS01LjctNS43di00OS42YzAtMy4xIDIuNS01LjcgNS43LTUuN2g0OS42YzMuMSAwIDUuNyAyLjUgNS43IDUuN3Y0OS42YzAgMy4yLTIuNiA1LjctNS43IDUuN3ogbTMzMy41LTcuNUg0NjAuNWMtMy4xIDAtNS43LTIuNS01LjctNS43di0zNC41YzAtMy4xIDIuNS01LjcgNS43LTUuN2gyNDMuMmMzLjEgMCA1LjcgMi41IDUuNyA1Ljd2MzQuNWMtMC4xIDMuMS0yLjcgNS43LTUuOCA1Ljd6TTM3MC4xIDU0Mi41aC00OS42Yy0zLjEgMC01LjctMi41LTUuNy01Ljd2LTQ5LjZjMC0zLjEgMi41LTUuNyA1LjctNS43aDQ5LjZjMy4xIDAgNS43IDIuNSA1LjcgNS43djQ5LjZjMCAzLjEtMi42IDUuNy01LjcgNS43eiBtMzMzLjUtNy42SDQ2MC41Yy0zLjEgMC01LjctMi41LTUuNy01Ljd2LTM0LjVjMC0zLjEgMi41LTUuNyA1LjctNS43aDI0My4yYzMuMSAwIDUuNyAyLjUgNS43IDUuN3YzNC41Yy0wLjEgMy4yLTIuNyA1LjctNS44IDUuN3oiIHAtaWQ9IjM3ODAiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48cGF0aCBkPSJNODQ3LjEgNTYwLjRWMjUwLjFzMC0yNC43LTE0LTQ2LjRjLTEwLjgtMTYuOC0zMC0zMS44LTY0LjItMzEuOGgtMjYxYy0wLjIgMC0wLjMgMC0wLjUgMC4xSDI1NXMtNzguMSAwLTc4LjEgNzguMWwwLjEgMjEzLjRWNzc0czAgMjQuNyAxMy45IDQ2LjNjMTAuOCAxNi44IDMwIDMxLjggNjQuMiAzMS44aDI2MS4xYzAuMiAwIDAuMyAwIDAuNS0wLjFINzY5czc4LjEgMCA3OC4xLTc4LjFsLTAuMS0yMTMuNCAwLjEtMC4xeiBtLTM5IDIxMy42Yy0xLjMgMzguNS0zOC45IDM5LTM4LjkgMzloLTUxNGMtMS4zLTAuMS0yLjUtMC4yLTMuOC0wLjMtNS40LTEuMS0xNS43LTQuMS0yMy45LTExLjctOS05LjctMTEuMi0yMi4zLTExLjctMjYuMXYtMC43bDAuMS01MjQuMmMxLjMtMzguNSAzOC45LTM5IDM4LjktMzloNTE0YzEuMyAwLjEgMi41IDAuMiAzLjcgMC4zIDUuNCAxLjEgMTUuNyA0LjEgMjMuOSAxMS43IDkgOS43IDExLjIgMjIuMiAxMS43IDI2IDAgMC4yIDAgMC41IDAuMSAwLjdsLTAuMSA1MjQuM3oiIHAtaWQ9IjM3ODEiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4=" class="icon-home"/>' +
                                    '课程目录</a>' +
                                '</div>' +
                            '</div>';
                header = header.replace(/COURSE_ORG_IMG/, orgAvanta)
                               .replace(/COURSE_NAME/, courseTitle)
                               .replace(/PRODUCT_ID/, productId);
                 $('.outWrapper').prepend(header);



                var footer = '<div class="summaryWrapper">' +
                                 '<span class="summary-title">本节知识要点：</span>' +
                                 '<span class="summary-text">COURSE_SUMMARY</span>' +
                             '</div>';
                footer = footer.replace(/COURSE_SUMMARY/, courseSummary);
                $('.video-module').append(footer);
            } else {
                console.error('没有找到初始数据');
            }

            //显示讨论区
            var discuss = $('.discussBtnWrapper');
            discuss.click();

            //讨论区 ctrl+enter 提交
            $('#aliveInputText1').attr('placeholder', 'Ctrl + Enter 发送');
            $('#aliveInputText1').keydown(function(e){
                if (e.ctrlKey && e.which == 13) {
                    $('.submitInfo').click();
                }
            });
        });
    }
};
