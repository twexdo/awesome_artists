// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme(
    {
        "palette": {
            "mode": "dark",
            "primary": {
                "main": "#FF6D00",
                "light": "#FF9E40",
                "dark": "#C43C00",
                "contrastText": "#000000"
            },
            "secondary": {
                "main": "#6A1B9A",
                "light": "#9C4DCC",
                "dark": "#38006B",
                "contrastText": "#FFFFFF"
            },
            "error": {
                "main": "#D50000",
                "light": "#FF5131",
                "dark": "#9B0000"
            },
            "warning": {
                "main": "#FFB300",
                "light": "#FFE54C",
                "dark": "#C68400"
            },
            "info": {
                "main": "#00BCD4",
                "light": "#62EFFF",
                "dark": "#008BA3"
            },
            "success": {
                "main": "#00C853",
                "light": "#5EFF82",
                "dark": "#009624"
            },
            "background": {
                "default": "#1A1A1A",
                "paper": "#2D2D2D"
            },
            "text": {
                "primary": "#FFFFFF",
                "secondary": "rgba(255, 255, 255, 0.7)",
                "disabled": "rgba(255, 255, 255, 0.5)"
            }
        },
        "typography": {
            "fontFamily": "'Nosifer', 'Roboto', 'Helvetica', 'Arial', sans-serif",
            "h1": {
                "fontWeight": 600,
                "fontSize": "2.5rem",
                "letterSpacing": "0.02em"
            },
            "h2": {
                "fontWeight": 600,
                "fontSize": "2rem",
                "letterSpacing": "0.02em"
            },
            "h3": {
                "fontWeight": 500,
                "fontSize": "1.75rem"
            },
            "h4": {
                "fontWeight": 500,
                "fontSize": "1.5rem"
            },
            "h5": {
                "fontWeight": 500,
                "fontSize": "1.25rem"
            },
            "h6": {
                "fontWeight": 500,
                "fontSize": "1rem"
            },
            "button": {
                "textTransform": "none",
                "fontWeight": 600
            }
        },
        "shape": {
            "borderRadius": 8
        },
        "components": {
            "MuiButton": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": "8px",
                        "textTransform": "none",
                        "fontWeight": 600,
                        "padding": "8px 16px"
                    },
                    "contained": {
                        "boxShadow": "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }
                }
            },
            "MuiCard": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": "12px",
                        "boxShadow": "0 8px 16px rgba(0, 0, 0, 0.2)"
                    }
                }
            },
            "MuiPaper": {
                "styleOverrides": {
                    "root": {
                        "backgroundImage": "linear-gradient(rgba(255, 109, 0, 0.05), rgba(106, 27, 154, 0.05))"
                    }
                }
            },
            "MuiAppBar": {
                "styleOverrides": {
                    "root": {
                        "backdropFilter": "blur(8px)",
                        "backgroundColor": "rgba(26, 26, 26, 0.8)"
                    }
                }
            },
            "MuiTextField": {
                "styleOverrides": {
                    "root": {
                        "& .MuiOutlinedInput-root": {
                            "borderRadius": "8px"
                        }
                    }
                }
            }
        }
    }
);

export default theme;
