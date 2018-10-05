(function () {
    var viewFullScreen = document.getElementById("view-fullscreen");
    if (viewFullScreen) {
        viewFullScreen.addEventListener("click", function () {
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        }, false);
    }

    var cancelFullScreen = document.getElementById("cancel-fullscreen");
    if (cancelFullScreen) {
        cancelFullScreen.addEventListener("click", function () {
            $('#cbp-bislideshow li div').css('width',1100+'px');
            $('#cbp-bislideshow li div').css('height',700+'px');
            $('#cbp-bislideshow canvas').css('width',1000+'px');
            $('#cbp-bislideshow canvas').css('height',700+'px');
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
        }, false);
    }


    var fullscreenState = document.getElementById("fullscreen-state");
    if (fullscreenState) {
        document.addEventListener("fullscreenchange", function () {
            fullscreenState.innerHTML = (document.fullscreenElement)? "" : "not ";
        }, false);
        
        document.addEventListener("msfullscreenchange", function () {
            fullscreenState.innerHTML = (document.msFullscreenElement)? "" : "not ";
        }, false);
        
        document.addEventListener("mozfullscreenchange", function () {
            fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not ";
        }, false);
        
        document.addEventListener("webkitfullscreenchange", function () {
            fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not ";
        }, false);
    }

    var marioVideo = document.getElementById("mario-video")
        videoFullscreen = document.getElementById("video-fullscreen");
    var oldWidth = 0;
    var oldHeight = 0;
    if (marioVideo && videoFullscreen) {
        videoFullscreen.addEventListener("click", function (evt) {
            function client() {
                return {
                    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
                    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
                };
            }
            var widthNum = client().width - 60;
            var heightNum = client().height - 60;
            var oldWidth = $('#cbp-bislideshow li div').css('width');
            console.log(oldWidth);
            var oldHeight = $('#cbp-bislideshow li div').css('height');
            $('#cbp-bislideshow li div').css('width',widthNum+'px');
            $('#cbp-bislideshow li div').css('height',heightNum+'px');
            $('#cbp-bislideshow canvas').css('width',widthNum+'px');
            $('#cbp-bislideshow canvas').css('height',heightNum+'px');
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
                /*
                    *Kept here for reference: keyboard support in full screen
                    * marioVideo.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                */
            }
        }, false);
    }
})();

