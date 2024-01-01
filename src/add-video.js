// Example code to show how to upload images using an unsigned preset
// and a form.

// Note, for security reasons, the upload preset used in this example
// sets the access control mode of the uploaded assets to restricted,
// so the URLs returned in the response will return 404 errors.

// Reference link doc for cloundinary: https://cloudinary.com/documentation/client_side_uploading
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dsumaah4a/upload';
const uploadImageButton = document.querySelector('[name="submit-image"]');
const uploadVideoButton = document.querySelector('[name="submit-video"]');
let decodeData;

uploadImageButton.addEventListener('click', async function (event) {
  event.preventDefault();

  const imageFile = document.querySelector('[type=file]').files;
  const formData = new FormData();

  for (let i = 0; i < imageFile.length; i++) {
    let file = imageFile[i];
    formData.append('file', file);
    formData.append('upload_preset', 'zg66bk3z');

    await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('response: ', response);
        return response.text();
      })
      .then((data) => {
        decodeData = JSON.parse(data);
        console.log('data: ', decodeData.url);
      });
  }
});

uploadVideoButton.addEventListener('click', async function (event) {
  event.preventDefault();

  const valueBtnSubmit = document.getElementById('submit-video');
  const loadingSpinner = document.getElementById('loading-spinner');

  valueBtnSubmit.style.display = 'none';
  loadingSpinner.style.display = 'block';


  const imageFile = document.querySelector('[type=file]').files;
  const formData = new FormData();

  for (let i = 0; i < imageFile.length; i++) {
    let file = imageFile[i];
    formData.append('file', file);
    formData.append('upload_preset', 'zg66bk3z');

    await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('response: ', response);
        return response.text();
      })
      .then((data) => {
        decodeData = JSON.parse(data);
        console.log('data: ', decodeData.url);
        loadingSpinner.style.display = 'none';
        valueBtnSubmit.style.display = 'block';
      });
  }
});


// form.addEventListener('submit', async function (event) {
//   event.preventDefault();
  
//   // Show loading spinner
//   const loadingSpinner = document.getElementById('loading-spinner');
//   valueBtnSubmit.style.display = 'none';
//   loadingSpinner.style.display = 'block';
  

//   // Retrieve data from the form
//   const title = form.querySelector('[name="title"]').value;
//   const description = document.getElementById('content').innerText;

//   // Prepare the request body
//   const requestBody = {
//     title: title,
//     description: description,
//     // Add any other data you need to send to the API
//   };

//   // Make the API call
//   try {
//     const response = await fetch(apiUrl, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Token': accessToken,
//         'Refresh-Token': refreshToken,
//       },
//       body: JSON.stringify(requestBody),
//     });

//     const data = await response.json();

//     // Hide loading spinner
//     loadingSpinner.style.display = 'none';
//     loadingSpinner.style.display = 'block';

//     // Handle the API response as needed
//     if (data.success) {
//       console.log('Course updated successfully');
//       window.location.reload();
//     } else {
//       // Handle errors or display error messages
//       console.error('Failed to update course:', data.message);
//     }
//   } catch (error) {
//     console.error('Error during API call:', error.message);

//     // Hide loading spinner in case of an error
//     loadingSpinner.style.display = 'none';
//     loadingSpinner.style.display = 'block';
//   }
// });