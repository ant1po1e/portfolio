const scriptURL = "https://script.google.com/macros/s/AKfycbx0eCzzKaKtZ2gIwprnJ-5xtkpoM0kqcLv5uoVVUVZZMgIsJ6Fn6YHJ5OzUIOcpIcJV/exec";
const form = document.forms["Ant1po1e-contact-form"];
const submitBtn = document.getElementById("submit");
const submitText = document.getElementById("submit-text");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", (e) => {
   e.preventDefault();

   const recaptchaResponse = grecaptcha.getResponse();
   if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA!");
      return;
   }

   submitBtn.disabled = true;
   submitText.classList.add("hidden");
   spinner.classList.remove("hidden");

   fetch(scriptURL, {
         method: "POST",
         body: new FormData(form),
      })
      .then((response) => {
         form.reset();
         grecaptcha.reset();
         spinner.classList.add("hidden");
         submitText.classList.remove("hidden");
         submitText.innerHTML = '<i class="bi bi-check-lg"></i> Success';

         setTimeout(() => {
            submitText.innerHTML = '<i class="bi bi-caret-right-fill"></i> Run';
            submitBtn.disabled = false;
         }, 3000);
      })
      .catch((error) => {
         console.error("Error!", error.message);
         alert("Something went wrong! Please try again later.");

         spinner.classList.add("hidden");
         submitText.classList.remove("hidden");
         submitBtn.disabled = false;
      });
});