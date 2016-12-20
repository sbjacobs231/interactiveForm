/* ---------------------------- Page Load -------------------------*/
// Focus on first input
$('#name').focus();

/* ---------------------------- Job Role ------------------------------*/
// Selecting Job Role
$('#title').on('change', function() {
		// When you select 'other'
		if ($(this).val() == "other") {
			// Show input where you can type your job role
			$('#other-title').show();
		} else {
			// Leave the 'other' input tag hidden
			$('#other-title').hide();
		}
})

/* ---------------------------- T-Shirt Menu --------------------------*/
// Hide all the shirt color options until a design is selected
$('#color option').hide();
// Selecting shirt color
$('#design').on('change', function() {
	// Selecting js puns
	if ($(this).val() == "js puns") {
		// Show js puns options
		$('.js-puns').show();
		// Hide heart js options
		$('.js').hide();
		// Show default option
		$('#color').val("default");
	// Selecting heart js
	} else if ($(this).val() === "heart js") {
		// Show heart js options
		$('.js').show();
		// Hide js pun options
		$('.js-puns').hide();
		// Show default option
		$('#color').val("default");
	} else {
		// Hide all options
		$('#color option').hide();
		// Show default option
		$('#color').val("default");
	}
})

/* -------------------------- Register for Activities -------------------- */
// Input box for job role if option 'other' is selected
$('form fieldset').first().append('<input type="text" placeholder="Your job role" id="other-title" name="user_job">');
// Hide the above input tag until the 'other' value is selected for jobs
$('#other-title').hide();
// Cost of Conference, hide until checkboxes are clicked
$('.activities').append('<h4 id = "activitiesError"></h4>');
$('#activitiesError').hide();
// Cost of seminars
var totalCost = 0;
// Changing status of checkbox
$('.activity').on('change', function() {
	/*------- Cost Calculation --------*/
	// When checked
	if ($(this).prop('checked')==true) {
		// Add cost to total
		totalCost += parseInt($(this).val().split(',')[0]);
	// When unchecked
	} else if ($(this).prop('checked')==false) {
		// subtract cost
		totalCost -= parseInt($(this).val().split(',')[0]);
	}
	// When Cost is greater than 0 show cost
	if (totalCost > 0) {
		$('#activitiesError').html('Total: $' + totalCost);
		$('#activitiesError').show();
	// When cost is 0 hide h4 tag
	} else {
		$('#activitiesError').hide();
	}
	/* ----------- Time Contrast ---------- */
	// If conference is from 9-12pm on Tuesday
	if ($(this).val().split(',')[1] === "nineToTwelveTues") {
		// If conference is checked
		if ($(this).prop('checked') === true) {
			// Disable conflicting conferences
			$('[value=\"100,nineToTwelveTues\"]').prop('disabled', true);
			$('[value=\"100,nineToTwelveTues\"]').parent().css('color', 'gray');
			$(this).prop('disabled',false);
			$(this).parent().css('color', '#000');
		// If conference is unchecked
		} else {
			// Enable conflicting times
			$('[value=\"100,nineToTwelveTues\"]').prop('disabled', false);
			$('[value=\"100,nineToTwelveTues\"]').parent().css('color', '#000');
		}
	// If conference is from 1-4pm on Tuesday
	} else if ($(this).val().split(',')[1] === "oneToFourTues") {
		if ($(this).prop('checked') === true) {
			// Disable conflicting conferences
			$('[value=\"100,oneToFourTues\"]').prop('disabled', true);
			$('[value=\"100,oneToFourTues\"]').parent().css('color', 'gray');
			$(this).prop('disabled',false);
			$(this).parent().css('color', '#000');
		// If conference is unchecked
		} else {
			// Enable conflicting times
			$('[value=\"100,oneToFourTues\"]').prop('disabled', false);
			$('[value=\"100,oneToFourTues\"]').parent().css('color', '#000');
		}
	}
})

/* -------------- Payment Options ------------- */
// Display payment description
// Hide credit card inputs
$('#credit-card').hide();
// Hide Paypal description
$('#credit-card').next().hide();
// Hide Bitcoin description
$('#credit-card').next().next().hide();
// When changing different payment options
$('#payment').on('change', function() {
	// Default placeholder option
	if ($(this).val() === "select_method") {
		$('#credit-card').hide();
		$('#credit-card').next().hide();
		$('#credit-card').next().next().hide();
	// Credit Card Option
	} else if ($(this).val() === "credit card") {
		$('#credit-card').show();
		$('#credit-card').next().hide();
		$('#credit-card').next().next().hide();
	} else if ($(this).val() === "paypal") {
		$('#credit-card').hide();
		$('#credit-card').next().show();
		$('#credit-card').next().next().hide();
	} else if ($(this).val() ==="bitcoin") {
		$('#credit-card').hide();
		$('#credit-card').next().hide();
		$('#credit-card').next().next().show();
	}
	
})

