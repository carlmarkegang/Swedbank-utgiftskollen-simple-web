var tableRow = document.getElementsByClassName("account-table__row");
var Current_td_list;
var SummeradeUtgifter = 0;
var SpendingArray = [];
var beloppDateYear = 0;
var beloppDateMonth = 0;
console.clear();

Array.prototype.forEach.call(tableRow, function (el) {
    Current_td_list = el.getElementsByTagName("td");

    if (Current_td_list.length >= 3) {
        var beloppName = Current_td_list[0].innerText;
        var beloppDate = Current_td_list[2].innerText;


        var beloppValue = parseFloat(Current_td_list[3].innerText.replace(",", ".").replace(" ", ""));
        if (beloppValue < 0) {
            SummeradeUtgifter += beloppValue;
            Current_td_list[3].style.backgroundColor = "grey";
        }

        if (beloppValue > 0 && beloppName == "LÖN") {
            SummeradeUtgifter = Math.round(SummeradeUtgifter);

            SetupAndFixBeloppDate(beloppDate);
            var result = beloppValue + SummeradeUtgifter;

            SpendingArray.push("DATUM: " + beloppDateYear + "-" + beloppDateMonth +
                ", UTGIFTER: " + SummeradeUtgifter.toString().replace("-", "")
                + ", LÖN: " + beloppValue
                + ", VINST/FÖRLUST: " + result);
            SummeradeUtgifter = 0;
            Current_td_list[3].style.backgroundColor = "lightgreen";

        }

    }
});


function SetupAndFixBeloppDate(beloppDate) {
    beloppDateYear = parseInt(beloppDate.substring(0, 4));
    beloppDateMonth = parseInt(beloppDate.substring(5, 7));

    // plus 1 because your salary will probably be received 25th and be spent during the upcoming month
    beloppDateMonth += 1;

    // adjust some effects caused by plus 1
    if (beloppDateMonth == 13) {
        beloppDateMonth = 1
        beloppDateYear += 1
    }

    // prettier date format
    if (beloppDateMonth < 10) {
        beloppDateMonth = "0" + beloppDateMonth.toString();
    }
}

Array.prototype.forEach.call(SpendingArray, function (Spending) {	
    console.log(Spending);
});