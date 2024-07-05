const apiKey = '44793600-36d61169e013a2e73008f0f0f';

export async function fetchImages(searchQuery) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
