import {useState} from "react";
import {Box, ClickAwayListener, InputAdornment, Popper, TextField, Typography} from "@mui/material";
import {countries} from "../constants/countries.js";
import {parsePhoneNumberFromString} from 'libphonenumber-js';
import globe from "../assets/globe.svg";


const SuperPhoneInput = () => {

    function getCountryCodeFromNumber(partialNumber) {
        // Parse the phone number to extract details
        const phoneNumber = parsePhoneNumberFromString(partialNumber, null); // null allows global parsing

        if (phoneNumber) {
            return phoneNumber.country
        } else {

            return '';
        }
    }

    const getCountryNameByCode = (code) => {
        const country = countries.find((item) => item.code === code.toUpperCase());
        return country ? country.label : null;
    };
    const getCountryPhoneByCode = (code) => {
        const country = countries.find((item) => item.code === code.toUpperCase());
        return country ? country.phone : '';
    };


    const [code, setCode] = useState("ua");
    const [searchValue, setSearchValue] = useState(getCountryNameByCode(code))
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [phoneValue, setPhoneValue] = useState('+' + getCountryPhoneByCode(code));
    const [isValidPhone, setValidPhone] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);

    };
    const handleClose = () => {
        setOpen(false);
    }
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    // Filter countries based on the input value
    const filteredCountries = countries.filter((country) =>
        country.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleCountryChange = (code) => {
        setCode(code);
        setSearchValue(getCountryNameByCode(code));
        setPhoneValue('+' + getCountryPhoneByCode(code));
        handleClose()
    }
    const handlePhoneChange = (e) => {
        if (/^[0-9+-]*$/.test(e.target.value)) {
            setPhoneValue(e.target.value);
        }

        const res = getCountryCodeFromNumber(e.target.value);
        if (res) {
            setCode(res)
            setSearchValue(getCountryNameByCode(res));

            const parsedNumber = parsePhoneNumberFromString(e.target.value, res)
            if (parsedNumber && parsedNumber.isValid()) {
                console.log(parsedNumber);
                setValidPhone(true);
            } else {
                setValidPhone(false);
            }

        } else {
            setCode('')
            setValidPhone(false);
            setSearchValue('')
        }
    }


    return (
        <>
            <Box component='div'
                 sx={{
                     padding: '8px',

                     display: 'flex',
                     alignItems: 'center',
                 }}
            >


                <TextField sx={{
                    "& .MuiOutlinedInput-root": {
                        // Target the input root
                        padding: "0px", // Remove any extra padding
                        "& input": {
                            padding: "10px 8px", // Set custom padding for the input text
                        },
                    },
                }}

                           placeholder={'Phone number'}
                           value={phoneValue}
                           onChange={handlePhoneChange}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <Box component='img'
                                            onClick={handleClick}
                                            loading="lazy"
                                            width="20"
                                            height="28"
                                            srcSet={code !== '' ? `https://flagcdn.com/w40/${code.toLowerCase()}.png 2x` : globe}
                                            src={code !== '' ? `https://flagcdn.com/w20/${code.toLowerCase()}.png` : globe}
                                            alt=""
                                            sx={{marginLeft: '8px', cursor: 'pointer'}}
                                       />
                                   </InputAdornment>
                               ),
                               // You can also use 'endAdornment' for icons at the end
                           }}
                />

            </Box>
            <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose}>
                    <Box
                        sx={{
                            marginTop: '18px',
                            background: 'white',
                            border: '1px solid black',
                            width: '200px',
                            padding: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 1,
                        }}
                    >
                        <TextField value={searchValue} placeholder={'search'} onChange={handleInputChange} fullWidth/>
                        <Box component='ul'
                             sx={{maxHeight: '150px', overflow: 'scroll', listStyle: 'none', padding: 0, margin: 0}}>
                            {filteredCountries.map((country) => (
                                <Box
                                    component='li'
                                    key={country.code}
                                    onClick={() => handleCountryChange(country.code)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                        }
                                    }}
                                >
                                    <Box component='img'
                                         onClick={handleClick}
                                         loading="lazy"
                                         width="20"
                                         height="28"
                                         srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                         src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                         alt=""
                                    />
                                    {country.label}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </ClickAwayListener>
            </Popper>
            <Typography>
                {!isValidPhone && 'invalid phone number'}
            </Typography>
        </>
    );
}
export default SuperPhoneInput;
