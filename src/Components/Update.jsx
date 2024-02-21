// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Toast } from 'react-bootstrap';

// function Update() {
//     const [users, setUsers] = useState([]);
//     const [selectedUserId, setSelectedUserId] = useState('');
//     const [selectedAuthorName, setSelectedAuthorName] = useState('');
//     const [selectedBookName, setSelectedBookName] = useState('');
//     const [selectedUsercategory, setSelectedcategory] = useState('');
//     const [selectedAuthorDetails, setSelectedAuthorDetails] = useState('');
//     const [selectedBirth_Date, setSelectedBirth_Date] = useState('');
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

//     const handleUserSelectChange = async (e) => {
//         const userId = e.target.value;
//         setSelectedUserId(userId);

//         try {
//             const response = await axios.get(`https://659c2dd5d565feee2dac98cd.mockapi.io/Books/${userId}`);
//             setSelectedAuthorName(response.data.Author);
//             setSelectedBookName(response.data.BookName);
//             setSelectedcategory(response.data.category);
//             setSelectedAuthorDetails(response.data.AuthorDetails);
//             setSelectedBirth_Date(response.data.Birth_Date);
//         } catch (error) {
//             console.error('Error fetching user:', error);
//         }
//     };

//     const handleNameChange = (e) => {
//         setSelectedAuthorName(e.target.value);
//     };

//     const handleEmailChange = (e) => {
//         setSelectedBookName(e.target.value);
//     };

//     const handleCompanyChange = (e) => {
//         setSelectedcategory(e.target.value);
//     };

//     const handleWebsiteChange = (e) => {
//         setSelectedAuthorDetails(e.target.value);
//     };

//     const handlePhoneChange = (e) => {
//         setSelectedBirth_Date(e.target.value);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         if (!selectedUserId) {
//             alert('Please select a user.');
//             return;
//         }

//         try {
//             await axios.put(`https://659c2dd5d565feee2dac98cd.mockapi.io/Books/${selectedUserId}`, {
//                 Author: selectedAuthorName,
//                 BookName: selectedBookName,
//                 category:selectedUsercategory,
//                 AuthorDetails: selectedAuthorDetails,
//                 Birth_Date: selectedBirth_Date,
//             });
//             setShowToast(true);
//             fetchUsers();
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };

//     return (
//         <Container fluid>
//             <h1>Edit/Update a User</h1>
//             <Form id="updateForm" onSubmit={handleFormSubmit}>
//                 <Form.Group className="mb-3" controlId="userId">
//                     <Form.Label>Select User ID</Form.Label>
//                     <Form.Control as="select" value={selectedUserId} onChange={handleUserSelectChange}>
//                         <option value="">Select User ID</option>
//                         {users.map(user => (
//                             <option key={user.id} value={user.id}>{user.id}</option>
//                         ))}
//                     </Form.Control>
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="author">
//                     <Form.Label>Author</Form.Label>
//                     <Form.Control type="text" value={selectedAuthorName} onChange={handleNameChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="bookname">
//                     <Form.Label>Book Name</Form.Label>
//                     <Form.Control type="text" value={selectedBookName} onChange={handleEmailChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="category">
//                     <Form.Label>Category</Form.Label>
//                     <Form.Control type="text" value={selectedUsercategory} onChange={handleCompanyChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="AuthorDetails">
//                     <Form.Label>Author Details</Form.Label>
//                     <Form.Control type="text" value={selectedAuthorDetails} onChange={handleWebsiteChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="Birth_Date">
//                     <Form.Label>Birth Date</Form.Label>
//                     <Form.Control type="date" value={selectedBirth_Date} onChange={handlePhoneChange} />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Update
//                 </Button>
//             </Form>

//             <div className="toast-container position-fixed bottom-0 end-0 p-3">
//                 <Toast show={showToast} onClose={() => setShowToast(false)}>
//                     <Toast.Header>
//                         <strong className="me-auto">Update User</strong>
//                         <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
//                     </Toast.Header>
//                     <Toast.Body>User updated successfully!</Toast.Body>
//                 </Toast>
//             </div>
//         </Container>
//     );
// }

// export default Update;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Toast } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Update() {
    const [users, setUsers] = useState([]);
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

    return (
        <Container fluid>
            <h1>Edit/Update a User</h1>
            <Formik
                initialValues={{
                    userId: '',
                    author: '',
                    bookName: '',
                    category: '',
                    authorDetails: '',
                    birthDate: ''
                }}
                validationSchema={Yup.object().shape({
                    userId: Yup.string().required('Select a User ID'),
                    author: Yup.string().required('Author is required'),
                    bookName: Yup.string().required('Book Name is required'),
                    category: Yup.string(),
                    authorDetails: Yup.string(),
                    birthDate: Yup.date()
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await axios.put(`https://659c2dd5d565feee2dac98cd.mockapi.io/Books/${values.userId}`, {
                            Author: values.author,
                            BookName: values.bookName,
                            category: values.category,
                            AuthorDetails: values.authorDetails,
                            Birth_Date: values.birthDate
                        });
                        setShowToast(true);
                        fetchUsers();
                    } catch (error) {
                        console.error('Error updating user:', error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="userId">
                            <Form.Label>Select User ID</Form.Label>
                            <Form.Control as="select" name="userId" value={values.userId} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.userId && errors.userId}>
                                <option value="">Select User ID</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.id}</option>
                                ))}
                            </Form.Control>
                            <ErrorMessage name="userId" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Field type="text" name="author" value={values.author} onChange={handleChange} className={`form-control ${touched.author && errors.author ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="author" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bookName">
                            <Form.Label>Book Name</Form.Label>
                            <Field type="text" name="bookName" value={values.bookName} onChange={handleChange} className={`form-control ${touched.bookName && errors.bookName ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="bookName" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Field type="text" name="category" value={values.category} onChange={handleChange} className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="authorDetails">
                            <Form.Label>Author Details</Form.Label>
                            <Field type="text" name="authorDetails" value={values.authorDetails} onChange={handleChange} className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="birthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Field type="date" name="birthDate" value={values.birthDate} onChange={handleChange} className="form-control" />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update'}
                        </Button>
                    </Form>
                )}
            </Formik>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Update User</strong>
                        <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                    </Toast.Header>
                    <Toast.Body>User updated successfully!</Toast.Body>
                </Toast>
            </div>
        </Container>
    );
}

export default Update;
