class Product {
    // title = 'Default';
    // imageUrl;
    // description;
    // price;
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
}

class ShoppingCart {
    items = [];

    addProduct(product) {
        this.items.push(product);
        this.totalOutput.innerHTML = `<h2>Total: \$${1}</h2>`;
    }

    render(){
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        cartEl.className = 'cart';
        this.totalOutput = cartEl.querySelector('h2');
        return cartEl;
    }
}

class ProductItem {
    constructor(product){
        this.product = product;
    };

    addToCart(product){
        App.addProductToCart(this.product);
    }

    render(){
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}">
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
        const addCardButton = prodEl.querySelector('button');
        addCardButton.addEventListener('click', this.addToCart.bind(this));
        return prodEl;
    }
}

class ProductList {
    products = [
        new Product(
            'A pillow',
            'https://yaroslav.ua/image/cache/catalog/pledi_novozelandiya/podushki/podushka-sylikon-byaz_50-70-640x640.jpg',
            19.99,
            'A soft pillow!'),

        new Product(
            'A Carpet',
            'https://ii1.pepperfry.com/media/catalog/product/s/a/494x544/saral-home-soft-cotton-tufted-saggy-floor-carpet--90x150-cm-saral-home-soft-cotton-tufted-saggy-floo-o4psuu.jpg',
            89.99,
            'A soft carpet for You!'),
    ];

    constructor() {}

    render() {

        const prodList = document.createElement('ul');
        prodList.className = 'product-list';

        for (const prod of this.products) {
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        return prodList;
    }
}

class Shop {
    render(){
        const renderHook = document.getElementById('app');
        this.cart = new ShoppingCart();
        const cartEl = this.cart.render();
        const productList = new ProductList();
        const prodListEl = productList.render();

        renderHook.append(cartEl);
        renderHook.append(prodListEl);
    }
}

class App {
    static cart;

    static init(){
        const shop = new Shop();

        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();

