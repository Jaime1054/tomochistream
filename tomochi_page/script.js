const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

function filterCatalog(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach((btn) => {
        btn.classList.remove('bg-accentPurple', 'text-white');
        btn.classList.add('bg-cardBg', 'text-gray-300');
    });

    const activeButton = document.getElementById('btn-' + category);
    if (activeButton) {
        activeButton.classList.remove('bg-cardBg', 'text-gray-300');
        activeButton.classList.add('bg-accentPurple', 'text-white');
    }

    cards.forEach((card) => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

let selectedProduct = '';
let selectedPrice = '';
let selectedPlan = '';

const planOptions = {
    'Netflix': [
        { name: '33 días', price: '$13.000' },
        { name: '27 días', price: '$11.000' }
    ],
    'Disney+': [
        { name: 'Estándar', price: '$5.000' },
        { name: 'Premium', price: '$8.000' },
        { name: 'Premium + ESPN', price: '$9.000' }
    ],
    'Spotify': [
        { name: '1 mes', price: '$10.000' },
        { name: '3 meses', price: '$25.000' }
    ],
    'Max': [{ name: '1 mes', price: '$5.000' }],
    'Amazon Prime Video': [{ name: '1 mes', price: '$6.000' }],
    'ViX': [{ name: '1 mes', price: '$7.000' }],
    'Crunchyroll': [{ name: '1 mes', price: '$6.000' }],
    'YouTube Premium': [{ name: '1 mes', price: '$11.000' }],
    'Paramount+': [{ name: '1 mes', price: '$8.000' }],
    'Canva': [
        { name: '1 mes', price: '$10.000' },
        { name: '3 meses', price: '$20.000' },
        { name: '1 año', price: '$40.000' }
    ]
};

function getPlanOptions(product) {
    return Object.entries(planOptions).find(([platform]) => product.startsWith(platform))?.[1] || [{ name: 'Plan disponible', price: selectedPrice }];
}

function updateSelectedPlan() {
    const planSelect = document.getElementById('plan-select');
    const productPrice = document.getElementById('modal-product-price');
    const selectedPlanOption = planSelect?.selectedOptions[0];

    if (!selectedPlanOption) return;

    selectedPlan = selectedPlanOption.value;
    selectedPrice = selectedPlanOption.dataset.price || selectedPlanOption.value;
    if (productPrice) productPrice.innerText = selectedPrice;
}

function openCheckout(product, price) {
    selectedProduct = product;
    selectedPrice = price;
    selectedPlan = '';

    const productName = document.getElementById('modal-product-name');
    const productPrice = document.getElementById('modal-product-price');
    const planSelect = document.getElementById('plan-select');
    const checkoutModal = document.getElementById('checkout-modal');

    if (productName) productName.innerText = product;
    if (planSelect) {
        planSelect.innerHTML = '';
        getPlanOptions(product).forEach((plan) => {
            const option = document.createElement('option');
            option.value = plan.name;
            option.dataset.price = plan.price;
            option.textContent = `${plan.name} - ${plan.price}`;
            planSelect.appendChild(option);
        });
    }
    updateSelectedPlan();
    if (productPrice && !planSelect) productPrice.innerText = price;
    if (checkoutModal) checkoutModal.classList.remove('hidden');
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.classList.add('hidden');
}

function submitOrder(e) {
    e.preventDefault();

    const clientName = document.getElementById('client-name')?.value || '';
    const paymentMethod = document.getElementById('payment-method')?.value || '';

    const planDescription = selectedPlan ? ` - ${selectedPlan}` : '';
    const message = `Hola Tomochisteam, mi nombre es ${clientName}. Deseo comprar *${selectedProduct}${planDescription}* (${selectedPrice}). Mi método de pago preferido es *${paymentMethod}*. Quedo atento a las instrucciones para realizar el pago.`;
    const whatsappUrl = `https://wa.me/573126732080?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    closeCheckout();
}

function toggleFaq(id) {
    const content = document.getElementById(`faq-content-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);

    if (content) content.classList.toggle('hidden');
    if (icon) icon.classList.toggle('rotate-180');
}

function openModal(title, text) {
    const titleElement = document.getElementById('info-modal-title');
    const textElement = document.getElementById('info-modal-text');
    const modal = document.getElementById('info-modal');

    if (titleElement) titleElement.innerText = title;
    if (textElement) textElement.innerText = text;
    if (modal) modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (modal) modal.classList.add('hidden');
}

window.onclick = function (event) {
    const checkoutModal = document.getElementById('checkout-modal');
    const infoModal = document.getElementById('info-modal');

    if (event.target === checkoutModal) closeCheckout();
    if (event.target === infoModal) closeModal();
};
