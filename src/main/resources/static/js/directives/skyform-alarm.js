angular.module('skyform-alarm',[])
    .directive('skyformAlarm', function($timeout, $parse) {
        return {
            restrict: 'AE',
            replace: false,
            scope: {

            },
            template:"<audio src='js/directives/music/alarm.mp3' id='_audio'></audio>",
            link: function(scope, element, attr) {
                var audio=document.getElementsByTagName('audio');
                audio._audio.play();
            }
        };
    });