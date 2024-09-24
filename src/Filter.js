import { useState } from "react";
import './Filter.css'; 

function Filter({ setFilters }) {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [married, setMarried] = useState('---');
    const [telNumber, setTelNumber] = useState('');
    const [lowerSalary, setLowerSalary] = useState(0);
    const [higherSalary, setHigherSalary] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const filterData = {
            name,
            birthday,
            married,
            telNumber,
            lowerSalary,
            higherSalary,
        };
        setFilters(filterData);
    };

    return (
        <div className="filter-container">
            <form onSubmit={handleSubmit}>
                <h2>Filter Options</h2>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Birthday:</label>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Married:</label>
                    <select
                        value={married}
                        onChange={(e) => setMarried(e.target.value)}
                    >
                        <option value="---">---</option>
                        <option value="yes">Так</option>
                        <option value="no">Ні</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Telephone Number:</label>
                    <input
                        type="tel"
                        value={telNumber}
                        onChange={(e) => setTelNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Lower Salary:</label>
                    <input
                        type="number"
                        value={lowerSalary}
                        onChange={(e) => setLowerSalary(Number(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Higher Salary:</label>
                    <input
                        type="number"
                        value={higherSalary}
                        onChange={(e) => setHigherSalary(Number(e.target.value))}
                    />
                </div>
                <button type="submit" className="filter-button">Filter</button>
            </form>
        </div>
    );
}

export default Filter;
