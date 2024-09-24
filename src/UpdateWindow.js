import { useState } from "react";
import axios from "axios";
import "./UpdateWindow.css"

function UpdateWindow({ user, UpdateFillteredUsers, CloseUpdateWindow }) {

    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [married, setMarried] = useState('---');
    const [telNumber, setTelNumber] = useState('');
    const [salary, setSalary] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const validateInputs = () => {
        const nameRegex = /^[^\d]*$/;
        if (!nameRegex.test(name)) {
            setErrorMessage("Ім'я не повинно містити цифр");
            return false;
        }

        const phoneRegex = /^[0-9]*$/;
        if (!phoneRegex.test(telNumber)) {
            setErrorMessage("Номер телефону має містити лише цифри");
            return false;
        }

        setErrorMessage('');
        return true;
    }

    const UpdateUser = () => {
        if (!validateInputs()) {
            return; 
        }

        user.name = name !== '' ? name : user.name;
        user.birthDay = birthday !== '' ? birthday : user.birthDay;
        user.married = married === "yes" ? true : married === "no" ? false : user.married;
        user.phone = telNumber !== '' ? telNumber : user.phone;
        user.salary = salary !== 0 ? salary : user.salary;

        axios.post(`${localStorage.getItem("back-prefix")}/Update/User`, user)
            .then(response => {
                if (response.status === 200) {
                    console.log("all good");
                    UpdateFillteredUsers(user, false);
                    CloseUpdateWindow();
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const DeleteUser = () => {
        axios.post(`${localStorage.getItem("back-prefix")}/Delete/User`, user)
            .then(response => {
                if (response.status === 200) {
                    console.log("all good");
                    UpdateFillteredUsers(user, true);
                    CloseUpdateWindow();
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const HandleClose = () => {
        CloseUpdateWindow();
    }

    return (
        <div className="update-window-container">
            <button onClick={HandleClose} className="close-update-window-button">Close</button>

            <div className="update-window-container-params">
                <div className="update-window-items-container">
                    <div className="update-window-item">Ім'я:</div>
                    <div className="update-window-item">День народження:</div>
                    <div className="update-window-item">Одружен(ий/а):</div>
                    <div className="update-window-item">Номер телефону:</div>
                    <div className="update-window-item">Зарпалата:</div>
                </div>
                <div className="update-window-items-container">
                    <div className="update-window-item">{user.name}</div>
                    <div className="update-window-item">{user.birthDay}</div>
                    {user.married === true ? <div className="update-window-item">Так</div> : <div className="update-window-item">Ні</div>}
                    <div className="update-window-item">{user.phone}</div>
                    <div className="update-window-item">{user.salary}</div>
                </div>
                <div className="update-window-inputs-container">
                    <div className="update-window-input">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введіть нове ім'я"
                        />
                    </div>
                    <div className="update-window-input">
                        <input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>
                    <div className="update-window-input">
                        <select
                            value={married}
                            onChange={(e) => setMarried(e.target.value)}
                        >
                            <option value="---">---</option>
                            <option value="yes">Так</option>
                            <option value="no">Ні</option>
                        </select>
                    </div>
                    <div className="update-window-input">
                        <input
                            type="tel"
                            value={telNumber}
                            onChange={(e) => setTelNumber(e.target.value)}
                            placeholder="Введіть новий телефон"
                        />
                    </div>
                    <div className="update-window-input">
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button className="filter-button" onClick={UpdateUser}>Оновити</button>
            <button className="filter-button" onClick={DeleteUser}>Delete</button>
        </div>
    );
}

export default UpdateWindow;
