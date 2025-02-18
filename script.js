const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const frontView = document.querySelector(".shirt-front-view");
const backView = document.querySelector(".shirt-back-view");
const idRegex = /^\d{4}(A|B)\d(PS|TH)\d{4}(P|G|H)$/i;
const emailRegex = /^(f|h)\d{8}@(pilani|goa|hyderabad)\.bits-pilani\.ac\.in$/i;
const phoneRegex = /^\d{10}$/;
const form = document.getElementById("merch-form");
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const phoneNo = document.getElementById("phone");
const bitsID = document.getElementById("bits-id");
const hostel = document.getElementById("hostel-name");
const sizes = document.querySelectorAll(".size-inline");
const termsAndConditions = document.getElementById("terms-and-conditions-box");
const successMessage = document.getElementById("order-success");

nextBtn.addEventListener("click", () => {
  frontView.classList.remove("active");
  backView.classList.add("active");
  nextBtn.style.display = "none";
  prevBtn.style.display = "block";
});

prevBtn.addEventListener("click", () => {
  backView.classList.remove("active");
  frontView.classList.add("active");
  prevBtn.style.display = "none";
  nextBtn.style.display = "block";
});

const validate = (regex, value) => regex.test(value);

const showError = (input, message) => {
  const errorSpan = input.parentNode.nextElementSibling;
  errorSpan.textContent = message;
  errorSpan.style.display = "block";
};

const clearError = (input) => {
  const errorSpan = input.parentNode.nextElementSibling;
  errorSpan.textContent = "";
  errorSpan.style.display = "none";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;

  if (nameInput.value.length < 5 || nameInput.value.length > 50) {
    showError(nameInput, "Name must be between 5 and 50 characters");
    isValid = false;
  } else {
    clearError(nameInput);
  }

  if (!validate(emailRegex, email.value)) {
    showError(email, "Invalid Email ID");
    isValid = false;
  } else {
    clearError(email);
  }

  if (!validate(phoneRegex, phoneNo.value)) {
    showError(phoneNo, "Invalid Phone Number");
    isValid = false;
  } else {
    clearError(phoneNo);
  }

  if (!validate(idRegex, bitsID.value)) {
    showError(bitsID, "Invalid BITS ID");
    isValid = false;
  } else {
    clearError(bitsID);
  }

  if (isValid) {
    const formData = {
      name: nameInput.value,
      email: email.value,
      phone: phoneNo.value,
      bitsID: bitsID.value,
      hostel: hostel.value,
      size: document.querySelector('input[name="size"]:checked').value,
    };

    localStorage.setItem("formData", JSON.stringify(formData));

    fetch("http://www.foo.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify(formData),
    })
      .then((fetchResponse) => {
        console.log(fetchResponse);
        form.reset();
        successMessage.style.display = "block";
        setTimeout(() => {
          successMessage.style.display = "none";
          form.reset();
        }, 6000);
      })
      .catch((fetchError) => console.log(fetchError));
  }
});
