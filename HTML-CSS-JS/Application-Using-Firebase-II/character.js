function getCharacterId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

async function fetchCharacterDetails() {
  const id = getCharacterId();
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const char = await res.json();

    document.getElementById('character-detail').innerHTML = `
      <h1>${char.name}</h1>
      <img src="${char.image}" />
      <p>Status: ${char.status}</p>
      <p>Species: ${char.species}</p>
      <p>Type: ${char.type || "N/A"}</p>
      <p>Gender: ${char.gender}</p>
      <p>Origin: ${char.origin.name}</p>
      <p>Location: ${char.location.name}</p>
      <p>Appears in ${char.episode.length} episodes</p>
    `;
  } catch (error) {
    console.error('Error fetching character details:', error);
    document.getElementById('character-detail').innerHTML = `<p>Error loading character data.</p>`;
  }
}

function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString() + ' ' + now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

fetchCharacterDetails();
