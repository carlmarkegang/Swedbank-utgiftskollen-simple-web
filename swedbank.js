var tableRow = document.getElementsByClassName("account-table__row");
var Current_td_list;
var SummeradeUtgifter = 0;
var SpendingArray = [];

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
			var beloppDateYear = parseInt(beloppDate.substring(0, 4));
			var beloppDateMonth = parseInt(beloppDate.substring(5, 7));
			beloppDateMonth+=1;
			if (beloppDateMonth > 12){
				beloppDateYear+=1
			}
			if(beloppDateMonth < 10){
				beloppDateMonth = "0" + beloppDateMonth.toString();
			}
			
            SpendingArray.push("DATUM: " + beloppDateYear + "-" + beloppDateMonth + 
			" UTGIFTER: "  + SummeradeUtgifter.toString().replace("-", "") 
			+ " LÖN: " + beloppValue);
            SummeradeUtgifter = 0;
            Current_td_list[3].style.backgroundColor = "lightgreen";

        }

    }
});


Array.prototype.forEach.call(SpendingArray, function (Spending) {
    console.log(Spending);
});