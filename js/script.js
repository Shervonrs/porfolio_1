var controller;

/* ################################# Home Script ################################# */

function all() {

  function hover_effect_web() {

    // webGL

    $('canvas').remove();

    var image = $('#canvas1 img').attr('src');
    var myAnimation = new hoverEffect({
      parent: document.querySelector('#canvas1'),
      intensity: 0.3,
      image1: image,
      image2: image,
      displacementImage: 'https://www.danilodemarco.com/core/assets/0be5a6c828/img/displacement/17.jpg'
    });

    var image = $('#canvas2 img').attr('src');
    var myAnimation = new hoverEffect({
      parent: document.querySelector('#canvas2'),
      intensity: 0.3,
      image1: image,
      image2: image,
      displacementImage: 'https://www.danilodemarco.com/core/assets/0be5a6c828/img/displacement/17.jpg'
    });

    var image = $('#canvas3 img').attr('src');
    var myAnimation = new hoverEffect({
      parent: document.querySelector('#canvas3'),
      intensity: 0.3,
      image1: image,
      image2: image,
      displacementImage: 'https://www.danilodemarco.com/core/assets/0be5a6c828/img/displacement/17.jpg'
    });

    var image = $('#canvas4 img').attr('src');
    var myAnimation = new hoverEffect({
      parent: document.querySelector('#canvas4'),
      intensity: 0.3,
      image1: image,
      image2: image,
      displacementImage: 'https://www.danilodemarco.com/core/assets/0be5a6c828/img/displacement/17.jpg'
    });
  }

  hover_effect_web();

  /* ######################### Slider GLIDE ######################### */

  var slider = new Glide('.glide', {
    type: 'carousel',
    autoplay: 0,
    animationDuration: 300,
    animationTimingFunc: 'linear',

    perView: 1,
    peek: 450,
    breakpoints:{
      2700: {
        peek: 600,
      },
      1700 : {
        peek: 450,
      },
      1366 : {
        peek: 400,
      },
      1280 : {
        peek: 300,
      },
      1100 : {
        peek: 180,
      },
      800 : {
        peek: 100,
      },
      700 : {
        peek: 0,
        perView: 1,
      },
    },
  });

  $('.link_f').on('click', function(e) {
    e.preventDefault();
  })

  var isDragging = false;

  $('.link_f').mousedown(function(){
    isDragging = false;
  })
  .mousemove(function(){
    isDragging = true;
  })
  .mouseup(function() {
    var wasDragging = isDragging;
    isDragging = false;
    if(!wasDragging) {
      var id_att;
      id_att = $(this).data('id');
      $("#"+id_att).trigger('click');
    }
  })

  var a = 0;
  var position = 0;
  var larghezza_elemento = 0;
  var poster_title = 0;
  var pop = 0;

  slider.on('mount.after', function() {
    var titolo_attivo = $(".glide__slide--active").data('title');
    var titolo_prev = $(".glide__slide--active").prev().data('title');
    var titolo_next=$(".glide__slide--active").next().data('title');

    var window_w = $(window).width();

    if(window_w <= 540) {
      pop = window_w * 1.5;
    }
    else {
      pop = window_w * 1.2;
    }

    position = $('#poster h2 span.first').position();
    larghezza_elemento = -pop;

    $('#poster h2').css({left:-position.left+larghezza_elemento}, 1000);
  })

  var titolo_attivo_old
  slider.on('run.before', function() {
    titolo_attivo_old = $('.glide__slide--active').data('title');
    $('#poster').addClass('pointnone');
  });

  $(window).on('resize', function() {
    position = $("#poster h2 span.active").position();
    larghezza_elemento = $('#poster h2 span.active').width()/4
    $('#poster h2').css({left:-position.left+larghezza_elemento});
  })

  $(window).on('orientationchange', function() {
    location.reload();
  });

  slider.on('run.after', function () {
    position= $('#poster h2 span.first').position();
    larghezza_elemento = $('#poster h2 span.first').width()/4
    poster_title = $('#poster h2 span.poster_title').outerWidth();

    $('#poster h2 span.poster_title').remove();
    $('#poster h2').css({left:poster_title-position.left+larghezza_elemento});
    var titolo_attivo= $('.glide__slide--active').data('title');
    var titolo_prev = $(".glide__slide--active").prev().data('title');
    var titolo_next = $(".glide__slide--active").next().data('title');

    if(titolo_attivo_old == titolo_prev) {
      a = a + 1;

      // Avanti

      $('#poster h2 span.active').addClass('old');
      $('#poster h2 span.active').next().addClass('active');
      $('#poster h2 span.old').removeClass('old');

      position = $('#poster h2 span.active').position();
      larghezza_elemento= $('#poster h2 span.active').width()/4;
      $('#poster h2').animate({left:-position.left+larghezza_elemento}, 1000);

      if( a > 5) {
        a = 0;
        $('#poster h2 span.active').addClass('prov');
        $('#poster h2 span.first').addClass('active');

        setTimeout(function () {
          $('.prov').removeClass('prov active');
          position= $('#poster h2 span.first').position();
          larghezza_elemento = $('#poster h2 span.first').width()/4
          $('#poster h2').css({left: -position.left + larghezza_elemento});
        }, 1200)
      }
    }
    else {
      a= a-1;

      $('#poster h2 span.active').addClass('old');
      $('#poster h2 span.active').removeClass('active').prev().addClass('active');
      $('#poster h2 span.old').removeClass('old');

      position= $('#poster h2 span.active').position();
      larghezza_elemento = $('#poster h2 span.active').width()/4;
      $('#poster h2').animate({left: -position.left+ larghezza_elemento}, 1000);

      if(a < 0) {
        a = 5;
        $("#poster h2 span.active").addClass('prov');
        $('#poster h2 span.last').addClass('active');

        setTimeout(function(){
          $('.prov').removeClass('prov active');
          position = $('#poster h2 span.last').position();
          larghezza_elemento = $('#poster h2 span.last').width()/4
          $('#poster h2').css({left: -position.left + larghezza_elemento});
        }, 1200)
      }
    }
    setTimeout(function () {
      $('#poster').removeClass('pointnone');
    }, 1000)
  })

  slider.mount()

  /* ######################### END - Slider Glide ############################ */

  /* Scroll Magic Home */

  var controller = new ScrollMagic.Controller();

  var scroll_green = new ScrollMagic.Scene({triggerElement: "#titolo_sito", triggerHook: "onLeave", offset: '150'})
  .setTween(TweenMax.to("#scroll, #image_cuore, #email span, #email a", 1 , {opacity: '0', ease: Power4.linear, force3D: false}))
  .addTo(controller);

  var scroll_green = new ScrollMagic.Scene({triggerElement: "#titolo_sito", triggerHook: "onLeave", offset: '150'})
  .setTween(TweenMax.to('#rectangle_green', 0.2, {y: '-50%', ease: Power4.linear, force3D: false}))
  .addTo(controller);

  var green_work_show=new ScrollMagic.Scene({triggerElement: "#work_1 h2", offset: '-230'})
  .setClassToggle("#work_1 .work", "active")
  .reverse(false)
  .addTo(controller);

  var green_work_show_2 = new ScrollMagic.Scene({triggerElement: "#work_2 h2", offset: '-230'})
  .setClassToggle("#work_2 .work", "active")
  .reverse(false)
  .addTo(controller);

  var green_work_show_3 = new ScrollMagic.Scene({triggerElement: "#work_3 h2", offset: '-230'})
  .setClassToggle("#work_3 .work", "active")
  .reverse(false)
  .addTo(controller)

  var green_work_show_4 = new ScrollMagic.Scene({triggerElement: "#work_4 h2", offset: '-230'})
  .setClassToggle("#work_4 .work", "active")
  .reverse(false)
  .addTo(controller)

  var poster_titles = new ScrollMagic.Scene({triggerElement: "#poster", offset: '-200'})
  .setClassToggle("#poster h2", "active")
  .reverse(false)
  .addTo(controller)

  var type_outline = new ScrollMagic.Scene({triggerElement: "#type", offset: '-100'})
  .setClassToggle("#type h2 span:last-child", "active")
  .reverse(true)
  .addTo(controller)

  var scroll_logo = new TimelineMax ()
  .add([
    TweenMax.to('#logos ul', 1 , {x: '-700px', ease: Power4.linear, force3D: false})
  ]);

  var cont_logo = new ScrollMagic.Scene({triggerElement: "#logos", offset: '50', duration: 1500})
  .setTween(scroll_logo)
  .addTo(controller)

  var scroll_type = new TimelineMax ()
  .add([
    TweenMax.to("#type h2", 1, {y: '200px', ease: Power4.linear, force3D: false}),
  ]);

  var cont_type = new ScrollMagic.Scene({triggerElement: "#type", offset: '100', duration: 1500})
  .setTween(scroll_type)
  .addTo(controller)

  var scroll_left_herbert = new TimelineMax ()
  .add([
    TweenMax.to('#herbert img.type_1', 0.2, {x: '-100%', ease: Power4.linear, force3D: false}),
  ]);

  var herbert_scroll = new ScrollMagic.Scene({triggerElement: '#herbert', offset: '-350', duration: 3000})
  .setTween(scroll_left_herbert)
  .addTo(controller)

  var herbert_data = new ScrollMagic.Scene({triggerElement: "#herbert img", offset: '300'})
  .setClassToggle("#herbert .cont_data>div", "active")
  .reverse(false)
  .addTo(controller);

  var scroll_left_k95alphabet = new TimelineMax ()
  .add([
    TweenMax.to("#k95alphabet img.type_1", 0.2, {x: '100%', ease: Power4.linear, force3D: false}),
  ])

  var k95_scroll = new ScrollMagic.Scene({triggerElement: "#k95alphabet", offset: '-250', duration: 5000})
  .setTween(scroll_left_k95alphabet)
  .addTo(controller)

  var k95_data = new ScrollMagic.Scene({triggerElement: "#k95alphabet img", offset: "300"})
  .setClassToggle("#k95alphabet .cont_dat>div", "active")
  .reverse(false)
  .addTo(controller)

  var scroll_left_agane = new TimelineMax ()
  .add([
    TweenMax.to("#agane img.type_1", 0.2, {x: '-100%', ease: Power4.linear, force3D: false}),
  ]);

  var herbert_scroll = new ScrollMagic.Scene({triggerElement: "#agane", offset: '-350', duration: 3000})
  .setTween(scroll_left_agane)
  .addTo(controller)

  var herbert_data = new ScrollMagic.Scene({triggerElement: "#agane img", offset: '300'})
  .setClassToggle("#agane .cont_dat>div", "active")
  .reverse(false)
  .addTo(controller);

      /* ################################# END - Scroll magic ################################# */

}


