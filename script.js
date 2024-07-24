document.addEventListener('DOMContentLoaded', function () {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
      .then(response => response.json())
      .then(data => {
        const menProductsContainer = document.getElementById("menProducts");
        const womenProductsContainer = document.getElementById("womenProducts");
        const kidsProductsContainer = document.getElementById("kidsProducts");

        // Clear containers before appending new products
        menProductsContainer.innerHTML = '';
        womenProductsContainer.innerHTML = '';
        kidsProductsContainer.innerHTML = '';

        data.categories.forEach(category => {
          category.category_products.forEach(product => {
            const card = createProductCard(product);

            switch (category.category_name) {
              case 'Men':
                menProductsContainer.appendChild(card);
                break;
              case 'Women':
                womenProductsContainer.appendChild(card);
                break;
              case 'Kids':
                kidsProductsContainer.appendChild(card);
                break;
            }
          });
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    function createProductCard(product) {
      const card = document.createElement("div");
      card.className = "card";

      const comparePrice = parseFloat(product.compare_at_price);
      const currentPrice = parseFloat(product.price);
      const percentageDifference = ((comparePrice - currentPrice) / comparePrice) * 100;

      let categoryBadge = '';
      if (product.badge_text) {
        categoryBadge = `<div class="category">${product.badge_text}</div>`;
      }

      card.innerHTML = `
        <div class="productgrid-image"><img src="${product.image}" class="image-size" alt="${product.title}" /></div>
        <div class="dynamic-card">
          <div class="productgrid-desc">
              <div class="title productgrid-title">${product.title}</div>
               <div><ul><li>${product.vendor}</li></ul></div>
         </div>
         
         <div class="productgird-details">
          ${categoryBadge}
          <div class="price">Rs.${product.price}.00</div>
          <div class="vendor">Rs.${product.compare_at_price}.00</div>
          <div class="percentage-difference">${percentageDifference.toFixed(0)}% Off</div>
         </div>
          <button class="btn-button">Add to Cart</button>
        </div>
      `;

      return card;
    }

    window.showCategory = function (categoryName) {
      document.getElementById("menProducts").style.display = "none";
      document.getElementById("womenProducts").style.display = "none";
      document.getElementById("kidsProducts").style.display = "none";

      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

      document.getElementById(`${categoryName.toLowerCase()}Products`).style.display = "flex";
      document.querySelector(`.tab-btn[onclick="showCategory('${categoryName}')"]`).classList.add('active');
    }
  });
