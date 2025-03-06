document.addEventListener("DOMContentLoaded", function () {
  // Reference to the date input field
  const currentDateField = document.getElementById("userInputDateCurrentTime");

  // Get today's date
  let today = new Date();
  let day = String(today.getDate()).padStart(2, "0"); // Get day with leading zero
  let month = String(today.getMonth() + 1).padStart(2, "0"); // Get month (January = 0)
  let year = today.getFullYear();

  // Format date as DD-MM-YYYY
  let formattedDate = `${day}-${month}-${year}`;

  // Set today's date in the input field
  currentDateField.value = formattedDate;

  // Make the field read-only
  currentDateField.setAttribute("readonly", true);
});

//Sample Time
document.addEventListener("DOMContentLoaded", function () {
  const userInputSampleTime = document.getElementById("userInputSampleTime");
  const timePicker = document.getElementById("timePicker");
  const timeDropdownContainer = document.querySelector(
    ".time-dropdown-container"
  );

  // Force 24-hour format in all browsers
  timePicker.setAttribute("step", "1"); // Allow seconds selection
  timePicker.setAttribute("value", "00:00:00"); // Default to 24-hour format

  // Ensure 24-hour format is displayed
  function enforce24HourFormat() {
    let selectedTime = timePicker.value;
    if (selectedTime) {
      let timeParts = selectedTime.split(":");
      let hours = parseInt(timeParts[0], 10);
      let minutes = timeParts[1];
      let seconds = timeParts[2] || "00";

      // Ensure 24-hour format
      hours = hours < 10 ? "0" + hours : hours;

      userInputSampleTime.value = `${hours}:${minutes}:${seconds}`;
    }
  }

  // Show time picker when input field is clicked
  userInputSampleTime.addEventListener("click", function () {
    timeDropdownContainer.style.display = "block"; // Show time picker
    timePicker.focus();
  });

  // Update input field with selected time in 24-hour format
  timePicker.addEventListener("input", function () {
    enforce24HourFormat();
    timeDropdownContainer.style.display = "none"; // Hide dropdown after selection
  });

  // Hide time picker when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userInputSampleTime.contains(event.target) &&
      !timePicker.contains(event.target)
    ) {
      timeDropdownContainer.style.display = "none"; // Hide dropdown
    }
  });
});

// Sample date
document.addEventListener("DOMContentLoaded", function () {
  const userInputSampleDate = document.getElementById("userInputSampleDate");
  const datePicker = document.getElementById("datePicker");
  const dateDropdownContainer = document.querySelector(
    ".date-dropdown-container"
  );

  // Show date picker when input field is clicked
  userInputSampleDate.addEventListener("click", function () {
    dateDropdownContainer.style.display = "block"; // Show date picker
    datePicker.focus();
  });

  // Convert YYYY-MM-DD to DD-MM-YYYY format
  function formatDate(dateString) {
    let [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  // Update input field with selected date in DD-MM-YYYY format
  datePicker.addEventListener("input", function () {
    userInputSampleDate.value = formatDate(this.value); // Set formatted date
    dateDropdownContainer.style.display = "none"; // Hide dropdown after selection
  });

  // Hide date picker when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userInputSampleDate.contains(event.target) &&
      !datePicker.contains(event.target)
    ) {
      dateDropdownContainer.style.display = "none"; // Hide dropdown
    }
  });
});

//Dropdown List for Equipment Type
document.addEventListener("DOMContentLoaded", function () {
  const userInputEquipmentType = document.getElementById(
    "userInputEquipmentType"
  );
  const equipmentDropdown = document.getElementById("equipmentDropdown");
  const dropdownContainer = document.querySelector(".dropdown-container");

  // Show dropdown when input field is clicked
  userInputEquipmentType.addEventListener("click", function () {
    dropdownContainer.style.display = "block"; // Show dropdown
    equipmentDropdown.focus(); // Focus on the dropdown
  });

  // Update input field when a selection is made
  equipmentDropdown.addEventListener("change", function () {
    userInputEquipmentType.value = this.value; // Update input value
    dropdownContainer.style.display = "none"; // Hide dropdown after selection
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userInputEquipmentType.contains(event.target) &&
      !equipmentDropdown.contains(event.target)
    ) {
      dropdownContainer.style.display = "none"; // Hide dropdown
    }
  });
});

