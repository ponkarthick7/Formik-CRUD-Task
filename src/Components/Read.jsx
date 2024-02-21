// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table, Spinner } from 'react-bootstrap';

// function Read() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('https://659c2dd5d565feee2dac98cd.mockapi.io/Books/');
//       setUsers(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Container fluid>
//         <h1>Users</h1>
//         {loading ? (
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         ) : (
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Author</th>
//                 <th>BookName</th>
//                 <th>category</th>
//                 <th>ISBN_Number</th>
//                 <th>Birth_Date</th>
//                 <th>Publication_Date</th>
//               </tr>
//             </thead>
//             <tbody>
//             {users.map(user => (
//     <tr key={user.id}>
//         <td>{user.id}</td>
//         <td>{user.Author ? user.Author : 'N/A'}</td>
//         <td>{user.BookName ? user.BookName : 'N/A'}</td>
//         <td>{user.category ? user.category : 'N/A'}</td> {/* Using optional chaining */}
//         <td>{user.ISBN_Number ? user.ISBN_Number : 'N/A'}</td>
//         <td>{user.Birth_Date ? user.Birth_Date : 'N/A'}</td>
//         <td>{user.Publication_Date ? user.Publication_Date : 'N/A'}</td>  
//     </tr>
// ))}

//             </tbody>
//           </Table>
//         )}
//       </Container>
//     </>
//   );
// }

// export default Read;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Spinner } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

function Read() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://659c2dd5d565feee2dac98cd.mockapi.io/Books/');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <h1>Users</h1>
      <Formik
        initialValues={{
          author: '',
          bookName: '',
          category: '',
          isbnNumber: '',
          birthDate: '',
          publicationDate: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission here
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Author</th>
                    <th>Book Name</th>
                    <th>Category</th>
                    <th>ISBN Number</th>
                    <th>Birth Date</th>
                    <th>Publication Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.Author ? user.Author : 'N/A'}</td>
                      <td>{user.BookName ? user.BookName : 'N/A'}</td>
                      <td>{user.category ? user.category : 'N/A'}</td> {/* Using optional chaining */}
                      <td>{user.ISBN_Number ? user.ISBN_Number : 'N/A'}</td>
                      <td>{user.Birth_Date ? user.Birth_Date : 'N/A'}</td>
                      <td>{user.Publication_Date ? user.Publication_Date : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Read;
