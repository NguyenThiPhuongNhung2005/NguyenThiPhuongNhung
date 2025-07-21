document.addEventListener('DOMContentLoaded', (event) => {
    // --- Get Elements ---
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup'); // Login button on header
    const iconClose = document.querySelector('.icon-close'); // Close popup button

    // Elements for managing Dashboard display
    const dashboardContent = document.getElementById('dashboard-content');
    const homeLink = document.getElementById('home-link');
    const courtListLink = document.getElementById('courtlist-link');
    const serviceLink = document.getElementById('service-link');
    const contactLink = document.getElementById('contact-link');

    // --- Initial State ---
    // Initially, dashboard-content will be hidden by CSS (class .dashboard-hidden)
    dashboardContent.classList.add('dashboard-hidden');
    
    // Check URL parameters to decide whether to show the login popup
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showLogin') === 'true') {
        wrapper.classList.add('active-popup');
        document.body.classList.remove('show-dashboard');
    } else {
        // By default, display the Login/Register popup when the Home page is loaded
        wrapper.classList.add('active-popup');
        // Ensure body has correct padding-top for the Home page (when dashboard is hidden)
        document.body.classList.remove('show-dashboard');
    }


    // --- Login/Register Functionality ---
    registerLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default <a> tag behavior
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default <a> tag behavior
        wrapper.classList.remove('active');
    });

    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
        // When opening the login popup, ensure dashboard content is hidden
        hideDashboardContent(); 
    });

    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active'); // Ensure it returns to login state if currently on register
    });

    // --- Hide/Show Dashboard Content Functionality ---

    function hideDashboardContent() {
        dashboardContent.classList.add('dashboard-hidden');
        dashboardContent.classList.remove('dashboard-visible');
        document.body.classList.remove('show-dashboard'); // Remove this class from body for padding-top to return
    }

    function showDashboardContent() {
        dashboardContent.classList.remove('dashboard-hidden');
        dashboardContent.classList.add('dashboard-visible');
        document.body.classList.add('show-dashboard'); // Add this class to body to remove padding-top
        // Hide Login/Register form when displaying dashboard
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active'); // Ensure both register and login forms are hidden
    }

    // Event listener for the "Court List" button
    courtListLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default <a> tag behavior
        showDashboardContent();
    });

    // Event listeners for other navigation buttons to hide Dashboard and show Login/Register
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideDashboardContent();
        wrapper.classList.add('active-popup'); // Show Login/Register popup on Home page
        wrapper.classList.remove('active'); // Ensure Login form is displayed
    });

    serviceLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideDashboardContent();
        // Can add specific logic for the Service page if available
        // Example: display a different service content div
    });

    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideDashboardContent();
        // Can add specific logic for the Contact page if available
    });


    // --- Sport Selection Functionality ---
    const sportSelectionItem = document.getElementById('sport-selection-item');
    const dropdownMenu = sportSelectionItem.querySelector('.dropdown-menu');
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

    // Toggle dropdown visibility for sports
    sportSelectionItem.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent document click from closing it immediately
        sportSelectionItem.classList.toggle('active');
        // Ensure Flatpickr instances are closed if open
        if (flatpickrDateInstance.isOpen) flatpickrDateInstance.close();
        if (flatpickrTimeInstance.isOpen) flatpickrTimeInstance.close();
    });

    // Handle selection of a sport
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedSport = item.getAttribute('data-value');
            // Update the text of the selection item (excluding the arrow)
            sportSelectionItem.childNodes[0].nodeValue = selectedSport + ' '; // Update text node before arrow
            sportSelectionItem.classList.remove('active'); // Close the dropdown
        });
    });

    // --- Date Selection Functionality with Flatpickr ---
    const dateSelectionItem = document.getElementById('date-selection-item');
    const datePickerInput = document.getElementById('date-picker-input');
    const dateArrowDown = document.getElementById('date-arrow-down');
    let flatpickrDateInstance; 
    
    flatpickrDateInstance = flatpickr(datePickerInput, {
        dateFormat: "d/m/Y",
        minDate: "today",
        disableMobile: "true",
        appendTo: dateSelectionItem,
        onOpen: function(selectedDates, dateStr, instance) {
            dateSelectionItem.classList.add('active');
            if (flatpickrTimeInstance && flatpickrTimeInstance.isOpen) {
                flatpickrTimeInstance.close();
            }
            // Ensure sport dropdown is closed
            sportSelectionItem.classList.remove('active');
        },
        onClose: function(selectedDates, dateStr, instance) {
            dateSelectionItem.classList.remove('active');
        },
        onChange: function(selectedDates, dateStr, instance) {
            if (dateStr) {
                dateSelectionItem.childNodes[0].nodeValue = dateStr + ' ';
            } else {
                dateSelectionItem.childNodes[0].nodeValue = 'Booking Date ';
            }
        }
    });

    datePickerInput.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    dateArrowDown.addEventListener('click', (event) => {
        event.stopPropagation();
        if (flatpickrDateInstance.isOpen) {
            flatpickrDateInstance.close();
        } else {
            flatpickrDateInstance.open();
        }
    });

    // --- Time Selection Functionality with Flatpickr (with AM/PM) ---
    const timeSelectionItem = document.getElementById('time-selection-item');
    const timePickerInput = document.getElementById('time-picker-input');
    const timeArrowDown = document.getElementById('time-arrow-down');
    let flatpickrTimeInstance;

    flatpickrTimeInstance = flatpickr(timePickerInput, {
        enableTime: true,        // Allow time selection
        noCalendar: true,        // Do not display date calendar
        dateFormat: "h:i K",     // 12-hour time format (h:i) with AM/PM (K)
        time_24hr: false,        // Set to false to use 12-hour format
        minuteIncrement: 30,     // Minute step is 30 minutes
        appendTo: timeSelectionItem, // Attach time picker to selection-item
        onOpen: function(selectedDates, dateStr, instance) {
            timeSelectionItem.classList.add('active');
            if (flatpickrDateInstance.isOpen) {
                flatpickrDateInstance.close();
            }
            // Ensure sport dropdown is closed
            sportSelectionItem.classList.remove('active');
        },
        onClose: function(selectedDates, dateStr, instance) {
            timeSelectionItem.classList.remove('active');
        },
        onChange: function(selectedDates, dateStr, instance) {
            if (dateStr) {
                timeSelectionItem.childNodes[0].nodeValue = dateStr + ' ';
            } else {
                timeSelectionItem.childNodes[0].nodeValue = 'Booking Time ';
            }
        }
    });

    timePickerInput.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    timeArrowDown.addEventListener('click', (event) => {
        event.stopPropagation();
        if (flatpickrTimeInstance.isOpen) {
            flatpickrTimeInstance.close();
        } else {
            flatpickrTimeInstance.open();
        }
    });

    // --- Global click listener to close dropdowns/calendars when clicking outside ---
    document.addEventListener('click', (event) => {
        // Close sport selection dropdown if clicked outside
        if (!sportSelectionItem.contains(event.target)) {
            sportSelectionItem.classList.remove('active');
        }

        // Close date picker if clicked outside date selection area OR outside the date calendar itself
        if (flatpickrDateInstance && flatpickrDateInstance.calendarContainer && !dateSelectionItem.contains(event.target) && !flatpickrDateInstance.calendarContainer.contains(event.target)) {
            if (flatpickrDateInstance.isOpen) {
                flatpickrDateInstance.close();
            }
        }

        // Close time picker if clicked outside time selection area OR outside the time picker itself
        if (flatpickrTimeInstance && flatpickrTimeInstance.calendarContainer && !timeSelectionItem.contains(event.target) && !flatpickrTimeInstance.calendarContainer.contains(event.target)) {
            if (flatpickrTimeInstance.isOpen) {
                flatpickrTimeInstance.close();
            }
        }
    });


    // --- Court Data and Dynamic Generation ---
    const courtCardsContainer = document.querySelector('.court-cards-container');

    // Sample court data (6 courts) - Updated with specificType details
    const courtData = [
        // Football courts
        { id: 1, name: 'Football Court A', location: 'District 1, HCMC', description: '7-a-side artificial turf, floodlit, FIFA mini standard.', image: 'image/football_court_1.jpg', phone: '0901234567', price: '200000 VND/hour', type: 'Football', specificType: '7-a-side Artificial Turf', owner: 'Mr. Nguyen Van A' },
        { id: 2, name: 'Football Court B', location: 'District 7, HCMC', description: '11-a-side natural grass, high quality, frequently hosts tournaments.', image: 'image/football_court_2.jpg', phone: '0902345678', price: '350000 VND/hour', type: 'Football', specificType: '11-a-side Natural Grass', owner: 'Ms. Tran Thi B' },
        // Volleyball courts
        { id: 3, name: 'Volleyball Court 1', location: 'Binh Thanh District, HCMC', description: 'Indoor court, wooden floor, airy, air-conditioned.', image: 'image/volleyball_court_1.jpg', phone: '0903456789', price: '150,000 VND/hour', type: 'Volleyball', specificType: 'Indoor Court', owner: 'Mr. Le Van C' },
        { id: 4, name: 'Volleyball Court 2', location: 'Go Vap District, HCMC', description: 'Outdoor court with roof, suitable for all weather, nice view.', image: 'image/volleyball_court_2.jpg', phone: '0904567890', price: '120000 VND/hour', type: 'Volleyball', specificType: 'Outdoor Court with Roof', owner: 'Ms. Pham Thi D' },
        // Basketball courts
        { id: 5, name: 'Basketball Court X', location: 'District 3, HCMC', description: 'Indoor court, competition standard, includes gym.', image: 'image/basketball_court_1.jpg', phone: '0905678901', price: '180000 VND/hour', type: 'Basketball', specificType: 'Indoor Court', owner: 'Mr. Hoang Van E' },
        { id: 6, name: 'Basketball Court Y', location: 'Phu Nhuan District, HCMC', description: 'Outdoor court, large grandstand, suitable for events.', image: 'image/basketball_court_2.jpg', phone: '0906789012', price: '100000 VND/hour', type: 'Basketball', specificType: 'Outdoor Court', owner: 'Ms. Nguyen Thi F' },
    ];

    // Function to create and append court cards
    function renderCourtCards() {
        courtCardsContainer.innerHTML = ''; // Clear existing cards
        courtData.forEach(court => {
            const courtCard = document.createElement('div');
            courtCard.classList.add('court-card');
            
            courtCard.innerHTML = `
                <img src="${court.image}" alt="${court.name}" class="court-image">
                <div class="court-info-wrapper">
                    <p class="court-name">${court.name}</p>
                    <div class="court-detail-item">
                        <ion-icon name="call-outline"></ion-icon>
                        <span>${court.phone}</span>
                    </div>
                    <div class="court-detail-item">
                        <ion-icon name="location-outline"></ion-icon>
                        <span>${court.location}</span>
                    </div>
                    <button class="detail-button" data-court-id="${court.id}">Details</button>
                </div>
            `;
            courtCardsContainer.appendChild(courtCard);

            // Add click listener to the "Details" button
            const detailButton = courtCard.querySelector('.detail-button');
            detailButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click if any parent listener exists
                // Get court ID from data attribute
                const courtId = parseInt(e.target.dataset.courtId);
                // Find court information in the courtData array
                const selectedCourt = courtData.find(c => c.id === courtId);
                if (selectedCourt) {
                    navigateToCourtDetail(selectedCourt);
                }
            });
        });
    }

    // Function to navigate to the court detail page
    function navigateToCourtDetail(court) {
        // Encode the court object as a JSON string and URL encode it
        const courtDataEncoded = encodeURIComponent(JSON.stringify(court));
        // Redirect to court-detail.html and pass data via URL
        window.location.href = `court-detail.html?court=${courtDataEncoded}`;
    }

    // Initial render of court cards when the page loads
    renderCourtCards();

    // To ensure the Home page displays the Login form initially.
    // This line will run after checking the `showLogin` param.
    // If no `showLogin=true`, it will display the login popup.
    if (!urlParams.get('showLogin')) {
        homeLink.click(); // Simulate clicking Home to set initial state
    }

});