// Dropdown List for Equipment
document.addEventListener("DOMContentLoaded", function () {
  const userInputEquipmentType = document.getElementById(
    "userInputEquipmentType"
  );
  const equipmentTypeDropdown = document.getElementById("equipmentDropdown");
  const dropdownContainerType = document.querySelector(".dropdown-container");

  const userInputEquipment = document.getElementById("userInputEquipment");
  const equipmentDropdown = document.getElementById("equipmentDropdown-42-44");
  const dropdownContainerEquipment = document.querySelector(
    ".dropdown-container-42-44"
  );

  // Show Equipment Type Dropdown when input field is clicked
  userInputEquipmentType.addEventListener("click", function () {
    dropdownContainerType.style.display = "block"; // Show dropdown
    equipmentTypeDropdown.focus(); // Focus on the dropdown
  });

  // Update Equipment Type Input when a selection is made
  equipmentTypeDropdown.addEventListener("change", function () {
    userInputEquipmentType.value = this.value; // Update input field
    dropdownContainerType.style.display = "none"; // Hide dropdown
    filterEquipmentByType(); // Update Equipment dropdown based on selection
  });

  // Hide Equipment Type Dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userInputEquipmentType.contains(event.target) &&
      !equipmentTypeDropdown.contains(event.target)
    ) {
      dropdownContainerType.style.display = "none"; // Hide dropdown
    }
  });

  // Show Equipment Dropdown when input field is clicked
  userInputEquipment.addEventListener("click", function () {
    if (userInputEquipmentType.value === "") {
      alert("Kindly select Equipment Type First."); // Show pop-up message
    } else {
      dropdownContainerEquipment.style.display = "block"; // Show dropdown
      equipmentDropdown.focus(); // Focus on the dropdown
    }
  });

  // Update Equipment Input when a selection is made
  equipmentDropdown.addEventListener("change", function () {
    userInputEquipment.value = this.value; // Update input field
    dropdownContainerEquipment.style.display = "none"; // Hide dropdown
  });

  // Hide Equipment Dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userInputEquipment.contains(event.target) &&
      !equipmentDropdown.contains(event.target)
    ) {
      dropdownContainerEquipment.style.display = "none"; // Hide dropdown
    }
  });

  // Function to filter Equipment based on selected Equipment Type
  function filterEquipmentByType() {
    const selectedType = userInputEquipmentType.value;
    const options = equipmentDropdown.options;

    // Show or hide options based on selected Equipment Type
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      if (
        (selectedType === "Transformer" && option.classList.contains("GT")) ||
        (selectedType === "Reactor" && option.classList.contains("REACTOR"))
      ) {
        option.style.display = "block"; // Show matching options
      } else {
        option.style.display = "none"; // Hide non-matching options
      }
    }
  }
});

