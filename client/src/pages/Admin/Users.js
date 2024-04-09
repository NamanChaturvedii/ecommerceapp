import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
    return (
        <>
            <Layout>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu></AdminMenu>
                    </div>
                    <div className='col-md-9'>
                        <h1>All users</h1>
                        {/* showing all the users */}
                        {/* do same as get all products */}
                        
                        
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default Users




