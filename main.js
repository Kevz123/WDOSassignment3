//referencing DOM elements

//personal details
const firstnameTxt = document.getElementById("firstname");
const lastnameTxt = document.getElementById("lastname");
const emailTxt = document.getElementById("email");
const phonenumberTxt = document.getElementById("telephone");

//hotel details
const optHotels = document.getElementById("htlsbookings");
const singleroomTxt = document.getElementById("singleroom");
const doubleroomTxt = document.getElementById("doubleroom");
const tripleroomTxt = document.getElementById("tripleroom");
//hotel customers
const numofadultsTxt = document.getElementById("noofadults");
const numofchildbelowTxt = document.getElementById("childbelow");
const numofchildaboveTxt = document.getElementById("childabove");
//duration of stay
const checkindateTxt = document.getElementById("check-indate");
const checkoutdateTxt = document.getElementById("check-outdate");
//extra benefits
const bedTxt = document.getElementById("bed");
const optAddon = document.getElementById("add-ons");
const promocode = document.getElementById("promo");
//output areas in hotel booking
const currentbook = document.getElementById("CurrBoutp");
const loyaltyoutput= document.getElementById("Loyaltyoutp");
const overalloutputTxt = document.getElementById("Overalloutp");
//hotel booking buttons
const loyaltyBtn = document.getElementById("checkloyaltybtn");
const bookhBtn = document.getElementById("bookhotelbtn");
const bookfavBtn = document.getElementById("bookfavouritebtn");

// adventures
const optAdventures = document.getElementById("advtures");
const ladultnumTxt = document.getElementById("adultsadv"); // local adult 
const fadultnumTxt = document.getElementById("nonadultsadv");// foreign adult
const lkidnumTxt = document.getElementById("kidsadv"); // local kid
const fkidnumTxt = document.getElementById("nonkidsadv");// foreign kid
//guides for diving
const optadultdivingGuide = document.getElementById("adultguide");
const optkiddivingGuide = document.getElementById("kidsguide");
//adventure output, buttons and total button
const currentadvoutputTxt = document.getElementById("currentadvoutp");
const overalladvoutpTxt = document.getElementById("overadvoutp");
const advBtn = document.getElementById("bookadvbtn");
const promoBtn = document.getElementById("promobtn");
const advfavBtn = document.getElementById("advfavouritebtn");
const totaloutputTxt = document.getElementById("Totaloutput");
const totalbillBtn = document.getElementById("totalbill")



//calling out all the costs provided for hotel booking
let singleroom = 25000;
let doubleroom = 35000;
let tripleroom = 40000;
let bed = 8000;
let kidabov = 5000;

totalRooms = 0;
roomCost = 0;
overallHotelCost = 0;

bookhBtn.addEventListener("click", bookHotel);

function bookHotel() {
    //storing variables for hotel rooms
    let single = parseInt(singleroomTxt.value);
    let double = parseInt(doubleroomTxt.value);
    let triple = parseInt(tripleroomTxt.value);
    //storing variables for the days and extra bed
    let extrab = bedTxt.value*bed;
    //children above 5 calculation
    let kidsabove = numofchildaboveTxt.value*kidabov;
    //storing variables with no calculations
    let fname = firstnameTxt.value;
    let lname = lastnameTxt.value;
    let emails = emailTxt.value;
    let phonenum = phonenumberTxt.value;
    let branch = optHotels.value;
    let adults = numofadultsTxt.value;
    let kidsbelow = numofchildbelowTxt.value;
    let checkin = new Date(checkindateTxt.value);
    let checkout = new Date(checkoutdateTxt.value);
    let extras = optAddon.value;

    //to make sure user doesn't provide invalid dates
    if(checkout<=checkin){
        alert("Please provide a valid check in and check out date")
    }

    let dateDifference = checkout - checkin;
    let daysStayed = (dateDifference / (1000 * 60 * 60 * 24));
    
    totalRooms = single + double + triple;

    roomCost = ((single*singleroom + double*doubleroom + triple*tripleroom)) * daysStayed;

    overallHotelCost = (roomCost+extrab+kidsabove);


    //console.log(roomCost); 

    currentbook.innerText = `Hotel branch : ${branch} \nNumber of adults : ${adults} \nCost of kids above 5 : Rs.${kidsabove} \nCheck in date : ${checkin} \nCheckout date : ${checkout} \nCost of total beds : Rs.${extrab} \nNumber of days spent : ${daysStayed} \nYour total cost of booking all rooms : Rs.${roomCost} \nYour total hotel booking cost : Rs.${overallHotelCost}`;

    overallBooking(fname,lname,emails,phonenum,single,double,triple,branch,kidsbelow,kidsabove,adults,extrab,checkin,checkout,daysStayed,extras);
    

}

