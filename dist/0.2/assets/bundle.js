!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function onAssetsLoaded(assets){_dsc2["default"].getInstance({assets:assets,canvas:document.getElementById("dsc-logo")}),_bg2["default"].getInstance({assets:assets,canvas:document.getElementById("screen-background")})}var _AssetManager=require("./utils/AssetManager"),_AssetManager2=_interopRequireDefault(_AssetManager),_dsc=require("./screen/dsc"),_dsc2=_interopRequireDefault(_dsc),_bg=require("./screen/bg"),_bg2=_interopRequireDefault(_bg),bscAssets={logo:"/dist/0.2/assets/img/bsc-logo.png"};_AssetManager2["default"].load(bscAssets,onAssetsLoaded)},{"./screen/bg":2,"./screen/dsc":3,"./utils/AssetManager":5}],2:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),instance=null,BG=function(){function BG(options){_classCallCheck(this,BG),this.canvas=options.canvas,this.attachCanvas()}return _createClass(BG,null,[{key:"getInstance",value:function(options){return null===instance&&(instance=new BG(options)),instance}}]),_createClass(BG,[{key:"attachCanvas",value:function(){this.canvas.width=window.innerWidth,this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",this.onResize())}},{key:"drawDot",value:function(x,y){if(!Math.floor(3*Math.random())){var xa=x;xa>this.canvas.width/2&&(xa=this.canvas.width-xa),xa=this.canvas.width/2-xa;var seed=xa/800;.3>seed||(this.ctx.beginPath(),this.ctx.fillStyle="rgba(0,0,0,0.3)",this.ctx.arc(x,y,seed,0,2*Math.PI),this.ctx.fill())}}},{key:"drawDots",value:function(){for(var step=10,y=0;y<this.canvas.height;y+=step)for(var x=0;x<this.canvas.width;x+=step)this.drawDot(x,y)}},{key:"draw",value:function(){this.ctx.save(),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawDots(),this.ctx.restore()}},{key:"onResize",value:function(){this.canvas.width=0,this.canvas.height=0;for(var elements=document.querySelectorAll("section.screen"),i=0;i<elements.length;i++)this.canvas.height+=elements[i].offsetHeight-2;return this.canvas.width=elements[0].offsetWidth,this.draw(),this.onResize.bind(this)}}]),BG}();exports["default"]=BG},{}],3:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_AnimationFrame=require("../utils/AnimationFrame"),_AnimationFrame2=_interopRequireDefault(_AnimationFrame),DrawableLogo=function(){function DrawableLogo(logo){_classCallCheck(this,DrawableLogo),this.image=logo.el}return _createClass(DrawableLogo,[{key:"draw",value:function(ctx,w,h){var ew=80,eh=59,x=w/2-ew/2,y=h/2-eh/2;ctx.drawImage(this.image,0,0,ew,eh,x,y,ew,eh)}},{key:"drawText",value:function(ctx,w,h){var ew=202,eh=16,x=w/2-ew/2,y=h/2-eh/2+68;ctx.drawImage(this.image,0,68,ew,eh,x,y,ew,eh)}}]),DrawableLogo}(),DrawableNoise=function(){function DrawableNoise(){_classCallCheck(this,DrawableNoise),this.startTime=(new Date).getTime(),this.lastTime=0,this.count=0,this.noiseTime=4e3,this.timeout=6e3,this.noise=!1}return _createClass(DrawableNoise,[{key:"makeNoise",value:function(ctx,w,h){for(var imageData=ctx.getImageData(0,0,w,h),i=0;i<imageData.data.length;i+=4)0!==imageData.data[i+3]&&Math.floor(2*Math.random())&&(imageData.data[i+3]=Math.floor(100*Math.random()));ctx.putImageData(imageData,0,0)}},{key:"draw",value:function(ctx,w,h){var lease=this.lastTime-this.startTime;this.lastTime=(new Date).getTime(),lease>=this.timeout&&(this.startTime=this.lastTime),lease<this.noiseTime&&(lease<this.noiseTime-100?this.noise=!0:this.noise=!1,this.makeNoise.apply(this,arguments))}}]),DrawableNoise}(),DrawableLine=function(){function DrawableLine(start,speed,seed){_classCallCheck(this,DrawableLine),this.start=start,this.seed=seed,this.h=0,this.speed=speed}return _createClass(DrawableLine,[{key:"draw",value:function(ctx,w,h,isDraw){if(isDraw){var offset=(w-800)/2;ctx.beginPath(),ctx.strokeStyle="#aaa",ctx.lineWidth=4,ctx.moveTo(offset,this.h),ctx.lineTo(w-offset,this.h+this.seed),ctx.stroke()}this.h+=this.speed,this.h>=h&&(this.h=this.start),this.h<=0&&(this.h=h)}}]),DrawableLine}(),instance=null,DscLogo=function(){function DscLogo(options){_classCallCheck(this,DscLogo),this.assets=options.assets,this.canvas=options.canvas,this.attachCanvas(),this.setup(),this.draw()}return _createClass(DscLogo,null,[{key:"getInstance",value:function(options){return null===instance&&(instance=new DscLogo(options)),instance}}]),_createClass(DscLogo,[{key:"draw",value:function(){var _this=this,width=this.canvas.width,height=this.canvas.height,isDraw=!1;this.ctx.save(),this.ctx.clearRect(0,0,width,height),this.drawableLogo.draw(this.ctx,width,height),this.drawableNoise.noise===!0?(this.drawableLogo.drawText(this.ctx,width,height),isDraw=!0):isDraw=!1,this.drawableLine1.draw(this.ctx,width,height,isDraw),this.drawableNoise.draw(this.ctx,width,height),this.ctx.restore(),setTimeout(function(){return(0,_AnimationFrame2["default"])(_this.draw.bind(_this))},50)}},{key:"setup",value:function(){this.drawableLogo=new DrawableLogo(this.assets.logo),this.drawableNoise=new DrawableNoise,this.drawableLine1=new DrawableLine(100,3,10)}},{key:"onResize",value:function(){return this.canvas.width=window.innerWidth,this.canvas.height=document.querySelectorAll("section.dsc-screen")[0].offsetHeight,this.onResize.bind(this)}},{key:"attachCanvas",value:function(){window.addEventListener("resize",this.onResize()),this.ctx=this.canvas.getContext("2d")}}]),DscLogo}();exports["default"]=DscLogo},{"../utils/AnimationFrame":4}],4:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)}}()),exports["default"]=window.requestAnimationFrame},{}],5:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),AssetManager=function(){function AssetManager(assets,cb){var _this=this;if(_classCallCheck(this,AssetManager),arguments.length<2)throw new Error("Wrong arguments");this.cb=cb,this.assets={},Object.keys(assets).forEach(function(k){_this.assets[k]={url:assets[k],isComplete:!1}}),this.queue()}return _createClass(AssetManager,null,[{key:"load",value:function(assets,cb){return new AssetManager(assets,cb)}}]),_createClass(AssetManager,[{key:"queue",value:function(){var _this2=this;Object.keys(this.assets).forEach(function(k){var asset=_this2.assets[k];asset.el=document.createElement("img"),asset.el.onload=_this2.onLoad.bind(_this2,asset),asset.el.src=asset.url})}},{key:"onLoad",value:function(asset){var _this3=this,isAssetsComplete=!0;asset.isComplete=!0,Object.keys(this.assets).forEach(function(k){_this3.assets[k].isComplete===!1&&(isAssetsComplete=!1)}),isAssetsComplete===!0&&this.onComplete()}},{key:"onComplete",value:function(){this.cb(this.assets)}}]),AssetManager}();exports["default"]=AssetManager},{}]},{},[1]);