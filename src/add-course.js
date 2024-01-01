// Example code to show how to upload images using an unsigned preset
// and a form.

// Note, for security reasons, the upload preset used in this example
// sets the access control mode of the uploaded assets to restricted,
// so the URLs returned in the response will return 404 errors.

// Reference link doc for cloundinary: https://cloudinary.com/documentation/client_side_uploading
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dsumaah4a/upload";
const form = document.getElementById('addNewCourses');
const uploadImageButton = document.querySelector('[name="submit-image"]');

uploadImageButton.addEventListener('click', async function (event) {
  event.preventDefault();

  const imageFile = document.querySelector("[type=file]").files;
  const formData = new FormData();

  for (let i = 0; i < imageFile.length; i++) {
    let file = imageFile[i];
    formData.append("file", file);
    formData.append("upload_preset", 'zg66bk3z');

    await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        console.log('response: ', response);
        return response.text();
      })
      .then((data) => {
        const decodeData = JSON.parse(data);
        console.log('data: ', decodeData.url);
        
      });
  }
})