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

  const iconArray = Messages.map(item => `<img src='img/icons/${item.user_id}.png' class='slack-icon' data-name='${item.user_id}'>`);
  const iconLength = iconArray.length;

  $('.wrapper').randomElements(
    [
      '<img src="img/icons/01.png" class="naoki-image">',
      '<img src="img/icons/02.png" class="naoki-image">',
      '<img src="img/icons/03.png" class="naoki-image">',
      ...iconArray
    ],
    {
      num: iconLength,
      stageWidthExpansion: 0,
      stageHeightExpansion: 0,
      isRandomSize: false,
      tryCount: 10,
      adjustment: 0,
      sameRatio: true,
    }
  );

  $(document).on("click", ".slack-icon", function () {
    if ($('body').hasClass('active')) return;

    $(this).addClass("active");
    $('body').addClass("active");

    const userName = $(this).attr('data-name');
    const messageItem = Messages.filter(item => item.user_id == userName)[0];
    $('.message-container').append(`<div class="message-inner"><div class="message-detail"><div class="text">${messageItem.message.replace(/[\r\n]+/g, "<br />")}</div><div class="name"><div class="team">${messageItem.team}</div>${messageItem.user_name}</div></div><img src="img/icons/${messageItem.user_id}.png" class="thumbnail"></div>`)

    const timeLine = new TimelineMax();
    timeLine.set(
      '.thumbnail', {
      scale: 0.7,
      x: -10,
      }).set('message-detail', {
        scale: 0.7
      }).to(this, 0.1, {
        alpha: 0,
        scale: 0,
        x: -10,
        delay: 0.7,
        ease: Power3.easeIn
      }).to('.message-inner', 0, {
        alpha: 1,
      }).to('.thumbnail', 0.3, {
        alpha: 1,
        scale: 1,
        x: 0,
        delay: 0.1,
        ease: Power3.easeIn
      }).to('.message-detail', 0.1, {
        alpha: 1,
        scale: 1,
        delay: 0.1,
        ease: Power3.easeIn
      })
  });

  $('.overlay').click(function() {
    const timeLine = new TimelineMax();
    timeLine.set(
    '.slack-icon.active', {
      scale: 1.8
    }
    ).to('.message-detail', 0.1, {
        alpha: 0,
        scale: 0.7,
        delay: 0.1,
        ease: Power3.easeIn
      }).to('.thumbnail', 0.3, {
        alpha: 0,
        scale: 0.7,
        delay: 0.1,
        ease: Power3.easeIn,
      }).to('message-inner', 0, {
        alpha: 0,
        onComplete: function(){
          $('.message-container').empty();
          TweenMax.to('.slack-icon.active', 0.3, {
            alpha: 1,
            scale: 1,
            x: 0,
            ease: Power3.easeIn,
            onComplete: function(){
              $('.active').removeClass("active");
            }
          })
        }
      })
  })
}
