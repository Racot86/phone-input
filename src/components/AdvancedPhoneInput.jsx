import {flags} from "../utils/functions.js";
import {countries} from "../constants/countries.js";
import {Box, ClickAwayListener, InputAdornment, Popper, TextField, Typography} from "@mui/material";
import globeIcon from "../assets/globe.svg";
import {useRef, useState} from "react";

const AdvancedPhoneInput = ({
                                sx,
                            })=>{
    //input staff
    const flagData = flags();
    console.log(countries);
    const inputRef = useRef();
    const [open, setOpen] = useState(false);
    const [animationStyle, setAnimationStyle] = useState({});
    const [countryCode, setCountryCode] = useState("");
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [searchQuery, setSearchQuery] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const getFilteredCountries =(searchValue)=> {
        setFilteredCountries(countries.filter(
            (country) =>
                country.label.toLowerCase().includes(searchValue.toLowerCase())
        ));
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        getFilteredCountries(event.target.value);
    };

    const handleCountryClick = (country) => {
        setSearchQuery('');
        setCountryCode(country.code);
        setPhoneNumber('+' + country.phone);
        getFilteredCountries('');

        setOpen(false)
    }

    const handleToggle = () => {
        if (!open) {
            setAnimationStyle({
                transform: "translateY(-20px)",
                opacity: 0,
            });
            setTimeout(() => {
                setAnimationStyle({
                    transform: "translateY(0)",
                    opacity: 1,
                    transition: "transform 300ms ease, opacity 300ms ease",
                });
            }, 0);
        } else {
            setAnimationStyle({
                transform: "translateY(-20px)",
                opacity: 0,
                transition: "transform 300ms ease, opacity 300ms ease",
            });
        }
        setOpen((prev) => !prev);
    };
    //EOF input staff

    //engagement with formik



    return (
        <Box>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                ref={inputRef}
                value={phoneNumber}
                onChange={(e)=>{setPhoneNumber(e.target.value)}}
                sx={{
                    ...sx
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <img
                                style={{
                                    borderRadius:'2px',
                                    cursor:'pointer',
                                }}
                                width={27}
                                height={20}
                                src={countryCode?flagData[countryCode]:globeIcon}
                                onClick={handleToggle}
                                alt={'flag'}
                            />
                        </InputAdornment>
                    ),
                }}
            />

            <Popper
                 open={open}
                 anchorEl={inputRef.current}
                 placement="bottom-start"
                 sx={{
                     width:inputRef.current ? inputRef.current.offsetWidth : "auto",
                     ...animationStyle,
                }}
            >
                <ClickAwayListener onClickAway={handleToggle}>
                <Box
                    sx={{
                        p:1,
                        bgcolor: 'background.paper',
                        maxHeight:'250px',
                        borderBottom:'1px solid lightgray',
                        border:'1px solid lightgray',
                        borderRadius:'8px',
                        marginTop:'4px'
                    }}
                >
                    <TextField
                        value={searchQuery}
                        onChange={handleSearchChange}
                        variant="standard" // Use the standard variant for the line underneath
                        placeholder='search'
                        fullWidth
                        sx={{
                            marginBottom:'4px'
                        }}
                    />
                    <Box
                        component="ul"
                        sx={{
                            padding:'4px 0 4px',
                            margin:0,
                            maxHeight:'200px',
                            overflowY:'scroll',

                        }}
                    >
                        {filteredCountries.map((country) => (
                            <Box
                                onClick={() => {handleCountryClick(country)}}
                                component='li'
                                key={country.code}
                                sx={{
                                    display:'flex',
                                    gap:'4px',
                                    marginRight:'8px',
                                    '&:hover': {
                                        backgroundColor:'lightgray',
                                    }
                                }}

                            >
                                <img
                                    style={{
                                        borderRadius:'2px',
                                        cursor:'pointer',
                                    }}
                                    src={flagData[country.code]}
                                    alt={country.code}
                                    width={27}
                                    height={20}
                                />
                                <Typography
                                    noWrap
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {country.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                    </ClickAwayListener>
            </Popper>

        </Box>
    )
}
export default AdvancedPhoneInput;