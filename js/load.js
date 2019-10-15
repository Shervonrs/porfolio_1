/* ################################# Preload e Loading ################################# */

function load (){
  /********** LOAD **********/

  let aload = 0;
  let bload = 1;
  let vector_p = ['<span class="letter">T</span><span class="letter">y</span><span class="letter">p</span><span class="letter">e</span>',
  '<span class="letter">G</span><span class="letter">r</span><span class="letter">a</span><span class="letter">p</span><span class="letter">h</span><span class="letter">i</span><span class="letter">c</span>',
   '<span class="letter">W</span><span class="letter">e</span><span class="letter">b</span>',
   '<span class="letter">D</span><span class="letter">e</span><span class="letter">s</span><span class="letter">i</span><span class="letter">g</span><span class="letter">n</span>'];

   function text_display() {
     if(aload == 4){
       aload = 0
     }

     $('#loading h2').html(vector_p[aload]);
     aload = aload + 1;

     if(bload == 1) {
       $('#loading #image_load img.active').removeClass('active');
       $('#loading #image_load img:first-child').addClass('active');
     }
     else {
       if(bload == 2) {
         $('#loading #image_load img.active').removeClass('active').next().addClass('active');
       }
       else {
         $('#loading #image_load img.active').removeClass('active').next().addClass('active');
         bload = 0;
       }
     }
    bload = bload + 1;
   }

   const time_interval = setInterval(text_display, 200);

   // *********** end- load **********//
   // *********** Preload **********//

   const preloadImages = () => {
     return new Promise((resolve, reject) => {
       imagesLoaded(document.querySelectorAll('img'), {background: true}, resolve);
     })
   }

   // And Then..

   preloadImages().then(() => {
     setTimeout(function (){
       $("body").removeClass('load');
     }, 4500);

     setTimeout(function (){
       $("#cover").addClass('end');
       $("#cont_work_page h1").addClass('end');
       $("#const_about_page h1").addClass("end");
       $("#poster_start").addClass('end');
     }, 1500);

     setTimeout(function () {
       clearInterval(time_interval)
       $("#loading").addClass('end');
       $("#image_load").addClass('end');
       $("#header").addClass('start');
       $("#rectangle_green").addClass('end');
       $("#cover").removeClass('end');
       $("#cont_work_page h1").removeClass('end');
       $("#const_about_page").removeClass('active').addClass('active_2');
       $("#poster_start").removeClass('end');
       $('#begin').addClass('active_2');
       anime.timeline({loop: false})
       .add({
         targets: '#loading h2 .letter',
         translateY: [0, -150],
         opacity: [1, 0],
         easing: "easeInExpo",
         duration: 800,
         delay: function (el, i ) {
           return 100 + 30 * i;
         }
       })
     }, 1200)
   })
   // *********** End- Preload **********//

}

(function( $ ){

     // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    /*window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);*/
//});



})(jQuery);

/* ################################# Smooth State Script ################################# */

(function( $ ){

  function addBlacklistClass() {
    $('a').each(function () {
      if (this.href.indexOf('/wp-admin') !== -1 || this.href.indexOf('/wp-login.php') !== 1){
        $(this).addClass('wp-link');
      }
    })
  }

  $(function(){

    let time_interval_tran;
    addBlacklistClass();

    const settings = {
      anchors: 'a, .link_f',
      blacklist: '.wp-link',

      onStart: {
        duration: 1500,
        render: function (container) {
          let bload = 1;

          $('#transition').removeClass('end').addClass('start');
          $('#transition #image_tran').removeClass('end');

          function transition_cycle () {
            if(bload == 1) {
              $('#transition #image_tran img.active').removeClass('active');
              $('#transition #image_tran img:first-child').addClass('active');
            }
            else {
              if (bload == 2) {
                $('#transition #image_tran img.active').removeClass('active').next().addClass('active');
              }
              else {
                $('#transition #image_tran img.active').removeClass('active').next().addClass('active');
                bload = 0;
              }
            }
            bload = bload +1;
          }
          time_interval_tran = setInterval(transition_cycle, 200);
        }
      },
      onAfter: function($container) {
        addBlacklistClass();

        var $hash = $(window.location.hash);
        if($hash.length !== 0) {
          var offsetTop = $hash.offset().top;

          $('body, html').animate({
            scrollTop: (offsetTop - 60),
          },
          {
            duration: 280
          }
        );
      }
        else {
          $('body, html').animate({
            scrollTop: (0),
          },
          {
            duration: 0
          }
        );
      }


      // Preload images

      const preloadImages = () => {
        return new Promise((resolve, reject) => {
          imagesloaded(document.querySelectorAll('img'), {background: true}, resolve);
        });
      };

      //And then..
      preloadImages().then(() => {
        clearInterval(time_interval_tran);
        $('#transition #image_tran').addClass('end');

        setTimeout(function (){
          $('#transition').addClass('end').removeClass('start');
          $('#begin').addClass('active_2');

          $("#const_work_page").removeClass('active').addClass('active_2').addClass('active_3');
        }, 500);
      });
    }
  };
    $('#page').smoothState(settings);
  });

})(jQuery);

(function($) {
  load();
})(jQuery);
