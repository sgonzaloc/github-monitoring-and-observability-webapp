import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const CustomSelect = ({label = '', data = [], onChange}) => {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value)
    }

    return (
        <Box sx={{minWidth: 230}} display="flex">
            <FormControl sx={{m: 1, minWidth: 230}}>
                <InputLabel id="demo-simple-select-label">
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={handleChange}
                    sx={{
                        '&.MuiInputBase-root': {
                            textAlign: 'left',
                            paddingLeft: '1.2em'
                        },
                    }}
                >
                    {data.map((elem) => <MenuItem key={elem.value} value={elem.value}>{elem.name}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}

export default CustomSelect