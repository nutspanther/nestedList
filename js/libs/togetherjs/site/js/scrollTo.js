!function ($) {
    $(function(){
      
      //side nav bar
      $('#sidenav').affix({
          offset: {
            top: 100
          , bottom: function () {
              return (this.bottom = $('#footer').outerHeight(true))
            }
          }
        })
      

        var $root = $('html, body');

        // unique nav tag here for HOME PAGE
        // $('a.scrollnav').click(function() {
        //     var href = $.attr(this, 'href');
        //     $root.animate({
        //         scrollTop: $(href).offset().top - 50
        //     }, 500, function () {
        //         window.location.hash = href;
        //     });
        //     return false;
        // });
        
        // unique nav tag here for DOCUMENATION page
        $('a.scrollnavdocs').click(function() {
            var href = $.attr(this, 'href');
            $root.animate({
                scrollTop: $(href).offset().top - 100
            }, 500, function () {
                window.location.hash = href;
            });
            return false;
        });
        
    })
}(window.jQuery)

