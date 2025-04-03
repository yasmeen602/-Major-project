import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../Logo";
import { useSelector } from 'react-redux';
const Header = () => {
 

  const authStatus = useSelector((state)=>state.auth.Status);
  const naviage = useNavigate();
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
          
      },
        {
           name: "Signup",
          slug: "/signup",
          active: !authStatus,
       },
        {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
     },
     {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
];
  return (
  <header className="py-3 shadow text-white">
    <nav className="flex">
        <div className="mr-4">
       <Link to={"/"}>
       <Logo width="200px" />
       </Link>
        </div>
        <ul className="flex ml-auto">
          {navItems.map((item) => {
            return  item.active ? (
             

              <li key={item.name}>
                <button 
                onClick={()=> naviage(item.slug)} 
                className="inline-block px-6 py-2 hover:bg-blue-100 "
                >
                {item.name}
                </button>
              </li>
              
          ) : null;
          })}
          {
            <li>
              
            </li>
          }
        </ul>
    </nav>
  </header>
  );
};
export default Header;

