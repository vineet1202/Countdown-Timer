const months = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'];
const weekdays = [  
'Sunday',
'Monday',
'Tuesday',
'Wednesday',
'Thursday',
'Friday',
'Saturday'];

const giveaway = document.querySelector('.launch');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
// console.log(tempDate);
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay+10, 11, 30, 0);

// let futureDate = new Date(2022, 10, 24, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
//month is present at index month in array months
month = months[month];

const weekDay = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
giveaway.textContent = `Launches on ${weekDay}, ${date} ${month} ${year} ${hours}:${minutes}am`;

const futureTime = futureDate.getTime();

function getRemainingTime(){
    const today = new Date().getTime();
    //time will be in ms- milliseconds

    const t = futureTime - today;
    //convert t to hours:mins:secs
    //1s = 1000ms
    //1m = 60s
    //1 hr = 60m
    // 1 day = 24hrs
    const oneDay = 24*60*60*1000; //this many ms in oneday
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;

    let days = t/oneDay;  //no of days remianing
    days = Math.floor(days);
    let hours = Math.floor((t%oneDay)/ oneHour);
    let minutes = Math.floor((t%oneHour)/ oneMinute);
    let seconds = Math.floor((t%oneMinute)/ 1000);

    const values = [days, hours, minutes, seconds];
    //adding zeroes in front if values are less than 10 like 09 08 and so on
    function format(item){
        if(item<10){
            return(item = `0${item}`);
        }
        return item;
    }

    items.forEach(function(item, index){
        item.innerHTML = format(values[index]);
    });

    if(t<0){
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has ended!</h4>`;
    }
}

let countdown = setInterval(getRemainingTime,1000);
getRemainingTime();

