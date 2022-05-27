$(() => {
    $('.select-sorting').select2({
        theme: 'realty-sorting',
        minimumResultsForSearch: Infinity,
        width: 'auto',
    });
    $('.select-sorting').on('change', (e) => {
        console.log(e);
        let url = new URL(location.href), value = e.target.value, values = value.split('_');
        let [sortValue, directionValue] = values.length === 3 ? [`${values[0]}_${values[1]}`, values[2]] : values;
        sortValue ? url.searchParams.set('sort', sortValue) : url.searchParams.delete('sort');
        directionValue ? url.searchParams.set('direction', directionValue) : url.searchParams.delete('direction');
        window.location.href = url.toString();
    });

    $('.phone-mask').mask('8 (000) 000-00-00');
    $('.price-mask').mask("000 000 000 000 000", {reverse: true});

    $('#btnLogout').on('click', (e) => {
        $.get(e.target.href, function () {
            window.location.reload();
        });
    });

    $('.header-person-menu-list-btn').on('click', (e) => {
        if($(e.currentTarget).hasClass('active')) {
            $('body').addClass('with_client');
        } else {
            $('body').removeClass('with_client');
        }
    });

    if ($('[data-alias="avtomob"]').length > 0) {
        $('[data-alias="avtomob"]').find('[type="radio"]').on('change', (e) => {
            if (e.target.checked) {
                $(`[data-alias="avtomob"] [type="radio"]:not([id="${e.target.id}"]):checked`).each(function (i, el) {
                    $(el).get(0).checked = false;
                })
            }
        })
    }

})
