import React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from '../features/cartSlice';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {

  const count = useSelector(selectCount);

  return (
    <div className='bg-transparent absolute w-full'>
      <div className='p-7 flex items-center justify-between'>
        <div className='text-lg tracking-widest'>Shopkaro</div>
        <div className='hidden sm:block'>
            <ul className='flex items-center justify-evenly space-x-12'>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>About</li>
                <li className='cursor-pointer'>Contact</li>
                <li className='cursor-pointer'>Cart <span className='bg-red-600 rounded-full text-sm px-1'>{count}</span></li>
            </ul>
        </div>
        <div className='block sm:hidden'>
          <MenuIcon sx={{cursor:'pointer'}}/>
        </div>
      </div>
    </div>
  )
}

export default Header
