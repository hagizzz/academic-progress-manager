import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/img/Logo-Math-CS-cyan-192.png'
import Menu from './Menu'
import Header from '../components/Header'

function NavBar(props) {
    return (
        <div className="drawer lg:drawer-open ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side border-r border-solid z-50">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="menu min-h-full bg-base-200 text-base-content m-0 p-0 z-10">
                    <p className="text-lg uppercase font-bold ml-4 mr-6 my-6">
                        <img src={Logo} alt="logo-math" className="w-20 rounded avatar pr-3" />
                        Khoa Toán - Tin học
                    </p>
                    <Menu />
                </div>
            </div>
            <div className="drawer-content flex flex-col">
                <label
                    htmlFor="my-drawer-2"
                    className="btn drawer-button lg:hidden -top-2 left-0 mt-4 mr-2 absolute z-30"
                >
                    <FontAwesomeIcon icon={faBars} />
                </label>
                <Header />
                {props.children}
            </div>
        </div>
    )
}

export default NavBar
