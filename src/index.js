import { Bounce, Cubic, Linear } from 'gsap/EasePack';
import $ from 'jquery';
import { TweenMax, TimelineMax } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import './scss/style.scss';
import 'jquery.random-elements';

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

      TweenMax.to('.wrapper', 0.5, {
        x: - (mX / pageWidth * diffWidth),
        y: - (mY / pageHeight * diffHeight),
        ease: Linear.easeIn,
      });

    }, 100 ) ;

  });

  $(".wrapper").randomElements(
    [
      '<img src="img/icons/01.png">',
      '<img src="img/icons/02.png">',
      '<img src="img/icons/03.png">'
    ],
    {
      className: 'random-content',
      num: 20,
      stageWidthExpansion: 0,
      stageHeightExpansion: 0,
      width: 80,
      height: 80,
      isRandomSize: false,
      tryCount: 10,
      adjustment: 0
    }
  );
}
