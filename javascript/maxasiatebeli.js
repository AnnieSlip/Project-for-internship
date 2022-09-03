"use strict";
const secondForm = document.getElementById("second-container");
const postDataButton = document.getElementById("post-data");
const againBTN = document.getElementById("again-btn");
//INPUTS
const image_input = document.querySelector("#image_input");
const laptopName = document.querySelector("#laptopname");
const cpuBirtvi = document.querySelector("#birtvi");
const nakadi = document.querySelector("#nakadi");
const laptopRAM = document.querySelector("#ram");
const date = document.querySelector("#date");
const price = document.querySelector("#price");
const radio = document.querySelector(".radio");
const imageContainer = document.querySelector(".image_container");
const laptopBrandId = document.getElementById("brand");
const url = "https://pcfy.redberryinternship.ge/api/laptop/create";
const token = "38ffd54f84dd44d0facd708c1b523d3d";
let formData = new FormData();

//const mdgomareoba = document.querySelector("");
//const mexsierebisTipi = document.querySelector("");
////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
let uploaded_image = "";
const realFileBtn = document.getElementById("image_input");
const custumBtn = document.getElementById("custom-button");
const laptopBrandContainer = document.querySelector(".brand-container");
const laptopCpuContainer = document.querySelector(".cpu-container");
//Recieve data from previous page
const params = new URLSearchParams(window.location.search);
let firstFormData = [];
params.forEach((value, key) => {
  firstFormData.push(value);
});
const [firstName, lastName, teamID, position, email, phone] = firstFormData;
let x;

//File upload and display

image_input.addEventListener("change", function (e) {
  e.preventDefault();
  const files = e.target.files;
  formData.append("laptop_image", files[0]);
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    imageContainer.style.backgroundImage = `url(${uploaded_image})`;
    imageContainer.style.border = "none";
    document.querySelector(".photo-description").style.display = "none";
    custumBtn.classList.add("hidden");
    document.querySelector(".again").style.opacity = 1;
  });
  reader.readAsDataURL(this.files[0]);
});

/*
image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    imageContainer.style.backgroundImage = `url(${uploaded_image})`;
    imageContainer.style.border = "none";
    document.querySelector(".photo-description").style.display = "none";
    custumBtn.classList.add("hidden");
    document.querySelector(".again").style.opacity = 1;
  });
  reader.readAsDataURL(this.files[0]);
});
*/

//Custom radio buttons click
custumBtn.addEventListener("click", function () {
  realFileBtn.click();
});
//get LaptopBrand data from api
const getLaptopBrands = async function () {
  try {
    const res = await fetch("https://pcfy.redberryinternship.ge/api/brands");
    const data = await res.json();
    const laptopBrands = data.data.reverse();
    laptopBrands.map((brand) => {
      renderData(laptopBrandContainer, brand.id, brand.name);
    });
  } catch (err) {
    console.log(err);
  }
};
getLaptopBrands();
//Get CPU data from Api
const getCPU = async function () {
  try {
    const res = await fetch("https://pcfy.redberryinternship.ge/api/cpus");
    const data = await res.json();
    const laptopCPU = data.data.reverse();
    console.log(laptopCPU);
    laptopCPU.map((cpu) => {
      const cpuValue = cpu.name.replace(/ /g, "_");
      console.log(cpuValue);
      renderData(laptopCpuContainer, cpuValue, cpu.name);
    });
  } catch (err) {
    console.log(err);
  }
};
getCPU();
//Render Function
const renderData = function (place, id, value) {
  let data = `
    <option value=${id}>${value}</option>
    `;
  place.insertAdjacentHTML("afterend", data);
};

//POST REQUEST
const postData = async function () {
  const laptopBrandId = document.querySelector("#brand");
  const laptopCpu = document.querySelector("#cpu").value.replace(/_/g, " ");
  const mdgomareoba = document.querySelector(
    'input[name="mdgomareoba"]:checked'
  );
  const image = document.getElementById("image_input");
  const mexsierebaType = document.querySelector(
    'input[name="mexsiereba"]:checked'
  );

  /*
  let testData = {
    name: firstName,
    surname: lastName,
    team_id: Number(teamID),
    position_id: Number(position),
    phone_number: "+995593157777",
    email: email,
    laptop_name: laptopName.value,
    token,
    laptop_image: x,
    laptop_brand_id: Number(laptopBrandId.value),
    laptop_cpu: laptopCpu,
    laptop_cpu_cores: Number(cpuBirtvi.value),
    laptop_cpu_threads: Number(nakadi.value),
    laptop_ram: Number(laptopRAM.value),
    laptop_hard_drive_type: mexsierebaType.value,
    laptop_state: mdgomareoba.value,
    laptop_price: Number(price.value),
  };
  */

  formData.append("name", firstName);
  formData.append("surname", lastName);
  formData.append("team_id", Number(teamID));
  formData.append("position_id", Number(position));
  formData.append("phone_number", "+995599555555");
  formData.append("email", email);
  formData.append("token", token);
  formData.append("laptop_brand_id", Number(laptopBrandId.value));
  formData.append("laptop_cpu", laptopCpu);
  formData.append("laptop_cpu_cores", Number(cpuBirtvi.value));
  formData.append("laptop_cpu_threads", Number(nakadi.value));
  formData.append("laptop_ram", Number(laptopRAM.value));
  formData.append("laptop_hard_drive_type", mexsierebaType.value);
  formData.append("laptop_state", mdgomareoba.value);
  formData.append("laptop_price", Number(price.value));
  formData.append("laptop_name", laptopName.value);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",

        //"Content-Type": "application/json",
      },
      body: formData,
      //body: JSON.stringify(testData),
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

