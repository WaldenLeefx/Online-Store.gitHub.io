//let products = [];
//let filteredProducts = [];
let products = [
  { id: 1, name: "商品1", price: 99, category: "数码", image: "https://via.placeholder.com/200", description: "描述" },
  { id: 2, name: "商品2", price: 199, category: "服装", image: "https://via.placeholder.com/200", description: "描述" }
];
let filteredProducts = products;

populateCategories();
renderProducts();

// 加载商品数据
fetch('./products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    filteredProducts = products;
    populateCategories();
    renderProducts();
  });

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

    // 点击商品卡片显示详情
    card.addEventListener('click', () => openModal(p));

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

function filterProducts(keyword, category) {
  filteredProducts = products.filter(p => {
    const matchCategory = category === 'all' || p.category === category;
    const matchKeyword = p.name.toLowerCase().includes(keyword) || p.description.toLowerCase().includes(keyword);
    return matchCategory && matchKeyword;
  });
  renderProducts();
}

// 弹窗逻辑
const modal = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModal');

function openModal(product) {
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalPrice').textContent = `￥${product.price}`;
  document.getElementById('modalDescription').textContent = product.description;
  modal.style.display = 'flex';
}

// 关闭弹窗
closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});


