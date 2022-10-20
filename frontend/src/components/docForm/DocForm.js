import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';

import './docForm.scss';

const DocForm = ({onSubmit, flag}) => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState('');
    const [employeesLoadingStatus, setEmployeesLoadingStatus] = useState('');
    const [document, setDocument] = useState('');
    const {request} = useHttp();
    
    useEffect(() => {
        setEmployeesLoadingStatus('loading');
        request('api/employee')
        .then(res => setEmployees(res))
        .then(() => {setEmployeesLoadingStatus('done')})
        .catch(() => {setEmployeesLoadingStatus('error')});
    },[])

    const renderEmployees = (employee, loadingStatus) => {
        switch(loadingStatus) {
            case 'loading':
                return <option>Загрузка элементов</option>
            case 'error':
                return <option>Ошибка загрузки</option>
        }

        return employee.map(emp => {
            return <option key={uuidv4()}>{emp}</option>
        })
    }

    return(
        <>
        <form onSubmit={(e) => {onSubmit(e, request, employee, document)}}>
            <div className="form-group">
                <label htmlFor="name">Выберите сотрудника</label>
                <select 
                    className="form-control"
                    name="name" 
                    id="name"
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    >
                    <option>Выберите сотрудника</option>
                    {renderEmployees(employees, employeesLoadingStatus)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="docOrder">Введите название документа</label>
                <textarea
                    className="form-control"
                    required
                    type="textArea"
                    name="docOrder"
                    id="docOrder"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}  
                    rows="3"></textarea>
            </div>
            {flag ? <div className="errorMessage">Вы
                уже отправляли заявку на этот документ, она уже была учтена</div> : null}
            <button className="btn btn-secondary">Отправить</button>
        </form>
        </>
        
    )
}

export default DocForm;