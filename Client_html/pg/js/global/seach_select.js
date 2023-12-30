/****************************************************************
 * Selector plug that made select tag in to custome select style *
 *****************************************************************/
(function($) {
    $.fn.selectstyle = function(option) {
        var defaults = {
                width: 250,
                height: 300,
                theme: 'light'
            },
            setting = $.extend({}, defaults, option);
        this.each(function() {
            var $this = $(this),
                parent = $(this).parent(),
                html = '',
                html_op = '',
                search = $this.attr('data-search'),
                name = $this.attr('name'),
                style = $this.attr('style'),
                placeholder = $this.attr('placeholder'),
                id = $this.attr('id');
            setting.width = (parseInt($this.attr('width') == null ? $this.width() : $this.attr('width')) + 10) + 'px';
            setting.theme = $this.attr('theme') != null ? $this.attr('theme') : setting.theme;

            $this.find('option').each(function(e) {
                var $this_a = $(this),
                    val = $this_a.val(),
                    image = $this_a.attr('data-image'),
                    text = $this_a.html();
                if (val == null) {
                    val = text;
                }
                html_op += '<li data-title="' + text + '" value="' + val + '"';
                if ($this_a.attr('font-family') != null) {
                    html_op += ' style="font-family' + $this_a.attr('font-family') + '"';
                }
                html_op += '>';
                if (image != null) {
                    html_op += '<div class="ssli_image"><img src="' + image + '"></div>';
                }
                html_op += '<div class="ssli_text">' + text + '</div></li>';
            });
            $this.hide();

        });
    }
})(jQuery);