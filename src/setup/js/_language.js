
import * as Cookies from 'js-cookie';

$.fn.language = function(options){
  var defaults = {
    obj: $(this),
    language: {
      vn: 'vn',
      en: 'en',
      thai: 'thai',
    //   br: 'br',
    //   mm: 'mm',
    //   mx: 'mx',
    //   ph: 'ph'
    },
    languageDefault: 'vn',
  }
  var settings = $.extend(defaults, options);

  const lang = {
    getCookieLang: function(){
      let language = Cookies.get('language');
      return language;
    },
    setCookieLang: function(langCode){
      Cookies.set('language', langCode, {expires: 30, path: ''})
      return true;
    },
    signout: function(){
    //   Cookies.remove('zp_username');
    //   Cookies.remove('zp_sessionKey'); 
    //   Cookies.remove('zp_accessToken'); 
    //   Cookies.remove('zp_platform'); 
    },
    handle: {
      selectLang: function(){
        $("[data-language]").on('click touch', function(e){
          e.preventDefault();
          let language = $(this).data("language");
          // console.log(language); 
          if (settings.language[language] !== undefined) {
            lang.setCookieLang(settings.language[language]);
            lang.signout();
            location.reload();
          } else {
            console.error('Recheck FE Language Code: ' + language);
            return false;
          }
        })
      },
      removeCurrentLang: function() {
        // let currentLangCode = $("[data-language-current]").attr("data-language-current");
        // $("[data-language="+currentLangCode+"]").parent("li").remove();
      },
      executeAll: function(){
        lang.handle.removeCurrentLang();
        lang.handle.selectLang();
      }
    }
  }

  
//   console.log(lang.getCookieLang());
  lang.handle.executeAll();

}