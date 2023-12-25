let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

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
document.addEventListener('DOMContentLoaded', () => {
  getVideos().then(addVideosToTable);
});

// Gọi hàm addVideo() khi form được submit
function uploadVideo() {
  const videoInput = document.getElementById('video-input');
  const uploadedVideo = document.getElementById('uploaded-video');
  const videoContainer = document.getElementById('video-container');

  const file = videoInput.files[0];
  if (file) {
    const objectURL = URL.createObjectURL(file);
    uploadedVideo.src = objectURL;
    console.log(uploadedVideo);
    videoContainer.style.display = 'block';
  }
}
