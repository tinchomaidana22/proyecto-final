const mercadopago = new MercadoPago("TEST-81adcb9e-67a1-4241-a2f8-bd694f7b1838", {
    locale: "es-AR",
});


async function renderPago(preference) {
    let html = await fetch('views/pago.html').then(r => r.text())

    document.querySelector('main').style.display = 'none'
    document.querySelector('.section-pago').innerHTML = html

    createCheckoutButton(preference.id)

    const items = preference.items
    const refItems = document.querySelector('.item')
    const refTotal = document.querySelector('#summary-total')

    let total = 0
    for(let i=0; i<items.length; i++) {
        let price = items[i].unit_price
        let quantity = items[i].quantity
        let title = items[i].title

        let subtotal = price * quantity
        total += subtotal

        refItems.innerHTML += `
            <span class="price" class="summary-price">$ ${subtotal}</span>
            <p class="item-name">${title} x <span class="summary-quantity">${quantity}</span></p>
        `
    }
    refTotal.innerHTML = `$ ${total}`


    // Go back
    document.getElementById("go-back").addEventListener("click", function () {
        document.querySelector('main').style.display = 'block'
        document.querySelector('.section-pago').innerHTML = ''
    });
}


// Create preference when click on checkout button
function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    mercadopago.checkout({
        preference: {
            id: preferenceId
        },
        render: {
            container: '#button-checkout', // Class name where the payment button will be displayed
            label: 'Pagar', // Change the payment button text (optional)
        }
    });
}