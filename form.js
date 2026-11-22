// document.getElementById('placeholder') finds the HTML element with id="placeholder"
//const: will not reassign these variables later
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const commentsInput = document.getElementById('comments');
const errorArea = document.getElementById('error-area');
const infoArea = document.getElementById('info-area');
const edited = {};
const form_errors = [];
const form = document.querySelector('form');

function getNameMessage(field) {
  if (field.validity.valueMissing) {
    return 'Name: Please enter your name.';
  }
  return '';
}

function getEmailMessage(field) {
  if (field.validity.valueMissing) {
    return 'Email: Please enter your email.';
  }
  if (field.validity.typeMismatch) {
    return 'Email: Please enter a valid email address. Example: name@example.com';
  }
  return '';
}

function getCommentsMessage(field) {
  if (field.validity.valueMissing) {
    return 'Comments: Please enter your comments.';
  }
  if (field.validity.tooShort) {
    return 'Comments: The comment is below the minimum length. Please enter at least ' + field.minLength + ' characters.';
  }
  return '';
}

//field: the input, message: the text that will show depending on error/no error
function showError(field, message) {
  const errorId = field.id + '-error';
  const hintId = field.id + '-hint';

  //display the error message in the appropriate error area
  document.getElementById(errorId).textContent = message;

  //tells screen readers to read hint & error if there is an error, hint only otherwise
  if (message) {
    field.setAttribute('aria-describedby', hintId + ' ' + errorId);
  } else {
    field.setAttribute('aria-describedby', hintId);
  }
}

//validate the field and display any error message
function validateField(field, getMessage) {
  field.setCustomValidity('');
  const message = getMessage(field);
  field.setCustomValidity(message);
  showError(field, message);
  return message;   //gives the message back to whoever called this function
}

//set up event listeners for a form field
function setUpField(field, getMessage) {
  //invalid fires when finds an invalid field
  field.addEventListener('invalid', function () {
    const message = validateField(field, getMessage);

    if (message !== '') {
      form_errors.push({
        field: field.id,
        error: message
      });
    }
  });

  //input fires when the user types/deletes in the field
  field.addEventListener('input', function () {
    edited[field.id] = true;
    //only refresh if an error is already showing
    if (document.getElementById(field.id + '-error').textContent !== '') {
      validateField(field, getMessage);
    }
  });

  //blur fires when the user leaves the field
  field.addEventListener('blur', function () {
    if (edited[field.id] === true) {
      validateField(field, getMessage);
    }
  });
}

setUpField(nameInput, getNameMessage);
setUpField(emailInput, getEmailMessage);
setUpField(commentsInput, getCommentsMessage);

form.addEventListener('submit', function () {
  // JSON.stringify turns the array into text
  document.getElementById('form-errors').value = JSON.stringify(form_errors);
});

//if javascript is off, these areas will remain hidden
errorArea.hidden = false;
infoArea.hidden = false;

// ===== CHARACTER COUNT =====
const commentsInfo = document.getElementById('comments-info');
const characterLimit = commentsInput.maxLength;
const warningThreshold = 100;

function updateCount() {
  // .length is how many characters are in the box right now
  const remaining = characterLimit - commentsInput.value.length;

  if (remaining === 0) {
    //message for reaching the limit
    commentsInfo.textContent = 'The character limit has been reached.';
    commentsInfo.className = 'count-limit';

  } else if (remaining <= warningThreshold) {
    //near the limit
    commentsInfo.textContent = 'You are close to the character limit. ' + remaining + ' characters remaining.';
    commentsInfo.className = 'count-warning';

  } else {
    //shows count only
    commentsInfo.textContent = remaining + ' characters remaining';
    commentsInfo.className = '';
  }
}

//fires when user types/deletes in the field
commentsInput.addEventListener('input', updateCount);

//initially update the count when the page loads
updateCount();
