$(document).ready(function () {
  // Display current day using dayjs
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Function to color-code time blocks based on current time
  function updateHourlyBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("data-hour"));

      if (blockHour < currentHour) {
        $(this).removeClass("future present").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Function to load events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("data-hour");
      var storedEvent = localStorage.getItem(blockHour);

      if (storedEvent !== null) {
        $(this).find("textarea").val(storedEvent);
      }
    });
  }

  // Function to dynamically generate time blocks
  function generateTimeBlocks() {
    var container = $(".container");

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $('<div class="row time-block">');
      timeBlock.attr("data-hour", hour);

      // Convert 24-hour format to 12-hour format with AM/PM
      var formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      var amPm = hour < 12 ? "AM" : "PM";

      var hourDiv = $('<div class="hour col-md-1">').text(
        formattedHour + " " + amPm
      );
      var textarea = $("<textarea class='col-md-10'>");
      var saveBtn = $('<button class="saveBtn col-md-1">Save</button>');

      timeBlock.append(hourDiv, textarea, saveBtn);
      container.append(timeBlock);
    }
  }

  // Event listener for saving events to local storage
  $(".container").on("click", ".saveBtn", function () {
    var hour = $(this).parent().attr("data-hour");
    var eventText = $(this).siblings("textarea").val();

    localStorage.setItem(hour, eventText);
  });

  // Initial generation of time blocks and updating their colors
  generateTimeBlocks();
  updateHourlyBlocks();
  loadEvents();

  // Update colors every minute
  setInterval(updateHourlyBlocks, 60000);
});
