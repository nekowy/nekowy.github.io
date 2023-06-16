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
const owner = 'caffwydev';
const repo = 'cdn';

fetch(`https://api.github.com/repos/${owner}/${repo}/contents?nocache=${new Date().getTime()}`)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('cdn');

    const ul = document.createElement('ul');
    ul.type = "none"
    container.appendChild(ul);

    data.forEach(item => {
      const li = document.createElement('li');
      ul.appendChild(li);

      if (item.type === 'file') {
        const a = document.createElement('a');
        a.href = item.download_url;
        a.textContent = item.name;
        li.appendChild(a);
      } else if (item.type === 'dir') {
        const span = document.createElement('span');
        span.textContent = item.name;
        li.appendChild(span);

        li.addEventListener('click', () => {
            if (li.classList.contains('hiddenchild')) li.classList.remove('hiddenchild')
            else li.classList.add('hiddenchild');
        })
        fetch(item.url)
          .then(response => response.json())
          .then(data => {
            const subUl = document.createElement('ul');
            subUl.type = "none"
            li.appendChild(subUl);
            data.forEach(subItem => {
              const subLi = document.createElement('li');
              subUl.appendChild(subLi);

              if (subItem.type === 'file') {
                const a = document.createElement('a');
                a.href = subItem.download_url;
                a.textContent = subItem.name;
                subLi.appendChild(a);
              }
            });
          });
      }
    });
  });