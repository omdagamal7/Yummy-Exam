export class Contact {
    constructor(){
      this.runValidations();
      this.runSection();
      this.counter = 0;
         }
    // ! ====  HIDE OTHER SECTIONS AND SHOW THIS  ==== ! \\
    runSection(){
      $("#contactUs").siblings().fadeOut(100);
      $("#contactUs").fadeIn(400);
      $("#contactUs").siblings().click(()=>{
        document.getElementById("nameInp").value = "";
        document.getElementById("phoneInp").value = "";
        document.getElementById("passwordInp").value = "";
        document.getElementById("emailInp").value = "";
        document.getElementById("ageInp").value = "";
        document.getElementById("rePassInp").value = "";
        this.counter = 0;
      })
    }
    // ! ====  RUNNING VALIDATION ON INPUTS VALUE  ==== ! \\
    runValidations(){
  
     $("#nameInp").on("input",()=>{
      this.validateName($("#nameInp").val());
     });
     $("#phoneInp").on("input",()=>{
      this.validatePhoneNumber($("#phoneInp").val());
     });
     $("#passwordInp").on("input",()=>{
      this.validatePass($("#passwordInp").val());
     });
     $("#emailInp").on("input",()=>{
      this.validateEmail();
     });
     $("#ageInp").on("input",()=>{
      this.validateAge();
     });
    }
    // ! ====  VALIDATION ON NAME VALUE  ==== ! \\
    validateName() { 
        let nameInp = document.getElementById('nameInp');
        let regex = /^[A-Z][a-z]{2,8}$/;
        if (regex.test(nameInp.value)== true  ) 
        {
            nameInp.style.border='none';
            $('#invalidName').addClass('d-none');
            this.counter++
            console.log(this.counter);
            return true;
        } else 
        {
            nameInp.style.border='3px solid red';
            $('#invalidName').removeClass('d-none');
            return false;
        }
    } 
    // ! ====  VALIDATION ON EMAIL VALUE  ==== ! \\
    validateEmail() { 
        let emailInp = document.getElementById('emailInp');
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/;
        if (regex.test(emailInp.value)== true  ) 
        {
            emailInp.style.border='none';
            $('#invalidEmail').addClass('d-none');
            this.counter++
            console.log(this.counter);
            return true;
        } else 
        {
            emailInp.style.border='3px solid red';
            $('#invalidEmail').removeClass('d-none');
            return false;
        }
    } 
    // ! ====  VALIDATION PHONE NUMBER VALUE  ==== ! \\
    validatePhoneNumber() { 
        let phoneInp = document.getElementById('phoneInp');
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (regex.test(phoneInp.value)== true  ) {
            phoneInp.style.border='none';
            $('#invalidPN').addClass('d-none');
            this.counter++
            console.log(this.counter);
            return true;
        } else 
        {
            phoneInp.style.border='3px solid red';
            $('#invalidPN').removeClass('d-none');
            return false;
        }
    } 
    // ! ====  VALIDATION ON AGE VALUE  ==== ! \\
    validateAge() { 
      let ageInp = document.getElementById('ageInp');
      let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
      if (regex.test(ageInp.value)== true  ) {
          ageInp.style.border='none';
          $('#invalidAge').addClass('d-none');
          this.counter++
          console.log(this.counter);
          return true;
      } else 
      {
          ageInp.style.border='3px solid red';
          $('#invalidAge').removeClass('d-none');
          return false;
      }
    } 
    // ! ====  VALIDATION ON PASSWORD VALUES  ==== ! \\
    validatePass() { 
    this.passwordInp = document.getElementById('passwordInp');
    this.rePassInp = document.getElementById('rePassInp');
      let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/;
      if (regex.test(this.passwordInp.value)== true ) {
          this.passwordInp.style.border='none'
          $('#invalidPass').addClass('d-none');
          this.counter++
          console.log(this.counter);
          this.runSubmit();
          return true;
      } else 
      {
          this.passwordInp.style.border='3px solid red'
          $('#invalidPass').removeClass('d-none');
          return false;
      };
      
    } 
    runSubmit(){
        if (this.counter <= 5) {
            $("#submit").removeAttr("disabled")
        }
    }
  }