'use strict';

// Background Music Controls
const audio = document.getElementById('bg-music');
const avatarBox = document.getElementById('avatar-box');

// Play music on page load
window.addEventListener('load', () => {
  // Attempt to play audio
  const playPromise = audio.play();

  // Handle the promise returned by the play() method
  if (playPromise !== undefined) {
    playPromise.then(() => {
      // Music is playing
    }).catch(error => {
      // Autoplay was prevented. You may want to handle this error.
      console.log('Autoplay was prevented. Please click the profile image to play music.');
    });
  }
});

// Click event for image to play or pause music
avatarBox.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    avatarBox.querySelector('img').style.opacity = '0.7'; // Optional: Change image opacity when music is playing
  } else {
    audio.pause();
    avatarBox.querySelector('img').style.opacity = '1'; // Optional: Reset image opacity when music is paused
  }
});

// Utility function to toggle class
const toggleClass = (elem, className) => elem.classList.toggle(className);

// Sidebar Toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => toggleClass(sidebar, "active"));

// Testimonials Modal
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const toggleModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItems.forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
    toggleModal();
  });
});

modalCloseBtn.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

// Custom Select Dropdown
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", () => toggleClass(select, "active"));

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    toggleClass(select, "active");
    filterItems(selectedValue);
  });
});

const filterItems = (value) => {
  document.querySelectorAll("[data-filter-item]").forEach(item => {
    if (value === "all" || value === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterItems(selectedValue);

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Contact Form Validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Page Navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    pages.forEach((page, i) => {
      if (link.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    });
  });
});
