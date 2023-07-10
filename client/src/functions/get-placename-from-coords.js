import axios from 'axios';

export default async function getPlaceNameFromCoords (coords) {
    const axiosPromise = await axios.get(
        `http://localhost:3001/placename?lat=${coords.latitude}&long=${coords.longitude}`
    )
    return axiosPromise
}

// https://revgeocode.search.hereapi.com/v1/revgeocode?at=49.2827%2C-123.1207&lang=en-US&apiKey=4NV01zIdqahd8DiTIJrwFg9k3Zy8d5b1SiM8pg-ReSo