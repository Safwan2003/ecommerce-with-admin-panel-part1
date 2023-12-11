import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="flex justify-around p-5"
      >
        <ul className="flex  p-5  space-x-10 ">
          <li className="">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
        <Link to="/signin"><button className="bg-green-100 p-2 rounded-lg drop-shadow-2xl">Login</button>
        </Link>
        <Link to="/adminsignin"><button className="bg-yellow-100 p-2 rounded-lg drop-shadow-2xl">Admin</button>
        </Link>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;