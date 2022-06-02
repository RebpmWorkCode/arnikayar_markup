let myLazyLoad;
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

    // let checkboxSingleOptionsCallback = ($wrapper) => {
    //     $wrapper.find('input').on('change', (e) => {
    //         $wrapper.find(`input:not([id="${e.target.id}"]):checked`).each((i, el) => {
    //             if ($(el).get(0).checked) {
    //                 $(el).get(0).checked = false;
    //             }
    //         })
    //     })
    // }
    // checkboxSingleOptionsCallback($('[data-alias="kolichestvo_spalnyh_mest"]'));
    // checkboxSingleOptionsCallback($('[data-alias="interior_decoration"]'));
    // checkboxSingleOptionsCallback($('[data-alias="number_of_floors"]'));
    // checkboxSingleOptionsCallback($('[data-alias="avtomob"]'));

    myLazyLoad = new LazyLoad();

    $('#copyLink').on('click', function (e){
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        $('#copyLink').css('background-color', 'green');
        $('#copyLink > svg').css('background-color', 'green');
        setTimeout(function () {
            $('#copyLink').css('background-color', '#929292');
            $('#copyLink > svg').css('background-color', '#929292');
        }, 1000)
    })
    $('.copyLinkIndex').on('click', function (e){
        e.preventDefault();
        let target = $(e.currentTarget);
        let url = target.attr('data-attr-url');
        navigator.clipboard.writeText(window.location.hostname + url);
        target.css('background-color', 'green');
        target.children().css({'background-color': 'green', 'border-radius': '10px'});
        setTimeout(function () {
            target.css('background-color', '#929292');
            target.children().css({'background-color': '#929292', 'border-radius': '10px'});
        }, 1000)
    })

    $('.filter-settings-content-selection-block-district__button').on('click', (e) => {
        let wrapper = $(e.target).closest('.filter-settings-content-selection-block__info');
        $('[type="checkbox"]', wrapper).each((i, el) => {
            $(el).get(0).checked = true;
            $(el).trigger('change');
        });
    })
    $('.filter-settings-content-selection-navigation__reset').on('click', (e) => {
        $('.filter-settings-content-selection-block [type="checkbox"]:checked').each((i, el) => {
            $(el).attr('checked', false);
            $(el).trigger('change');
        })
    })

    //region Collection Code
    let collectionBlock = $('#collection-block'), collectionAddBlock = undefined, collectionCreateBlock = undefined;
    $('[data-agency-compilation-id]').on('click', (e) => {
        e.preventDefault();
        let agencyCompilationId = e.currentTarget.dataset.agencyCompilationId;
        let id = e.currentTarget.dataset.id;
        if (!agencyCompilationId) {
            fetch(`/agency/agency_compilations/add/${id}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(res => res.text()).then((res) => {
                collectionBlock.html(res);
                collectionAddBlock = $('#add-to-collection');
                collectionAddBlock.show();
                collectionCreateBlock = $('#create-to-collection');
            })
        } else {
            fetch(`/agency/agency_compilations/delete/${agencyCompilationId}/${id}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(res => {
                window.location.reload();
            })
        }
    });
    $('body').on('click', '.add-to-collection-block-button-btn', (e) => {
        e.preventDefault();
        collectionAddBlock.hide();
        collectionCreateBlock.show();
    });
    $('body').on('click', '.add-to-collection-button-close', (e) => {
        e.preventDefault();
        collectionAddBlock.hide();
        collectionCreateBlock.hide();
    })

    $('.selection').on('click', '.selection__share', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.origin + e.currentTarget.dataset.shareLink);
    })
    $('.filter-collection-button').on('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.origin + e.currentTarget.dataset.shareLink);
    })

    let createCollection = $('#create-collection');
    $('.selection').on('click', '.selection__create', (e) => {
        e.preventDefault();
        createCollection.show();
    })
    createCollection.find('form').on('submit', (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        fetch(e.target.getAttribute('action'), {
            method: 'POST',
            body: data,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }).then((res) => {
            if (res.status === 200) {
                window.location.reload()
            } else {
                console.log(res);
            }
        })
    })

    let deleteCollections = $('#delete-collections');
    $('.selection').on('click', '.selection__delete', (e) => {
        e.preventDefault();
        let wrapper = $(e.currentTarget).closest('.selection__stroke');
        let collectionName = wrapper.find('[data-collection-name]').text();
        let collectionCount = wrapper.find('[data-collection-count]').text();
        let collectionId = wrapper.data('id');
        deleteCollections.find('[data-collection-name]').text(collectionName)
        deleteCollections.find('[data-id]').attr('data-id', collectionId);
        deleteCollections.find('[data-collection-count]').text(collectionCount);
        deleteCollections.show();
    })
    $('#delete-collections').on('click', '[data-close]', (e) => {
        e.preventDefault();
        deleteCollections.hide();
    })
    $('#delete-collections').on('click', '[data-delete]', (e) => {
        e.preventDefault();
        fetch(`/agency/agency_compilations/drop/${e.currentTarget.dataset.id}.json`, {
            method: 'POST',
            body: JSON.stringify({
                agency_compilation_id: e.currentTarget.dataset.id,
            }),
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => res.json()).then((res) => {
            if (res.result) {
                window.location.reload();
            } else {
                alert(res.error);
            }
        })
    })
    //endregion

    $('.btn-link-callback').on('click', function (e) {
        e.preventDefault();
        let link = '/' + e.target.getAttribute('data-url');
        window.open(link, '_self');
    })

})
