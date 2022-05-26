let TwigFavorite = {
    run: (favoriteClickable) => {
        favoriteClickable.addEventListener('click', (e) => {
            e.preventDefault();
            let currentTarget = e.currentTarget;
            let data = currentTarget.dataset;
            fetch(`/favorites/favorites/${data.favorite}_favorite?favorite=${data.favoriteId}&model=Advertisement`, {
                method: 'GET',
                data: {test: 1},
                headers: {
                    Accept: 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => res.json()).then((res) => {
                if (res.error) {
                    alert(res.error);
                } else {
                    let prev = currentTarget.dataset.favorite;
                    currentTarget.dataset.favorite = currentTarget.dataset.favoriteInvert;
                    currentTarget.dataset.favoriteInvert = prev;

                    if (currentTarget.querySelector('[data-title]')) {
                        currentTarget.querySelector('[data-title]').textContent = data[`favorite${TwigFavorite.capitalizeFirstLetter(currentTarget.dataset.favorite)}Title`];
                    }
                    if (currentTarget.querySelectorAll('[data-icon]').length === 2) {
                        currentTarget.querySelector(`[data-icon=${prev}]`).classList.toggle('d-none')
                        currentTarget.querySelector(`[data-icon=${currentTarget.dataset.favorite}]`).classList.toggle('d-none')
                    }
                }
                if (res.count !== undefined) {
                    if (document.querySelector('.favorite-counter')) {
                        document.querySelector('.favorite-counter').textContent = res.count;
                    }
                }
            }).catch(alert)

        })
    },
    capitalizeFirstLetter: (action) => {
        return action.charAt(0).toUpperCase() + action.slice(1)
    },
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelectorAll('[data-favorite]').length > 0) {
        document.querySelectorAll('[data-favorite]').forEach((favoriteClickable) => {
            TwigFavorite.run(favoriteClickable);
        })
    }
});