function overallBooking (fname,lname,emails,phonenum,single,double,triple,branch,kidsbelow,kidsabove,adults,extrab,checkin,checkout,daysStayed,extras){

    overalloutputTxt.innerText += `Full name : ${fname} ${lname} \nEmail : ${emails} \nPhone number : ${phonenum} \nBranch : Frankfurt Hotels ${branch} \nNumber of single rooms : ${single} \nNumber of double rooms : ${double} \nNumber of triple rooms : ${triple} \nNumber of adults : ${adults} \nNumber of kids below 5 : ${kidsbelow} \nNumber of kids above 5 : ${numofchildaboveTxt.value} and the cost is Rs.${kidsabove} \nNumber of beds : ${bedTxt.value} and the cost is Rs.${extrab} \nCheck in : ${checkin} \nCheck out : ${checkout} \nNumber of days : ${daysStayed} \nAdd ons : ${extras} \nCost for rooms : Rs.${roomCost} \nOverall booking cost : Rs.${overallHotelCost}\n \n \n`;

}

//loyalty points
loyaltyBtn.addEventListener("click",checkLoyal);

function checkLoyal(){

    let single = parseInt(singleroomTxt.value);
    let double = parseInt(doubleroomTxt.value);
    let triple = parseInt(tripleroomTxt.value);
    totalRooms = single + double + triple;

    let loyalPoints = 0;

    if (totalRooms>3) 
    {
        loyalPoints = totalRooms*20;
        loyaltyoutput.innerText = ` You have been awarded ${loyalPoints} points!`;

    }

    else {
        loyaltyoutput.innerText = `Book more than 3 rooms to get 20 loyalty points per room`;
    }

    let myOb = {
        "1. Loyalty Points" : (loyaltyoutput.value)
    };

    let myOb_serialized = JSON.stringify(myOb);
    console.log(myOb_serialized);

    localStorage.setItem("myOb", myOb_serialized);

}


//favourite button for hotel rooms
bookfavBtn.addEventListener("click", hotelFavourite);

function hotelFavourite(){
    let myObj = {
        "1. First Name" : (firstnameTxt.value),
        "2. Last Name" : (lastnameTxt.value),
        "3. Email" : (emailTxt.value),
        "4. Phone Number" : (phonenumberTxt.value),
        "5. Branches" : (optHotels.value),
        "6. Single Room(s)" : (singleroomTxt.value),
        "7. Double Room(s)" : (doubleroomTxt.value),
        "8. Triple Room(s)" : (tripleroomTxt.value),
        "9. No. of adults" : (numofadultsTxt.value),
        "10. No. of children below 5" : (numofchildbelowTxt.value),
        "11. No. of children above 5" : (numofchildbelowTxt.value),
        "12. Check in Date" : (checkindateTxt.value),
        "13. Check out Date" : (checkoutdateTxt.value),
        "14. No. extra bed(s)" : (bedTxt.value),
        "15. Extra Add-ons" : (optAddon.value)
    }; 

    let myObj_serialized = JSON.stringify(myObj);
    console.log(myObj_serialized);

    localStorage.setItem("myObj", myObj_serialized);
    
}



//all costs for adventure booking