/* ################################# Smooth Scrollbar / Cursor ################################# */

(function($) {
  var Scrollbar= window.Scrollbar;

  Scrollbar.init(document.querySelector('.site-content'), {
    dampling: 0.05,
    renderByPixels: false,
  });

  /* ################################# Cursor ################################# */

  const cursor = $('.cursor');
  const cursor2 = $('.cursor2');

  $(document).on('mousemove', function(event) {
    cursor.attr("style", "transition:all 500ms cubic-bezier(0.075, 0.820, 0.165, 1.000); top: "+(event.pageY - 16)+"px; left: "+(event.pageX - 16)+"px; ");

    cursor2.attr("style", " top: "+(event.pageY)+"px; left: "+(event.pageX)+"px;")
  });

  $("a").hover(
    function() {
      cursor.addClass('expand');
      cursor2.addClass("expand");
      cursor.removeClass("none");
    },
    function () {
      cursor.addClass("none");
      cursor2.removeClass("expand");
      cursor.removeClass("expand");
    }
  );

  $("#poster .content").hover(
    function() {
      cursor.addClass("expand_3");
      cursor2.addClass("expand");
      cursor.removeClass("none");
    },
    function() {
      cursor.addClass("none");
      cursor.removeClass("expand_3");
      cursor2.removeClass("expand");
    }
  );

  $("#type a, #more_behance").hover(
    function(){
      cursor.addClass("expand_4");
      cursor2.addClass("expand");
      cursor.removeClass("none");
    },
    function() {
      cursor.addClass("none");
      cursor.removeClass("expand_4");
      cursor2.removeClass("expand");
    }
  );

  $(".work a").hover(
    function() {
      cursor.addClass("expand_5");
      cursor2.addClass("expand");
      cursor.removeClass("none");
    },

    function() {
      cursor.addClass("none");
      cursor.removeClass("expand_5");
      cursor2.removeClass("expand");
    }
  );
  /* ################################# End - Cursor ################################# */


})(jQuery);

