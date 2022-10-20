import DocForm from '../docForm/DocForm';
import DocList from '../docList/DocList';
import Links from '../links/Links';
import { useState, useEffect } from 'react';
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
        request('http://localhost:8000/api/docorderlist')
            .then(res => {
                setNewDocList(res.data)
                setFlag(res.flag);
            })
            .then(() => setDocLoadingStatus('done'))
            .catch(() => setDocLoadingStatus('error'));
    },[])

    const onSubmit = (e, request, employee, document) => {
        e.preventDefault();
        console.log('sibmit');
        const data = JSON.stringify({employee, document});
        request('http://localhost:8000/api/', "POST", data)
            .then(res => {
                setNewDocList(res.data)
                setFlag(res.flag);
            })
    }

    return (
        <Router>
            <Links/>
            <main className='container'>
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
