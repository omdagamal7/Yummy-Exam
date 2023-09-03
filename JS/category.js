
import { Home } from "./home.js";

export class Category {
  constructor(){
    this.getCategoriesFromAPI();
    this.runSection();
  }
  // ! ====  HIDE OTHER SECTIONS AND SHOW THIS  ==== ! \\
  runSection(){
    $("#category").siblings().fadeOut(100);
    $("#category").fadeIn(400);
  }
  // ! ====  CALL API FOR GET CATEGORIES  ==== ! \\
  async getCategoriesFromAPI(){
    $(".loading-page").removeClass("d-none")
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    this.response = await request.json();
    this.displayCategory(this.response.categories);

  }
  // ! ====  DISPLAY CATEGORIES  ==== ! \\   
  displayCategory(data){
    let cate = '';
    for (var i = 0; i < data.length; i++) {
      cate += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 cur-pointer box">
      <div class="px-10"')">
      <img src="${data[i].strCategoryThumb}" class="rounded catImg" alt="">
      <div class="info text-center px-3 justify-start rounded over-flow-y-auto">
        <h3 >${data[i].strCategory}</h3>
        <p class="">${data[i].strCategoryDescription}</p>
      </div>
      </div>
    </div>
      `;
      
    };
    $("#categorys .row").html(cate);
    $(".loading-page").addClass("d-none");
  document.querySelectorAll(".box").forEach(box=>{
    box.addEventListener("click",()=>{

      this.getCategoryMeal(box.querySelector('h3').innerHTML.toLowerCase());
      $("#categorysData").fadeIn(400);
      $(".back").fadeIn(400).css({display: "inline-block"});
      $('#categorys').fadeOut(100);
    });
  });
  }
  // ! ====  TAKE A CATEGORY TO CALL API FOR GET DATA BY CATEGORIES  ==== ! \\
  async getCategoryMeal(category){
    $(".loading-page").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    this.response = await response.json();
    this.displayMeal(this.response.meals.slice(0, 20));
  }
  // ! ====  DISPLAY MEALS OF CATEGORY  ==== ! \\
  displayMeal(arr){

    let data = "";
        for (let i = 0; i < arr.length; i++) {
            data += `

            <div class="col-md-3 cur-pointer food" data-id="${arr[i].idMeal}">
                    <div class="box d-block position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                        <div class="info text-black w-100 px-3 text-center">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
            </div>
            `;
        };

        $("#categorysData .row").html(data);
        $(".loading-page").addClass("d-none");
        document.querySelectorAll("#categorysData .row .food").forEach((food)=>{
          food.addEventListener("click",()=>{
            this.getMealDetails(food.dataset.id);
            $("#categorysData").fadeOut(100);
            $("#categoryDetails").fadeIn(400);
          });
        });
        $(".back").click(()=>{
          $("#categorysData").fadeOut(100);
          $("#categorys").fadeIn(400);
        })
        $("#Categorys").click(()=>{
          $("#categoryDetails").fadeOut(400);
          $("#categorysData").fadeOut(400);
          $("#categorys").fadeIn(400);
        })
        
  }
  // ! ====  GET DETAILS OF MEALS  ==== ! \\
  async getMealDetails(id){
    $(".loading-page").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    this.mealRequest = await response.json();
    this.displayMealDetails(this.mealRequest.meals);

  }
  // ! ====  DISPLAY DETAILS OF MEAL  ==== ! \\
  displayMealDetails(data){
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
        <i class="fas fa-xmark fs-3 btn btn-dark justify-content-end" id="closeCate"></i>
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
      ${recipesStr}
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
    $("#categoryDetails .row").html(details);

    $(".loading-page").addClass("d-none");
      $("#closeCate").click(()=>{
        $("#categoryDetails").fadeOut(100);
        $("#categorysData").fadeIn(400);
      });
      
  };

}