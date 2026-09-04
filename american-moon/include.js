document.addEventListener("DOMContentLoaded", async () => {
  const includes = document.querySelectorAll("[data-include]");

  for (const element of includes) {
    const file = element.dataset.include;

    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(response.statusText);

      element.innerHTML = await response.text();

      const button = document.getElementById("darkToggle");

      if (button) {
        button.textContent =
          localStorage.getItem("darkMode") === "enabled"
            ? "🔆"
            : "🌙";
      }

    } catch (err) {
      element.innerHTML = "<p>Failed to load table.</p>";
      console.error(err);
    }
  }
});
