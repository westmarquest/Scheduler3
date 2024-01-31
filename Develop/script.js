jQuery(function ($) {
  // Display current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Load saved events from localStorage
  loadEvents();

  // Apply past, present, or future class to each time block initially
  applyTimeBlockStyles();

  // Set up an interval to update styles every minute (adjust as needed)
  setInterval(function () {
    console.log("Updating styles...");
    applyTimeBlockStyles();
  }, 60000);

  // Click event listener for the save button
  $(".saveBtn").on("click", function () {
    // Get the parent time-block id
    const timeBlockId = $(this).parent().attr("id");

    // Get the description value from the textarea
    const description = $(this).siblings(".description").val().trim();

    // Save the event to localStorage using the timeBlockId as the key
    localStorage.setItem(timeBlockId, description);
  });

  // Function to load events from localStorage and set textarea values
  function loadEvents() {
    $(".time-block").each(function () {
      const timeBlockId = $(this).attr("id");
      const savedEvent = localStorage.getItem(timeBlockId);
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  // Function to apply past, present, or future class to each time block
  function applyTimeBlockStyles() {
    const currentHour = dayjs().hour();

    $(".time-block").each(function () {
      // Extract the hour from the element's ID
      const hour = parseInt($(this).attr("id").split("-")[1]);

      // Check if the hour is valid
      if (!isNaN(hour)) {
        // Remove all classes
        $(this).removeClass("past present future");

        // Apply the appropriate class based on the comparison with the current hour
        if (hour < currentHour) {
          $(this).addClass("past");
        } else if (hour === currentHour) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }

        // Apply styles to the description textarea
        const descriptionTextarea = $(this).find(".description");
        descriptionTextarea.removeClass("past present future");
        descriptionTextarea.addClass($(this).attr("class"));
      }
    });
  }
});
