import { v4 as uuidv4 } from 'uuid';

import './docList.scss';

const DocList = ({newDocList, docLoadingStatus, flag}) => {
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

        return documents.map(({docname, docorder}, i) => {
            if(docname) {
                return  <tr key={uuidv4()}>
                            <th scope="row">{i + 1}</th>
                            <td>{`Документ ${docname}`}</td>
                            <td>{docorder}</td>
                        </tr>
            }
        })
    }

    return (
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Наименование документа</th>
                    <th scope="col">Количество заявок</th>
                    </tr>
                </thead>
                <tbody>
                    {renderDocList(sortDocList(newDocList), docLoadingStatus)}
                </tbody>
            </table>
        </>

        
    )
}

export default DocList;