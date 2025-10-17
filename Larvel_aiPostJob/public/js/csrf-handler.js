// Set up CSRF token for all AJAX requests
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// Handle expired sessions in AJAX requests
$(document).ajaxError(function(event, xhr, settings, error) {
    if (xhr.status === 419) { // CSRF token mismatch
        alert('Your session has expired. The page will now refresh.');
        window.location.reload();
    }
});

// Add CSRF token to all forms automatically
document.addEventListener('DOMContentLoaded', function() {
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    document.querySelectorAll('form').forEach(function(form) {
        if (!form.querySelector('input[name="_token"]')) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = '_token';
            input.value = token;
            form.appendChild(input);
        }
    });
});