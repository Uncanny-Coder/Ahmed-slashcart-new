// Put your application javascript here
// npx tailwindcss -i ./src/tailwind.css -o ./assets/application.css --watch


const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
const cartCountElement = document.getElementById("cart-count");

addToCartForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await fetch("/cart/add", {
        method: "POST",
        body: new FormData(form),
      });

      const res = await fetch("/cart.json");
      const cart = await res.json();

      if (cartCountElement) {
        cartCountElement.textContent = cart.item_count;
        cartCountElement.classList.toggle("hidden", cart.item_count === 0);
      }

      const message = document.createElement("p");
      message.classList.add("added-to-cart");
      message.textContent = "Added to cart!";
      form.appendChild(message);

      setTimeout(() => message.remove(), 2000);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  });
});

