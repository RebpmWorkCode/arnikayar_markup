const myLazyLoad = new LazyLoad();

let TwigGalleryInstances = {
    run: () => {
        if (document.querySelector('.swiper-gallery-list')) {
            let swiper = new Swiper('.swiper-gallery-list', {
                // slidesPerView: 1,
                lazy: {
                    loadPrevNext: true,
                    //loadPrevNextAmount: 2,
                },
                // loop: true,
                // centeredSlides: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            })
            $('.swiper-gallery-list').on('click', '.swiper-button-disabled', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
            })
        }
    },
};

$(() => {
    TwigGalleryInstances.run()

    if (window.location.pathname === '/favorites') {
        $('.favorite-btn').addClass('active');
    }

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

    // Кнопка поделиться в списке объектов и просмотре
    $('body').on('click', '.copyLink', function (e){
        e.preventDefault();
        let target = $(e.currentTarget);
        let url = window.location.href;
        if (target.attr('data-attr-url')) {
            url = 'https://' + window.location.hostname + target.attr('data-attr-url');
        }
        let title = target.attr('data-attr-title');

        Swal.fire({
            title: '<strong>Поделиться</strong>',
            html:
                '<div id="share-block">' +
                '    <div class="share-link__list">' +
                // '        <a class="share-link" target="_blank" title="Отправить в WhatsApp" href="https://api.whatsapp.com/send?text='+ title + ' ' + url + '"><img src="/uploads/whatsapp.png" alt="whatsapp"></a>' +
                '        <a class="share-link" target="_blank" title="Отправить в WhatsApp" href="https://web.whatsapp.com"><img src="/uploads/whatsapp.png" alt="whatsapp"></a>' +
                '        <a class="share-link" target="_blank" title="Отправить в Telegram" href="https://telegram.me/share/url?url=' + url + '"><img src="/uploads/telegram.png" alt="telegram"></a>' +
                '        <a class="share-link" target="_blank" title="Отправить на почту" href="mailto:Введите адрес электронной почты?subject=Агентство недвижимости ПО ДОМАМ&body=' + ' ' + url + '"><img src="/uploads/mail.png" alt="mail"></a>' +
                '        <a class="share-link" target="_blank" title="Отправить в Viber" href="viber://forward?text='+ title + ' ' + url + '"><img src="/uploads/viber.png" alt="viber"></a>' +
                '        <a class="share-link" target="_blank" title="Отправить в VK" href="https://vk.com/share.php?url=' + url + '&title=' + title + '"><img src="/uploads/vk.png" alt="vk"></a>' +
                '        <a class="share-link" target="_blank" title="Перейти в Instagram Direct" href="https://www.instagram.com/direct"><img src="/uploads/instagram.png" alt="instagram"></a>' +
                '        <a class="share-link" target="_blank" title="Отправить в Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + url +'"><img src="/uploads/1facebook.png" alt="facebook"></a>' +
                '        <a class="share-link copyLinkBtn" title="Копировать в буфер обмена" href="#"><img src="/uploads/copy.png" alt="copy"></a>' +
                '    </div>' +
                '</div>',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
        });

        $('body').on('click', '.copyLinkBtn', function () {
            navigator.clipboard.writeText(url);
        });
    });



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

    $('.filter-settings-options-disable').on('click', (e) => {
        $('.filter-settings-content-selection-block [type="checkbox"]:checked').each((i, el) => {
            $(el).attr('checked', false);
            $(el).trigger('change');
        })
    })

    //region Collection Code
    let collectionBlock = $('#collection-block'), collectionAddBlock = undefined, collectionCreateBlock = undefined;
    $('body').on('click', '[data-agency-compilation-id]', (e) => {
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
    });

    let processHandleActiveFilters = ($wrapper) => {
        $wrapper.find('input').on('change', (e) => {
            let form = $(e.target.closest('form'));
            let checkedCheckbox = form.find(`input[type="checkbox"]:checked`);
            let textInput = form.find(`input[type="text"]`).filter(function () {
                return this.value;
            });
            let isActiveFilter = false;
            if (checkedCheckbox.length !== 0) {
                isActiveFilter = true;
            }
            if (textInput.length !== 0) {
                isActiveFilter = true;
            }
            if (isActiveFilter) {
                $('.filter-settings-content-button').addClass('active');
            } else {
                $('.filter-settings-content-button').removeClass('active');
            }
        })
    }
    processHandleActiveFilters($('.filter-settings-content-selection-block'));
    processHandleActiveFilters($('[data-alias="price"]'));
    processHandleActiveFilters($('[data-alias="site_area"]'));
    processHandleActiveFilters($('[data-alias="house_area"]'));
    processHandleActiveFilters($('[data-alias="kolichestvo_spalnyh_mest"]'));
    processHandleActiveFilters($('[data-alias="interior_decoration"]'));
    processHandleActiveFilters($('[data-alias="number_of_floors"]'));
    processHandleActiveFilters($('[data-alias="avtomob"]'));
    processHandleActiveFilters($('[data-group="checkbox-aliases"]'));

    $('.JS-filter-open').on('click', (e) => {
        $(e.target.closest('.filter-objects')).addClass('d-none');
    })
    $('.filter-settings-options-button').on('click', (e) => {
        $('.filter-objects').removeClass('d-none');
    })

})

