//Получаем элементы формы
const myForm=document.forms.myForm;
const firmCar = document.querySelector(".firmCar");
const modelCar=document.querySelector(".modelCar");
const engineCar = document.querySelector('input[name="engine"]');
const formState = document.querySelector(".form__state");
const formOwners = document.querySelector(".form__owners");
const statesCar = document.querySelectorAll('input[name="state"]');
const buttonСalculate=document.querySelector(".button__calculate");
const containerPrice=document.querySelector(".container__price");
const buttonClear=document.querySelector(".button__clear");

//Зададим цену автомобиля согласно фирмы и модели
const prices = {
  Renault:{
    Duster: 12000,
    Megane: 15000,
    Kadjar: 22000,
    Arkana:28000,
  },
  Opel:{
    Corsa: 14000,
    Astra: 17000,
    "Zafira Life": 25000,
    Crossland: 30000,
  },
  Mazda:{
    "CX-5": 15000,
    4: 20000,
    "CX-4": 24000,
    "CX-9": 36000,
  },
  Jaguar:{
    XE: 40000,
    XF: 46000,
    "F-PACE": 50000,
    "I-PACE": 60000,
  },
};

//Зададим коэффициенты для расчетов для разных видов топлива
let coefFuel={
  petrol: 1,
  diesel: 1.3,
  gas: 1.2,
  electricity: 1.4,
}

//Зададим коэффициенты для расчетов в зависимости от состояния автомобиля
let coefState={
  new: 1.2,
  used: 0.9,
}

//Зададим коэффициенты для расчетов в зависимости от количества владельцев
let coefOwners={
  "up to 2": 0.95,
  "over 3": 0.8,
}

//Зададим коэффициенты для расчетов в зависимости от способа оплаты
let coefPay={
  card: 0.95,
  cash: 1,
  account: 1.1,
}

//Получаем модели для выбранной марки автомобиля
firmCar.addEventListener("change",()=>{
  const models = prices[firmCar.value];
  modelCar.disabled = false;
  modelCar.innerHTML = "";
  for (const model in models) {
    const option = document.createElement("option");
    option.value = model;
    option.text = model;
    modelCar.add(option);
  }
});

//Функция получения значения "Состояние автмобиля"выбранного пользователем
let stateSelect;
const defineStateSelect=()=>{
for (const state of statesCar) {
  if (state.checked) {
    stateSelect=state.value
  }
}};

//Если автомобиль подержанный, выводим чекбокс с количеством владельцев
formState.addEventListener("input",()=>{
  //Получим выбранное значение "Состояние автомобиля"
  defineStateSelect();
  if (stateSelect==="used") {
    formOwners.setAttribute("style", "display: block");
  } else {formOwners.setAttribute("style", "display: none");}
});

//Функция получения значений "Марка автомобиля" и "Модель автомобиля"
let firmSelect;
let modelSelect;
const defineFirmModelSelect=()=>{
firmSelect = document.querySelector(".firmCar").value;
modelSelect = document.querySelector(".modelCar").value}

//Функция получения значения "Тип топлива"
const fuelsCar = document.querySelectorAll('input[name="fuel"]');
let fuelSelect
const defineFuelSelect=()=>{
for (const fuel of fuelsCar) {
  if (fuel.checked) {
    fuelSelect=fuel.value
  }
}}

//Функция получения значения "Способ оплаты"
const PaymentCar = document.querySelectorAll('input[name="pay"]');
let paySelect
const definePaySelect=()=>{
for (const pay of PaymentCar) {
  if (pay.checked) {
    paySelect=pay.value
  }
}}

//Функция получения значения "Количество владельцев"
const ownersCar = document.querySelectorAll('input[name="owners"]');
let ownerSelect
const defineOwnerSelect=()=>{
for (const owner of ownersCar) {
  if (owner.checked) {
    ownerSelect=owner.value
  }
}}

//Функция расчета стоимости автомобиля
let finalCost;
const calculatorPrice=()=>{
//Получим выбранноые значения "Марка автомобиля" и "Модель автомобиля"
  defineFirmModelSelect();
//Получим выбранное значение "Тип топлива"
  defineFuelSelect();
//Получим выбранное значение "Состояние автомобиля"
  defineStateSelect();
//Получим выбранное значение "Способ оплаты"
definePaySelect();
//Получим выбранное значение "Количество владельцев"
defineOwnerSelect();

if (firmSelect==="") {
  containerPrice.innerHTML=`Выберите марку автомобиля`}
else if (engineCar.value==="") 
{containerPrice.innerHTML=`Заполните поле "Объем двигателя"`}
else if (engineCar.validity.rangeUnderflow)
{containerPrice.innerHTML=`Значение объема двигателя должно быть больше 1.1 литров`}
else if (engineCar.validity.rangeOverflow)
{containerPrice.innerHTML=`Значение объема двигателя должно быть меньше 3.5 литров`}
else if (stateSelect==="used") {
  finalCost=(prices[firmSelect][modelSelect]*coefFuel[fuelSelect]*coefState[stateSelect]*coefOwners[ownerSelect]*coefPay[paySelect]).toFixed(0);
  containerPrice.innerHTML=`Итоговая стоимость автомобиля: ${finalCost} $`}
else{
  finalCost=(prices[firmSelect][modelSelect]*coefFuel[fuelSelect]*coefState[stateSelect]*coefPay[paySelect]).toFixed(0);
  containerPrice.innerHTML=`Итоговая стоимость автомобиля: ${finalCost} $`
}
};

//Повесим обработчик событий на кнопку "Рассчитать"
buttonСalculate.addEventListener ("click", (event)=>{
 event.preventDefault();
 calculatorPrice();

});

//Повесим обработчик событий на кнопку "Сбросить"
buttonClear.addEventListener ("click", (event)=>{
  event.preventDefault();
  myForm.reset();
  modelCar.disabled = true;
  formOwners.setAttribute("style", "display: none");
  containerPrice.innerHTML=` `
 });