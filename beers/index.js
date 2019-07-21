"use strict";
const url = "beers.json";
var alpha = [];
var number = [];
var beers;
document.getElementById("alphBnt").addEventListener("click", function() {
  NewAlphaArr();
  let container = document.getElementById("container");
  container.textContent = "";
  for (let i in alpha) {
    container.append(alpha[i][1]);
  }
});

function NewNumArr() {
  let alcohol;
  number = [];
  for (let i in beers) {
    let numArr = [];
    alcohol = document.getElementsByClassName("alcohol");
    numArr.push(Number(alcohol[i].textContent));
    numArr.push(alcohol[i].parentElement);
    number.push(numArr);
    number.sort(sortNumbers);
  }
}

function NewAlphaArr() {
  let name;
  alpha = [];
  for (let i in beers) {
    let alphaArr = [];
    name = document.getElementsByClassName("name");

    alphaArr.push(name[i].textContent);
    alphaArr.push(name[i].parentElement);
    alpha.push(alphaArr);
    alpha.sort(sortStrings);
  }

  let rangeslider = document.querySelectorAll("input");
  let output = document.getElementsByClassName("alcoholValue");
  output.innerHTML = rangeslider.value;
  rangeslider.forEach(function(elem) {
    elem.addEventListener("input", changeAlcoholContent);
  });
}

document.getElementById("numBnt").addEventListener("click", function() {
  let container = document.getElementById("container");
  NewNumArr();
  container.textContent = "";
  for (let i in number) {
    container.append(number[i][1]);
  }
});

function changeAlcoholContent() {
  let self = this.value;
  this.innerHTML = self;
  if (this.classList.contains("alcohol")) {
    this.nextSibling.textContent = self;
    this.nextSibling.value = self;
  } else {
    this.previousElementSibling.textContent = self;
    this.previousElementSibling.value = self;
  }
}
let sortNumbers = function(a, b) {
  if (a[0] > b[0]) return 1;
  if (a[0] < b[0]) return -1;
};

let sortStrings = function(a, b) {
  return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
};

fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    const dropdown = document.getElementById("container");
    let name, div, alcohol, description, id, img, alcoholValue;
    beers = data.data;
    for (let i in beers) {
      let alphaArr = [];
      let numArr = [];

      div = document.createElement("div");
      name = document.createElement("span");
      alcohol = document.createElement("input");
      alcoholValue = document.createElement("input");
      description = document.createElement("span");
      img = document.createElement("img");

      name.innerHTML = beers[i].name;
      alcohol.innerHTML = beers[i].alcohol;
      alcoholValue.innerHTML = beers[i].alcohol;

      description.innerHTML = beers[i].description;
      id = beers[i].id;
      img.src = `beers/${id}.jpg`;
      name.setAttribute("class", "name");
      alcohol.setAttribute("class", "alcohol");
      alcohol.setAttribute("type", "range");
      alcohol.setAttribute("min", 1);
      alcohol.setAttribute("max", 20);
      alcohol.setAttribute("value", beers[i].alcohol);
      alcoholValue.setAttribute("class", "alcoholValue");
      alcoholValue.setAttribute("value", beers[i].alcohol);
      description.setAttribute("class", "description");

      dropdown.appendChild(div);
      div.appendChild(img);
      div.appendChild(name);
      div.appendChild(alcohol);
      div.appendChild(alcoholValue);
      div.appendChild(description);

      alphaArr.push(name.textContent);
      alphaArr.push(name.parentElement);
      alpha.push(alphaArr);
      alpha.sort();

      numArr.push(beers[i].alcohol);
      numArr.push(alcohol.parentElement);
      number.push(numArr);
      number.sort(sortNumbers);

      name.contentEditable = true;
      description.contentEditable = true;
      alcohol.contentEditable = true;
      alcoholValue.contentEditable = true;
    }

    let rangeslider = document.querySelectorAll("input");
    rangeslider.forEach(function(elem) {
      elem.addEventListener("input", changeAlcoholContent);
    });
  });
