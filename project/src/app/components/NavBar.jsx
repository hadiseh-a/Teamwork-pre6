'use client'

import {AppBar, Toolbar, Button, IconButton} from '@mui/material';
import { useRouter } from 'next/navigation';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export default function Navbar({toggleTheme}){
    const router = useRouter();

    return (
        <AppBar position='static' color='primary' sx={{mb:2}}>
            <Toolbar sx={{justifyContent:'space-between'}}>
                <div>
                    <Button color='inherit' onClick={()=>router.push('/')}>Home</Button>
                    <Button color='inherit' onClick={()=>router.push('/questions')}>Questions</Button>
                    <Button color='inherit' onClick={()=>router.push('/about')}>About</Button>
                </div>
                <IconButton color='inherit' onClick={toggleTheme}>
                    <Brightness4Icon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}