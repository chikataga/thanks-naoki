import { Bounce, Cubic } from 'gsap/EasePack';
import $ from 'jquery';
import { TweenMax, TimelineMax } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import './scss/style.scss';

window.onload=function(){
  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;
  const wrapperWidth = $('.wrapper').width();
  const wrapperHeight = $('.wrapper').height();
  const diffWidth = wrapperWidth - pageWidth;
  const diffHeight = wrapperHeight - pageHeight;

  let timeoutId;
  document.body.addEventListener("mousemove", function(e){
    if ( timeoutId ) return ;

    timeoutId = setTimeout( function () {
      timeoutId = 0 ;

      let mX = e.pageX;
      let mY = e.pageY;

      TweenMax.to('.wrapper', 0.3, {
        x: - (mX / pageWidth * diffWidth),
        y: - (mY / pageHeight * diffHeight),
        ease: Power3.easeIn,
      });

    }, 500 ) ;

  });
}