// Dropdown List for Location
document.addEventListener("DOMContentLoaded", function () {
  const userInputEquipmentType = document.getElementById(
    "userInputEquipmentType"
  );
  const equipmentTypeDropdown = document.getElementById("equipmentDropdown");
  const dropdownContainerType = document.querySelector(".dropdown-container");

  const userInputEquipment = document.getElementById("userInputLocation");
  const equipmentDropdown = document.getElementById("equipmentDropdown-42-46");
  const dropdownContainerEquipment = document.querySelector(
    ".dropdown-container-42-46"
  );

  // Show Equipment Type Dropdown when input field is clicked
  userInputEquipmentType.addEventListener("click", function () {
    dropdownContainerType.style.display = "block"; // Show dropdown
    equipmentTypeDropdown.focus(); // Focus on the dropdown
  });

  // Update Equipment Type Input when a selection is made
  equipmentTypeDropdown.addEventListener("change", function () {
    userInputEquipmentType.value = this.value; // Update input field
    dropdownContainerType.style.display = "none"; // Hide dropdown
    filterEquipmentByType(); // Update Equipment dropdown based on selection
  });

  // Hide Equipment Type Dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userInputEquipmentType.contains(event.target) &&
      !equipmentTypeDropdown.contains(event.target)
    ) {
      dropdownContainerType.style.display = "none"; // Hide dropdown
    }
  });

  // Show Equipment Dropdown when input field is clicked
  userInputEquipment.addEventListener("click", function () {
    if (userInputEquipmentType.value === "") {
      alert("Kindly select Equipment Type First."); // Show pop-up message
    } else {
      dropdownContainerEquipment.style.display = "block"; // Show dropdown
      equipmentDropdown.focus(); // Focus on the dropdown
    }
  });

  // Update Equipment Input when a selection is made
  equipmentDropdown.addEventListener("change", function () {
    userInputEquipment.value = this.value; // Update input field
    dropdownContainerEquipment.style.display = "none"; // Hide dropdown
  });

  // Hide Equipment Dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userInputEquipment.contains(event.target) &&
      !equipmentDropdown.contains(event.target)
    ) {
      dropdownContainerEquipment.style.display = "none"; // Hide dropdown
    }
  });

  // Function to filter Equipment based on selected Equipment Type
  function filterEquipmentByType() {
    const selectedType = userInputEquipmentType.value;
    const options = equipmentDropdown.options;

    // Show or hide options based on selected Equipment Type
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      if (
        (selectedType === "Transformer" && option.classList.contains("Unit")) ||
        (selectedType === "Reactor" && option.classList.contains("Switchyard"))
      ) {
        option.style.display = "block"; // Show matching options
      } else {
        option.style.display = "none"; // Hide non-matching options
      }
    }
  }
});

//Equipment Id.

//Dropdown List for Equipment Type
/*document.addEventListener("DOMContentLoaded", function () {
    const userInputEquipmentType = document.getElementById("userInputEquipmentId");
    const equipmentDropdown = document.getElementById("equipmentDropdown-42-62");
    const dropdownContainer = document.querySelector(".dropdown-container-42-62");

    // Show dropdown when input field is clicked
    userInputEquipmentType.addEventListener("click", function () {
        dropdownContainer.style.display = "block"; // Show dropdown
        equipmentDropdown.focus(); // Focus on the dropdown
    });

    // Update input field when a selection is made
    equipmentDropdown.addEventListener("change", function () {
        userInputEquipmentType.value = this.value; // Update input value
        dropdownContainer.style.display = "none"; // Hide dropdown after selection
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!userInputEquipmentType.contains(event.target) && !equipmentDropdown.contains(event.target)) {
            dropdownContainer.style.display = "none"; // Hide dropdown
        }
    });
});*/

//Dropdown List for Sample Location
document.addEventListener("DOMContentLoaded", function () {
  const userInputEquipmentType = document.getElementById("sampleLocation");
  const equipmentDropdown = document.getElementById("equipmentDropdown-42-64");
  const dropdownContainer = document.querySelector(".dropdown-container-42-64");

  // Show dropdown when input field is clicked
  userInputEquipmentType.addEventListener("click", function () {
    dropdownContainer.style.display = "block"; // Show dropdown
    equipmentDropdown.focus(); // Focus on the dropdown
  });

  // Update input field when a selection is made
  equipmentDropdown.addEventListener("change", function () {
    userInputEquipmentType.value = this.value; // Update input value
    dropdownContainer.style.display = "none"; // Hide dropdown after selection
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userInputEquipmentType.contains(event.target) &&
      !equipmentDropdown.contains(event.target)
    ) {
      dropdownContainer.style.display = "none"; // Hide dropdown
    }
  });
});

