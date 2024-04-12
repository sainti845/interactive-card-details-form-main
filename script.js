"use strict"

const customerName=document.querySelector("input[name=CARDHOLDER_NAME]");
const cardNumber= document.querySelector("input[name=CARD_NUMBER]");
const month= document.querySelector("input[name=MM]");
const year= document.querySelector("input[name=YY]");
const submit=document.querySelector(".submit");
const cvc=document.querySelector("input[name=CVC]");

const displayNumber=document.querySelector("#cardNum");
const displayCVC=document.querySelector("#backcvc")
const displayName = document.querySelector(".name");
const displayExp = document.querySelector("#date-exp");
const displaymm=document.querySelector(".mm");
const displayyy=document.querySelector(".yy");





const checkName=()=>customerName.value;
    

const checkNum=()=>{
    if (
      !cardNumber.value ||
      cardNumber.value.length !== 16
    ){
        return false;}
    else return true;
}


const checkDate=()=>{

    const presentYear=(new Date()).getFullYear()-2000;
    console.log(presentYear)
    if(!(month.value&&year.value&&month.value>=1&&month.value<=12&&+year.value>presentYear)) return false
    else return true
}
const checkCVC =()=>{
    if(!cvc.value||cvc.value.length!==3)return false
    else return true
}

const checkError= function(){
    if(!checkName()){
        document.querySelector("#err-name").classList.remove("hidden");
    }
    if(!checkNum()){
        document.querySelector("#err-num").classList.remove("hidden");
    }
    if(!checkDate()){
        document.querySelector("#err-date").classList.remove("hidden");
    }
    if(!checkCVC()){
        document.querySelector("#err-cvc").classList.remove("hidden");
    }
    if(checkCVC()&&checkDate()&&checkNum()&&checkName()){
        return true;
    }

}


cardNumber.addEventListener('input',function(e){
   e.preventDefault();
    console.log(e);
    if(!e.data){
        displayNumber.innerText="0000 0000 0000 0000";
        return;
    }
    if (!parseInt(e.data+1)) {
        cardNumber.value = cardNumber.value.slice(0, cardNumber.value.length - 1);
        return
    }
    if(cardNumber.value.length>19) {
        cardNumber.value = cardNumber.value.slice(0,19);
        return
    };
    if ((cardNumber.value.length+1) % 5 === 0 && cardNumber.value.length !==19) {
      cardNumber.value= cardNumber.value + " ";
    }
    displayNumber.innerText =
      cardNumber.value + displayNumber.innerText.substring(cardNumber.value.length);
    
});

month.addEventListener("input", function () {
    
  displaymm.innerHTML =
    month.value.padStart(2,0) + `/${month.value ? month.value : "00"}`;
});

cvc.addEventListener('input',function(e){
    if(!e.data){displayCVC.innerText="000";
    return;}
    if (!parseInt(e.data + 1)) {
        cvc.value = cvc.value.slice(0, cvc.value.length - 1);
        return;
      }
      if (cvc.value.length > 3) {
        cvc.value = cvc.value.slice(0, 3);
        return;
      }
      displayCVC.innerText =
        cvc.value + displayCVC.innerText.substring(cvc.value.length);
    
})

customerName.addEventListener("input", function () {
    displayName.innerText =
      customerName.value.toUpperCase();
  });

 

year.addEventListener("input", function () {
    if (year.value.length > 2) {
      year.value = year.value.slice(0, 2);
      return;
    }
  displayExp.innerText =
    `${month.value ? month.value : "00"}/` + year.value.padStart(2, 0);
});


















submit.addEventListener("submit",function(e){
    e.preventDefault();
    console.log('hello');
    if(!checkError())return;
    document.querySelector("form").classList.add("hidden");
    document.querySelector('.success').classList.remove('hidden');
    document.querySelectorAll("input").forEach(el=>
        {
            el.value()="";
        })
        displayCVC.innerText="000"
    displayName.innerText = "JANE APPLESEED";
    displayNumber.innerText = "0000 0000 0000 0000";
    displayExp.innerText = "00/00";
});
document.querySelector(".success").addEventListener("click",function(){
    document.querySelector("form").classList.remove("hidden");
    document.querySelector(".success").classList.add("hidden");
  })
  
document.querySelectorAll("input").forEach(el=>el.addEventListener("focus",()=>{
    document.querySelectorAll(".err").forEach(el=>el.classList.add("hidden"))
}));