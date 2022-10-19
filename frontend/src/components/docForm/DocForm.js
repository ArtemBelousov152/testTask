import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';

const DocForm = ({onSubmit}) => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState('');
    const [employeesLoadingStatus, setEmployeesLoadingStatus] = useState('');
    const [document, setDocument] = useState('');

    const {request} = useHttp();
    
    useEffect(() => {
        setEmployeesLoadingStatus('loading');
        request('http://localhost:8000/api/employee')
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
        <form onSubmit={(e) => {onSubmit(e, request, employee, document)}}>
            <label htmlFor="name">Выберете сотрудника</label>
            <select
             name="name" 
             id="name"
             value={employee}
             onChange={(e) => setEmployee(e.target.value)}>
                <option>Выберите сотрудника</option>
                {renderEmployees(employees, employeesLoadingStatus)}
            </select>
            <label htmlFor="docOrder">Введите документ</label>
            <input 
                type="textArea"
                name="docOrder"
                id="docOrder"
                value={document}
                onChange={(e) => setDocument(e.target.value)} />
            <button>Отправить</button>
        </form>
    )
}

export default DocForm;