//Dropdown List for Sample Location
document.addEventListener("DOMContentLoaded", function () {
  const userInputEquipmentType = document.getElementById("testedBy");
  const equipmentDropdown = document.getElementById("equipmentDropdown-42-66");
  const dropdownContainer = document.querySelector(".dropdown-container-42-66");

  // Show dropdown when input field is clicked
  userInputEquipmentType.addEventListener("click", function () {
    dropdownContainer.style.display = "block"; // Show dropdown
    equipmentDropdown.focus(); // Focus on the dropdown
  });

  // Update input field when a selection is made
  equipmentDropdown.addEventListener("change", function () {
    userInputEquipmentType.value = this.value; // Update input value
    dropdownContainer.style.display = "none"; // Hide dropdown after selection
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userInputEquipmentType.contains(event.target) &&
      !equipmentDropdown.contains(event.target)
    ) {
      dropdownContainer.style.display = "none"; // Hide dropdown
    }
  });
});

//Validation for Gas Input
document.addEventListener("DOMContentLoaded", function () {
  // List of gas input field IDs
  const gasInputFields = [
    "Oxygen",
    "Hydrogen",
    "Nitrogen",
    "Methane",
    "Ethylene",
    "Acetylene",
    "Ethane",
    "CarbonMonoxide",
    "CarbonDioxide",
  ];

  // Function to validate real number ≥ 0
  function validateGasInput(event) {
    let inputField = event.target;
    let value = inputField.value.trim();
    let errorMessageId = inputField.id + "-error";
    let errorMessage = document.getElementById(errorMessageId);

    // Regular expression to match real numbers ≥ 0
    let realNumberPattern = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;

    if (!realNumberPattern.test(value)) {
      // Display error message
      if (!errorMessage) {
        errorMessage = document.createElement("div");
        errorMessage.id = errorMessageId;
        errorMessage.className = "error-message";
        inputField.parentNode.appendChild(errorMessage);
      }
      errorMessage.textContent = `${inputField.id} must be a real number greater than or equal to zero.`;
      inputField.classList.add("input-error");
    } else {
      // Remove error message if valid
      if (errorMessage) {
        errorMessage.remove();
      }
      inputField.classList.remove("input-error");
    }
  }

  // Attach validation event listener to each gas input field
  gasInputFields.forEach((fieldId) => {
    let inputElement = document.getElementById(fieldId);
    if (inputElement) {
      inputElement.addEventListener("input", validateGasInput);
    }
  });
});

//Sample & Current Date validation
document.addEventListener("DOMContentLoaded", function () {
  // Reference to input fields
  const currentDateField = document.getElementById("userInputDateCurrentTime");
  const datePicker = document.getElementById("datePicker"); // Date Picker
  const sampleDateField = document.getElementById("userInputSampleDate");

  // Function to get today's date in DD-MM-YYYY format
  function getFormattedToday() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, "0");
    let month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    let year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Auto-fill the current date field in DD-MM-YYYY format and make it readonly
  currentDateField.value = getFormattedToday();
  currentDateField.setAttribute("readonly", true);

  // Function to convert YYYY-MM-DD (from date picker) to DD-MM-YYYY
  function convertDatePickerFormat(dateString) {
    let [year, month, day] = dateString.split("-").map(Number);
    return `${String(day).padStart(
      2,
      "0"
    )}-${String(month).padStart(2, "0")}-${year}`;
  }

  // Function to convert DD-MM-YYYY to a JavaScript Date object
  function parseDate(dateString) {
    let [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Month is zero-based
  }

  // Function to validate the Sample Date
  function validateSampleDate() {
    let sampleDateValue = datePicker.value.trim(); // Get value from Date Picker
    let todayDate = parseDate(getFormattedToday());

    // If input is empty, don't show an error
    if (!sampleDateValue) return;

    // Convert YYYY-MM-DD to DD-MM-YYYY for display
    let formattedSampleDate = convertDatePickerFormat(sampleDateValue);
    sampleDateField.value = formattedSampleDate; // Update input field with selected date

    let sampleDate = parseDate(formattedSampleDate); // Convert to Date object

    // Reference for error message
    let errorMessageId = "sample-date-validation-error";
    let errorMessage = document.getElementById(errorMessageId);

    // If Sample Date is after Today’s Date, show error
    if (sampleDate > todayDate) {
      if (!errorMessage) {
        errorMessage = document.createElement("div");
        errorMessage.id = errorMessageId;
        errorMessage.className = "error-message";
        sampleDateField.parentNode.appendChild(errorMessage);
      }
      errorMessage.textContent =
        "❌ Invalid Entry: Sample Date cannot be after today's date.";
      sampleDateField.classList.add("input-error");
    } else {
      // Remove error message if valid
      if (errorMessage) {
        errorMessage.remove();
      }
      sampleDateField.classList.remove("input-error");
    }
  }

  // Attach validation event listener to Date Picker field
  datePicker.addEventListener("change", validateSampleDate);
});

