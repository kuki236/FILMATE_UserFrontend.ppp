const DEFAULT_API_URL = '/api';

const API_BASE_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const raw = await response.text().catch(() => '');
    let message = raw || `Request failed with status ${response.status}`;
    try {
      const parsed = raw ? JSON.parse(raw) : null;
      message = parsed?.detail || parsed?.message || message;
    } catch {
      // Keep the raw response text when the body is not JSON.
    }

    throw new Error(message);
  }

  return response.json();
}

const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return 'Por definir';

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours <= 0) return `${minutes} min`;
  return `${hours}h ${rest.toString().padStart(2, '0')}min`;
};

export function normalizeMovie(movie) {
  return {
    id: movie.id_pelicula,
    titulo: movie.titulo,
    genero: movie.genero || 'Cartelera',
    duracion: formatDuration(movie.duracion_minutos),
    clasificacion: movie.clasificacion_edad || 'APT',
    rating: movie.rating ?? ((movie.id_pelicula % 5) + 1),
    imagenPoster: movie.url_poster || '',
    imagenTrailer: movie.url_trailer || movie.url_poster || '',
    trailerUrl: movie.url_trailer || '',
    trailer: 'TRÁILER OFICIAL',
    sinopsis: movie.sinopsis || 'Sinopsis próxima a actualizar.',
    director: movie.director || 'Por definir',
    reparto: movie.reparto || 'Por definir',
    estreno: movie.categoria_cartelera === 'Estreno',
    categoriaCartelera: movie.categoria_cartelera,
    estadoRegistro: movie.estado_registro,
    fechaCreacion: movie.fecha_creacion,
  };
}

export function normalizeCinema(cinema) {
  return {
    id: cinema.id_cine,
    nombre: cinema.nombre,
    direccion: cinema.direccion || 'Dirección por definir',
    ciudad: cinema.ciudad || '',
    horarios: cinema.horarios || 'Lunes a Domingo - 10:00 a.m. a 10:00 p.m.',
    estado: cinema.estado,
  };
}

export async function getMovies() {
  const data = await request('/movies/');
  return Array.isArray(data) ? data.map(normalizeMovie) : [];
}

export async function getMovieById(movieId) {
  const data = await request(`/movies/${movieId}`);
  return normalizeMovie(data);
}

export async function getCinemas() {
  const data = await request('/cinemas/');
  return Array.isArray(data) ? data.map(normalizeCinema) : [];
}

export async function registerUser(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export { API_BASE_URL };
