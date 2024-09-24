import { useState } from "react";
import "./SortWindow.css";

function SortWindow({ SetSort }) {
    const [name, setName] = useState('---');
    const [birthday, setBirthday] = useState('---');
    const [married, setMarried] = useState('---');
    const [telNumber, setTelNumber] = useState('---');
    const [salary, setSalary] = useState('---');
    
    return (
        <div className="sort-window">
            <div className="sort-option">
                <label htmlFor="nameSort">Сортувати за ім'ям:</label>
                <select
                    id="nameSort"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                    <option value="---">---</option>
                    <option value="asc">Зростання</option>
                    <option value="desc">Спадання</option>
                </select>
            </div>
            <div className="sort-option">
                <label htmlFor="birthdaySort">Сортувати за днем народження:</label>
                <select
                    id="birthdaySort"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                >
                    <option value="---">---</option>
                    <option value="asc">Зростання</option>
                    <option value="desc">Спадання</option>
                </select>
            </div>
            <div className="sort-option">
                <label htmlFor="marriedSort">Сортувати за статусом шлюбу:</label>
                <select
                    id="marriedSort"
                    value={married}
                    onChange={(e) => setMarried(e.target.value)}
                >
                    <option value="---">---</option>
                    <option value="asc">Зростання</option>
                    <option value="desc">Спадання</option>
                </select>
            </div>
            <div className="sort-option">
                <label htmlFor="telNumberSort">Сортувати за номером телефону:</label>
                <select
                    id="telNumberSort"
                    value={telNumber}
                    onChange={(e) => setTelNumber(e.target.value)}
                >
                    <option value="---">---</option>
                    <option value="asc">Зростання</option>
                    <option value="desc">Спадання</option>
                </select>
            </div>
            <div className="sort-option">
                <label htmlFor="salarySort">Сортувати за зарплатою:</label>
                <select
                    id="salarySort"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                >
                    <option value="---">---</option>
                    <option value="asc">Зростання</option>
                    <option value="desc">Спадання</option>
                </select>
            </div>
            <button onClick={() => SetSort({ name, birthday, married, telNumber, salary })}>Прийняти</button>
        </div>
    );
}

export default SortWindow;