(function( $ ){

/* ################################# Protect email ################################# */
    var tld_ = new Array()
    tld_[0] = "com";
    tld_[1] = "org";
    tld_[2] = "net";
    tld_[3] = "ws";
    tld_[4] = "info";
    tld_[10] = "it";
    tld_[11] = "org.uk";
    tld_[12] = "gov.uk";
    tld_[13] = "ac.uk";
    var topDom_ = 13;
    var m_ = "mailto:";
    var a_ = "@";
    var d_ = ".";
    var cont;

    function mail(name, dom, tl, params, cont)
    {
        var s = e(name,dom,tl);
        $('<a href="'+m_+s+params+'">'+s+'</a>').appendTo(cont);
    }

    function mail2(name, dom, tl, params, display, cont)
    {
       $('<a href="'+m_+e(name,dom,tl)+params+'">'+display+'</a>').appendTo(cont);
    }

    function e(name, dom, tl)
    {
        var s = name+a_;
        if (tl!=-2)
        {
            s+= dom;
            if (tl>=0)
            s+= d_+tld_[tl];
        }
        else
            s+= swapper(dom);
            return s;
    }

    function swapper(d)
    {
        var s = "";
        for (var i=0; i<d.length; i+=2)
            if (i+1==d.length)
                s+= d.charAt(i)
            else
                s+= d.charAt(i+1)+d.charAt(i);
                return s.replace(/\?/g,'.');
    }

    mail2("hello","danilodemarco",0,"", "Get in touch", "#email");
    mail2("hello","danilodemarco",0,"", "Get in touch", "#email_work #mail_t");
    mail("hello","danilodemarco",0,"", "#contact p:first-child");
    mail("danilo.demarco","k95",10,"", "#contact p:last-child");

    /* ################################# END - Protect email ################################# */



})(jQuery);

(function($) {

  $('#logos').on('mouseenter', function () {
    var pos = '#logos ul';
    hover_eff(pos, 'no');
  });
    all ()
})(jQuery);
