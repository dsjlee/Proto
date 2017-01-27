/// <reference path="../typings/jquery/jquery.d.ts" />
var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "<h1>" + this.greeting + "</h1>";
    };
    return Greeter;
}());
(function ($) {
    var greeter = new Greeter("Hello, world!");
    $(function () {
        $('#title').html(greeter.greet());
        $('#test-btn').click(function () { return testAjax(); });
    });
    var jqxhr;
    function testAjax() {
        jqxhr = $.ajax({
            url: '/Home/Test',
            method: 'POST',
            dataType: 'json',
            beforeSend: function (xhr) {
                if (jqxhr && jqxhr.readyState !== 4) {
                    jqxhr.abort();
                }
            }
        }).done(function (data) {
            console.log(data);
        }).fail(function (xhr) {
            if (xhr.statusText !== 'abort') {
                alert(xhr.statusText);
            }
        });
    }
})(jQuery);
