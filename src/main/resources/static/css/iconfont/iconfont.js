(function(window){var svgSprite='<svg><symbol id="icon-guidang" viewBox="0 0 1024 1024"><path d="M179.2 640h61.2864a76.8 76.8 0 0 1 42.5984 12.9024L417.3312 742.4h189.3376l134.2464-89.4976a76.8 76.8 0 0 1 42.5984-12.9024H844.8V563.2a25.6 25.6 0 0 1 51.2 0v307.2a76.8 76.8 0 0 1-76.8 76.8H204.8A76.8 76.8 0 0 1 128 870.4V204.8A76.8 76.8 0 0 1 204.8 128h614.4A76.8 76.8 0 0 1 896 204.8v186.0096a25.6 25.6 0 0 1-51.2 0V204.8a25.6 25.6 0 0 0-25.6-25.6H204.8a25.6 25.6 0 0 0-25.6 25.6v435.2z m0 51.2V870.4a25.6 25.6 0 0 0 25.6 25.6h614.4a25.6 25.6 0 0 0 25.6-25.6v-179.2h-61.2864a25.6 25.6 0 0 0-14.2336 4.3008l-135.5264 90.368a46.08 46.08 0 0 1-25.6 7.7312H415.8464a46.08 46.08 0 0 1-25.6-7.7312l-135.4752-90.368a25.6 25.6 0 0 0-14.2336-4.3008H179.2z m153.6-384h358.4a25.6 25.6 0 0 1 0 51.2h-358.4a25.6 25.6 0 0 1 0-51.2z m0 153.6h358.4a25.6 25.6 0 0 1 0 51.2h-358.4a25.6 25.6 0 0 1 0-51.2z m102.4 153.6h153.6a25.6 25.6 0 0 1 0 51.2h-153.6a25.6 25.6 0 0 1 0-51.2z" fill="#9DA7B2" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)