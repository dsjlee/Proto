/// <reference path="../typings/jquery/jquery.d.ts" />

class Greeter {

    constructor(public greeting: string) { }

    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }

    public static sayhi = () => {
        console.log("hi");
    }
}
   
(function ($) {

    Greeter.sayhi();

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
                    jqxhr.abort();
                }
            }
        }).done((data) => {
            console.log(data);
        }).fail((xhr: JQueryXHR) => {
            if (xhr.statusText !== 'abort') {
                alert(xhr.statusText);
            } 
        });
    }

})(jQuery);   
