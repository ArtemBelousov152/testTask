import DocForm from '../docForm/DocForm';
import DocList from '../docList/DocList';
import Links from '../links/Links';
import { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import './App.css';

function App() {
    const [newDocList, setNewDocList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [docLoadingStatus, setDocLoadingStatus] = useState('');
    const {request} = useHttp();

    useEffect(() => {
        setDocLoadingStatus('loading');
        request('api/docorderlist')
            .then(res => {
                setNewDocList(res.data)
                setFlag(res.flag);
            })
            .then(() => setDocLoadingStatus('done'))
            .catch(() => setDocLoadingStatus('error'));
    },[])

    const onSubmit = useCallback((e, request, employee, document) => {
        e.preventDefault();
        const data = JSON.stringify({employee, document});
        request('api/', "POST", data)
            .then(res => {
                if(res.data) {
                    setNewDocList(res.data)
                }
                setFlag(res.flag);
            })
    },[])

    return (
        <Router>
            <main className='container'>
            <Links/>
            <Routes>
                <Route 
                    path='/' 
                    element={<DocForm onSubmit={onSubmit} flag={flag}/>}
                />
                <Route 
                    path='/docList'
                    element={<DocList
                                    newDocList={newDocList} 
                                    docLoadingStatus={docLoadingStatus}
                            />} 
                />
            </Routes>
            </main>
        </Router>
    )
}

export default App;
