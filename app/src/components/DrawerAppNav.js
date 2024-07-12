import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DownloadsIcon from '@mui/icons-material/CloudDownload';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import {Outlet, useNavigate} from "react-router-dom"

const drawerWidth = 240;

function HideOnScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const DrawerAppNav = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const DrawerAppBar = ({setOpenDrawerItem, ...rest}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const imageItem = {
        img: '/images/NixtlaLogo.png',
        title: 'Nixtla',
    }
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <HideOnScroll {...rest}>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{mr: 2, ...(open && {display: 'none'})}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Tooltip title="Go to Nixtla TimeGPT Website">
                            <IconButton
                                href="https://www.nixtla.io/timegpt"
                                style={{
                                    margin: '0 1em 0 0',
                                }}
                            >
                                <img
                                    srcSet={`${imageItem.img}?w=162&auto=format&dpr=2 2x`}
                                    src={`${imageItem.img}?w=162&auto=format`}
                                    alt={imageItem.title}
                                    loading="lazy"
                                    style={{
                                        borderBottomLeftRadius: 4,
                                        borderBottomRightRadius: 4,
                                        display: 'block',
                                        width: '100%',
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="h6" noWrap component="div">
                            Monitoring & Observability for Nixtla
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    <ListItem key={'ddshboard'} disablePadding>
                        <ListItemButton onClick={() => navigate('/')}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Dashboard'}/>
                        </ListItemButton>
                    </ListItem>
                    <Divider/>
                    <ListItem key={'downloads'} disablePadding>
                        <ListItemButton onClick={() => navigate('downloads')}>
                            <ListItemIcon>
                                <DownloadsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Downloads'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'stargazers'} disablePadding>
                        <ListItemButton onClick={() => navigate('stargazers')}>
                            <ListItemIcon>
                                <StarIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Stars'}/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem key={'downloads-forecasts'} disablePadding>
                        <ListItemButton onClick={() => navigate('downloads-forecasts')}>
                            <ListItemIcon>
                                <DownloadsIcon/>
                                <TrendingUpIcon style={{transform: 'translate(0%, -10%)'}}/>
                            </ListItemIcon>
                            <ListItemText primary={'Download Forecasts'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'stargazers-forecasts'} disablePadding>
                        <ListItemButton onClick={() => navigate('stargazers-forecasts')}>
                            <ListItemIcon>
                                <StarIcon/>
                                <TrendingUpIcon style={{transform: 'translate(0%, -10%)'}}/>
                            </ListItemIcon>
                            <ListItemText primary={'Stars Forecasts'}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <DrawerAppNav open={open}>
                <DrawerHeader/>
                <Outlet/>
            </DrawerAppNav>
        </Box>
    );
}

export default DrawerAppBar