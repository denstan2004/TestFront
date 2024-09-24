import "./User.css"
function User({user,SelectUser}){
const handleDoubleClick =()=>{
    
    SelectUser(user);
}
return(
    <div className="table-row-container">
        <div onDoubleClick={handleDoubleClick} className="table-row-item">{user.name}</div>
        <div onDoubleClick={handleDoubleClick} className="table-row-item">{user.birthDay}</div>
        {user.married==true ?    <div onDoubleClick={handleDoubleClick} className="table-row-item">Так</div>: <div onDoubleClick={handleDoubleClick} className="table-row-item">Ні</div>}
        <div onDoubleClick={handleDoubleClick} className="table-row-item">{user.phone}</div>
        <div onDoubleClick={handleDoubleClick} className="table-row-item">{user.salary}</div>

    </div>)
}
export default User