let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');
const url = 'https://uit-edu.onrender.com/api/';




const enableDarkMode = () => {
  toggleBtn.classList.replace('fa-sun', 'fa-moon');
  body.classList.add('dark');
  localStorage.setItem('dark-mode', 'enabled');
};

const disableDarkMode = () => {
  toggleBtn.classList.replace('fa-moon', 'fa-sun');
  body.classList.remove('dark');
  localStorage.setItem('dark-mode', 'disabled');
};

if (darkMode === 'enabled') {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem('dark-mode');
  if (darkMode === 'disabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () => {
  profile.classList.toggle('active');
  search.classList.remove('active');
};

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () => {
  search.classList.toggle('active');
  profile.classList.remove('active');
};

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () => {
  sideBar.classList.toggle('active');
  body.classList.toggle('active');
};

document.querySelector('#close-btn').onclick = () => {
  sideBar.classList.remove('active');
  body.classList.remove('active');
};

window.onscroll = () => {
  profile.classList.remove('active');
  search.classList.remove('active');

  if (window.innerWidth < 1200) {
    sideBar.classList.remove('active');
    body.classList.remove('active');
  }
};

async function getVideos() {
  const response = await fetch('https://api-proj2.onrender.com/outputType');
  const data = await response.json();
  return data.data;
}

async function fetchLink(link, method, body) {
  const response = await fetch(link, {
    method: method, // Or 'PUT' or 'DELETE'
    body: JSON.stringify(body), // For POST and PUT
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json()) // Handle the response
  .catch(error => console.error(error));
  const data = await response.json();
  return data;
}

async function addVideosToTable(videos) {
  const tbody = document.querySelector('table tbody');
  videos.forEach((video) => {
    const tr = document.createElement('tr');
    tr.setAttribute('data-id', video._id);
    tr.innerHTML = `
       <td >${video.title}</td>
       <td >${video.title}</td>
       <td >${video.url}</td>
       <td >
         <a href="#">Sửa</a>
         |
         <a href="#">Xóa</a>
       </td>
     `;
    tbody.appendChild(tr);
  });
}

// Gọi hàm getVideos() khi trang được tải
// document.addEventListener('DOMContentLoaded', () => {
//   fetchLink('https://uit-edu.onrender.com/api/categories', 'GET', {})
// });

// Gọi hàm addVideo() khi form được submit
async function uploadVideo() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const videoInput = document.getElementById('video-input');
  const thumbnail = document.getElementById('thumbnail-video-input');
  const title = document.getElementById('title-video-input')
  // const uploadedVideo = document.getElementById('uploaded-video');
  // const videoContainer = document.getElementById('video-container');

  // const file = videoInput.files[0];

  const formData = new FormData();
  formData.append('videoFile', videoInput.files[0]);
  formData.append('thumbnailFile', thumbnail.files[0]);
  formData.append('title', title);
  formData.append('course', courseId);

  // try {
  //   const response = await fetch('http://localhost:3000/upload', {
  //     method: 'POST',
  //     'Access-Token': accessToken,
  //     'Refresh-Token': refreshToken,
  //     body: formData,
  //   });

  //   const result = await response.json();
  //   console.log(result.message);

  //   if (result.success) {

  //   }
  // } catch (error) {
  //   console.error(error);
  // }
}


function formatDoc(cmd, value = null) {
  if (value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
}

function addLink() {
  const url = prompt('Insert url');
  formatDoc('createLink', url);
}

function fileHandle(value) {
  if (value === 'txt') {
    // Save as text file
    const content = document.getElementById('content').innerText;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.txt';
    link.click();
  } else if (value === 'pdf') {
    // Save as PDF file using html2pdf library
    const content = document.getElementById('content');
    html2pdf(content);
  }

  // Reset the selection
  document.getElementById('filename').value = 'untitled';
  document.getElementById('fileType').selectedIndex = 0;
}



// Function to create a skeleton card element
function createCardSkeleton() {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';

  const actionContainer = document.createElement('div');
  actionContainer.className = 'action-container skeleton';
  actionContainer.innerHTML = `
<i class="fa-solid fa-pen-to-square"></i>
<i class="fa-solid fa-trash"></i>
`;
  cardElement.appendChild(actionContainer);

  const cardImage = document.createElement('div');
  cardImage.className = 'card-image skeleton';
  cardImage.innerHTML = `
<img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlsbHVzdHJhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="">
`;
  cardElement.appendChild(cardImage);

  const cardTitle = document.createElement('a');
  cardTitle.href = '#';
  cardTitle.className = 'card-title skeleton';
  cardTitle.textContent = 'Card title here';
  cardElement.appendChild(cardTitle);

  const cardDescription = document.createElement('p');
  cardDescription.className = 'card-description skeleton';
  cardDescription.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit...';
  cardElement.appendChild(cardDescription);

  return cardElement;
}


const cloudName = "dsumaah4a"; // replace with your own cloud name
const uploadPreset = "zg66bk3z"; // replace with your own upload preset

// Remove the comments from the code below to add
// additional functionality.
// Note that these are only a few examples, to see
// the full list of possible parameters that you
// can add see:
//   https://cloudinary.com/documentation/upload_widget_reference

// const myWidget = cloudinary.createUploadWidget(
//   {
//     cloudName: cloudName,
//     uploadPreset: uploadPreset,
//     // cropping: true, //add a cropping step
//     // showAdvancedOptions: true,  //add advanced options (public_id and tag)
//     // sources: [ "local", "url"], // restrict the upload sources to URL and local files
//     // multiple: false,  //restrict upload to a single file
//     // folder: "user_images", //upload files to the specified folder
//     // tags: ["users", "profile"], //add the given tags to the uploaded files
//     // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
//     // clientAllowedFormats: ["images"], //restrict uploading to image files only
//     // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
//     // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
//     // theme: "purple", //change to a purple theme
//   },
//   (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log("Done! Here is the image info: ", result.info);
//       document
//         .getElementById("uploadedimage")
//         .setAttribute("src", result.info.secure_url);
//     }
//   }
// );

// document.getElementById("upload_widget").addEventListener(
//   "click",
//   function () {
//     myWidget.open();
//   },
//   false
// );

function onClickIconSearch(event) {
  event.preventDefault();

  const searchValue = document.getElementById('search-form').querySelector('input');
  console.log(searchValue);
  window.location.href = `search-courses-result.html?query=${searchValue.value.trim()}`;
  

  
}