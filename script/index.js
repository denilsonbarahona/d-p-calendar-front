import {
    $monthDay, 
    $calendarDay, 
    $longDay,
    $currentMonth,
    $nextNavigation,
    $prevNavigation,
    $calendarYear,
    $calendarToday 
} 
from "./ui.js";
import Calendar from "./util/calendar.js"
import "./events.js";


const calendar = new Calendar({
    day: $calendarDay, 
    longDay: $longDay,
    monthDay: $monthDay,
    currentMonth: $currentMonth,
    calendarYear: $calendarYear, 
    calendarSelected: $calendarToday,
    callback: callback
});

$nextNavigation.addEventListener("click",handlenextClick);
$nextNavigation.addEventListener("keydown",(key)=>{    
    if(key.keyCode === 13)
        handlenextClick()
});
$prevNavigation.addEventListener("click",handleprevClick);
$prevNavigation.addEventListener("keydown",(key)=>{    
    if(key.keyCode === 13)
        handleprevClick()
});

function handlenextClick(){    
    calendar.NavigateCalendar(1)
}

function handleprevClick(){    
    calendar.NavigateCalendar(-1)
}
 

function callback(){
    const $days = document.querySelectorAll(".calendar-monthdayitem");
    $days.forEach($day=>{
        $day.addEventListener("click",handleDayClick);
        $day.addEventListener("keydown",handleDayEnter);
    })
}

function handleDayClick(event){
    calendar.setDateSelected(event.target)    
}

function handleDayEnter(key){
    if(key.keyCode === 13)
        calendar.setDateSelected(key.target)
}