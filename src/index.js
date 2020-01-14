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

  const iconArray = Messages.map(item => `<img src='img/icons/${item.user_id}.png' data-name='${item.user_id}'>`);

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
    if ($('body').hasClass('active')) return;
    $(this).addClass("active");
    $('body').addClass("active");

    const userName = $(this).attr('data-name');
    const messageItem = Messages.filter(item => item.user_id == userName)[0];
    $('.message-container').append(`<div class="message-inner"><div class="message-detail"><div class="text">${messageItem.message.replace(/[\r\n]+/g, "<br />")}</div><div class="name">${messageItem.team} ${messageItem.user_name}</div></div></div><img src="img/icons/${messageItem.user_id}.png" class="thumbnail">`)

  });

  $('.overlay').click(function() {
    $('.active').removeClass("active");
    $('.message-container').empty();
  })
}
