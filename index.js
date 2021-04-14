
function updateCount() {
  const total = document.querySelectorAll('.shopping-car-product').length
  document.querySelector('.badge').innerText = total
}

function showHideList(style) {
  document.getElementById('products-added').style.display = style
}

function removeItem(item) {
  console.log('Eliminar ', item);
}

function addItem(item) {
  const list    = document.getElementById('products-added')
  const div     = document.createElement('div')
  const span    = document.createElement('span')
  const button  = document.createElement('button')
  span.innerText = item.name
  button.innerText = '-'
  button.onclick = function(){
    removeItem(item)
  }
  div.className = 'shopping-car-product'
  div.appendChild(span)
  div.appendChild(button)
  list.appendChild(div)
  updateCount()
}

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
      const article       = document.createElement('article')
      const imgContainer  = document.createElement('div')
      const img           = document.createElement('img')
      const name          = document.createElement('span')
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
        `background-image:url(${product.image});`
      )
      name.textContent = product.name
      price.textContent = product.price
      imgContainer.appendChild(img)
      article.appendChild(imgContainer)
      article.appendChild(name)
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
  
