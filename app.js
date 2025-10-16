// AdAb Care Solutions - Interactive Functionality

// Product data
const productData = {
  "active-air-8": {
    name: "Active Air 8 Dynamic Mattress System",
    category: "Pressure Relief Mattress",
    riskLevel: "High Risk Patients",
    dailyRate: 18,
    features: [
      "AutoDetect: Automatically adjusts pressure based on patient's weight/size",
      "AutoProtect: Boosts pressure when bed headrest elevated beyond 45°",
      "Digital Pump with LCD: Displays cycle time, mode, and alerts",
      "Continuous Low Pressure (CLP): Enhances immersion and comfort",
      "24-Hour Transport Mode: Patient remains inflated during power interruptions",
      "Infection Control & Hygiene: Welded seams, zip protection",
      "Machine-washable cover at 95°C for efficient sanitizing",
      "Multi-stretch cover promoting moisture vapor transfer",
      "Concealed power cord to reduce trip hazard"
    ],
    specifications: {
      "Sizes Available": "Single (900mm wide), King Single (1050mm wide)",
      "Dimensions": "2000mm × 900/1050mm × 200mm",
      "Weight Limit": "30-200 kg",
      "Pump Warranty": "2 years",
      "Mattress Warranty": "1 year",
      "Power Requirements": "240V AC, 50Hz",
      "Noise Level": "< 25 dB (whisper quiet)"
    }
  },
  "standard-wheelchair": {
    name: "Standard Manual Wheelchair",
    category: "Mobility Equipment",
    status: "Coming Soon",
    dailyRate: 12,
    features: [
      "Durable aluminum frame construction",
      "Removable footrests for easy transfer",
      "Flip-up armrests for side transfers",
      "Comfortable upholstery with easy-clean surface",
      "Easy-grip hand rims for user control",
      "Secure wheel locks for safety",
      "Lightweight yet sturdy design",
      "Anti-tip wheels for enhanced stability"
    ],
    specifications: {
      "Width Options": "350mm, 400mm, 450mm, 500mm",
      "Use Cases": "In-hospital mobility, Short-term patient transport, Day-to-day movement",
      "Frame Material": "Lightweight aluminum",
      "Weight Capacity": "Up to 120kg",
      "Total Weight": "Approximately 16kg",
      "Wheel Size": "24\" rear wheels, 8\" front casters",
      "Foldable": "Yes - for easy storage and transport"
    }
  }
};

// Rental calculation multipliers
const rentalMultipliers = {
  "1": { label: "per day", multiplier: 1, savings: 0 },
  "6": { label: "per week (Save 14%)", multiplier: 6, savings: 14 },
  "22": { label: "per month (Save 27%)", multiplier: 22, savings: 27 }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initCalculator();
  initContactForm();
  initScrollAnimations();
  initProductCards();
});

// Initialize product cards
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const button = card.querySelector('.btn');
    const productId = card.getAttribute('data-product');
    
    if (button && productId) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openProductModal(productId);
      });
    }
    
    // Also make the entire card clickable
    card.addEventListener('click', function(e) {
      e.preventDefault();
      openProductModal(productId);
    });
  });
}

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        scrollToSection(targetId);
      }
    });
  });

  // Hero CTA buttons
  const heroButtons = document.querySelectorAll('.hero-ctas .btn');
  heroButtons.forEach(button => {
    if (button.textContent.includes('Get Quote')) {
      button.addEventListener('click', () => scrollToSection('contact'));
    } else if (button.textContent.includes('View Equipment')) {
      button.addEventListener('click', () => scrollToSection('products'));
    }
  });

  // Active navigation highlighting
  window.addEventListener('scroll', updateActiveNavigation);
}

// Update active navigation on scroll
function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');
  const navHeight = navbar ? navbar.offsetHeight : 0;
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 50;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Smooth scroll function for buttons
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    const navbar = document.querySelector('.navbar');
    const navHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = targetSection.offsetTop - navHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Product modal functionality
