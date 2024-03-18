import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

export default function MenuListComposition({ circle, open, onClose }) {
  const handleClose = () => {
    onClose();
  };

  const menuStyle = {
    position: 'absolute',
    left: circle ? circle.x + 50 + 'px' : 'unset',
    top: circle ? circle.y + 20 + 'px' : 'unset',
    backgroundColor: 'white',
    padding: '8px',
    borderRadius: '20px',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.5s ease-in-out, top 1s ease-in-out, left 1s ease-in-out', 
  };

  return (
    <div>
      {open && (
        <div id="composition-menu" style={menuStyle}>
          <MenuList autoFocusItem={open} onKeyDown={(event) => event.stopPropagation()} style={{ fontSize: '14px' }}>
            <MenuItem onClick={handleClose}>Waldo</MenuItem>
            <MenuItem onClick={handleClose}>Oldwin</MenuItem>
            <MenuItem onClick={handleClose}>Wizard</MenuItem>
          </MenuList>
        </div>
      )}
    </div>
  );
}