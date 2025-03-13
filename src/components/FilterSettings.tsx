import React, { useState } from 'react';
import { 
  Slider, Typography, FormControl, InputLabel, Select, MenuItem, Button 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WcIcon from '@mui/icons-material/Wc';
import '../assets/styles/filterSettings.scss';

const FilterSettings: React.FC = () => {
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(60);
  const [gender, setGender] = useState<string>('both');
  const [maxPhotos, setMaxPhotos] = useState<number>(10);

  // Handleri za promene
  const handleMaxDistanceChange = (_: Event, newValue: number | number[]) => setMaxDistance(newValue as number);
  const handleMinAgeChange = (_: Event, newValue: number | number[]) => setMinAge(newValue as number);
  const handleMaxAgeChange = (_: Event, newValue: number | number[]) => setMaxAge(newValue as number);
  const handleGenderChange = (event: any) => setGender(event.target.value as string);
  const handleMaxPhotosChange = (_: Event, newValue: number | number[]) => setMaxPhotos(newValue as number);

  return (
    <div className="filter-settings-container">
      <h2 className="filter-settings-title">🔍 Advanced Search Filters</h2>

      {/* Maksimalna udaljenost */}
      <div className="filter-setting">
        <Typography gutterBottom>
          <LocationOnIcon sx={{ color: "#ff4d4d" }} /> Max Distance: {maxDistance} km
        </Typography>
        <Slider
          value={maxDistance}
          min={1}
          max={100}
          step={1}
          onChange={handleMaxDistanceChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} km`}
          sx={{
            color: "#ff4d4d",
            '& .MuiSlider-thumb': { backgroundColor: "#ff4d4d" },
            '& .MuiSlider-track': { backgroundColor: "#ff4d4d" },
            '& .MuiSlider-rail': { backgroundColor: "#ffb3b3" }
          }}
        />
      </div>

      {/* Raspon godina */}
      <div className="filter-setting">
        <Typography gutterBottom>📅 Age Range: {minAge} - {maxAge}</Typography>
        <div className="age-slider-container">
          <Slider
            value={minAge}
            min={18}
            max={100}
            step={1}
            onChange={handleMinAgeChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            sx={{
              color: "#ff4d4d",
              '& .MuiSlider-thumb': { backgroundColor: "#ff4d4d" },
              '& .MuiSlider-track': { backgroundColor: "#ff4d4d" },
              '& .MuiSlider-rail': { backgroundColor: "#ffb3b3" }
            }}
            style={{ flex: 1 }}
          />
          <Slider
            value={maxAge}
            min={18}
            max={100}
            step={1}
            onChange={handleMaxAgeChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            sx={{
              color: "#ff4d4d",
              '& .MuiSlider-thumb': { backgroundColor: "#ff4d4d" },
              '& .MuiSlider-track': { backgroundColor: "#ff4d4d" },
              '& .MuiSlider-rail': { backgroundColor: "#ffb3b3" }
            }}
            style={{ flex: 1 }}
          />
        </div>
      </div>

      {/* Pol */}
      <div className="filter-setting">
        <Typography gutterBottom>
          <WcIcon sx={{ color: "#ff4d4d" }} /> Gender Preference
        </Typography>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#ff4d4d" }}>Gender</InputLabel>
          <Select
            value={gender}
            label="Gender"
            onChange={handleGenderChange}
            sx={{
              color: "#ff4d4d",
              '& .MuiOutlinedInput-notchedOutline': { borderColor: "#ff4d4d" },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: "#cc0000" }
            }}
          >
            <MenuItem value="both">Both</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Maksimalni broj fotografija */}
      <div className="filter-setting">
        <Typography gutterBottom>📸 Max Photos: {maxPhotos}</Typography>
        <Slider
          value={maxPhotos}
          min={1}
          max={20}
          step={1}
          onChange={handleMaxPhotosChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}`}
          sx={{
            color: "#ff4d4d",
            '& .MuiSlider-thumb': { backgroundColor: "#ff4d4d" },
            '& .MuiSlider-track': { backgroundColor: "#ff4d4d" },
            '& .MuiSlider-rail': { backgroundColor: "#ffb3b3" }
          }}
        />
      </div>

      {/* Primeni dugme */}
      <div className="filter-settings-actions">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff4d4d",
            "&:hover": { backgroundColor: "#cc0000" },
          }}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSettings;
