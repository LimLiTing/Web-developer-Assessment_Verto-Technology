import { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

export default function Home() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:4000/countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
    };

    const handleMapClick = () => {
        if (selectedCountry) {
            window.open(`https://www.google.com/maps/search/${selectedCountry.name.common}`, '_blank');
        }
    };

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <div className="display_container">
                {selectedCountry ? (
                    <div className="country-details">
                        <div className="info">
                            <div className="info_row">
                                <h1>{selectedCountry.name.common}</h1>
                            </div>
                            <div className="info_row">
                                <h3>Capital:</h3>
                                <p>{selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}</p>
                            </div>
                            <div className="info_row">
                                <h3>Currency:</h3>
                                <p>{selectedCountry.currencies ? Object.keys(selectedCountry.currencies)[0] : 'N/A'}</p>
                            </div>
                            <button className="map-btn" onClick={handleMapClick}>
                                <FaMapMarkerAlt className="map-icon"/>Preview in Google Map
                            </button>
                        </div>
                        <img src={selectedCountry.flags.png} alt={`${selectedCountry.name.common} flag`} className="flag-img" />
                    </div>
                ) : (
                    <div className="country-details">
                        <div className="info">
                            <div className="info_row">
                                <h1>Your current country name</h1>
                            </div>
                            <div className="info_row">
                                <h3>Capital:</h3>
                                <p>Your capital</p>
                            </div>
                            <div className="info_row">
                                <h3>Currency:</h3>
                                <p>Your currency</p>
                            </div>
                            <button className="map-btn">
                                <FaMapMarkerAlt className="map-icon"/>Preview in Google Map
                                </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="search_container">
                <div className="search-wrapper">
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search for a country..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <ul className="country-list">
                    {filteredCountries.map((country) => (
                        <li key={country.cca3} onClick={() => handleCountryClick(country)}>
                            <img src={country.flags.png} alt={`${country.name.common} flag`} style={{ width: '20px', marginRight: '10px' }} />
                            {country.name.common}
                        </li>
                    ))}
                </ul>
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: space-between;
                    padding: 20px;
                }

                .display_container {
                    flex: 1;
                    margin-right: 20px;
                    border: 1px solid black;
                    border-radius: 10px;
                    padding: 20px;
                    display: flex;
                    align-items: flex-start;
                    width: 500px;
                }

                .country-details {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }

                .flag-img {
                    width: 200px;
                    height: 200px;
                    object-fit: contain;
                    margin-left: 20px;
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    padding: 30px;
                    flex: 1;
                }

                .info_row {
                    display: flex;
                    align-items: center;
                    margin: 10px 0;
                }

                .info_row h3 {
                    margin-right: 10px;
                    min-width: 100px;
                }

                .map-icon {
                    margin-right: 50px;
                }

                .map-btn {
                    display: flex;
                    align-items: center;
                    margin: 20px auto 0;
                    padding: 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    text-align: center;
                    width: 400px;
                }

                .map-btn:hover {
                    background-color: #0056b3;
                }

                .search_container {
                    flex: 1;
                    width: 500px;
                    text-align: left;
                    background-image: url('searchicon.png');
                }

                .search-wrapper {
                    position: relative;
                    width: 500px;
                    margin-bottom: 20px;
                }

                .search-wrapper input {
                    width: 500px;
                    padding: 10px 40px 10px 20px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                }

                .country-list {
                    list-style-type: none;
                    padding: 0;
                    max-height: 150px;
                    overflow-y: auto;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                li {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    padding: 5px 10px;
                }

                li:hover {
                    background-color: #f0f0f0;
                }
            `}</style>
        </div>
    );
}