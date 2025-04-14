// ✅ Ensure DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // ✅ Connect to Supabase
    const SUPABASE_URL = "https://tlihcrdylapciuxjuxet.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaWhjcmR5bGFwY2l1eGp1eGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NTE2MTIsImV4cCI6MjA1ODEyNzYxMn0.btFktdl-nvtDzYtTHxykHOZWwWg0nXSrjP_avzB9ID4";
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // ✅ Google Form URL
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfhzp1RtLcHeFnRCG9T1x2gwx1u9nOUJ11zVM9HWrsZSspVSw/formResponse";

    // ✅ Select the form by ID
    const form = document.getElementById("clientForm");
    const submitBtn = document.getElementById("submitBtn");
    const bookAppointmentBtn = document.getElementById("bookAppointmentBtn");
    const scheduleAppointmentBtn = document.getElementById("scheduleAppointmentBtn");

    // ✅ Get actionType and planType from URL
    const urlParams = new URLSearchParams(window.location.search);
    let actionType = urlParams.get("action") || "buy_plan";
    let appointmentType = urlParams.get("type"); // New: Check appointment type from URL
    let planType = urlParams.get("plan") || "monthly"; // Default for Buy Plan


    // ✅ Handle Appointment Button Clicks (Set Plan Type)
    if (actionType === "appointment") {
        planType = (appointmentType === "book") ? "Enterprise Premium" : "Demo"; // Set correct planType
    }

    // ✅ Form Submission Function
    async function submitForm(event) {
        event.preventDefault();

        // Disable button to prevent multiple clicks
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        // ✅ Get form values
        const fullName = document.getElementById("fullName").value.trim();
        const contactNumber = document.getElementById("contactNumber").value.trim();
        const businessName = document.getElementById("businessName").value.trim();
        const businessEmail = document.getElementById("businessEmail").value.trim();
        const city = document.getElementById("city").value.trim();
        const province = document.getElementById("province").value.trim();

        // ✅ Validate email and phone
        if (!validateEmail(businessEmail)) {
            alert("❌ Please enter a valid email address!");
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
            return;
        }

        if (!validatePhone(contactNumber)) {
            alert("❌ Please enter a valid 10-digit phone number!");
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
            return;
        }

        // ✅ Insert Data into Supabase
        const { data, error } = await supabase
            .from("Clients")
            .insert([{ fullName, contactNumber, businessName, businessEmail, city, province, actionType, planType }]);

        if (error) {
            console.error("❌ Error inserting data into Supabase:", error);
            alert("❌ Submission failed! Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
            return;
        }
        // ✅ Send Data to Google Forms
        const formData = new FormData();
        formData.append("entry.544936130", fullName);
        formData.append("entry.611880105", contactNumber);
        formData.append("entry.1197985811", businessName);
        formData.append("entry.419329957", businessEmail);
        formData.append("entry.1034639850", city);
        formData.append("entry.2102664954", province);
        formData.append("entry.1933772107", actionType);
        formData.append("entry.784652328", planType);

        fetch(googleFormURL, { method: "POST", body: formData, mode: "no-cors" })
            .then(() => console.log("✅ Data sent to Google Forms."))
            .catch(err => console.error("❌ Error sending data to Google Forms:", err));

        // ✅ Handle Different Actions
        if (actionType === "buy_plan") {
            let paymentLink = planType === "yearly"
                ? "https://www.creem.io/payment/prod_4cmp7wIZgb1LkcMbxw08iK"
                : "https://www.creem.io/payment/prod_4TZMJ48VaMflFVqjRH3llR";

            console.log("✅ Redirecting to payment:", paymentLink);
            setTimeout(() => {
                window.location.replace(paymentLink);
            }, 3000);
        } else if (actionType === "appointment") {
            const popupModal = document.getElementById("popupModal");
            const closePopup = document.getElementById("closePopup");
            popupModal.style.display = "block";
            closePopup.addEventListener("click", function () {
                popupModal.style.display = "none";
                window.location.href = "index.html";
            });
        }
    }

    // ✅ Handle Form Submission Event
    form.addEventListener("submit", function (event) {
        submitForm(event);
    });

    // ✅ Handle Email Validation
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    // ✅ Handle Phone Validation
    function validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone);
    }
});
