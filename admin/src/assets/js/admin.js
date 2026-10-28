(function ($) {
  "use strict";
  $(function () {
    // spinner
    setTimeout(function () { $('#spinner').removeClass('show'); }, 1);
    // sidebar toggle
    $('.sidebar-toggler').on('click', function () { $('.sidebar, .content').toggleClass('open'); return false; });
    // back to top
    $(window).on('scroll', function () { $(this).scrollTop() > 300 ? $('.back-to-top').fadeIn('slow') : $('.back-to-top').fadeOut('slow'); });
    $('.back-to-top').on('click', function () { $('html, body').animate({ scrollTop: 0 }, 600); return false; });
    // table text search: <input data-search="#tableId">
    $('[data-search]').on('input', function () {
      var q = $(this).val().toLowerCase();
      $($(this).data('search') + ' tbody tr').each(function () { $(this).toggle($(this).text().toLowerCase().indexOf(q) > -1); });
    });
    // column filter: <select data-filter="#tableId" data-col="5">
    $('[data-filter]').on('change', function () {
      var v = $(this).val().toLowerCase(), c = parseInt($(this).data('col'), 10);
      $($(this).data('filter') + ' tbody tr').each(function () {
        var t = $(this).children().eq(c).text().toLowerCase();
        $(this).toggle(!v || v.indexOf('all') === 0 || t.indexOf(v) > -1);
      });
    });
    // delete row
    $(document).on('click', '[data-delete]', function (e) {
      e.preventDefault();
      if (confirm('Delete this record?')) { $(this).closest('tr').fadeOut(300, function () { $(this).remove(); }); }
    });
    // charts defaults
    if (window.Chart) { Chart.defaults.color = '#8b92b3'; Chart.defaults.borderColor = 'rgba(255,255,255,.06)'; }
  });
})(jQuery);
