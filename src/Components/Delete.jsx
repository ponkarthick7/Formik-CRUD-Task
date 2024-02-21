// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
// import { Container, Form, Button, Toast } from 'react-bootstrap';

// function Delete() {
//     const [users, setUsers] = useState([]);
//     const [selectedUserId, setSelectedUserId] = useState('');
//     const [selectedAuthorName, setSelectedAuthorName] = useState('');
//     const [selectedUserBookName, setSelectedUserBookName] = useState('');
//     const [showToast, setShowToast] = useState(false);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('https://659c2dd5d565feee2dac98cd.mockapi.io/Books/');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleUserSelectChange = (e) => {
//         const userId = e.target.value;
//         // If the selected value is "manual", reset the selected user ID
//         if (userId === 'manual') {
//             setSelectedUserId('');
//         } else {
//             setSelectedUserId(userId);
//             // Handle the case when the user selects a specific user ID
//             const selectedId = parseInt(userId);
//             if (!isNaN(selectedId)) {
//                 // Fetch user data only if the selected ID is a valid number
//                 axios.get(`https://659c2dd5d565feee2dac98cd.mockapi.io/Books/${selectedId}`)
//                     .then(response => {
//                         setSelectedAuthorName(response.data.name);
//                         setSelectedUserBookName(response.data.email);
//                     })
//                     .catch(error => {
//                         console.error('Error fetching user:', error);
//                     });
//             }
//         }
//     };
    
    
    
    

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
    
//         if (!selectedUserId) {
//             alert('Please select a user.');
//             return;
//         }
    
//         const confirmDelete = window.confirm('Are you sure you want to delete the user?');
//         if (!confirmDelete) return;
    
//         try {
//             await axios.delete(`https://659c2dd5d565feee2dac98cd.mockapi.io/Books/${selectedUserId}`);
//             setShowToast(true);
//             setSelectedUserId('');
//             setSelectedAuthorName('');
//             setSelectedUserBookName('');
//             // Remove the deleted user from the users array
//             setUsers(users.filter(user => user.id !== parseInt(selectedUserId)));
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };
    

//     return (
//         <Container fluid>
//             <h1>Delete a User</h1>
//             <Form onSubmit={handleFormSubmit}>
//                 <Form.Group className="mb-3" controlId="userId">
//                 <Form.Control as="select" value={selectedUserId} onChange={handleUserSelectChange}>
//     <option value="">Select User ID</option>
//     {users.map(user => (
//         <option key={user.id} value={user.id}>{user.id}</option>
//     ))}
//     <option value="manual">Enter ID Manually</option>
// </Form.Control>

//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="name">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" value={selectedAuthorName} readOnly />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="email">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control type="email" value={selectedUserBookName} readOnly />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Delete
//                 </Button>
//             </Form>

//             <div className="toast-container position-fixed bottom-0 end-0 p-3">
//                 <Toast show={showToast} onClose={() => setShowToast(false)}>
//                     <Toast.Header>
//                         <strong className="me-auto">Delete User</strong>
//                         <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
//                     </Toast.Header>
//                     <Toast.Body>User deleted successfully!</Toast.Body>
//                 </Toast>
//             </div>
//         </Container>
//     );
// }

// export default Delete;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Toast } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Delete() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedAuthorName, setSelectedAuthorName] = useState('');
    const [selectedUserBookName, setSelectedUserBookName] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://659c2dd5d565feee2dac98cd.mockapi.io/Books/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleFormSubmit = async (values, { setSubmitting }) => {
        const userId = values.userId;

        if (!userId) {
            alert('Please select a user.');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to delete the user?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://659c2dd5d565feee2dac98cd.mockapi.io/Books/${userId}`);
            setShowToast(true);
            setSelectedUserId('');
            setSelectedAuthorName('');
            setSelectedUserBookName('');
            // Remove the deleted user from the users array
            setUsers(users.filter(user => user.id !== parseInt(userId)));
        } catch (error) {
            console.error('Error deleting user:', error);
        }

        setSubmitting(false);
    };

    return (
        <Container fluid>
            <h1>Delete a User</h1>
            <Formik
                initialValues={{ userId: '' }}
                validationSchema={Yup.object().shape({
                    userId: Yup.string().required('User ID is required')
                })}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="userId">
                            <Form.Label>Select User ID</Form.Label>
                            <Field as="select" name="userId" className="form-select">
                                <option value="">Select User ID</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.id}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="userId" component="div" className="text-danger" />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" value={selectedAuthorName} readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bookname">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control type="text" value={selectedUserBookName} readOnly />
                        </Form.Group> */}

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </Form>
                )}
            </Formik>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Delete User</strong>
                        <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                    </Toast.Header>
                    <Toast.Body>User deleted successfully!</Toast.Body>
                </Toast>
            </div>
        </Container>
    );
}

export default Delete;
