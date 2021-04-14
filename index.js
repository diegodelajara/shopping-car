function calculateHeightShoppingCar() {
  const lengthContainer = getAllShoppingCarProducts().length || 1
  document.getElementById('products-added').style.height = lengthContainer*60 + 'px'
}
function cleanShoppingCar() {
  const list = document.getElementById('products-added')
  list.textContent = ''
}

function drawShoppingCar() {
  cleanShoppingCar()
  const shoppingCar = getAllShoppingCarProducts()
  if (shoppingCar.length) {
    shoppingCar.forEach(element => {
      buildShoppingCarItem(element)
    })
  } else {
    buildShoppingCarItem(shoppingCar)
  }
}

function buildShoppingCarItem(item) {
  const list    = document.getElementById('products-added')
  const div     = document.createElement('div')
  const span    = document.createElement('span')
  const button  = document.createElement('button')
  span.innerText = item.title
  button.innerText = '-'
  button.onclick = function(){
    removeItem(item)
  }
  div.className = 'shopping-car-product'
  div.appendChild(span)
  div.appendChild(button)
  list.appendChild(div)
}

function getAllShoppingCarProducts() {
  return JSON.parse(localStorage.getItem('shoppingCar')) || []
}
function updateShoppingCarProducts(array) {
  array.length
    ? array.map(item => addItem(item))
    : cleanShoppingCar()
 
}

function updateCount() {
  const total = getAllShoppingCarProducts().length
  document.querySelector('.badge').innerText = total
}

function showHideList(style) {
  calculateHeightShoppingCar()
  drawShoppingCar()
  document.getElementById('products-added').style.display = style
}

function removeItem(product) {
  const total = getAllShoppingCarProducts()
  const newTotal = total.filter(item => item.id !== product.id)
  console.log('%c newTotal', 'color:yellow', newTotal)
  localStorage.setItem('shoppingCar', JSON.stringify(newTotal))
}

function addItem(item) {
  let shoppingCar = []
  const currentListProducts = JSON.parse(localStorage.getItem('shoppingCar'))
  
  // Es la primera vez que se agrega un item
  if (!currentListProducts) {
    localStorage.setItem('shoppingCar', JSON.stringify(item))
  } else {
    if (currentListProducts.length > 1) {
      currentListProducts.push(item)
      localStorage.setItem('shoppingCar', JSON.stringify(currentListProducts))
    } else {

      shoppingCar.push(currentListProducts)
      shoppingCar.push(item)
      localStorage.setItem('shoppingCar', JSON.stringify(shoppingCar))
    }
  }
  drawShoppingCar()
  calculateHeightShoppingCar()
}

function getProducts() {
  const url = 'https://jsonplaceholder.typicode.com/albums/1/photos?albumId=1'

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
      const article       = document.createElement('article')
      const imgContainer  = document.createElement('div')
      const img           = document.createElement('img')
      const title         = document.createElement('span')
      const price         = document.createElement('span')
      const addButton     = document.createElement('button')
      addButton.innerText = 'Añadir al carrtito '
      addButton.onclick = function(){
        addItem(product)
      }
      article.className = 'product'
      imgContainer.className = 'img-container'
      imgContainer.setAttribute(
        "style",
        `background-image:url(${product.thumbnailUrl});`
      )
      title.textContent = product.title
      price.textContent = product.price
      imgContainer.appendChild(img)
      article.appendChild(imgContainer)
      article.appendChild(title)
      article.appendChild(price)
      article.appendChild(addButton)
      parent.appendChild(article)
    })
  })
  .catch(error => console.error('Error:', error))
}

document.querySelector('body').addEventListener('click', function(e) {
  e.target.id === 'shopping-car' || e.target.localName === 'button'
  ? showHideList('block')
  : showHideList('none')
})
getProducts()
// if (products) {
  
//   for (let i = 0; i < products.length; i++) {
//     console.log('%c var', 'color:pink', products[i].name)
//   }
//   parent.appendChild(child)
// }
  
