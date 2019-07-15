const imgContainer = document.getElementById('images'),
      input = document.getElementById('term'),
      loader = document.getElementById('loader');

/**
 * Function createElementes
 * @param  images - Array of images from the http request
 * Create an img elemente for each image in the array and append it to images div
 */
const createElements = images => {
    // Loop the images array
    images.forEach( image => {

        // Create an img element for each image
        let img = document.createElement('img');
        img.setAttribute('src', image.urls.full)
        
        // Append the image to the container
        imgContainer.appendChild(img)
    })
}

/**
 * Funtion makeRequest
 * @param term 
 * Make http request to unsplash API
 */
const makeRequest = term => {
    // Show the loading overlay
    loader.style.display = 'block';

    let httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        loader.style.display = 'none';
        alert('Cannot create an XMLHTTP instance');
        return false;
    }

    // API url and parameters
    const queryUrl = 'https://api.unsplash.com/search/photos/?client_id=efd85f096277736ec45e1c6c627f9e9a2fe91f4532d1e9d330d6d80352111707&page=1&per_page=5&query=' + term;

    httpRequest.open('GET', queryUrl);
    httpRequest.send();

    httpRequest.onreadystatechange = e => {
        if (httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200) {
                imgContainer.innerHTML = '';
                let data = JSON.parse(httpRequest.responseText);
                createElements(data.results);
                loader.style.display = 'none';
            } else {
                loader.style.display = 'none';
                alert('There was a problem processing the request.');
            }
        }
    }
}

/* Form submit */
document.forms[0].onsubmit = function(e) {
    e.preventDefault(); //Prevent form submition
    
    // Get the value from the search input and then clear it
    const term = input.value.trim();
    input.value = ''

    // Return if the search input is empty
    if(!term) return;

    // Make the request passing the search term
    makeRequest(term)
}