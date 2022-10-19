import { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';

import './docList.scss';

const DocList = ({newDocList}) => {
    const [docList, setDocList] = useState([]);
    const [docLoadingStatus, setDocLoadingStatus] = useState('');
    const {request} = useHttp();

    useEffect(() => {
        setDocLoadingStatus('loading');
        request('http://localhost:8000/api/docorderlist')
            .then(res => setDocList(res))
            .then(() => setDocLoadingStatus('done'))
            .catch(() => setDocLoadingStatus('error'));
    },[])

    const sortDocList = (list) => {
        const sortDocList = list.sort((a, b) => {
            return b.docorder - a.docorder;
        })

        return sortDocList;
    }
    const renderDocList = (documents, loadingStatus) => {
        switch(loadingStatus) {
            case 'loading':
                return <option>Загрузка элементов</option>
            case 'error':
                return <option>Ошибка загрузки</option>
        }

        return documents.map(({docname, docorder}) => {
            if(docname) {
                return  <tr key={uuidv4()}>
                            <th>{`Документ ${docname}`}</th>
                            <th>{`Количество заказов ${docorder}`}</th>
                        </tr>
            }
           
        })
    }

    return (
        <>
        <table border={2}>
           {newDocList && !newDocList.response ? renderDocList(sortDocList(newDocList.rows), docLoadingStatus) : renderDocList(sortDocList(docList), docLoadingStatus)}
        </table>
        </>
    )
}

export default DocList;

console.log(typeof []);