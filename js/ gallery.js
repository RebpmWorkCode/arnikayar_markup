let TwigGallery = {
    run: () => {
        if (document.querySelector('.main-slider .main-slider-swiper')) {
            if (document.querySelector('.main-slider .main-slider-swiper').swiper !== null) {
                //уничтожаем слайдер, чтобы заново его проинициализировать
                document.querySelector('.main-slider .main-slider-swiper').swiper.destroy();
            }

            // let objectGallerySwiper = new Swiper(".main-slider .main-slider-swiper", {
            //     breakpoints: {
            //         767: { slidesPerView: 1, },
            //         992: {slidesPerView: 3,},
            //         1280: {slidesPerView: 3,}
            //     },
            //     spaceBetween: 0,
            //     loop: true,
            //     centeredSlides: true,
            //     pagination: {
            //         el: ".swiper-pagination",
            //         clickable: true,
            //     },
            //     navigation: {
            //         nextEl: ".swiper-button-next",
            //         prevEl: ".swiper-button-prev",
            //     },
            // });
            let objectGallerySwiper = new Swiper('.main-slider .main-slider-swiper', {
                // breakpoints: {
                //     767: {slidesPerView: 1,},
                //     992: {
                //         effect: 'coverflow',
                //         slidesPerView: 1.5,
                //         coverflow: {
                //             rotate: 0,
                //             stretch: 150,
                //             depth: 200,
                //             modifier: 1,
                //             slideShadows: false,
                //         }
                //     }
                // },
                slidesPerView: 1,
                lazy: {
                    loadPrevNext: true,
                    // loadPrevNextAmount: 2,
                },
                loop: true,
                centeredSlides: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            })

            // objectGallerySwiper.on('slideChange', function () {myLazyLoad.loadAll();});


            let galleryList = [];
            document.querySelectorAll('.main-slider .swiper-wrapper .swiper-slide').forEach((swiperSlidePicture) => {
                galleryList.push(swiperSlidePicture.dataset.full);
            })

            const lightbox = new FsLightbox();
            lightbox.props.sources = galleryList;

            document.querySelectorAll('.main-slider .swiper-wrapper .swiper-slide').forEach((swiperSlidePicture, position) => {
                swiperSlidePicture.addEventListener('click', (e) => {
                    e.preventDefault();
                    lightbox.open(position);
                })
            })
        }

        let countPhoto = document.querySelector('.territory__row')?.getAttribute('data-count');

        if (document.querySelector('.grid-slider-swiper')) {
            document.querySelectorAll('.grid-slider-swiper').forEach(element => {
                let gridSwiper;
                if (countPhoto < 5) {
                    gridSwiper = new Swiper(element, {
                        slidesPerView: 2,
                        grid: {
                            rows: 2,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                    });
                } else {
                    gridSwiper = new Swiper(element, {
                        slidesPerView: 3,
                        grid: {
                            rows: 2,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                    });
                }

                gridSwiper.on('beforeInit', function () {myLazyLoad.update();});
                gridSwiper.on('afterInit', function () {myLazyLoad.update();});
                gridSwiper.on('slideChange', function () {myLazyLoad.update();});
                gridSwiper.on('slideChangeTransitionEnd', function () {myLazyLoad.update();});
                gridSwiper.on('slideChangeTransitionStart', function () {myLazyLoad.update();});
            })

        }

        if (document.querySelectorAll('.gallery-one .grid-slider-slide')) {
            let galleryList = [];
            document.querySelectorAll('.gallery-one .grid-slider-slide').forEach((swiperSlidePicture) => {
                galleryList.push(swiperSlidePicture.dataset.full);
            })

            const lightbox = new FsLightbox();
            lightbox.props.sources = galleryList;

            document.querySelectorAll('.gallery-one .grid-slider-slide').forEach((swiperSlidePicture, position) => {
                swiperSlidePicture.addEventListener('click', (e) => {
                    e.preventDefault();
                    lightbox.open(position);
                })
            })
        }
        if (document.querySelectorAll('.gallery-two .grid-slider-slide')) {
            let galleryList = [];
            document.querySelectorAll('.gallery-two .grid-slider-slide').forEach((swiperSlidePicture) => {
                galleryList.push(swiperSlidePicture.dataset.full);
            })

            const lightbox = new FsLightbox();
            lightbox.props.sources = galleryList;

            document.querySelectorAll('.gallery-two .grid-slider-slide').forEach((swiperSlidePicture, position) => {
                swiperSlidePicture.addEventListener('click', (e) => {
                    e.preventDefault();
                    lightbox.open(position);
                })
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    TwigGallery.run();
})



