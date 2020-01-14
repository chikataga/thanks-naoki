import { Bounce, Cubic, Linear } from 'gsap/EasePack';
import $ from 'jquery';
import { TweenMax, TimelineMax } from 'gsap';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import './scss/style.scss';
import 'jquery.random-elements';
import Messages from './messages.json';

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
    if ($('body').hasClass('active')) return;

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

  const iconArray = Messages.map(item => `<img src='img/icons/${item.user_id}.png'>`);

  $('.wrapper').randomElements(
    [
      '<img src="img/icons/01.png">',
      '<img src="img/icons/02.png">',
      '<img src="img/icons/03.png">'
    ],
    {
      className: 'naoki-image',
      num: 10,
      stageWidthExpansion: 0,
      stageHeightExpansion: 0,
      width: 180,
      height: 180,
      isRandomSize: false,
      tryCount: 10,
      adjustment: 0
    }
  );

  $('.wrapper').randomElements(
    iconArray,
    {
      className: 'slack-icon',
      num: 60,
      stageWidthExpansion: 0,
      stageHeightExpansion: 0,
      width: 70,
      height: 70,
      isRandomSize: false,
      tryCount: 10,
      adjustment: 10
    }
  );

  $(document).on("click", ".slack-icon", function () {
    const href = $(this).attr('src');
    console.log(href);
    $(this).addClass("active");
    $('body').addClass("active");

  });

  $('.overlay').click(function() {
    $('.active').removeClass("active");
  })
}
