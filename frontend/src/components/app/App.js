import DocForm from '../docForm/DocForm';
import DocList from '../docList/DocList';
import { useState } from 'react';

import './App.css';

function App() {
    const [newDocList, setNewDocList] = useState();

    const onSubmit = (e, request, employee, document) => {
        e.preventDefault();
        const data = JSON.stringify({employee, document});
        request('http://localhost:8000/api/', "POST", data)
            .then(res => setNewDocList(res))
    }

    return (
        <>
            <DocForm onSubmit={onSubmit} />
            <DocList newDocList={newDocList}/>
        </>
    )
}

export default App;