/*
const send = async function (data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: data,
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
*/
//Form submit
secondForm.addEventListener("submit", (e) => {
  formValidation();
  e.preventDefault();
  let formData = new FormData(secondForm);
  console.log(formData);

  if (checkIsFormValid() == true) {
    postData();

    window.localStorage.clear();
    postDataButton.click();
  }
});

const formValidation = function () {
  const laptopCPU = document.querySelector("#cpu");
  const laptopBrand = document.querySelector("#brand");
  const imageContainer = document.querySelector(".image_container");
  //PHOTO Validation
  if (image_input.value.trim() == "") {
    addError(image_input);
    imageContainer.style.border = "dashed 2px var(--red)";
    imageContainer.style.backgroundColor = "#FFF1F1";
    document.querySelector("#photo-description").style.color = "var(--red)";
  } else {
    removeError(image_input);
    imageContainer.style.border = "dashed 2px var(--blue)";
    imageContainer.style.backgroundColor = "var(--gray)";
    document.querySelector("#photo-description").style.color = "var(--blue)";
  }
  //LaptopName
  if (laptopName.value == "") {
    addError(laptopName);
  } else if (isLaptopNameValid()) {
    removeError(laptopName);
  }
  //LaptopBrand
  if (laptopBrand.value == "") {
    addError(laptopBrand);
  } else {
    removeError(laptopBrand);
  }
  //CPU
  if (laptopCPU.value == "") {
    addError(laptopCPU);
  } else {
    removeError(laptopCPU);
  }
  //CPU BIRTVI
  onlyNumbers(cpuBirtvi.value) ? removeError(cpuBirtvi) : addError(cpuBirtvi);
  //CPU NAKADI
  onlyNumbers(nakadi.value) ? removeError(nakadi) : addError(nakadi);
  //RAM
  onlyNumbers(laptopRAM.value) ? removeError(laptopRAM) : addError(laptopRAM);
  //PRICE
  onlyNumbers(price.value) ? removeError(price) : addError(price);
  //MDGOMAREOBA
  if (mdgomareobaValidate() == false) {
    document.querySelector(".second").style.color = "red";
    addError(imageContainer);
  } else {
    removeError(imageContainer);
    document.querySelector(".second").style.color = "var(--black)";
  }
  //Mexsierebis tipi
  if (mexsierebaValidate() == false) {
    document.querySelector(".first").style.color = "red";
    addError(imageContainer);
  } else {
    removeError(imageContainer);
    document.querySelector(".first").style.color = "var(--black)";
  }
};

const checkIsFormValid = function () {
  const inputContainers = secondForm.querySelectorAll(".elem");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });
  return result;
};

const mexsierebaValidate = function () {
  let x = document.myform.mexsiereba;
  for (let i = 0; i < x.length; i++) {
    if (x[i].checked) {
      return true;
    } else {
      return false;
    }
  }
};
const mdgomareobaValidate = function () {
  let x = document.myform.mdgomareoba;
  for (let i = 0; i < x.length; i++) {
    if (x[i].checked) {
      return true;
    } else {
      return false;
    }
  }
};
const isLaptopNameValid = function (laptopName) {
  const reg = /^[a-z][a-z0-9]*$/i;
  return reg.test(laptopName);
};
const onlyNumbers = function (value) {
  const reg = /^\d+$/;
  return reg.test(value);
};
function addError(element) {
  const parent = element.parentElement;
  parent.classList.add("error");
}
function removeError(element) {
  const parent = element.parentElement;
  parent.classList.remove("error");
}
//Upload things in localstorage
const elems = [laptopName, cpuBirtvi, cpu, laptopRAM, date, price, nakadi];

const setItemInLocalstorage = function () {
  localStorage.setItem("laptopName", laptopName.value);
  localStorage.setItem("cpuBirtvi", cpuBirtvi.value);
  localStorage.setItem("cpu", cpu.value);
  localStorage.setItem("laptopRam", laptopRAM.value);
  localStorage.setItem("date", date.value);
  localStorage.setItem("price", price.value);
  localStorage.setItem("cpuNakadi", nakadi.value);
};
elems.map((elem) => elem.addEventListener("keyup", setItemInLocalstorage));

laptopName.value = localStorage.getItem("laptopName");
cpuBirtvi.value = localStorage.getItem("cpuBirtvi");
cpu.value = localStorage.getItem("cpu");
laptopRAM.value = localStorage.getItem("laptopRam");
date.value = localStorage.getItem("date");
price.value = localStorage.getItem("price");
nakadi.value = localStorage.getItem("cpuNakadi");
