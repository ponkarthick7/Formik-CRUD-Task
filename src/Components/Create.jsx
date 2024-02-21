// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Alert } from 'react-bootstrap';

// function Create() {
//     const [formData, setFormData] = useState({
//         Author: '',
//         BookImage:'',
//         BookName: '',
//         category: '',
//         AuthorDetails: '',
//         ISBN_Number:'',
//         Birth_Date:'',
//         Publication_Date:''
//     });
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('https://659c2dd5d565feee2dac98cd.mockapi.io/Books/', formData);
//             setMessage('Book created successfully!');
//             setError('');
//             clearForm();
//         } catch (error) {
//             setMessage('');
//             setError('Error creating book. Please try again.');
//         }
//     };

//     const clearForm = () => {
//         setFormData({
//             Author: '',
//             BookImage:'',
//             BookName: '',
//             category: '',
//             AuthorDetails: '',
//             ISBN_Number:'',
//             Birth_Date:'',
//             Publication_Date:''
//         });
//     };

//     return (
//         <Container fluid>
//             <h1>Create a New Book</h1>
//             {message && <Alert variant="success">{message}</Alert>}
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="author">
//                     <Form.Label>Author</Form.Label>
//                     <Form.Control type="text" name="Author" value={formData.Author} onChange={handleChange} placeholder="Enter author name" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="bookImage">
//                     <Form.Label>Book Image URL</Form.Label>
//                     <Form.Control type="url" name="BookImage" value={formData.BookImage} onChange={handleChange} placeholder="Enter book image URL" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="BookName">
//                     <Form.Label>Book Name</Form.Label>
//                     <Form.Control type="text" name="BookName" value={formData.BookName} onChange={handleChange} placeholder="Enter book name" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="category">
//                     <Form.Label>Category</Form.Label>
//                     <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Enter book category" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="AuthorDetails">
//                     <Form.Label>Author Details</Form.Label>
//                     <Form.Control type="text" name="AuthorDetails" value={formData.AuthorDetails} onChange={handleChange} placeholder="Enter author details" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="ISBN_Number">
//                     <Form.Label>ISBN Number</Form.Label>
//                     <Form.Control type="text" name="ISBN_Number" value={formData.ISBN_Number} onChange={handleChange} placeholder="Enter ISBN number" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="Birth_Date">
//                     <Form.Label>Birth Date</Form.Label>
//                     <Form.Control type="text" name="Birth_Date" value={formData.Birth_Date} onChange={handleChange} placeholder="Enter birth date" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="Publication_Date">
//                     <Form.Label>Publication Date</Form.Label>
//                     <Form.Control type="text" name="Publication_Date" value={formData.Publication_Date} onChange={handleChange} placeholder="Enter publication date" />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Create Book
//                 </Button>
//             </Form>
//         </Container>
//     );
// }

// export default Create;
import React from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Create() {
    const initialValues = {
        Author: '',
        BookImage: '',
        BookName: '',
        category: '',
        AuthorDetails: '',
        ISBN_Number: '',
        Birth_Date: '',
        Publication_Date: ''
    };

    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            await axios.post('https://659c2dd5d565feee2dac98cd.mockapi.io/Books/', values);
            setStatus({ message: 'Book created successfully!', error: '' });
            resetForm();
        } catch (error) {
            setStatus({ message: '', error: 'Error creating book. Please try again.' });
        }
        setSubmitting(false);
    };

    const validationSchema = Yup.object().shape({
        Author: Yup.string().required('Author is required'),
        BookImage: Yup.string().url('Invalid URL').required('Book image URL is required'),
        BookName: Yup.string().required('Book name is required'),
        category: Yup.string(),
        AuthorDetails: Yup.string(),
        ISBN_Number: Yup.string(),
        Birth_Date: Yup.string(),
        Publication_Date: Yup.string()
    });

    return (
        <Container fluid>
            <h1>Create a New Book</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleSubmit, isSubmitting, status }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Field type="text" name="Author" as={Form.Control} />
                            <ErrorMessage name="Author" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bookImage">
                            <Form.Label>Book Image URL</Form.Label>
                            <Field type="text" name="BookImage" as={Form.Control} />
                            <ErrorMessage name="BookImage" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="BookName">
                            <Form.Label>Book Name</Form.Label>
                            <Field type="text" name="BookName" as={Form.Control} />
                            <ErrorMessage name="BookName" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Field type="text" name="category" as={Form.Control} />
                            <ErrorMessage name="category" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="AuthorDetails">
                            <Form.Label>Author Details</Form.Label>
                            <Field type="text" name="AuthorDetails" as={Form.Control} />
                            <ErrorMessage name="AuthorDetails" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ISBN_Number">
                            <Form.Label>ISBN Number</Form.Label>
                            <Field type="text" name="ISBN_Number" as={Form.Control} />
                            <ErrorMessage name="ISBN_Number" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Birth_Date">
                            <Form.Label>Birth Date</Form.Label>
                            <Field type="date" name="Birth_Date" as={Form.Control} />
                            <ErrorMessage name="Birth_Date" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Publication_Date">
                            <Form.Label>Publication Date</Form.Label>
                            <Field type="date" name="Publication_Date" as={Form.Control} />
                            <ErrorMessage name="Publication_Date" component="div" className="text-danger" />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Book'}
                        </Button>

                        {status && status.message && <Alert variant="success" className="mt-3">{status.message}</Alert>}
                        {status && status.error && <Alert variant="danger" className="mt-3">{status.error}</Alert>}
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default Create;
