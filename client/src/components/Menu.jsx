import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faGear,
    faDoorClosed,
    faFileLines,
    faGraduationCap,
    faUserGroup,
    faBook,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'

const navItems = [
    {
        value: 'Bảng điều khiển',
        icon: faHome,
        link: '/dashboard',
    },
    {
        value: 'Nhân viên',
        icon: faUserGroup,
        link: '/staffs',
    },
    {
        value: 'Sinh viên',
        icon: faGraduationCap,
        link: '/students',
        submenu: [
            {
                value: 'Quản lý thông tin sinh viên',
                link: '/info-management',
            },
            {
                value: 'Kết quả học tập',
                link: '/grade',
            },
        ],
    },
    {
        value: 'Quản lý môn học',
        icon: faBook,
        link: '/subjects',
        submenu: [
            {
                value: 'Danh sách môn học',
                link: '/list-subjects',
            },

            {
                value: 'Danh sách lớp mở',
                link: '/course',
            },
        ],
    },
    // {
    //     value: 'Thống kê',
    //     icon: faChartSimple,
    //     link: '/statistics',
    // },
    {
        value: 'Cài đặt',
        icon: faGear,
        link: '/setting',
    },
    {
        value: 'Đăng xuất',
        icon: faDoorClosed,
        link: '/logout',
    },
]

function Menu() {
    const [currentLink, setCurrentLink] = useState('/')

    useEffect(() => {
        setCurrentLink(window.location.pathname)
    }, [])

    function SideIndicator(props) {
        if (props.link === currentLink) {
            return (
                <span
                    className={
                        'absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary ' +
                        props.className
                    }
                    aria-hidden="true"
                ></span>
            )
        }
        return <span></span>
    }

    function SubMenu(props) {
        return (
            <li>
                <details open>
                    <summary className="p-0 after:mr-5">
                        <Link
                            to={props.item.link}
                            className="text-base p-3"
                            onClick={() => setCurrentLink(props.item.link)}
                        >
                            <FontAwesomeIcon icon={props.item.icon} className="w-6 mr-1" />
                            <p className="ml-2 inline">{props.item.value}</p>
                            <SideIndicator link={props.item.link} />
                        </Link>
                    </summary>
                    <ul>
                        {props.item.submenu.map((navSubItem, subIndex) => {
                            return (
                                <li key={subIndex}>
                                    <Link
                                        to={props.item.link + navSubItem.link}
                                        key={subIndex}
                                        className="text-base p-3 translate-x-[-10px] pl-4"
                                        onClick={() =>
                                            setCurrentLink(props.item.link + navSubItem.link)
                                        }
                                    >
                                        <p>{navSubItem.value}</p>
                                        <SideIndicator link={props.item.link + navSubItem.link} />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </details>
            </li>
        )
    }

    return (
        <div>
            {navItems.map((navItem, index) => {
                if (navItem.submenu) {
                    return <SubMenu item={navItem} key={index} />
                }
                return (
                    <li key={index}>
                        <Link
                            to={navItem.link}
                            className="text-base p-3"
                            onClick={() => setCurrentLink(navItem.link)}
                        >
                            <FontAwesomeIcon icon={navItem.icon} className="w-6 mr-1" />
                            <p>{navItem.value}</p>
                            <SideIndicator link={navItem.link} />
                        </Link>
                    </li>
                )
            })}
        </div>
    )
}

export default Menu
