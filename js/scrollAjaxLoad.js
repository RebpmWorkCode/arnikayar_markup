let RealtyAjaxLoad = {
    viewType: 'grid',
    wrapper: '.filter-objects',
    itemClass: '.filter-objects-card',

    linkUrl: '',
    page: 1,
    pageLimit: 1,
    init: function () {
        RealtyAjaxLoad.linkUrl = window.paginator_url;
        RealtyAjaxLoad.pageLimit = window.paginator_limit;

        RealtyAjaxLoad._registerWaypoint();
        $("div.pagination").addClass('hidden'); //скрываем пагинацию после успешной инициализации

        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                RealtyAjaxLoad._load();
            }
        }, 5000)

    },
    _registerWaypoint: function () {
        Waypoint.destroyAll();
        // let element = document.querySelector('.filter-objects-card:last-child');
        let elements = document.querySelectorAll('.filter-objects-card');
        let element = elements[elements.length - 1];
        new Waypoint({
            element: element,
            handler: function (direction) {
                if (direction === 'down') {
                    RealtyAjaxLoad._load();
                }
            },
            offset: '100%',
        });
    },
    _load: function () {
        RealtyAjaxLoad.page++;
        let linkUrl = RealtyAjaxLoad.linkUrl.replace('page-id', RealtyAjaxLoad.page);
        if (RealtyAjaxLoad.page <= RealtyAjaxLoad.pageLimit) {
            console.log(`page - ${RealtyAjaxLoad.page}, pageLimit - ${RealtyAjaxLoad.pageLimit}, linkUrl - ${linkUrl}`);
            RealtyAjaxLoad._getListObjects(linkUrl);
        }
    },
    _getListObjects: function (linkUrl) {
        $.ajax({
            type: "GET", url: linkUrl, dataType: "html",
            success: function (data) {
                $('#advLoad').before($(data).find(RealtyAjaxLoad.itemClass))
                if (myLazyLoad !== undefined) {
                    myLazyLoad.update();
                }
                RealtyAjaxLoad._registerWaypoint();
                TwigGalleryInstances.run();
            }
        })
    },
}

$(document).ready(function () {
    RealtyAjaxLoad.init();
});
