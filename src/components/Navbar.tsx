'use client';
import { Menu, ShoppingCart } from '@mui/icons-material';
import { Badge, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

import { useStore } from '@/providers/store.provider';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const navLinks = [
  { href: '/', title: 'Accueil' },
  { href: '/gallery', title: 'Gallerie' },
  { href: '/profile', title: 'Profile' },
  { href: '/contact', title: 'Contact' },
];

export default function Navbar() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const storeContext = useStore();

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      style={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        fontFamily: 'roboto',
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <span className="font-black ml-3 mt-3 text-xl">Khindelvert Em</span>
      <List>
        {navLinks.map(({ href, title }) => (
          <Link href={href} key={`nav-mob-${title}`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <header className="sticky top-0 z-10">
      <div className="h-16 bg-white shadow-lg flex justify-start md:justify-center items-center">
        {/* Web */}
        <div style={{ fontFamily: 'roboto' }} className="hidden md:block">
          {navLinks.map(({ href, title }) => (
            <Link
              href={href}
              key={`nav-web-${title}`}
              className="duration-200 font-medium text-sm text-zinc-950 hover:text-zinc-500"
              style={{ paddingRight: 15, paddingLeft: 15 }}>
              {title}
            </Link>
          ))}
        </div>
        {/* Mobile */}
        <div style={{ fontFamily: 'roboto' }} className="md:hidden block ml-5">
          <IconButton onClick={toggleDrawer('left', true)}>
            <Menu />
          </IconButton>
        </div>
        <Link href="/cart" style={{ position: 'absolute', right: 50 }}>
          <Badge badgeContent={storeContext?.cart.length} color="error">
            <Button variant="contained" color="error" className="rounded-2xl bg-red-500">
              <ShoppingCart />
              <div className="hidden md:block">Cart</div>
            </Button>
          </Badge>
        </Link>
      </div>

      {/* Mobile Drawer*/}
      <React.Fragment key="left">
        <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </React.Fragment>
    </header>
  );
}