//for all adventures, the costs remain the same
let localadults = 5000;
let localkids = 2000;
let foreignadults = 10000;
let foreignkids = 5000;


adventureCost = 0;

advBtn.addEventListener("click", bookAdventure);

function bookAdventure(){
 
    let adventurs = optAdventures.value
    let locAdult = parseInt(ladultnumTxt.value);
    let locKid = parseInt(lkidnumTxt.value);
    let forAdult = parseInt(fadultnumTxt.value);
    let forKid = parseInt(fkidnumTxt.value);

    let locad = locAdult*localadults
    let lockid = locKid*localkids
    let forad = forAdult*foreignadults
    let forkid = forKid*foreignkids

    //let adventureCost = 0;
    adventureCost = (locad) + (lockid) + (forad) + (forkid)

    
    //guides for only diving 
    let guidecost = adventureCost;

    if (optadultdivingGuide.checked){  //if adult is checked
        guidecost += locAdult*1000;
    }
    if (optkiddivingGuide.checked){    //if kids is checked
        guidecost += locKid*500;
    }

    currentadvoutputTxt.innerText = `Adventure : ${adventurs} \nNumber of local adults : ${locAdult} \nNumber of foreign adults : ${forAdult} \nNumber of local kids : ${locKid} \nNumber of foreign kids : ${forKid} \nAdventure cost : Rs.${adventureCost} \nTotal cost with guides : Rs.${guidecost}`; 

    //Thank you message
    alert(`Thank you for your adventure booking! \n Your adventure is : ${adventurs} \n No. of Local adults : ${locAdult} \n No. of Foreign adults : ${forAdult} \n No. of Local kids : ${locKid} \n No. of Foreign kids : ${forKid} \n Total adventure cost : Rs.${guidecost}`)

    overallAdventureBooking(adventurs, locad, lockid, forad, forkid, adventureCost, guidecost)
    
}

function overallAdventureBooking(adventurs, locad, lockid, forad, forkid, adventureCost, guidecost){


    overalladvoutpTxt.innerText += `Adventure : ${adventurs} \nLocal adult cost : Rs.${locad} \nForeign adult cost : Rs.${forad} \nLocal kid cost : Rs.${lockid} \nForeign kid cost : Rs.${forkid} \nAdventure cost : Rs.${adventureCost} \nTotal cost with guides : Rs.${guidecost} \n \n`;


}

//favourite button for adventures
advfavBtn.addEventListener("click", adventureFavourite);

function adventureFavourite(){
    let myObj = {
        "1. Adventure type" : (optAdventures.value),
        "2. No. of Residential Adults" : (ladultnumTxt.value),
        "3. No. of Non-Residential Adults" : (fadultnumTxt.value),
        "4. No. of Residential Kids" : (lkidnumTxt.value),
        "5. No. of Non-Residential Kids" : (fkidnumTxt.value),
        "6. Diving(adults)" : (optadultdivingGuide.value),
        "7. Diving(kids)" : (optkiddivingGuide.value)
    }; 

    let myObj_serialized = JSON.stringify(myObj);
    console.log(myObj_serialized);

    localStorage.setItem("myObj", myObj_serialized);
}


//total bill
totalbillBtn.addEventListener("click", totalBill);

function totalBill(){

    billtotal = 0;

    billtotal = overallHotelCost + adventureCost;

    totaloutputTxt.innerText = `Your total booking cost is Rs.${billtotal}`;

}

//to get promotion
promoBtn.addEventListener("click", promofn);

function promofn(){

    //user calculates the total bill first, then adds the promo code to check the total bill again

    let promoo = promocode.value
   

    if (promoo === 'Promo123'){ 
        currentotal = billtotal;
        promotion = currentotal * 0.05; 
        promocalc = currentotal - promotion;  

        //currentotal.innerText = promocalc.toFixed(2);

        alert("You have recieved a 5% discount!")
    } 
    else{
        alert("Promo code does not exist");
    }
    totaloutputTxt.innerText = `Your total bill after the promotion is Rs.${promocalc}`;
}

