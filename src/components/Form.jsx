import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'


const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`


const Form = () => {
    const [city, setCity] = useState("")
    const [error, setError] = useState({
        error: false,
        message: "",
    });
    const [loading, setLoading] = useState(false)
    const [weather, setWeather] = useState({
        city: "",
        country: "",
        temp: "",
        condition: "",
        icon: "",
        conditionText: "",

    })




    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError({
            error: false,
            message: "",
        })
        try {
            if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };
            const response = await fetch(`${API_WEATHER}${city}`)
            const data = await response.json();

            if (data.error) throw { message: data.error.message };


            setWeather({
                city: data.location.name,
                country: data.location.country,
                temp: data.current.temp_c,
                condition: data.current.condition.code,
                icon: data.current.condition.icon,
                conditionText: data.current.condition.text,
            });

        } catch (error) {

            setError({
                error: true,
                message: error.message,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Box
                sx={{ display: "grid", gap: 2 }}
                component="form"
                autoComplete="off"
                onSubmit={onSubmit}
            >
            <TextField
                    id="city"
                    label="Ciudad"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    error={error.error}
                    helperText={error.message}
            />

            <Button
                    variant="contained"
                    type="submit"
                    loading={loading}
                    loadingIndicator="Cargando..."
            >Buscar
            </Button>

            </Box>


            {weather.city && (
                <Box
                    sx={{
                        mt: 2,
                        display: "grid",
                        gap: 2,
                        textAlign: "center",
                    }}
                >
                <Typography variant="h4" componente="h2">
                        {weather.city}, {weather.country}
                </Typography>

                <Box
                        component="img"
                        alt={weather.conditionText}
                        src={weather.icon}
                        sx={{ margin: "0 auto" }}
                    />
                    <Typography variant="h5" component="h3">
                        {weather.temp} °C
                    </Typography>
                    <Typography variant="h6" component="h4">
                        {weather.conditionText}
                    </Typography>
                </Box>
            )}

        </>)
}

export default Form