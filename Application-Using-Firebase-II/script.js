let currentPage = 1;

async function fetchCharacters(page) {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await res.json();

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    data.results.slice(0, 6).forEach(character => {
      gallery.innerHTML += `
        <div class="card">
          <img src="${character.image}" />
          <h3>${character.name}</h3>
          <p>${character.species}</p>
          <p>${character.status}</p>
          <a href="character.html?id=${character.id}" target="_blank">View Details</a>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error fetching characters:', error);
    document.getElementById('gallery').innerHTML = `<p>Error loading characters.</p>`;
  }
}

function nextPage() {
  currentPage++;
  fetchCharacters(currentPage);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
}

fetchCharacters(currentPage);
