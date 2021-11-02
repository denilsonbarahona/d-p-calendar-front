const dayenum = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthenum = ["January","February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"]

class Calendar {
    
    #date = new Date();
    
    constructor($el){
        this.$el = $el;
        this.#setCurrentData();
        this.#settingCalendar();
        this.#showDate(); 
    }

    #settingCalendar(){
        this.#setCalendar();
        this.#showCurrentMonth();
        this.#showCurrentYear();
    }

    #showDate(){ 
        let aria = this.#getDayAriaLabel(this.#date.getDate())
        this.$el.calendarSelected.setAttribute("aria-label",`the selected day is: ${aria}`)

        this.$el.day.innerText = this.#date.getDate();        
        this.$el.longDay.innerHTML = `
            <span class="calendar-span">${dayenum[this.#date.getDay()]}</span>
            <span class="calendar-span">${monthenum[this.#date.getMonth()]}</span>
            <span class="calendar-span">${this.#date.getFullYear()}</span>`;
    }

    #setCalendar(){
        let daysHTML ="";
        let empties = new Date(this.#date.getFullYear(), this.#date.getMonth(),0).getDay();
        let days = new Date(this.#date.getFullYear(), this.#date.getMonth()+1,0).getDate();
        let index = 0;
        empties = (empties === 6)?-1:empties;
        for(let i=0; i <= days+empties; i++) {    
            if (i <= empties)
                daysHTML += this.#buildDay("");
            else {
                daysHTML += this.#buildDay(index+1, true);
                index++;
            }
        }
        this.$el.monthDay.innerHTML = daysHTML;
        this.$el.callback()
    }

    #buildDay(content, settab=false) { 
        let setSelected = this.#getDateIsCurrent(content);
        let ariaLabel = this.#getDayAriaLabel(content);        
        return `<span 
                    ${settab?`aria-label='${ariaLabel}'`:""}                
                    ${settab?"tabindex=0":""}  
                    class="${settab?"calendar-monthdayitem":""} ${setSelected?"calendar-monthdayitem--selected":""}">
                        ${content}
                </span> `
    }

    #getDayAriaLabel(content){
        let dateclick = new Date(this.#date.getFullYear(), this.#date.getMonth(), content).getDay();
        const day = dayenum[dateclick];
        return `${day}, day ${content} of ${monthenum[this.#date.getMonth()]} ${this.#date.getFullYear()}`
    }

    #getDateIsCurrent(content){
        if(this.currentDate === content && 
            this.currentMonth === this.#date.getMonth() &&
            this.currentYear === this.#date.getFullYear()) {
            return true;
        }

        return false;
    }

    #showCurrentMonth(){
        this.$el.currentMonth.setAttribute("aria-label", `${monthenum[this.#date.getMonth()]} ${this.#date.getFullYear()}`)
        this.$el.currentMonth.innerText = monthenum[this.#date.getMonth()]; 
    }

    #showCurrentYear(){
        this.$el.calendarYear.innerText = this.#date.getFullYear();
    }

    setDateSelected($currentHTML){
        this.#setToggleSelector($currentHTML)
        this.#date = new Date(this.#date.getFullYear(), this.#date.getMonth(), $currentHTML.innerText);
        this.#setCurrentData();
        this.#showDate();
    }

    #setToggleSelector($currentHTML){
        const $currentSelector = document.querySelector(".calendar-monthdayitem--selected");
        $currentSelector?.classList.remove("calendar-monthdayitem--selected")
        $currentHTML.classList.add("calendar-monthdayitem--selected")
    }

    #setCurrentData(){        
        this.currentDate = this.#date.getDate(); 
        this.currentMonth = this.#date.getMonth();
        this.currentYear = this.#date.getFullYear();
    }

    NavigateCalendar(param){
      this.#date =  new Date(this.#date.getFullYear(), (this.#date.getMonth()+1)+param, 0);      
      this.#settingCalendar();
    }

}

export default Calendar;