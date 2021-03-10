window.addEventListener('load', function () {
  let employee = {
      'admin': { 'k0': '38000', 'k1': '38000', 'k2': '38000'},
      'cashier': { 'k0': '28700', 'k1': '34500' , 'k2': '40200' }
  };

  //получние employee
  let login,
      category,
      rate,
      time,
      percent,
      upt_plan,
      upt_fact,
      upt_coef,
      sales_coef,
      gross,
      wage
  ;


  // проверка input на число
  document.addEventListener('input',  function (e) {
      if(event.target.tagName === 'INPUT') {
          let regex = /([^.0-9])/g;
          e.target.value  = e.target.value.replace(regex, '');
      }
  });

  let loginSelect = document.querySelector("#login");
  loginSelect.addEventListener('change', function (e) {
      login = e.target.value;
      console.log(login);
      getMoney()
  });

  let categorySelect = document.querySelector("#category");
  categorySelect.addEventListener('change', function (e) {
      category = e.target.value;
      console.log(category);
      getMoney()
  });

  let money = document.querySelector("#money");

  function getMoney(){
      money.value = '';
      if (login in employee && category in employee[login]) {
          rate = employee[login][category];
          money.value = rate;
      }
  }

  // let time = document.querySelector('.time_input').value;
  let time_input = document.querySelector('.time');
  time_input.addEventListener('input', function (e) {
      time = +e.target.value;
  });

  let percent_input = document.querySelector('.percent_input');
  percent_input.addEventListener('input', function (e) {
      percent = +e.target.value / 100;
  });

  let upt_plan_input = document.querySelector('.upt_plan_input');
  upt_plan_input.addEventListener('change', function (e) {
      upt_plan = +e.target.value;
  });

  let upt_fact_input = document.querySelector('.upt_fact_input');
  upt_fact_input.addEventListener('change', function (e) {
      upt_fact = +e.target.value;
  });


  let start = document.querySelector('.start');
  window.addEventListener('change' ,function () {
      start.disabled = true;
      upt_coef = null;
      sales_coef = null;

      if (upt_plan_input.value !== '' && upt_fact_input.value !== '')    {
          if((upt_plan + 1) <= upt_fact) { upt_coef = 2 }
          if((upt_plan + 0.5) <= upt_fact && upt_fact < (upt_plan + 1)) { upt_coef = 1.5 }
          if((upt_plan + 0.3) <= upt_fact && upt_fact < (upt_plan + 0.5)) { upt_coef = 1.3 }
          if((upt_plan + 0.1) <= upt_fact && upt_fact < (upt_plan + 0.3)) { upt_coef = 1.1 }
          if( upt_plan <= upt_fact && upt_fact < (upt_plan + 0.1)) { upt_coef = 1.0 }
          if( upt_plan > upt_fact) { upt_coef = 0 }
      }

      console.log(percent);
      if (percent_input.value !== '') {
          if(1.05 <= percent && login === 'admin') { sales_coef = 1.15 }
          else if(1.05 <= percent && login === 'cashier') { sales_coef = 1.10 }
          else if( 1 <= percent && percent < 1.05) { sales_coef = 1 }
          else if( 0.95 <= percent && percent  < 1) { sales_coef = 0.8 }
          else if( 0.9 <=  percent && percent  < 0.95) { sales_coef = 0.6 }
          else if( 0.85 <= percent && percent < 0.9) { sales_coef = 0.3 }
          else if( percent < 0.85) { sales_coef = 0}
          console.log(sales_coef);
      }

      if(money && time && upt_coef != null  && sales_coef != null) {
          start.disabled = false;
      }
  });



  let gross_input = document.querySelector('.gross_input');
  let salary_input = document.querySelector('.salary_input');
  start.addEventListener('click', function () {
      let p = (rate * time) / 168;
      if(login === 'cashier'){
          let salary = p * 0.8;
          let upt_bonus = p * 0.1 * upt_coef;
          let sale_bonus = p * 0.1 * sales_coef;
          gross = (salary + upt_bonus + sale_bonus).toFixed(2);;
          wage = (0.87 * gross).toFixed(2);
      }

      if(login === 'admin'){
          let salary = p * 0.7;
          let upt_bonus = p * 0.105 * upt_coef;
          let sale_bonus = p * 0.195 * sales_coef;
          gross = (salary + upt_bonus + sale_bonus).toFixed(2);
          wage = (0.87 * gross).toFixed(2);
      }
      gross_input.value = gross;
      salary_input.value = wage;
  })

});