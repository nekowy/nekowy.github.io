window.addEventListener('DOMContentLoaded', function() {
    setInterval(() => {
        let hash = window.location.hash;
        let divId = hash.substring(1);
        let div = document.getElementById(divId);
        let home = document.getElementById('home')
        let cleanup = document.querySelectorAll('div.body')
        for (let i = 0 ; i < cleanup.length ; i++) {
            cleanup[i].classList.add('hidden')
        }
        if (div) {
            div.classList.remove('hidden')
        }else{
            home.classList.remove('hidden')
        }
    }, 25)
});