//Dynamic Update of Equipmet Id
document.addEventListener("DOMContentLoaded", function () {
  function updateEquipmentId() {
    let equipmentType = document
      .getElementById("userInputEquipmentType")
      .value.trim();
    let equipment = document.getElementById("userInputEquipment").value.trim();
    let location = document.getElementById("userInputLocation").value.trim();

    let equipmentId = ""; // Default empty value

    // Define rules for Equipment ID generation
    //UNIT-10 GT
    if (
      equipmentType === "Transformer" &&
      equipment === "GT-R Phase" &&
      location === "Unit-10"
    ) {
      equipmentId = "10-T-R";
    }
    // Add more conditions here for different mappings
    else if (
      equipmentType === "Transformer" &&
      equipment === "GT-Y Phase" &&
      location === "Unit-10"
    ) {
      equipmentId = "10-T-Y";
    } else if (
      equipmentType === "Transformer" &&
      equipment === "GT-B Phase" &&
      location === "Unit-10"
    ) {
      equipmentId = "10-T-B";
    }

    //UNIT-20 GT
    else if (
      equipmentType === "Transformer" &&
      equipment === "GT-R Phase" &&
      location === "Unit-20"
    ) {
      equipmentId = "20-T-R";
    }
    // Add more conditions here for different mappings
    else if (
      equipmentType === "Transformer" &&
      equipment === "GT-Y Phase" &&
      location === "Unit-20"
    ) {
      equipmentId = "20-T-Y";
    } else if (
      equipmentType === "Transformer" &&
      equipment === "GT-B Phase" &&
      location === "Unit-20"
    ) {
      equipmentId = "20-T-B";
    }

    //UNIT-30 GT
    else if (
      equipmentType === "Transformer" &&
      equipment === "GT-R Phase" &&
      location === "Unit-30"
    ) {
      equipmentId = "30-T-R";
    }
    // Add more conditions here for different mappings
    else if (
      equipmentType === "Transformer" &&
      equipment === "GT-Y Phase" &&
      location === "Unit-30"
    ) {
      equipmentId = "30-T-Y";
    } else if (
      equipmentType === "Transformer" &&
      equipment === "GT-B Phase" &&
      location === "Unit-30"
    ) {
      equipmentId = "30-T-B";
    }
    //UNIT-40 GT
    else if (
      equipmentType === "Transformer" &&
      equipment === "GT-R Phase" &&
      location === "Unit-40"
    ) {
      equipmentId = "40-T-R";
    }
    // Add more conditions here for different mappings
    else if (
      equipmentType === "Transformer" &&
      equipment === "GT-Y Phase" &&
      location === "Unit-40"
    ) {
      equipmentId = "40-T-Y";
    } else if (
      equipmentType === "Transformer" &&
      equipment === "GT-B Phase" &&
      location === "Unit-40"
    ) {
      equipmentId = "40-T-B";
    }

    //UNIT-50 GT
    else if (
      equipmentType === "Transformer" &&
      equipment === "GT-R Phase" &&
      location === "Unit-50"
    ) {
      equipmentId = "50-T-R";
    }
    // Add more conditions here for different mappings
    else if (
      equipmentType === "Transformer" &&
      equipment === "GT-Y Phase" &&
      location === "Unit-50"
    ) {
      equipmentId = "50-T-Y";
    } else if (
      equipmentType === "Transformer" &&
      equipment === "GT-B Phase" &&
      location === "Unit-50"
    ) {
      equipmentId = "50-T-B";
    }

    //Switchyard Reactor
    else if (
      equipmentType === "Reactor" &&
      equipment === "Bus-Reactor" &&
      location === "Switchyard"
    ) {
      equipmentId = "S-R-Bus";
    }
    // Add more conditions here for different mappings
    else if (
      equipmentType === "Reactor" &&
      equipment === "Bachau-1 Reactor" &&
      location === "Switchyard"
    ) {
      equipmentId = "S-R-Bachau1";
    } else if (
      equipmentType === "Reactor" &&
      equipment === "Bachau-2 Reactor" &&
      location === "Switchyard"
    ) {
      equipmentId = "S-R-Bachau2";
    } else if (
      equipmentType === "Reactor" &&
      equipment === "Bachau-3 Reactor" &&
      location === "Switchyard"
    ) {
      equipmentId = "S-R-Bachau3";
    } else if (
      equipmentType === "Reactor" &&
      equipment === "Bachau-4 Reactor" &&
      location === "Switchyard"
    ) {
      equipmentId = "S-R-Bachau4";
    }
    // Update Equipment ID field
    document.getElementById("userInputEquipmentId").value = equipmentId;
  }

  // Function to update input fields when a dropdown selection is made
  function setupDropdown(dropdownId, inputId) {
    let dropdown = document.getElementById(dropdownId);
    let inputField = document.getElementById(inputId);

    dropdown.addEventListener("change", function () {
      inputField.value = dropdown.value; // Set input field value from dropdown
      updateEquipmentId(); // Call function to update Equipment ID dynamically
    });
  }

  // Set up dropdowns to update input fields and trigger Equipment ID update
  setupDropdown("equipmentDropdown", "userInputEquipmentType");
  setupDropdown("equipmentDropdown-42-44", "userInputEquipment");
  setupDropdown("equipmentDropdown-42-46", "userInputLocation");

  // Add event listeners to text inputs (in case user types manually)
  document
    .getElementById("userInputEquipmentType")
    .addEventListener("input", updateEquipmentId);
  document
    .getElementById("userInputEquipment")
    .addEventListener("input", updateEquipmentId);
  document
    .getElementById("userInputLocation")
    .addEventListener("input", updateEquipmentId);
});

