if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceworker.js', { scope: '/pwa-sample/'})
        .then(function (reg) {
            console.log(`Service Worker Registered.\nscope: ${reg.scope}`);
        })
        .catch(function (error) {
            console.log(`Error: ${error}`);
        });
}

// see also
// dog-api
// https://dog.ceo/dog-api/documentation/
const url = 'https://dog.ceo/api/breeds/image/random';

fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(new Error('エラーです！'));
    })
    .then(response =>{
        let objRes = JSON.parse(response);

        if (objRes.status !== 'success') {
            return Promise.reject(new Error('エラーです！'));
        }

        let dog_image = document.getElementById('image-area');
        if (dog_image) {
            dog_image.insertAdjacentHTML('afterbegin', '<img src="' + objRes.message + '">');
        }
    })
    .catch(error => console.error('Error:', error));
    