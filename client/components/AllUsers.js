import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { fetchUsers } from '../store/users';

const AllUsers = (props) => {
    useEffect(() => {
        props.fetchUsers()
    }, []);

    const { users } = props;
    //ADD LINK TO SINGLE USER?
    return (
        <div>
            <h1>All Users</h1>
            <div className='element-list'>
                {users.map((user) => {
                    return (
                        <article key={user.id} className='single-element'>
                            <h4>Full Name: {user.fullName}</h4>
                            <h4>Age: {user.age}</h4>
                            <h4>Username: {user.userName}</h4>
                            <h4>Email: {user.email}</h4>
                            <h4>User Type: {user.userType}</h4>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        users: state.users
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapState, mapDispatch)(AllUsers)