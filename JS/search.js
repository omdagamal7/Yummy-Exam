export class Search {
  constructor(){
    this.getValueOfInput();
    this.runSection();
  }
  // ! ====  HIDE OTHER SECTIONS AND SHOW THIS  ==== ! \\
  runSection(){
    $("#search").siblings().fadeOut(100);
    $("#search").fadeIn(400);
}
  // ! ====  GET SEARCH VALUES => NAME MEAL & FIRST LETTER MEAL  ==== ! \\
  getValueOfInput(){
      $("#searchName").on("input",()=>{
        let nameValue = $("#searchName").val();
        this.getSearchByNameData(nameValue);
      })
      $("#searchLetter").on("input",()=>{
        let letterValue = $("#searchLetter").val();
        this.getSearchByletterData(letterValue);
      })
        
      $('#search').fadeIn(1000);
      $("#display").fadeOut(1000);
      this.changePages();
  }
  // ! ====  CLEAR SEARCH INPUTS  ==== ! \\
  changePages(){
    $('#Search').parent().siblings().children().click(function () {
      document.querySelectorAll(".inputsSearch input")[0].value = "";
      document.querySelectorAll(".inputsSearch input")[1].value = "";
    })
  }
  // ! ====  CALL API FOR GET SEARCH DATA BY NAME  ==== ! \\
  async getSearchByNameData (name){
    $(".loading-page-search").removeClass("d-none");
    const requestSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    this.responseSearch = await requestSearch.json();
    this.displaySearchData(this.responseSearch.meals);
    $(".loading-page-search").addClass("d-none");

    }
    // ! ====  CALL API FOR GET SEARCH DATA BU FIRST LETTER  ==== ! \\
  async getSearchByletterData (letter){
    $(".loading-page-search").removeClass("d-none");
    const requestSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    this.responseSearch = await requestSearch.json();
    this.displaySearchData(this.responseSearch.meals);
    $(".loading-page-search").addClass("d-none");

  }
    // ! ====  DISPLAY DATA OF NAME & FIRST LETTER  ==== ! \\
  displaySearchData(data) {

    let food = '';

    for (let i = 0; i < data.length; i++) {
        food += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 cur-pointer searchBox box d-block" data-id="${data[i].idMeal}">
          <div class="px-10 text-white text-center">
            <img src="${data[i].strMealThumb}" class="rounded">
            <div class="info px-2 text-black rounded">
              <h3>${data[i].strMeal}</h3>
            </div>
        </div>
      </div>
  `;

    };
    $(".searchData").html(food);
    document.querySelectorAll(".searchData .box").forEach((box)=>{
      box.addEventListener("click",()=>{
        this.getDetailsOfSearch(box.dataset.id);
      });
    });
    
  }
    // ! ====  GET DETAILS OF MEALS  ==== ! \\
  async getDetailsOfSearch(id){
    $(".loading-page-search").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    this.Request = await response.json();
    this.displayDataSearch(this.Request.meals);

  }
    // ! ====  DISPLAY DATA OF MEAL  ==== ! \\
  displayDataSearch (data) {
    let recipes = [];
    let tags = [];
    let tagsStr = '';
    let recipesStr = ''
    let details = '';
    for (let i = 0; i < data.length; i++) {
      // ? GET RECIPES
      for (let index = 1; index <= 17 ; index++) {
        recipes.push(data[i][`strIngredient${index}`])
      }
      // ? DISPLAY RECIPES
      for (let index = 0; index < recipes.length; index++) {
        if (recipes[index] != "" && recipes[index] != null && recipes[index].length != 0) {
          recipesStr += `
          <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${recipes[index]}</div>
          `
        }
      }
      // ? GET TAGS
      tags.push(data[i].strTags?.split(","))
      // ? DISPLAY TAGS
        for (let index = 0; index < tags.length; index++) {
            if (tags.length == 0 || tags[index] == undefined) {
            }
            else {
              tags[index].map((tag)=>{
                tagsStr += `<div class="alert alert-danger px- py-1">${tag}</div>`;
              });
            };
        };
      details += `
      <div class="d-flex justify-content-end">
        <i class="fas fa-xmark fs-3 btn btn-dark justify-content-end" id="close"></i>
      </div>
      <div class="img text-white col-12 col-lg-4">

        <img src="${data[i].strMealThumb}" class="rounded img-fluid" alt="">
        <div class="name fs-3">${data[i].strMeal}</div>

      </div>
      <div class="col-12 col-lg-8">
      <div class="info text-white ">


        <p class="title fw-bold fs-3">Instrauctions</p>

        <p class="instrauctions">${data[i].strInstructions}}</p>

        <p class="fw-bold fs-3">Area: <span class="area fw-normal">${data[i].strArea}</span></p>

        <p class="fw-bold fs-3">Category: <span class="category fw-normal">${data[i].strCategory}</span></p>

        <p class="fw-bold fs-3 d-block">Recipes: </p>
        <div class="recipes d-flex flex-wrap mb-4">
        ${recipesStr}
        </div>
        <div><p class="fs-3 fw-bold d-block">Tags: </p><div class="d-flex gap-3 flex-wrap">${tagsStr}</div><div class="d-flex gap-1">
        <div class="d-flex gap-2 flex-wrap">
        <a href="${data[i].strSource}" target="_blanck" class="btn btn-success">Source</a>
        <a href="${data[i].strYoutube}" target="_blanck" class="btn btn-danger">Youtube</a>
        </div>
        </div></div>
      </div>
      </div>`;
    };
    $(".details div").html(details);
    let alert = document.querySelectorAll(".alert");
    for (let i = 0; i < alert.length ;i++) {
      if (alert[i].innerHTML.length == 0 || alert[i].innerHTML == "null") {
        alert[i].classList.add("d-none");
      };
    };
    $(".loading-page-search").addClass("d-none");
  let box = $('.searchData .box')
  for (let i = 0; i < box.length; i++) {
    $(".searchData").addClass("d-none");
    $('.inputsSearch').addClass("d-none");
    $('.details').fadeIn(400);
  };
  $('#close').click(()=>{
      $(".searchData").removeClass("d-none");
      $('.inputsSearch').removeClass("d-none");
      $('.details').fadeOut(100);
  });

  }
  


}