/* --------------- Submit Button ---------------- */
// Error message if no events are selected
$('.activities legend').after('<h4 id="conferenceError"></h4>');
$('#conferenceError').css('margin-top', 0);
// T-Shirt Error Message
$('.shirt').after('<h4 id="shirtError"></h4>')
$('#shirtError').css('margin-top', 0);
// Button submit. If fields are not filled out
$('button').on('click', function() {
	// All these variables have to be turned true to submit
	var name = false;
	var email = false;
	var jobRole = false;
	var cost = false;
	var tshirt = false;
	var paymentOption = false;
	var creditCard = false;
	var zip = false;
	var cvv = false;
	/* --------- Name input field ------ */
	if ($('#name').val().length === 0) { // If name not provided
		$('#name').prev().text('Name: (please provide your name)');
		$('#name').prev().css('color', '#CB2028'); // Font turns red
	} else {
		$('#name').prev().text('Name:'); // Something is entered in name field
		$('#name').prev().css('color', '#000') // Font remains black
		name = true;
	}
	/* --------- Email input field ---------- */
	// Check email is more than 5 characters long has an @ symbol and ends with .com
	if ($('#mail').val().length < 5 || $('#mail').val().indexOf('@') < 1 || $('#mail').val().indexOf('.com') != $('#mail').val().length - 4) {
		// email field does not meet criteria
		$('#mail').prev().text('Email: (please provide a valid email address)');
		$('#mail').prev().css('color', '#CB2028'); // Red Font
	// Email meets criteria
	} else {
		$('#mail').prev().text('Email');
		$('#mail').prev().css('color', '#000'); // Black font
		email = true;
	}
	/* ------------- Job Role ------------ */
	// If other is selected there needs to be an input
	if ($('#title').val() === 'other') {
		// Length of input is 0
		if ($('#other-title').val().length === 0) {
			// Turn text red, there is no input
			jobRole = false;
			$('#title').prev().css('color', '#CB2028');
		} else {
			// there is input
			jobRole = true;
			$('#title').prev().css('color', '#000'); // black text
		}
	} else {
		// Other is not selected.
		jobRole = true;
		$('#title').prev().css('color', '#000'); // black text
	}
	/* ------------- Events ------------- */
	// Event selection: if totalCost = 0 then no events were selected
	if (totalCost === 0) {
		cost = false;
		// Error message pops up
		$('#conferenceError').text('Please Select an Activity.')
		$('#conferenceError').css('color', '#CB2028'); // Red font
		$('#conferenceError').show(); // Display error
	} else {
		// an activity is selected, hide the error message
		cost = true;
		$('#conferenceError').hide();
	}
	/* -------- T-shirt selection ------- */
	if ($('#design').val() === 'Select Theme' || $('#color').val() === 'default') {
		tshirt = false;
		$('#shirtError').text("Don't Forget to pick a T-Shirt.");
		$('#shirtError').css('color', '#CB2028'); // Red font
		$('#shirtError').show(); // Display error
	} else {
		tshirt = true;
		$('#shirtError').hide();
	}
	/* ----------- Payment Option ----------------- */
	// if no payment method is selected highlight label red
	if ($('#payment').val() === 'select_method') {
		$('#payment').prev().css('color', '#CB2028');
		paymentOption = false;
	} else {
		$('#payment').prev().css('color', '#000');
		paymentOption = true;
	}
	/* ------- Credit Card Information------------- */
	var creditCardInformation = function(id, digits) {
		// Replace any dashes or spaces in input
		var withoutDandP = $(id).val().replace(/-/g, "").replace(/ /g, "");
		// Payment option is credit card
		if ($('#payment').val() === "credit card") {
			// Check that there is input in fields
			if (withoutDandP.length !== digits) {
				// no input for card number
				$(id).prev().css('color', '#CB2028'); // red text
				return false;
			} else {
				// input for card number is true
				$(id).prev().css('color', '#000'); // black text
				return true;
			}
		} else {
			// Payment option is not credit card
			$(id).prev().css('color', '#000');
			return true;
		}
	} 
	// Reassign values of cvv, zip, creditCard. Ouput error messages if fields are filled out incorrectly
	cvv = creditCardInformation('#cvv', 3);
	zip = creditCardInformation('#zip', 5);
	creditCard = creditCardInformation('#cc-num', 16);
	/* --------- Button Type ---------- */
	// All conditions are met and form can be submitted
	if (name && email && jobRole && cost && tshirt && paymentOption && creditCard && cvv && zip) {
		$('button').prop("type", "submit");
	} else {
		// show error messages
		$('button').prop('type', 'button');
	}
})