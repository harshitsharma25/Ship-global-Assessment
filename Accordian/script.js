// script.js
document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const section = header.parentElement;
            const content = section.querySelector('.accordion-content');

            // Close all other sections
            document.querySelectorAll('.accordion-section').forEach(otherSection => {
                if (otherSection !== section) {
                    otherSection.classList.remove('active');
                    otherSection.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle the clicked section
            section.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Function to handle resize events
    const handleResize = () => {
        const activeContent = document.querySelector('.accordion-section.active .accordion-content');
        if (activeContent) {
            activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
        }
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);
});
