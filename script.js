// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic hover effect for skills
const skillsCategories = document.querySelectorAll('.skills-category');
skillsCategories.forEach(category => {
    category.addEventListener('mouseover', () => {
        category.style.transform = 'scale(1.1)';
        category.style.boxShadow = '0 8px 16px rgba(0, 255, 0, 0.5)';
    });
    category.addEventListener('mouseout', () => {
        category.style.transform = 'scale(1)';
        category.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
});

// Add event listeners for the Education categories
const educationCategories = document.querySelectorAll('.education-category');

educationCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'scale(1.1)';
        category.style.boxShadow = '0 8px 16px rgba(0, 255, 0, 0.5)';
    });

    category.addEventListener('mouseleave', () => {
        category.style.transform = 'scale(1)';
        category.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
});
// Theme toggle functionality
const body = document.body;
const toggleButton = document.createElement('button');
toggleButton.innerText = 'Toggle Theme';
toggleButton.style.position = 'fixed';
toggleButton.style.bottom = '20px';
toggleButton.style.right = '20px';
toggleButton.style.padding = '10px 20px';
toggleButton.style.backgroundColor = '#00ff00';
toggleButton.style.color = '#000';
toggleButton.style.border = 'none';
toggleButton.style.borderRadius = '5px';
toggleButton.style.cursor = 'pointer';
toggleButton.style.boxShadow = '0 4px 8px rgba(0, 255, 0, 0.3)';
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    if (body.style.backgroundColor === 'white') {
        body.style.backgroundColor = '#121212';
        body.style.color = '#ffffff';
        toggleButton.style.backgroundColor = '#00ff00';
        toggleButton.style.color = '#000';
    } else {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
        toggleButton.style.backgroundColor = '#000';
        toggleButton.style.color = '#fff';
    }
});


// Add a tooltip effect for contact icons
const contactLinks = document.querySelectorAll('.contact-info a');
contactLinks.forEach(link => {
    const tooltip = document.createElement('span');
    tooltip.innerText = link.innerText;
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '150%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.padding = '5px 10px';
    tooltip.style.backgroundColor = '#00ff00';
    tooltip.style.color = '#000';
    tooltip.style.borderRadius = '5px';
    tooltip.style.boxShadow = '0 4px 8px rgba(0, 255, 0, 0.3)';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease-in-out';
    tooltip.style.fontSize = '0.8em';
    link.style.position = 'relative';
    link.appendChild(tooltip);

    link.addEventListener('mouseover', () => {
        tooltip.style.opacity = '1';
    });

    link.addEventListener('mouseout', () => {
        tooltip.style.opacity = '0';
    });
});
4
