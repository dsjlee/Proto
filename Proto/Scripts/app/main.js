/// <reference path="../typings/jquery/jquery.d.ts" />
"use strict";
var TCS;
(function (TCS) {
    class Config {
    }
    Config.ColWidth = 25;
    TCS.Config = Config;
})(TCS || (TCS = {}));
class Greeter {
    constructor(greeting) {
        this.greeting = greeting;
    }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
}
Greeter.sayhi = () => {
    console.log("hi");
};
(function ($) {
    Greeter.sayhi();
    let greeter = new Greeter("Hello, world!");
    $(function () {
        $('#title').html(greeter.greet());
        $('#test-btn').click(() => testAjax());
    });
    let jqxhr;
    function testAjax() {
        jqxhr = $.ajax({
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
        }).fail((xhr) => {
            if (xhr.statusText !== 'abort') {
                alert(xhr.statusText);
            }
        });
    }
})(jQuery);
//# sourceMappingURL=main.js.map