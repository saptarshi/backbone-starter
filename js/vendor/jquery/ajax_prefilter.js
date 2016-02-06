
jQuery.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  if (options.spinner) {
    var spinner = jQuery(options.spinner);
    if (spinner && spinner.length > 0) {
      
      var timeoutId = setTimeout(function(){
          if(!!options.loadertext){
            spinner.find('#loader_message').text(options.loadertext);
          }else{
            spinner.find('#loader_message').text('Loading');
          }
          spinner.show();
        }, 200);
      jqXHR.always(function () {
        clearTimeout(timeoutId);
	 
        spinner.hide();
      });
    } else {
      console.log('Found spinner parameter, but couldn\'t find the specified element.');
    }
  }
});