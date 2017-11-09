(function( $ ){

  function  setWeatherLI(loc,el){
    const params = "q=" + loc + "&appid=" + "600ffdc37498bdbf0addcd68c0a9b0a9";
    let promise= fetch('http://api.openweathermap.org/data/2.5/weather?' + params);
    promise
      .then(function(response) {
        if (response.status === 200) return response.json();
        else {
          reject(new Error(response.status));
        }
      })
      .then(function(data) {
        let temp = Math.round(data.main.temp - 273);
        el.text(el.html() + ", " + temp.toString() + "° in " + data.name);
      })
      .catch( function(err ){});

  }

  $.fn.weather = function(options) {
    const settings = $.extend(
      {
        cities: ['London','New York','Moscow','Minsk','Krasnodar'],
        direction: 'top'//top or bottom
      }, options);
    this.each(function(ind,el){
        $(el).children("li").on('click',function(){//add animation for li elements
          const parent = $(this).hide("fast").parent();
          setTimeout(function(){
            if(settings.direction === 'top') parent.prepend($(this));
            else if(settings.direction === 'bottom') parent.append($(this));
            $(this).show("fast");
          }.bind(this),200);
        });
        $(el).children("li").each(function(ind,el){//add weather information in li elements
          const str = $(el).html();
          for(let cityname of settings.cities){
            if(~ str.toLowerCase().indexOf(cityname.toLowerCase())){
              setWeatherLI(cityname,$(el));
            }
          }
        })
    })
  return this;
  };
})( jQuery );
