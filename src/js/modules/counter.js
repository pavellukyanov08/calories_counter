import Result from "./result.js";

const PhysicalActivityRatio = new Map([
  ["min", 1.2],
  ["low", 1.375],
  ["medium", 1.55],
  ["high", 1.725],
  ["max", 1.9],
]);

const CaloriesFormulaConstant = new Map([
  ["male", -5],
  ["female", 161],
]);

export default class Counter {
  constructor(element) {
    this.root = element;
    this.form = this.root.querySelector(".counter__form");
    this.elements = this.form.elements;
    this.parameters = [...this.elements.parameters.elements];
    this.gender = this.form.elements.gender;
    this.activity = this.form.elements.activity;
    this.age = this.form.elements.age;
    this.height = this.form.elements.height;
    this.weight = this.form.elements.weight;
    this.calculateButton = this.form.elements["submit"];
    this.resetButton = this.form.elements["reset"];

    this.result = new Result(this.root);

    this._onFormInput = this._onFormInput.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onFormReset = this._onFormReset.bind(this);
    // перечисление параметров, необходимых для работы: gender, age, weight, height, activity и т.д.
  }

  _onFormInput(evt) {
    const validatyInput = evt.target;
    const LEAD_ZERO = /^0+/;
    const NOT_NUMBERS = /[^\d]/g;
    const formatInput = (input) =>
        input.value.replace(NOT_NUMBERS, "").replace(LEAD_ZERO, "");

    if (validatyInput.closest('[name="parameters"]')) {
      
      validatyInput.value = formatInput(validatyInput);
    }
    

    this.calculateButton.disabled = !this.form.checkValidity();
    this.resetButton.disabled = !this.parameters.some((input) => input.value);
    // получение данных от пользователя
    // также можно добавить небольшую валидацию
  }

  _onFormReset() {
    this.calculateButton.disabled = true;
    this.resetButton.disabled = true;
    this.result.hide();
    // задизабленность при обновлении страницы кнопок, скрытие блока с результатом
  }

  _onFormSubmit(evt) {
    evt.preventDefault();

    const caloriesNorm = this.getCaloriesNorm();

    const calories = {
      norm: caloriesNorm,
      minimal: this.getCaloriesMin(caloriesNorm),
      maximal: this.getCaloriesMax(caloriesNorm),
    };

    this.result.show(calories);
    // вызов методов расчета калорий
    // getCaloriesNorm(), getCaloriesMin(), getCaloriesMax()
    // показ блока с результатами калорий
  }
  addEventListeners() {
    this.form.addEventListener("input", this._onFormInput);
    this.form.addEventListener("submit", this._onFormSubmit);
    this.form.addEventListener("reset", this._onFormReset);
  }

  init() {
    this.addEventListeners();
    // инициализация обработчиков событий
    // _onFormInput, _onFormReset, _onFormSubmit
  }

  deinit() {
    const activity = this.activity.value;
    return PhysicalActivityRatio.get(activity);
    // удаление обработчиков событий
    // _onFormInput, _onFormReset, _onFormSubmit
  }

  getCaloriesNorm() {
    const weight = Number(this.weight.value);
    const height = Number(this.height.value);
    const age = Number(this.age.value);
    const gender = this.gender.value;
    const caloriesNorm = (10 * weight + 6.25 * height - 5 * age) - CaloriesFormulaConstant.get(gender);
    const activityRatio = this.deinit();

    return Math.round(caloriesNorm * activityRatio);
    // перечисление констант age, weight, height, gender, activity
    // применение формулы расчета
  }

  getCaloriesMin(caloriesNorm) {
    return Math.round(caloriesNorm * 0.85);
  }

  getCaloriesMax(caloriesNorm) {
    return Math.round(caloriesNorm * 1.15);
  }
}