//Validation for Each & Every Input Field
document.addEventListener("DOMContentLoaded", function () {
  function validateForm(event) {
    event.preventDefault(); // Prevent form submission if validation fails

    // Array of input fields with their corresponding labels
    const fields = [
      { id: "userInputDateCurrentTime", label: "Current Date" },
      { id: "userInputSampleTime", label: "Sample Time" },
      { id: "userInputSampleDate", label: "Sample Date" },
      { id: "userInputEquipmentType", label: "Equipment Type" },
      { id: "userInputEquipment", label: "Equipment" },
      { id: "userInputLocation", label: "Location" },
      { id: "userInputEquipmentId", label: "Equipment ID" },
      { id: "sampleLocation", label: "Sample Location" },
      { id: "testedBy", label: "Tested By" },
      { id: "Oxygen", label: "Oxygen (O₂)" },
      { id: "Hydrogen", label: "Hydrogen (H₂)" },
      { id: "Nitrogen", label: "Nitrogen (N₂)" },
      { id: "Methane", label: "Methane (CH₄)" },
      { id: "Ethylene", label: "Ethylene (C₂H₄)" },
      { id: "Acetylene", label: "Acetylene (C₂H₂)" },
      { id: "Ethane", label: "Ethane (C₂H₆)" },
      { id: "CarbonMonoxide", label: "Carbon Monoxide (CO)" },
      { id: "CarbonDioxide", label: "Carbon Dioxide (CO₂)" },
    ];

    let isValid = true;
    let firstEmptyField = null;
    let missingFields = [];

    // Loop through all fields to check if any are empty
    for (let field of fields) {
      let inputElement = document.getElementById(field.id);
      if (inputElement) {
        let value = inputElement.value.trim();
        if (value === "") {
          missingFields.push(`Please enter value for <b>${field.label}</b>`);
          if (!firstEmptyField) {
            firstEmptyField = inputElement; // Store the first empty field
          }
          isValid = false;
        }
      }
    }

    // Show validation modal if there are missing fields
    if (!isValid) {
      showValidationModal(missingFields.join("<br>"));
      if (firstEmptyField) {
        firstEmptyField.focus();
      }
    } else {
      showValidationModal("✅ Form submitted successfully!", true);
      //Redirect to the visualization page (Optional)
      window.location.href = "DuvalTriangleVisualization.html";
    }
  }

  // Function to show the modal pop-up
  function showValidationModal(message, success = false) {
    const modal = document.getElementById("validationModal");
    const modalMessage = document.getElementById("modalMessage");

    modalMessage.innerHTML = message;
    modal.style.display = "flex"; // Show the modal

    // Change modal color for success
    if (success) {
      modalMessage.style.color = "green";
    } else {
      modalMessage.style.color = "red";
    }
  }

  // Close the modal when clicking the close button
  document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("validationModal").style.display = "none";
  });

  // Attach validation to Submit button
  document
    .getElementById("submitButton")
    .addEventListener("click", validateForm);
});

