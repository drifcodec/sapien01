(function($)
{
    $.fn.slideshow = function(cfg)
    {
        var defaults = {
            "autoPlaySpeed" : 3000,
            "fadeSpeed" : 500,
            "hoverStop" : false,
            "nav" : false,
            "dots" : false
        };

        var Slideshow = function(elm, cfg)
        {
            var that = this,
                intervalId,
                slides,
                controls = [];
            this.config = $.extend(defaults, cfg);

            this.prev = function()
            {
                slides.find("> div:last")
                    .stop()
                    .fadeIn(that.config.fadeSpeed)
                    .prependTo(slides)
                    .next()
                    .fadeOut(that.config.fadeSpeed)
            };

            this.next = function()
            {
                slides.find("> div:first")
                    .stop()
                    .fadeOut(that.config.fadeSpeed)
                    .next()
                    .fadeIn(that.config.fadeSpeed)
                    .prev()
                    .appendTo(slides);
                that.changeActiveDot();
            };

            this.changeActiveDot = function()
            {
                if(that.config.dots)
                {
                    var id = slides.find("> div:first-child").data("id");
                    controls["dots"].find("> a.active").removeClass("active");
                    controls["dots"].find('> a[data-id="'+id+'"]').addClass("active");
                }
            }

            this.play = function()
            {
                intervalId = setInterval(function()
                {
                    that.next();
                }, that.config.autoPlaySpeed);
            };

            this.addControls = function ()
            {
                if(that.config.nav || that.config.dots)
                {
                    controls["elm"] = $("<div />").addClass("slideshow__controls").appendTo(elm);

                    if(that.config.nav)
                    {
                        controls["nav"] = $("<div />").addClass("slideshow__nav").appendTo(controls["elm"]);

                        controls["nav"].append(
                            $("<a />")
                                .addClass("slideshow__prev")
                                .attr("href", "#")
                                .on("click", function(e)
                                {
                                    e.preventDefault();
                                    that.prev();
                                })
                        );

                        controls["nav"].append(
                            $("<a />")
                                .addClass("slideshow__next")
                                .attr("href", "#")
                                .on("click", function(e)
                                {
                                    e.preventDefault();
                                    that.next();
                                })
                        );
                    }

                    if(that.config.dots)
                    {
                        controls["dots"] = $("<div />").addClass("slideshow__dots").appendTo(controls["elm"]);

                        slides.find("> div").each(function()
                        {
                            controls["dots"].append(
                                $("<a />")
                                    .addClass("slideshow__dot")
                                    .attr("data-id", $(this).index())
                                    .on("click", function(e)
                                    {
                                        e.preventDefault();
                                        while($(this).data("id") != slides.find("> div:first-child").data("id"))
                                        {
                                            that.next();
                                        }
                                    })
                            );
                        });

                    }
                }
            };

            this.init = function()
            {
                if(elm.find("> div").length > 1)
                {
                    elm.find("> div").wrapAll(
                        $("<div />").addClass("slideshow__inner")
                    );
                    slides = elm.find(".slideshow__inner");
                    slides.find("> div").each(function()
                    {
                        $(this).data("id", $(this).index());
                    });
                    slides.find("> div:gt(0)").hide();

                    that.addControls();

                    that.changeActiveDot();

                    that.play();

                    if(that.config.hoverStop)
                    {
                        elm.on("mouseenter", function()
                        {
                            clearInterval(intervalId);
                        }).on("mouseleave", function()
                        {
                            that.play();
                        });
                    }
                }
                elm.css("display", "block");
            };

            that.init();
        };

        return this.each(function()
        {
            new Slideshow($(this), cfg);
        });
    };
})(jQuery);