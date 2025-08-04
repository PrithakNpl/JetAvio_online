document.addEventListener('DOMContentLoaded', () => {
    const placeSelect = document.getElementById('places');

    placeSelect.addEventListener('change', (event) => {
        const place = event.target.value;
        changeFieldsetBackgroundImage(place);
    });
});

function changeFieldsetBackgroundImage(place) {
    const fieldset = document.getElementById('placeFieldset');

    switch (place) {
        case 'bangladesh':
            fieldset.style.backgroundImage = "url('bangladesh.jpg')";
            break;
        case 'bhutan':
                fieldset.style.backgroundImage = "url('bhutan.jpg')";
            break;
        case 'china':
                fieldset.style.backgroundImage = "url('china.jpg')";
            break;
        case 'hongkong':
            fieldset.style.backgroundImage = "url('hongkong.jpg')";
            break;
        case 'india':
                fieldset.style.backgroundImage = "url('india.jpg')";
            break;
        case 'japan':
                fieldset.style.backgroundImage = "url('japan.jpg')";
            break
        case 'kuwait':
                fieldset.style.backgroundImage = "url('kuwait.jpg')";
            break;
        case 'malaysia':
                fieldset.style.backgroundImage = "url('malaysia.jpg')";
            break;
        case 'oman':
                fieldset.style.backgroundImage = "url('oman.jpg')";
            break;
        case 'qatar':
                fieldset.style.backgroundImage = "url('qatar.jpg')";
            break;
        case 'saudiarabia':
                fieldset.style.backgroundImage = "url('saudiarabia.jpg')";
            break;
        case 'singapore':
                fieldset.style.backgroundImage = "url('singapore.jpg')";
            break;
        case 'southkorea':
                fieldset.style.backgroundImage = "url('southkorea.jpg')";
            break;
        case 'srilanka':
                fieldset.style.backgroundImage = "url('srilanka.jpg')";
            break;
        case 'thailand':
                fieldset.style.backgroundImage = "url('thailand.jpg')";
            break;
        case 'turkey':
                fieldset.style.backgroundImage = "url('turkey.jpg')";
            break;
        case 'uae':
                fieldset.style.backgroundImage = "url('uae.jpg')";
            break;
        case 'vietnam':
                fieldset.style.backgroundImage = "url('vietnam.jpg')";
            break;
        case 'default':
                fieldset.style.backgroundImage = "url('default.jpg')";
            break;
    }
}
