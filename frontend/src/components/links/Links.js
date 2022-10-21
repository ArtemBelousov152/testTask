import { NavLink } from 'react-router-dom';

import './links.scss';

const Links = () => {
    return (
        <nav className='links'>
            <NavLink
                className="btn btn-primary btn-lg"
                to="/">
                Форма для заявки
            </NavLink>
            
            <NavLink
                className="btn btn-secondary btn-lg"
                to="/docList">
                Сводная таблица
            </NavLink>
        </nav>
    )
}

export default Links;