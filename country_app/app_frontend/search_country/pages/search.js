import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CountryDetails() {
    const router = useRouter();
    const { code } = router.query;
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (code) {
            const fetchCountry = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/countries`);
                    const countryData = response.data.find(c => c.cca3 === code);
                    setCountry(countryData);
                } catch (error) {
                    console.error('Error fetching country details:', error);
                }
            };

            fetchCountry();
        }
    }, [code]);

    if (!country) return <div>Loading...</div>;

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            <p>Population: {country.population}</p>
        </div>
    );
}
