let products = [];
let filteredProducts = [];

// 加载商品数据
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    filteredProducts = products;
    populateCategories();
    renderProducts();
  });

// 填充分类下拉菜单
function populateCategories() {
  const categorySelect = document.getElementById('category');
  const categories = ['all', ...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// 渲染商品
function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  filteredProducts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-title">${p.name}</div>
      <div class="price">￥${p.price}</div>
      <p>${p.description}</p>
    `;
    grid.appendChild(card);
  });
}

// 搜索功能
document.getElementById('search').addEventListener('input', function(e) {
  const keyword = e.target.value.toLowerCase();
  filterProducts(keyword, document.getElementById('category').value);
});

// 分类功能
document.getElementById('category').addEventListener('change', function(e) {
  const category = e.target.value;
  filterProducts(document.getElementById('search').value.toLowerCase(), category);
});

// 筛选逻辑
function filterProducts(keyword, category) {
  filteredProducts = products.filter(p => {
    const matchCategory = category === 'all' || p.category === category;
    const matchKeyword = p.name.toLowerCase().includes(keyword) || p.description.toLowerCase().includes(keyword);
    return matchCategory && matchKeyword;
  });
  renderProducts();
}
