
function getProducts() {
  const url = 'https://my.api.mockaroo.com/products.json?key=66cff0f0';

  fetch(url, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(function(data) {
    const parent = document.getElementById('product-list')
    return data.map(product => {
      const article = document.createElement('article')
      const imgContainer = document.createElement('div')
      const img     = document.createElement('img')
      const name    = document.createElement('span')
      const price   = document.createElement('span')
      article.className = 'product'
      imgContainer.className = 'img-container'
      imgContainer.setAttribute(
        "style",
        `background-image:url(${product.image});`
      )
      name.textContent = product.name
      price.textContent = product.price
      imgContainer.appendChild(img)
      article.appendChild(imgContainer)
      article.appendChild(name)
      article.appendChild(price)
      parent.appendChild(article)
    })
  })
  .catch(error => console.error('Error:', error))
}

const products = getProducts()
// if (products) {
  
//   for (let i = 0; i < products.length; i++) {
//     console.log('%c var', 'color:pink', products[i].name)
//   }
//   parent.appendChild(child)
// }
  
