export class Area {
  constructor() {
    this.getAreaFromAPI();
    this.runSection();
  }
  // ! ====  HIDE OTHER SECTIONS AND SHOW THIS  ==== ! \\
  runSection(){
      $("#AreaS").siblings().fadeOut(100);
      $("#AreaS").fadeIn(400);
  }
  // ! ====  CALL API FOR GET AREAS  ==== ! \\
  async getAreaFromAPI(){
    $(".loading-page").removeClass("d-none");
    const requestArea = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    this.responseArea = await requestArea.json();
    this.displayArea(this.responseArea.meals);
  }
  // ! ====  DISPLAY AREAS  ==== ! \\   
  displayArea(data){
    let area = '';
    for (let i = 0; i < data.length; i++) {
      if (i < 28) {
        area += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 cur-pointer boxArea">
        <div class="px-10 text-white text-center">
        <i class="fa-solid fa-house-laptop fs-6rem"></i>
        <div class="infoIng p-2">
          <h3>${data[i].strArea}</h3>
        </div>
        </div>
      </div>
        `
      };
    };
    $("#area .row").html(area);
    $(".loading-page").addClass("d-none");
    document.querySelectorAll("#area .row .boxArea").forEach(box => {
      $(box).click(()=>{
        this.getAreasData(box.querySelector("h3").innerHTML.toLocaleLowerCase());
        $("#area").fadeOut(100);
        $("#areaData").fadeIn(400);
        $(".backArea").fadeIn(400).css({display:"inline-block"});
      });
    });
}
  // ! ====  TAKE A AREA TO CALL API FOR GET DATA BY AREA  ==== ! \\
  async getAreasData(data){
    $(".loading-page").removeClass("d-none");
    const requestAreaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${data}`);
    this.responseAreaData = await requestAreaData.json();
    this.displayAreaData(this.responseAreaData.meals);

}
  // ! ====  DISPLAY MEALS OF AREA  ==== ! \\
  displayAreaData(data){
    let box = '';
    for (let i = 0; i < data.length; i++) {
      box += `
      <div class="col-md-3 cur-pointer food" data-id="${data[i].idMeal}">
      <div class="box d-block position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
          <div class="info text-black w-100 px-3 text-center">
              <h3>${data[i].strMeal}</h3>
          </div>
      </div>
      </div>
      `;
    };
    $("#areaData .row").html(box);
    $(".loading-page").addClass("d-none");
    document.querySelectorAll("#areaData .row .food").forEach(box=>{
      $(box).click(()=>{
        this.getAreaDetails(box.dataset.id);
        $('#areaData').fadeOut(100);
        $('#areaDetails').fadeIn(400);
      });
    });
    $(".backArea").click(()=>{
      $("#areData").fadeOut(100);
      $("#area").fadeIn(400);
    });
    $("#Area").click(()=>{
      $("#areData").fadeOut(100);
      $("#areaDetail").fadeOut(100);
      $("#area").fadeIn(400);
    });
  }
  // ! ====  GET DETAILS OF MEALS  ==== ! \\
  async getAreaDetails(id){
    $(".loading-page").removeClass("d-none");
    const requestAreaDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    this.responseAreaDetails = await requestAreaDetails.json();
    this.displayAreaDetails(this.responseAreaDetails.meals);
  }
  // ! ====  DISPLAY DETAILS OF MEALS  ==== ! \\
  displayAreaDetails(data){
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
        <i class="fas fa-xmark fs-3 btn btn-dark justify-content-end" id="closeArea"></i>
      </div>

      <div class="col-12 col-lg-4">
      <div class="img text-white">
      <img src="${data[i].strMealThumb}" class="rounded img-fluid" alt="">
      <div class="name fs-3">${data[i].strMeal}</div>
      </div>
      </div>
      <div class="col-12 col-lg-8">
      <div class="info text-white">
      <p class="title fw-bold fs-3">Instrauctions</p>
      <p class="instrauctions">${data[i].strInstructions}}</p>
      <p class="fw-bold fs-3">Area: <span class="area fw-normal">${data[i].strArea}</span></p>
      <p class="fw-bold fs-3">Category: <span class="category fw-normal">${data[i].strCategory}</span></p>
      <div><p class="fw-bold fs-3 d-block">Recipes: </p>
      <div class="recipes d-flex flex-wrap mb-4">
      <div class="recipes d-flex flex-wrap mb-4">
        ${recipesStr}
      </div>
      </div>
      </div>
      <div><p class="fs-3 fw-bold d-block">Tags: </p><div class="d-flex gap-3 flex-wrap">${tagsStr}</div><div class="d-flex gap-1">
      <div class="d-flex gap-2 flex-wrap">
      <a href="${data[i].strSource}" target="_blanck" class="btn btn-success">Source</a>
      <a href="${data[i].strYoutube}" target="_blanck" class="btn btn-danger">Youtube</a>
      </div>
      </div></div>
    </div>      
      </div>
      `;
    };
    $("#areaDetails .row").html(details);
    $(".loading-page").addClass("d-none");
      $("#closeArea").click(()=>{
        $("#areaDetails").fadeOut(100);
        $("#areaData").fadeIn(400);
      });
      
  }
}