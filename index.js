"use strict"

const btn = document.querySelector(".submit");  
const timestamp = document.querySelector(".timestamp-input");
const humanTime = document.querySelector(".display-time");
const options = document.querySelector(".options");


const timezones = [
    {
        decsription: "Greenwich Mean Time",
        relativeToGMT: "GMT",
        time: "0"
    },
    {
        decsription: "European Central Time",
        relativeToGMT: "GMT+1:00",
        time: "1"
    },
    {
        decsription: "Eastern European Time",
        relativeToGMT: "GMT+2:00",
        time: "2"
    },
    {
        decsription: "(Arabic) Egypt Standard Time",
        relativeToGMT: "GMT+2:00",
        time: "2"
    },
    {
        decsription: "Eastern African Time",
        relativeToGMT: "GMT+3:00",
        time: "3"
    },
    {
        decsription: "Middle East Time",
        relativeToGMT: "GMT+3:30",
        time: "3.30"
    },
    {
        decsription: "Near East Time",
        relativeToGMT: "GMT+4:00",
        time: "4"
    },
    {
        decsription: "Pakistan Lahore Time",
        relativeToGMT: "GMT+5:00",
        time: "5"
    },
    {
        decsription: "India Standard Time",
        relativeToGMT: "GMT+5:30",
        time: "5.30"
    },
    {
        decsription: "Bangladesh Standard Time",
        relativeToGMT: "GMT+6:00",
        time: "6"
    },
    {
        decsription: "Vietnam Standard Time",
        relativeToGMT: "GMT+7:00",
        time: "7"
    },
    {
        decsription: "China Taiwan Time",
        relativeToGMT: "GMT+8:00",
        time: "8"
    },
    {
        decsription: "Japan Standard Time",
        relativeToGMT: "GMT+9:00",
        time: "9"
    },
    {
        decsription: "Australia Central Time",
        relativeToGMT: "GMT+9:30",
        time: "9.30"
    },
    {
        decsription: "Australia Eastern Time",
        relativeToGMT: "GMT+10:00",
        time: "10"
    }, 
    {
        decsription: "Solomon Standard Time",
        relativeToGMT: "GMT+11:00",
        time: "11"
    },
    {
        decsription: "New Zealand Standard Time",
        relativeToGMT: "GMT+12:00",
        time: "12"
    },
    {
        decsription: "Midway Islands Time",
        relativeToGMT: "GMT-11:00",
        time: "-11"
    },
    {
        decsription: "Hawaii Standard Time",
        relativeToGMT: "GMT-10:00",
        time: "-10"
    },
    {
        decsription: "Alaska Standard Time",
        relativeToGMT: "GMT-9:00",
        time: "-9"
    },
    {
        decsription: "Pacific Standard Time",
        relativeToGMT: "GMT-8:00",
        time: "-8"
    },
    {
        decsription: "Phoenix Standard Time",
        relativeToGMT: "GMT-7:00",
        time: "-7"
    },
    {
        decsription: "Mountain Standard Time",
        relativeToGMT: "GMT-7:00",
        time: "-7"
    },
    {
        decsription: "Central Standard Time",
        relativeToGMT: "GMT-6:00",
        time: "-6"
    },
    {
        decsription: "Eastern Standard Time",
        relativeToGMT: "GMT-5:00",
        time: "-5"
    },
    {
        decsription: "Indiana Eastern Standard Time",
        relativeToGMT: "GMT-5:00",
        time: "-5"
    },
    {
        decsription: "Puerto Rico and US Virgin Islands Time",
        relativeToGMT: "GMT-4:00",
        time: "-4"
    },
    {
        decsription: "Canada Newfoundland Time",
        relativeToGMT: "GMT-3:30",
        time: "-3.30"
    },
    {
        decsription: "Argentina Standard Time",
        relativeToGMT: "GMT-3:00",
        time: "-3"
    },
    {
        decsription: "Brazil Eastern Time",
        relativeToGMT: "GMT-3:00",
        time: '-3'
    },
    {
        decsription: "Central African Time",
        relativeToGMT: "GMT-1:00",
        time: "-1"
    }
    
]

