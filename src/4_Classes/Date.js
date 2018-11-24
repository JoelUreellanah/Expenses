class DateClass {
  constructor(date) {
    this.date = date;
  }

  setTime(hours, minutes) {
    this.date.setHours(hours);
    this.date.setMinutes(minutes);
  }

  getDate() {
    return this.date.toString();
  }

  getTime() {
    return this.date.toString();
  }

  getHour(date) {
    var hours = date.getHours();
    return hours;
  }

  getMins(date) {
    var mins = date.getMinutes();
    return mins;
  }

  formatDate(date) {
    const date1 = new Date(date);

    const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const MONTH = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jun",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Dicember"
    ];

    const day = DAY[date1.getDay()];

    let month;
    if (date1.getMonth() < 6) {
      month = MONTH[date1.getMonth()];
    } else {
      month = MONTH[date1.getMonth() + 1];
    }

    let dayDate = "";
    if (date1.getDate() == 1) {
      dayDate = "st";
    } else if (date1.getDate() == 2) {
      dayDate = "nd";
    } else if (date1.getDate() == 3) {
      dayDate = "rd";
    } else {
      dayDate = "th";
    }
    return day + " - " + date1.getDate() + dayDate + " " + month;
  }

  formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours + ":" + minutes;
  }

  async joinDateAndTime(date, hours, mins) {
    const newDate = new Date(date);

    if (hours === null || mins === null) {
      newDate.setHours("12");
      newDate.setMinutes("00");
    } else {
      newDate.setHours(hours);
      newDate.setMinutes(mins);
    }

    // console.warn(newDate);
    return newDate.toString();
  }

  calculateDifferenceInDate(date) {
    const dueDate = new Date(date);
    const currentDate = new Date();

    var DateDiff = {
      inHours: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (60 * 60 * 1000));
      },

      inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
      },

      inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
      },

      inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return d2M + 12 * d2Y - (d1M + 12 * d1Y);
      },

      inYears: function(d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
      }
    };

    const remainingHours = DateDiff.inHours(currentDate, dueDate);

    const remainingDays = DateDiff.inDays(currentDate, dueDate);
    const result = currentDate.getDay() + remainingDays;
    console.log("result: " + result + " remaining days: " + remainingDays);

    const hour = dueDate.getHours();
    const currentHour = currentDate.getHours();
    console.log(hour + " " + currentHour + " = " + remainingHours);

    var dateToString;

    if (result < 7) {
      if (remainingDays == 0) {
        if (
          currentHour + remainingHours < 25 &&
          currentHour + remainingHours >= currentHour
        ) {
          dateToString = "Today";
        } else if (
          currentHour + remainingHours < 25 &&
          currentHour + remainingHours <= currentHour
        ) {
          dateToString = "early today";
        } else {
          dateToString = "Tomorrow";
        }
      } else if (remainingDays == 1) {
        dateToString = "Tomorrow";
      } else {
        dateToString = "This week";
      }
    } else if (result > 6 && result < 15) {
      dateToString = "Next week";
    } else if (result > 14) {
      dateToString = "This month";
    }

    return dateToString;
  }
}

export default DateClass;
