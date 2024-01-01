// Example code to show how to upload images using an unsigned preset
// and a form.

// Note, for security reasons, the upload preset used in this example
// sets the access control mode of the uploaded assets to restricted,
// so the URLs returned in the response will return 404 errors.

const url = "https://api.cloudinary.com/v1_1/dsumaah4a/upload";
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const files = document.querySelector("[type=file]").files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", 'zg66bk3z');

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        console.log('response: ', response);
        return response.text();
      })
      .then((data) => {

        console.log('data: ', data);
        document.getElementById("data").innerHTML += data;
      });
  }
});
