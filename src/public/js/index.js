const form = document.getElementById('addProduct');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ajustar según tus necesidades
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        alert('Producto agregado correctamente')
      })
      .catch(error => {
        alert('Error al enviar la solicitud:', error);
      });
});