function openProductModal(productId) {
  const product = productData[productId];
  if (!product) {
    console.error('Product not found:', productId);
    return;
  }

  const modal = document.getElementById('productModal');
  const modalBody = document.getElementById('modalBody');
  
  if (!modal || !modalBody) {
    console.error('Modal elements not found');
    return;
  }

  // Create modal content
  const modalContent = `
    <div class="product-modal-content">
      <h2>${product.name}</h2>
      <p class="product-category">${product.category}${product.riskLevel ? ' • ' + product.riskLevel : ''}</p>
      
      <div class="product-price-display">
        <span class="price">$${product.dailyRate}</span>
        <span class="price-period">per day</span>
        ${product.status ? `<span class="status status--warning">${product.status}</span>` : ''}
      </div>

      <h3>Key Features</h3>
      <ul class="modal-features-list">
        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>

      <h3>Technical Specifications</h3>
      <div class="spec-grid">
        ${Object.entries(product.specifications).map(([key, value]) => `
          <div class="spec-item">
            <strong>${key}:</strong>
            <span>${value}</span>
          </div>
        `).join('')}
      </div>

      <div class="modal-actions">
        <button class="btn btn--primary btn--full-width" onclick="scrollToSection('contact'); closeProductModal();">
          Request Quote for ${product.name}
        </button>
      </div>
    </div>
  `;

  modalBody.innerHTML = modalContent;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Focus management for accessibility
  modal.focus();
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Rental calculator functionality
function initCalculator() {
  const equipmentSelect = document.getElementById('equipmentSelect');
  const periodSelect = document.getElementById('periodSelect');
  const durationInput = document.getElementById('durationInput');

  if (!equipmentSelect || !periodSelect || !durationInput) {
    console.error('Calculator elements not found');
    return;
  }

  // Add event listeners with better error handling
  [equipmentSelect, periodSelect, durationInput].forEach(element => {
    element.addEventListener('change', calculateRental);
    element.addEventListener('input', calculateRental);
  });

  // Initialize calculator
  calculateRental();
}

function calculateRental() {
  const equipmentSelect = document.getElementById('equipmentSelect');
  const periodSelect = document.getElementById('periodSelect');
  const durationInput = document.getElementById('durationInput');
  const resultDiv = document.getElementById('calculatorResult');

  if (!equipmentSelect || !periodSelect || !durationInput || !resultDiv) {
    console.error('Calculator elements missing');
    return;
  }

  const selectedOption = equipmentSelect.selectedOptions[0];
  const dailyRate = selectedOption ? parseFloat(selectedOption.dataset.rate) : 0;
  const periodMultiplier = parseFloat(periodSelect.value) || 0;
  const duration = parseFloat(durationInput.value) || 0;

  if (!dailyRate || !periodMultiplier || !duration) {
    resultDiv.innerHTML = `
      <h3>Total Cost</h3>
      <div class="total-price">$0</div>
      <p class="price-breakdown">Select equipment and duration for calculation</p>
    `;
    return;
  }

  const periodInfo = rentalMultipliers[periodSelect.value];
  const totalCost = Math.round(dailyRate * periodMultiplier * duration);
  const equipmentName = selectedOption.textContent.split(' - ')[0];

  let breakdownText = `${equipmentName} × ${duration} ${getPeriodLabel(periodSelect.value, duration)}`;
  if (periodInfo && periodInfo.savings > 0) {
    const regularPrice = Math.round(dailyRate * duration * getPeriodDays(periodSelect.value));
    const savings = regularPrice - totalCost;
    if (savings > 0) {
      breakdownText += ` (Save $${savings})`;
    }
  }

  resultDiv.innerHTML = `
    <h3>Total Cost</h3>
    <div class="total-price">$${totalCost.toLocaleString()}</div>
    <p class="price-breakdown">${breakdownText}</p>
    <button class="btn btn--outline" onclick="scrollToSection('contact'); populateQuoteForm('${equipmentName}', ${duration}, '${getPeriodLabel(periodSelect.value, duration)}', ${totalCost});" style="margin-top: 16px;">
      Request This Quote
    </button>
  `;
}

function getPeriodLabel(periodValue, duration) {
  const labels = {
    "1": duration === 1 ? "day" : "days",
    "6": duration === 1 ? "week" : "weeks", 
    "22": duration === 1 ? "month" : "months"
  };
  return labels[periodValue] || "period";
}

function getPeriodDays(periodValue) {
  const days = { "1": 1, "6": 7, "22": 30 };
  return days[periodValue] || 1;
}

function populateQuoteForm(equipment, duration, period, cost) {
  // Find the equipment dropdown in the contact form and pre-select
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const equipmentSelect = contactForm.querySelector('select');
    const messageTextarea = contactForm.querySelector('textarea');
    
    if (equipmentSelect) {
      // Try to match the equipment name
      for (let option of equipmentSelect.options) {
        if (option.textContent.includes(equipment)) {
          option.selected = true;
          break;
        }
      }
    }
    
    if (messageTextarea) {
      const quoteText = `I would like to request a quote for:\n\nEquipment: ${equipment}\nDuration: ${duration} ${period}\nEstimated Cost: $${cost}\n\nPlease provide detailed pricing and availability information.`;
      messageTextarea.value = quoteText;
    }
  }
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) {
    console.error('Contact form not found');
    return;
  }

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleContactSubmission(this);
  });
}

function handleContactSubmission(form) {
  // Basic form validation
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.style.borderColor = 'var(--color-error)';
    } else {
      field.style.borderColor = 'var(--color-border)';
    }
  });
  
  if (!isValid) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }

  // Get form data
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  // Simulate form submission (in real implementation, this would send to a server)
  setTimeout(() => {
    // Show success message
    showNotification('Quote request sent successfully! We\'ll contact you within 24 hours.', 'success');
    
    // Reset form
    form.reset();
    
    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  
  // Set notification styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 3000;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    padding: var(--space-16);
    box-shadow: var(--shadow-lg);
    max-width: 400px;
    min-width: 300px;
    animation: slideInRight 0.3s ease-out;
    font-size: var(--font-size-sm);
    line-height: var(--line-height-normal);
  `;

  // Add type-specific styling
  if (type === 'success') {
    notification.style.borderLeft = '4px solid var(--color-success)';
    notification.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.05)';
  } else if (type === 'error') {
    notification.style.borderLeft = '4px solid var(--color-error)';
    notification.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.05)';
  } else if (type === 'warning') {
    notification.style.borderLeft = '4px solid var(--color-warning)';
    notification.style.backgroundColor = 'rgba(var(--color-warning-rgb), 0.05)';
  }

  notification.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-12);">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: var(--font-size-lg); cursor: pointer; color: var(--color-text-secondary); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-full); transition: all var(--duration-fast) var(--ease-standard);">&times;</button>
    </div>
  `;

  // Add animation styles if not already present
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideInRight 0.3s ease-in reverse';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.product-card, .service-card, .contact-info, .contact-form');
  animatedElements.forEach(el => observer.observe(el));
}

// Handle keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
  // Close modal with Escape key
  if (e.key === 'Escape') {
    const modal = document.getElementById('productModal');
    if (modal && !modal.classList.contains('hidden')) {
      closeProductModal();
    }
  }
});

// Prevent modal closing when clicking inside modal content
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    closeProductModal();
  }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  
  if (window.innerWidth > 768) {
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
  }
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.populateQuoteForm = populateQuoteForm;