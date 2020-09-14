
let drpdown = document.getElementsByClassName("credits");
let credits = $(".credits");
let totalCredit = 0;

$("#submit").click(function () {
    for (i = 0; i < credits.length; i++) {
        totalCredit += credits[i].value;
    }


drpdown.addEventListener('change', function (e) {

    console.log(e.target);

    console.log(e.target.value);
})