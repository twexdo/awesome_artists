import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Divider,
    Box,
} from '@mui/material';
import { Logout, Person, Settings, Help } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
    username?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user, isAuthenticated, logoutUser } = useAuth()
    // Get initials from username
    const getInitials = (name: string): string => {
        return name
            ?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Add your logout logic here
        logoutUser()
        handleMenuClose();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Logo/Brand */}
                <Box width={35} mr={1} component="img" src="/ghost.png" alt=""/>
                <Typography variant="h6" sx={{ flexGrow: 1,fontWeight:700, fontFamily:'Rubik Wet Paint !important' }}>
                    Best Halloween Artist
                </Typography>

                {/* User Avatar and Dropdown */}
                {!!isAuthenticated &&
                    <div>
                        <IconButton onClick={handleMenuClick} color="inherit">
                            <Avatar sx={{ bgcolor: '#d76937' }}>
                                {getInitials(user?.name)}
                            </Avatar>
                        </IconButton>

                        {/* Dropdown Menu */}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem disabled>
                                <Typography variant="body1">{user?.name}</Typography>
                            </MenuItem>
                            <MenuItem disabled>
                                <Typography variant="body2">{user?.email}</Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleMenuClose}>
                                <Person fontSize="small" sx={{ mr: 1 }} />
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Settings fontSize="small" sx={{ mr: 1 }} />
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Help fontSize="small" sx={{ mr: 1 }} />
                                Help
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Logout fontSize="small" sx={{ mr: 1 }} color="error" />
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
