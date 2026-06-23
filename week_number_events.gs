/* Run on script.google.com */

function main() {
  const  year = 2025
  const firstDayOfYear = new Date("01-01-" + year.toString())
  console.log(firstDayOfYear)
  const firstDayOfYearDay = firstDayOfYear.getDay()
  console.log(firstDayOfYearDay)
  // now I want to go back to the first day of the week
  const diffToMonday = firstDayOfYear.getDate() - firstDayOfYearDay + 1
  // set firstDayOfYear as the first day of the first week of the year.
  // This is the first day that should have the weekly event.
  let firstDate = new Date(firstDayOfYear)
  firstDate.setDate(diffToMonday)
  console.log("First date to create an event for: " + firstDate)

  let thisMonday = new Date(firstDate)

  const eventTime = 7 //7:00am
  const daysInWeek = 7
  // set event time start as 7am EST
  thisMonday.setHours(eventTime)
  for (let week = 1; thisMonday.getFullYear() < year + 1; week++) {
    // set event end time as 8am (one hour long event)
    var endTime = new Date(thisMonday.getTime() + 60*60*1000)
    console.log("Creating calendar event <Week " + week + "> on: " + thisMonday + ", ending at: ", endTime)
    createEvent(week, thisMonday, endTime)
    thisMonday.setDate(thisMonday.getDate() + daysInWeek)
    // need sleep to not get rate limited
    Utilities.sleep(5000);
  }
}


function createEvent(week, startDate, endTime) {
  var eventName = "Week " + week.toString();

  var event = CalendarApp.getDefaultCalendar().createEvent(
    eventName,
    startDate,
    endTime
  );
}

