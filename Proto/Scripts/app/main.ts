/// <reference path="../typings/jquery/jquery.d.ts" />

class Greeter {

    constructor(public greeting: string) { }

    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
}
   
(function ($) {

    var greeter = new Greeter("Hello, world!");

    $(function () {
        $('#title').html(greeter.greet());
    });    

})(jQuery);   
