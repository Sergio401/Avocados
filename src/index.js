/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app"
const appNode = document.querySelector('#container')

const formatPrice = price => {
    return window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD"
    }).format(price);
}

!(async function(){
    // procesar la respuesta y convertirla en Json
    const response = await fetch(`${baseUrl}/api/avo`);
    // JSON -> Data -> Renderizar info browser
    const { data: allAvos } = await response.json();

    const nodeArray = allAvos.map((avocado) => {

        // crear imagen y titulo
        const image = document.createElement('img')
        image.className =
            "h-40 w-40 rounded-full mx-auto md:mx-0 md:mr-6";
        image.src = `${baseUrl}${avocado.image}`;

        const title = document.createElement('h2')
        title.className = "text-lg";
        title.textContent = avocado.name;

        const price = document.createElement('div')
        price.className = "text-gray-600";
        price.textContent = formatPrice(avocado.price);

        const priceAndTitle = document.createElement("div");
        priceAndTitle.className = "text-center md:text-left";
        priceAndTitle.appendChild(title);
        priceAndTitle.appendChild(price);

        const card = document.createElement("div");
        card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
        card.appendChild(image);
        card.appendChild(priceAndTitle);

        return card;
    })

        appNode.append(...nodeArray)
        appNode.className = "grid gap-4 mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
})();

