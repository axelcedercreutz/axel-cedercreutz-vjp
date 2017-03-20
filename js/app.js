//open and close toggle-navbat for small screen
$('.navbar-toggle').click('click', function(e) {
    $('.navbar-collapse').css("background-color","lightgray").toggle() //
    $('.navbar-collapse ul li a').click(function(){ 
             $('.navbar-toggle:visible').click(); //hide the collapse when a section is chosen
     });
});
//smooth scroll
$('a.page-scroll').click('click', function(e) {
    var $anchor = $(this);
         $('html, body').stop().animate({
             scrollTop: ($($anchor.attr('href')).offset().top+3) //where the animation takes you, how long it takes and what type of animation it is
         }, 1250, 'easeInOutExpo');
         event.preventDefault();
})
var aChildren = $(".navbar-right li").children(); // find the a children of the list items
 $(window).scroll(function(){
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
    var windowHeight = $(window).height(); // get the height of the window
    for (var i=0; i < aChildren.length; i++) {
        var Child = aChildren[i]            //get the specific child
        var ID= Child.href.split('#')[1];   //get the id for that child's href
        if($('#'+ID).offset() != undefined) {    //to make it so that the code doesnt run on FAQ and Career pages
            var divPos = $('#'+ID).offset().top; // get the offset of the div from the top of page
            var divHeight = $('#'+ID).height() + 150; // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='#" + ID + "']").css("color","#fed138"); //change the color when in the area
            } else {
                $("a[href='#" + ID + "']").css("color","black")
                $("a[href='#" + ID + "']").mouseenter(function(){
                    $(this).css("color","#fed138");
                })
                $("a[href='#" + ID + "']").mouseleave(function(){
                    $(this).css("color","black");
                })
            }
        }
    }
});
document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');

    var cw,ch;

    v.addEventListener('play', function(){
        cw = v.clientWidth;
        console.log(cw);
        ch = v.clientHeight;
        console.log(ch);
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;
        draw(v,context,backcontext,cw,ch);
    },false);

},false);

function draw(v,c,bc,w,h) {
    console.log("testing");
    if(v.paused || v.ended) return false;
    // First, draw it into the backing canvas
    bc.drawImage(v,0,0,w,h);
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;
    console.length(data);
    // Loop through the pixels, turning them grayscale
    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var brightness = (3*r+4*g+b)>>>3;
        data[i] = brightness;
        data[i+1] = brightness;
        data[i+2] = brightness;
    }
    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setTimeout(function(){ draw(v,c,bc,w,h); }, 0);
}
