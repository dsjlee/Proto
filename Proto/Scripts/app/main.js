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
    });
})(jQuery);
