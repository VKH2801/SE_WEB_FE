// Example code to show how to upload images using an unsigned preset
// and a form.

// Note, for security reasons, the upload preset used in this example
// sets the access control mode of the uploaded assets to restricted,
// so the URLs returned in the response will return 404 errors.

// Reference link doc for cloundinary: https://cloudinary.com/documentation/client_side_uploading
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dsumaah4a/upload";
const uploadImageButton = document.querySelector('[name="submit-image"]');
const submitBtn = document.getElementById("submit-thumbnail-image");
const loadingBtn = document.getElementById("loading-spinner");
const successBtn = document.getElementById("submit-success");
const imageFileInput = document.querySelector("[type=file]");
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
let thumbnailUrl;
let decodeData;

async function onClickUploadImage(event) {
  event.preventDefault();
  const imageFile = imageFileInput.files;
  const formData = new FormData();
  console.log(imageFile.length);
  if (imageFile.length > 0) {
    loadingBtn.style.display = "flex";
    submitBtn.style.display = "none";
  } else {
    return;
  }
  for (let i = 0; i < imageFile.length; i++) {
    let file = imageFile[i];
    formData.append("file", file);
    formData.append("upload_preset", "zg66bk3z");

    await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("response: ", response);
        loadingBtn.style.display = "none";
        submitBtn.style.display = "none";
        imageFileInput.disabled = true;
        return response.text();
      })
      .then((data) => {
        decodeData = JSON.parse(data);
        if (decodeData) {
          thumbnailUrl = decodeData.url;
          console.log("image url: ", thumbnailUrl);
        } else {
          imageFileInput.disabled = false;
          submitBtn.style.display = "inline";
        }
      });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const errorMessage = document.getElementById("error-message-our-course");
  // Retrieve the data from localStorage when screen init
  const encodedData = localStorage.getItem("userLoginData");
  let userRole;
  //console.log(encodedData);
  if (encodedData) {
    const decodedData = JSON.parse(decodeURIComponent(encodedData));
    userRole = decodedData.role;
    // Use the data as needed
    //console.log('User Data:', decodedData);

    // Display the user's name
    const welcomeMessages = document.getElementsByClassName("user-name");
    for (const welcomeMessage of welcomeMessages) {
      welcomeMessage.textContent = `${decodedData.name}`;
    }

    const userRoleDisplay = document.getElementsByClassName("role");
    for (const role of userRoleDisplay) {
      role.textContent = `${decodedData.role}`;
    }
    localStorage.setItem("userId", decodedData._id);

    // Hide links for non-admin users
    if (userRole === "student") {
      document.getElementById("aboutLink").style.display = "flex";
      document.getElementById("coursesLink").style.display = "flex";
    } else {
      document.getElementById("editPostLink").style.display = "flex";
      document.getElementById("aboutLink").style.display = "flex";
      document.getElementById("coursesLink").style.display = "flex";
      document.getElementById("adminLink").style.display = "flex";
    }
  } else {
    // If no data found, handle accordingly
    console.error("No user data found in localStorage.");
  }

  //=============== Handle submit form
  const form = document.getElementById("addNewCourses");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let title = form.querySelector('[name="title"]').value;
    let description = document.getElementById("content").value;

    // const formData = new FormData();
    // formData.append('thumbnailFile', thumbnail.files[0]);
    // formData.append('title', title.value);
    // formData.append('description', description.value);
    // formData.append('category', '658b512ca1707b8e2fd0ef5d');

    const formData = {
      title: title,
      description: description,
      thumbnail: thumbnailUrl,
      category: "658b512ca1707b8e2fd0ef5d",
    };
    console.log(formData);
    try {
      const response = await fetch("https://uit-edu.onrender.com/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": accessToken,
          "Refresh-Token": refreshToken,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        window.location.href = "edit-post.html";
      } else {
        errorMessage.textContent = "Upload course fail, please try again";
        title = null;
        description = null;
        thumbnailUrl = null;
        imageFileInput.disabled = false;
        submitBtn.style.display = "inline";
      }
    } catch (error) {
      console.error(error);
    }
  });
});
