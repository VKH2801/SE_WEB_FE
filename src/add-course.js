// Example code to show how to upload images using an unsigned preset
// and a form.

// Note, for security reasons, the upload preset used in this example
// sets the access control mode of the uploaded assets to restricted,
// so the URLs returned in the response will return 404 errors.

// Reference link doc for cloundinary: https://cloudinary.com/documentation/client_side_uploading
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dsumaah4a/upload';
const form = document.getElementById('addNewCourses');
const uploadImageButton = document.querySelector('[name="submit-image"]');
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

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form-container form');
  const errorMessageContainer = document.getElementById('error-message');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
      title: form.querySelector('[name="title"]').value,
      content: form.querySelector('[name="content"]').value,
    };

    console.log('formdata: ', formData);

    try {
      const response = await fetch('https://uit-edu.onrender.com/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, image: decodeData.url }),
      });
      console.log(response.headers);

      const data = await response.json();

      if (data.success === true) {
        console.log(data);
        // Store the data in localStorage
        localStorage.setItem('userLoginData', JSON.stringify(data.data));
        localStorage.setItem('userId', data.data._id);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        console.log(localStorage.getItem('userLoginData'));

        errorMessageContainer.textContent = null;

        window.location.href = 'home.html';
      } else {
        // Display error message
        errorMessageContainer.textContent =
          data.message || '*Incorrect email or password.';
      }
    } catch (error) {
      console.error('Fetch error:', error);
      errorMessageContainer.textContent = '*Fetch error';
    }
  });
});

// Check if the input data is valid JSON
function isValidJson(data) {
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
}
