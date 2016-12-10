/// <reference path="../typings/jquery/jquery.d.ts" />

class Greeter {

    constructor(public greeting: string) { }

    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
}
   
(function ($) {

    let greeter = new Greeter("Hello, world!");

    $(function () {
        $('#title').html(greeter.greet());
        $('#test-btn').click(() => testAjax());
    });    

    let jqxhr: JQueryXHR;

    function testAjax() {
        jqxhr = <JQueryXHR>$.ajax({
            url: '/Home/Test',
            method: 'POST',
            dataType: 'json',
            beforeSend: (xhr) => {
                if (jqxhr && jqxhr.readyState !== 4) {
                    //jqxhr.onreadystatechange = null;
                    jqxhr.abort();
                }
            }
        }).done((data) => {
            console.log(data);
        });
    }

})(jQuery);   
