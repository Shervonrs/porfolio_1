function hover_eff(pos, yes)
{
    var pos=$(pos).position();
    var w=$(window).width();
    var hh=$(window).height();
    var imageh=0;
    imageh=$('.distort__img').height()/2;
    var off=0;
    var plus=0;
    var plus_2=0;
    var y=0;


    if(w<=420)
    {
    off=-150;
    }else{
    off=250;
    }

    if(yes=='yes')
    {
    var plus=-w/1.5;
    y=hh/2-imageh;
    }else
    {
    y=pos.top-off+50;
    }

    const body = document.body;
    const docEl = document.documentElement;

    const lineEq = (y2, y1, x2, x1, currentVal) => {
        // y = mx + b
        var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
        return m * currentVal + b;
    };

    const lerp = (a,b,n) => (1 - n) * a + n * b;

    const distance = (x1,x2,y1,y2) => {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.hypot(a,b);
    };

    const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy }
    }

    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    const feDisplacementMapEl = document.querySelector('feDisplacementMap');

    class Menu {
        constructor() {
            this.DOM = {
                svg: document.querySelector('svg.distort'),
                menu: document.querySelector('nav.menu')
            };
            this.DOM.imgs = [...this.DOM.svg.querySelectorAll('g > image')];
            this.DOM.menuLinks = [...this.DOM.menu.querySelectorAll('.menu__link')];
            this.mousePos = {x: winsize.width/4, y: winsize.height/4};
            this.lastMousePos = {
                translation: {x: winsize.width/4, y: winsize.height/4},
                displacement: {x: 0, y: 0}
            };
            this.dmScale = 0;

            this.current = -1;

            this.initEvents();
            requestAnimationFrame(() => this.render());
        }
        initEvents() {
            window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));

            this.DOM.menuLinks.forEach((item, pos) => {



                const mouseenterFn = () => {
                    if ( this.current !== -1 ) {
                       TweenMax.set(this.DOM.imgs[this.current], {opacity: 0});
                    }
                    this.current = pos;

                    if ( this.fade ) {
                        TweenMax.to(this.DOM.imgs[this.current], 0.5, {ease: Quad.easeOut, opacity: 1});
                        this.fade = false;
                    }
                    else {
                        TweenMax.set(this.DOM.imgs[this.current], {opacity: 1});
                    }


                };
                item.addEventListener('mouseenter', mouseenterFn);
            });

            const mousemenuenterFn = () => this.fade = true;
            const mousemenuleaveFn = () => TweenMax.to(this.DOM.imgs[this.current], .2, {ease: Quad.easeOut, opacity: 0});

            this.DOM.menu.addEventListener('mouseenter', mousemenuenterFn);
            this.DOM.menu.addEventListener('mouseleave', mousemenuleaveFn);
        }
        render() {
            this.lastMousePos.translation.x = lerp(this.lastMousePos.translation.x, this.mousePos.x, 0.1);
            this.lastMousePos.translation.y = lerp(this.lastMousePos.translation.y, this.mousePos.y, 0.1);
            this.DOM.svg.style.transform = `translateX(${(this.lastMousePos.translation.x-winsize.width/2+plus)}px) translateY(${(y)}px`;

            // Scale goes from 0 to 100 for mouseDistance values between 0 to 100
            this.lastMousePos.displacement.x = lerp(this.lastMousePos.displacement.x, this.mousePos.x, 0.1);
            this.lastMousePos.displacement.y = lerp(this.lastMousePos.displacement.y, this.mousePos.y, 0.1);
            const mouseDistance = distance(this.lastMousePos.displacement.x, this.mousePos.x, this.lastMousePos.displacement.y, this.mousePos.y);
            this.dmScale = Math.min(mouseDistance, 100);
            feDisplacementMapEl.scale.baseVal = this.dmScale;

            requestAnimationFrame(() => this.render());
        }
    }

    new Menu();
}
