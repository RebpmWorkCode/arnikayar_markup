let RecaptchaV3 = {
    recaptchaExecute: (form) => {
        let recaptchaBlock = form.querySelector('.recaptcha-block');
        if (recaptchaBlock) {
            let {sitekey, action} = recaptchaBlock.dataset;
            if (! form.classList.contains('recaptcha-rendered')) {
                grecaptcha.ready(() => {
                    grecaptcha.execute(sitekey, {action: action ?? recaptchaBlock.id}).then(token => {
                        form.classList.add('recaptcha-rendered')
                        recaptchaBlock.innerHTML = `<input type="hidden" name="g-recaptcha-response" value="${token}" />`;
                        setTimeout(() => { //через 2 минуты делаем сброс, иначе будет ошибка - что слишком долго были на странице
                            form.classList.remove('recaptcha-rendered');
                            recaptchaBlock.innerHTML = '';
                        }, 120000);
                    })
                });
            }
        }
    },
    handle: (form, events) => {
        events.forEach((selectorEvent) => {
            const [selector, event] = selectorEvent.split(':;');
            form.querySelectorAll(selector).forEach((formField) => {
                formField.addEventListener(event, (e) => {
                    RecaptchaV3.recaptchaExecute(form)
                })
            })
        })
    },
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.recaptcha-block').forEach((recaptchaBlock) => {
        RecaptchaV3.handle(recaptchaBlock.closest('form'), [
            'input:not([type="submit"]):not([type="hidden"]):;focus',
            'textarea:;focus',
            'button[type="submit"]:;click',
            'input[type="submit"]:;click'
        ])
    })
})

