const express = require('express');
const app = express();

const Contendor = require('./index');
const productos = new Contendor ("productos.txt");

const PORT = process.env.PORT || 8080;

//PRODUCTOS PARA AGREGAR
const producto1 = {
    title: "Memoria Ram G.skill Trident Z Royal 32gb 2x16gb Pc4-28800",
    price: "87.769",
    thumbnail: "https://articulo.mercadolibre.com.ar/MLA-842448843-memoria-ram-gskill-trident-z-royal-32gb-2x16gb-pc4-28800-_JM#reco_item_pos=2&reco_backend=machinalis-homes-pdp-boos&reco_backend_type=function&reco_client=home_navigation-recommendations&reco_id=a9d70894-ae5e-4467-8a5c-923ac9a18c42&c_id=/home/navigation-recommendations/element&c_element_order=3&c_uid=2c81481a-9ab1-4be5-a75c-28590bffa2f0"
}

const producto2 = {
    title: "Tablet Samsung Galaxy Tab A7 Lite SM-T220 8.7",
    price: "35.999",
    thumbnail: "https://www.mercadolibre.com.ar/tablet-samsung-galaxy-tab-a7-lite-sm-t220-87-32gb-plateada-y-3gb-de-memoria-ram/p/MLA18367187?pdp_filters=deal:MLA779357-1#searchVariation=MLA18367187&position=8&search_layout=grid&type=product&tracking_id=cc4bdd02-2144-4296-b548-82ecda1bc2b3&c_id=/home/promotions-recommendations/element&c_element_order=14&c_uid=91075389-5168-41d2-a81d-740bc0296834"
}

const producto3 = {
    title: "Set Olla De Hierro Fundido",
    price: "19.999",
    thumbnail: "https://articulo.mercadolibre.com.ar/MLA-1143701773-set-olla-de-hierro-fundido-sarten-de-hierro-esmaltado-_JM?variation=174690846850#reco_item_pos=0&reco_backend=machinalis-homes-pdp-boos&reco_backend_type=function&reco_client=home_navigation-trend-recommendations&reco_id=6f050d9e-8179-4ab6-83f7-fd7aea3f6018&c_id=/home/navigation-trends-recommendations/element&c_element_order=1&c_uid=b32aea59-0565-40f4-a58f-b3575b4662cf"
}

//ENVIO DE PRODUCTOS AL TXT
const usarContenedor = async () => {
    await productos.save(producto1)
    await productos.save(producto2)
    await productos.save(producto3)

}

usarContenedor()


const getProduct = async ()=>{
    let listProduct = JSON.stringify(await productos.getAll());
    return listProduct;
}
const getProductRandom = async () =>{
    let length = await productos.getLength()
    let random = Math.floor(Math.random() * length)
    let productRandom = await productos.getAll();
    console.log(length, random, productRandom)
    return JSON.stringify(productRandom[random]);
}



app.get('/', (req, res) => {
    res.send(`Root!!!!!`);
})

app.get('/productos',async (req, res) => {
    res.send(`Lista de productos: ${await getProduct()}`);
})

app.get('/productoRandom',async (req, res) => {
    res.send(`El producto es: ${await getProductRandom()}`);
})


const server = app.listen(PORT,()=>{console.log('Server Runing')});
server.on('error',error=>console.log(`Error ${error}`));