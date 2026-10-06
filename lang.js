(function () {
    var KEY = 'melni-lang';

    function currentLang() {
        return document.documentElement.lang === 'ru' ? 'ru' : 'en';
    }

    function savedLang() {
        try {
            var value = localStorage.getItem(KEY);
            return value === 'ru' || value === 'en' ? value : null;
        } catch (e) {
            return null;
        }
    }

    function browserLang() {
        var primary = navigator.language || (navigator.languages && navigator.languages[0]) || '';
        return String(primary).toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en';
    }

    function alternate(lang) {
        var link = document.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
        return link && link.href ? link.href : '';
    }

    var page = currentLang();
    var saved = savedLang();
    var preferred = saved || browserLang();

    if (!saved && page === 'ru') {
        preferred = page;
    }

    if (preferred !== page) {
        var next = alternate(preferred);
        if (next && next !== location.href) {
            location.replace(next);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var buttons = document.querySelectorAll('.lang-switcher a');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                var label = (this.textContent || '').replace(/\s+/g, '').toLowerCase();
                if (label === 'en' || label === 'ru') {
                    try {
                        localStorage.setItem(KEY, label);
                    } catch (e) {}
                }
            });
        }
    });
})();
