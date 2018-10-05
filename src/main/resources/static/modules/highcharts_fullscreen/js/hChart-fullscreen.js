'use strict';

app.controller('FullScreenController', ['$scope', function ($scope) {
    $scope.load = function () {
        var l = $("#cbp-bislideshow"), g = l.children("li"), n = g.length, f = $("#cbp-bicontrols"), c = {
            $navPrev: f.find("span.cbp-biprev"),
            $navNext: f.find("span.cbp-binext"),
            $navPlayPause: f.find("span.cbp-bipause")
        }, h = 0, e, k = true, b = 3000;

        function m(o) {
            l.imagesLoaded(function () {
                if (Modernizr.backgroundsize) {
                    g.each(function () {
                        var p = $(this);
                        p.css("background-image", "url(" + p.find("img").attr("src") + ")")
                    })
                } else {
                    l.find("img").show()
                }
                g.eq(h).css("opacity", 1);
                j();
                a()
            })
        }

        function j() {
            c.$navPlayPause.on("click", function () {
                var o = $(this);
                if (o.hasClass("cbp-biplay")) {
                    o.removeClass("cbp-biplay").addClass("cbp-bipause");
                    a()
                } else {
                    o.removeClass("cbp-bipause").addClass("cbp-biplay");
                    i()
                }
            });
            c.$navPrev.on("click", function () {
                d("prev");
                if (k) {
                    a()
                }
            });
            c.$navNext.on("click", function () {
                d("next");
                if (k) {
                    a()
                }
            })
        }

        function d(q) {
            var p = g.eq(h);
            if (q === "next") {
                h = h < n - 1 ? ++h : 0
            } else {
                if (q === "prev") {
                    h = h > 0 ? --h : n - 1
                }
            }
            var o = g.eq(h);
            p.css("opacity", 0);
            o.css("opacity", 1);
            //console.log(o.children()[0]);
        }

        function a() {
            k = true;
            clearTimeout(e);
            e = setTimeout(function () {
                d("next");
                a()
            }, b)
        }

        function i() {
            k = false;
            clearTimeout(e)
        }

        m();
    };


    $scope.fullFn = function (num) {
        if (num === 0) {
            //var pagewidth = $(window).width();
            //var pageheight = $(window).height();
            //$("#cbp-bislideshow li").height(pageheight);
            //$("#cbp-bislideshow li").width(pagewidth );
            var marioVideo = $('#mario-video').get(0);
            if (marioVideo.requestFullscreen) {
                marioVideo.requestFullscreen();
            }
            else if (marioVideo.msRequestFullscreen) {
                marioVideo.msRequestFullscreen();
            }
            else if (marioVideo.mozRequestFullScreen) {
                marioVideo.mozRequestFullScreen();
            }
            else if (marioVideo.webkitRequestFullScreen) {
                marioVideo.webkitRequestFullScreen();
            }
        } else if (num === 1) {
            //setTimeout(function(){
            //    var pagewidth = $("#mario-video").width();
            //    var pageheight = $("#mario-video").height()-30;
            //    $("#cbp-bislideshow li").height(pageheight);
            //    $("#cbp-bislideshow li").width(pagewidth);
            //},100);
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    };

}]);