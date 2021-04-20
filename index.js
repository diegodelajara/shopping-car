function disableButton(item, type) {
  const productButton = document.querySelector(`#product-${item.imdbID} button`)
  if (type) {
    productButton.setAttribute('disabled', 'disabled')
  } else {
    if (productButton.hasAttribute('disabled')) {
      productButton.removeAttribute('disabled')
    }
  }
}
function removeShoppingCar() {
  cleanShoppingCar()
  drawShoppingCar()
  updateCount()
}

function getProductAdded() {
  return document.querySelector('#products-added')
}

function getListProductAdded() {
  return document.querySelector('#products-added .list')
}

function getButtonProductAdded() {
  return document.getElementById('btn-vaciar')
}

function calculateHeightShoppingCar() {
  const lengthContainer = getAllShoppingCarProducts().length || 1
  getProductAdded().style.height = lengthContainer * 90 + 'px'
}

function cleanShoppingCar() {
  localStorage.removeItem('shopping-car')
}

function drawShoppingCar() {
  getListProductAdded().textContent = ''
  const shoppingCar = getAllShoppingCarProducts()
  if (shoppingCar.length !== 0) {
    if (!shoppingCar.length) {
      buildShoppingCarItem(shoppingCar)
    } else if(shoppingCar.length > 0) {
      shoppingCar.forEach(element => {
        buildShoppingCarItem(element)
      })
    }
  } else {
    cleanShoppingCar()
  }
}

function buildList() {
  const list = JSON.parse(localStorage.getItem('res'))
  const parent = document.getElementById('product-list')
  list.map(product => {
    const article       = document.createElement('article')
    const imgContainer  = document.createElement('div')
    const title         = document.createElement('span')
    const year          = document.createElement('span')
    const addButton     = document.createElement('button')
    addButton.innerText = 'Añadir al carrtito '
    addButton.onclick = function(){
      addItem(product)
    }
    article.id = `product-${product.imdbID}`
    article.className = 'product'
    imgContainer.className = 'img-container'
    imgContainer.setAttribute(
      "style",
      `background-image:url(${product.Poster});`
    )
    title.textContent = product.Title
    year.textContent = product.Year
    article.appendChild(imgContainer)
    article.appendChild(title)
    article.appendChild(year)
    article.appendChild(addButton)
    parent.appendChild(article)
  })
}

function buildShoppingCarItem(item) {
  const list    = getListProductAdded()
  const div     = document.createElement('div')
  const img     = document.createElement('img')
  const span    = document.createElement('span')
  const button  = document.createElement('button')
  img.src = item.Poster
  span.innerText = item.Title
  button.innerText = 'Eliminar'
  button.onclick = function(){
    removeItem(item)
  }
  div.className = 'shopping-car-product'
  div.appendChild(img)
  div.appendChild(span)
  div.appendChild(button)
  list.appendChild(div)
}

function getAllShoppingCarProducts() {
  return JSON.parse(localStorage.getItem('shopping-car')) || []
}
function updateShoppingCarProducts(array) {
  array.length
    ? array.map(item => addItem(item))
    : cleanShoppingCar()
    updateCount()
}

function updateCount() {
  document.querySelector('.badge').innerText = 0
  const btn = '<button type="button" onclick="removeShoppingCar()">Vaciar</button>'
  const productsAdded = getListProductAdded()
  const getAll = getAllShoppingCarProducts()
  let total = getAll.length

  if (getAll?.imdbID) {
    document.querySelector('.badge').innerText = 1
    getButtonProductAdded().innerHTML = btn
  } else { 
    if (total === 0) {
      const msg = '<span>Carrito vacio</span>'
      productsAdded.innerHTML = msg
      getButtonProductAdded().innerHTML = ''
    } else {
      getProductAdded().style.display = 'block'
      getProductAdded().style.justifyContent = ''
      getButtonProductAdded().innerHTML = btn
      document.querySelector('.badge').innerText = total
    }
  }
}

function showHideList(style) {
  calculateHeightShoppingCar()
  // drawShoppingCar()
  getProductAdded().style.display = style
}

function removeItem(product) {
  const total = getAllShoppingCarProducts()
  const newTotal = total.filter(item => item.imdbID !== product.imdbID)
  localStorage.setItem('shopping-car', JSON.stringify(newTotal))
  drawShoppingCar()
  updateCount()
  disableButton(product, false)
}

function addItem(item) {
  let shoppingCar = []
  const currentListProducts = localStorage.getItem('shopping-car')
  // Es la primera vez que se agrega un item
  if (!currentListProducts) {
    localStorage.setItem('shopping-car', JSON.stringify(item))
  } else {
    let currentJson = JSON.parse(currentListProducts) 
    if (currentJson.length > 1) {
      currentJson.push(item)
      localStorage.setItem('shopping-car', JSON.stringify(currentJson))
    } else {
      shoppingCar.push(currentJson)
      shoppingCar.push(item)
      localStorage.setItem('shopping-car', JSON.stringify(shoppingCar))
    }
  }
  disableButton(item, true)
  updateCount()
  drawShoppingCar()
}

function getProducts() {
  const apikey = '743dd67b'
  const page = 1
  const url = `https://www.omdbapi.com/?apikey=${apikey}&s=movie&page=${page}`
  // const url = `https://jsonplaceholder.typicode.com/albums/1/photos?albumId=1`

  fetch(url, {
    method: 'GET'
  })
  .then(res => res.json())
  .then(function(data) {
    localStorage.setItem('res', JSON.stringify(data.Search))
    return buildList()
  })
  .catch(error => console.error('Error:', error))
}

document.querySelector('body').addEventListener('click', function(e) {
  e.target.id === 'shopping-car' || e.target.innerText === 'Eliminar'
    ? showHideList('block')
    : showHideList('none')
})
calculateHeightShoppingCar()
drawShoppingCar()
updateCount()
getProducts()
  
