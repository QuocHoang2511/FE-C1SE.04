import icons from "./icon"

const  {HiOutlineUsers,HiOutlineHeart,HiOutlineLockClosed,HiOutlineBookmark} = icons
export const Menusidebar = [
    {
    
        path: '/profile',
        text: 'Thông Tin Cá Nhân ',
        icons: <HiOutlineUsers size={23}/>
    },
    {
    
        path: '/changePassword',
        text: 'Thay Đổi Mật Khẩu ',
        icons: <HiOutlineLockClosed size={23}/>
    },
    {
    
        path: '/contact',
        text: 'Liên Hệ',
        icons: <HiOutlineBookmark size={23}/>
    },
    
    
   
]
export default Menusidebar