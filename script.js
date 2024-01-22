var pageNo = 1;
var items = [];
var pageMemory = [];

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

function populateSelect() {
    console.log('pageNo is now ' + pageNo);
    const selectElement = document.getElementById('mu-sl');
    const numberOfOptions = 10;

    // Clear the existing options
    selectElement.innerHTML = '';

    if (pageMemory[pageNo] === undefined) {
        console.log('Generating items for page ' + pageNo);
        pageMemory[pageNo] = [];

        for (let i = 0; i < numberOfOptions; i++) {
            const randomString = generateRandomString(7);
            const option = document.createElement('option');
            option.value = randomString;
            option.text = randomString;
            selectElement.appendChild(option);

            // Store the generated string in the pageMemory array
            pageMemory[pageNo].push(randomString);
        }
    } else {
        console.log('Using cached items for page ' + pageNo);

        // Populate select with cached items for the current page
        pageMemory[pageNo].forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.text = value;
            selectElement.appendChild(option);
        });
    }
}

  populateSelect();

  const selectElement = document.getElementById('mu-sl');
  const selectedValuesContainer = document.getElementById('selectedValues');
  let isMouseDown = false;

  selectElement.addEventListener('mousedown', function (event) {
    isMouseDown = true;
    handleSelectClick(event);
  });

  selectElement.addEventListener('mouseup', function () {
    isMouseDown = false;
  });

  selectElement.addEventListener('change', function () {
    if (!isMouseDown) {
      // Clear previous values
      selectedValuesContainer.innerHTML = '';

      // Display selected values in the sticky header
      const selectedValues = Array.from(this.selectedOptions).map(option => option.value);
      selectedValuesContainer.textContent = `Selected Values: ${selectedValues.join(', ')}`;
    }
  });

  function handleSelectClick(event) {
    if (isMouseDown) {
      event.preventDefault();
      const option = event.target;

      if (option.tagName === 'OPTION') {
        option.selected = !option.selected;
        
        var index = items.indexOf(option.value);
        if (index !== -1) {
        items.splice(index, 1);
        } else {
        items.push(option.value);
        }

        selectedValuesContainer.innerHTML = '';

        const selectedValues = Array.from(selectElement.selectedOptions).map(option => option.value);
        selectedValuesContainer.textContent = `Selected Values: ${selectedValues.join(', ')}`;
      }
    }
  }

  // buttons
 
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const pageIndice = document.getElementById('page-indice');
  prevButton.addEventListener('click', function() {
    if (pageNo > 1) {
      pageNo--;
      populateSelect()
      updatePageNumber();
    }
  });
  nextButton.addEventListener('click', function() {
    pageNo++;
    populateSelect()
    updatePageNumber();
  });
  function updatePageNumber() {
    pageIndice.textContent = pageNo;
    console.log(pageMemory);
  }
  updatePageNumber();
  console.log(pageMemory);

// delete button

const deleteButton = document.querySelector('.deleteBtn');

deleteButton.addEventListener('click', function() {
  const selectElement = document.getElementById('mu-sl');

  // Get the selected values without modifying the original options array
  const selectedValues = Array.from(selectElement.selectedOptions).map(option => option.value); 

  // Remove selected options from the select element
  Array.from(selectElement.options).forEach(option => {
    if (selectedValues.includes(option.value)) {
      option.remove();
    }
  }); 

  // Clear selected values container
  const selectedValuesContainer = document.getElementById('selectedValues');
  selectedValuesContainer.textContent = `Selected Values: ${selectedValues.join(', ')}`;
}); 