const renderHTML = (el) => {
    timezones.forEach((tz, i) => {
        el.insertAdjacentHTML("beforeend", `
            <option class = "option" value = "${i}">${tz.relativeToGMT} (${tz.decsription})</option>
        `)
    })
}
renderHTML(options)


const timestampToHumanReadable = timestamp => {
 
        const daysOfMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
 
        let currentYear, daysTillNow, extraTime, hours, minutes, seconds,
            extraDays, i, day, month, flag = 0;
 
        // Calculate total days unix time
        daysTillNow = parseInt(timestamp / (24 * 60 * 60), 10);
        extraTime = timestamp % (24 * 60 * 60);
        currentYear = 1970;
 
        // Calculating current year
        while (daysTillNow >= 365)
        {
            if (currentYear % 400 == 0 ||
               (currentYear % 4 == 0 &&
                currentYear % 100 != 0))
            {
                daysTillNow -= 366;
            }
            else
            {
                daysTillNow -= 365;
            }
            currentYear += 1;
        }
 
        // Updating extradays because it
        // will give days till previous day
        // and we have include current day
        extraDays = daysTillNow + 1;
 
        if (currentYear % 400 == 0 ||
           (currentYear % 4 == 0 &&
            currentYear % 100 != 0))
            flag = 1;
 
        // Calculating month and date
        month = 0; i = 0;
        if (flag === 1)
        {
            while (true)
            {
                if (i === 1)
                {
                    if (extraDays - 29 < 0) break;
                    month += 1;
                    extraDays -= 29;
                }
                else
                {
                    if (extraDays - daysOfMonth[i] < 0) break;
                    month += 1;
                    extraDays -= daysOfMonth[i];
                }
                i += 1;
            }
        }
        else
        {
            while (true)
            {
                if (extraDays - daysOfMonth[i] < 0) break;
                month += 1;
                extraDays -= daysOfMonth[i];
                i += 1;
            }
        }
 
        // Current Month
        if (extraDays > 0) {
            month += 1;
            day = extraDays;
        }
        else month === 2 && flag === 1 ? day = 29 : day = daysOfMonth[month - 1]
 
       timezones.forEach((tz, i) => {
            if(+options.value === i) {
                const time = tz.time.split(".")
                hours = parseInt(extraTime / 3600, 10) + +time[0];
                minutes = parseInt((extraTime % 3600) / 60, 10) + +`${time.includes(time[1]) ? time[1] : ""}`;
                seconds = parseInt((extraTime % 3600) % 60, 10);

                if(hours > 23) hours = time[0]
                if(minutes > 60) minutes = +minutes - 60
            }
       })
        return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${currentYear} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

const checkValid = (t) => {
    return /[a-zA-Z]/g.test(t)
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    humanTime.innerHTML = ""
    humanTime.insertAdjacentHTML("beforeend", `
        ${!checkValid(timestamp.value) ? `
            <div class = "display-timestamp">
                <h2 class="display-option">
                    ${options.options[options.selectedIndex].text}
                </h2>
                <h1>${timestampToHumanReadable(timestamp.value)}</h1>
            </div>
        ` : `<div class = "display-error">
                <img src="./error.svg"/>
                <h1>Your input does NOT match the rule. Should be numbers!</h1>
            </div>`}
    `)
  
    timestamp.value = ""
})

const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnCloseModal = document.querySelector(".close-modal");
const btnShowModal = document.querySelector(".calculate")

const openModal = () => {
    modal.classList.remove("hidden") // modal.style.display = "block"
    overlay.classList.remove("hidden")
}
const closeModal = () => {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}
btnShowModal.addEventListener("click", openModal)
btnCloseModal.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)

document.addEventListener("keypress", (e) => {
    if(e.key === "Escape" && !modal.classList.contains("hidden")) 
        closeModal()
})