//JS for Clear Button Functionality::
document.addEventListener("DOMContentLoaded", function () {
  function clearFormFields() {
    // Show confirmation modal
    showConfirmationModal("⚠️ Are you sure you want to clear all fields?");
  }

  function confirmClear(shouldClear) {
    // Hide confirmation modal after user selection
    document.getElementById("confirmationModal").style.display = "none";

    if (shouldClear) {
      // Array of all input field IDs to be cleared
      const fieldIds = [
        "userInputSampleTime",
        "userInputSampleDate",
        "userInputEquipmentType",
        "userInputEquipment",
        "userInputLocation",
        "userInputEquipmentId",
        "sampleLocation",
        "testedBy",
        "Oxygen",
        "Hydrogen",
        "Nitrogen",
        "Methane",
        "Ethylene",
        "Acetylene",
        "Ethane",
        "CarbonMonoxide",
        "CarbonDioxide",
      ];

      // Loop through all field IDs and clear their values
      fieldIds.forEach((id) => {
        let inputElement = document.getElementById(id);
        if (inputElement) {
          inputElement.value = ""; // Clear field value
        }
      });

      // Show success confirmation
      showValidationModal("✅ All fields have been cleared!", true);
    }
  }

  // Function to show confirmation modal
  function showConfirmationModal(message) {
    const modal = document.getElementById("confirmationModal");
    const modalMessage = document.getElementById("confirmationMessage");

    modalMessage.innerHTML = message;
    modal.style.display = "flex"; // Show the modal
  }

  // Attach event listener to Clear Button
  document
    .getElementById("ClearButton")
    .addEventListener("click", clearFormFields);

  // Attach event listener to confirmation buttons
  document.getElementById("confirmYes").addEventListener("click", function () {
    confirmClear(true); // Clear fields and close modal
  });

  document.getElementById("confirmNo").addEventListener("click", function () {
    confirmClear(false); // Just close modal without clearing
  });
});

//Local storage to pass the value of Methane ,Ethylene & Acetylene into DuvalTriangleVisualization.js for visualization.
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("submitButton")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission if applicable

      // Get input values
      let methane = document.getElementById("Methane").value;
      let ethylene = document.getElementById("Ethylene").value;
      let acetylene = document.getElementById("Acetylene").value;

      // Store values in localStorage
      localStorage.setItem("MethanePPM", methane);
      localStorage.setItem("EthylenePPM", ethylene);
      localStorage.setItem("AcetylenePPM", acetylene);

      // Redirect to the visualization page (Optional)
      //window.location.href = "DuvalTriangleVisualization.html";
    });
});
