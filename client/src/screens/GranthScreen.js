import React, { useContext, useEffect, useState } from 'react';
import Grid from '../components/Grid';
import { Context as GranthContext } from '../context/GranthContext';
import { fetchGet } from '../helpers/fetchHelper';

const GranthScreen = () => {
  const { state: granthState, fetchAllBooks } = useContext(GranthContext);
  const [chapters, setChapters] = useState(null);

  useEffect(() => {
    fetchAllBooks();
    // fetchAllChaptersForBook(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllChaptersForBook = async (bookId) => {
    const res = await fetchGet(`/books/${bookId}/chapters`);
    setChapters(res.chapters);
  };

  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={12} md={8} lg={8}>
          <h1 className='title'>
            Ath 'Shree Gur Prataap Suraj' Database
            <p className='subtitle mtop15'>
              ਅਥ 'ਸ਼੍ਹੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ' ਡੇਟਾਬੇਸ
            </p>
          </h1>
        </Grid>

        <Grid column={true} sm={12} md={10} lg={10}>
          <table className='mtop15'>
            <thead>
              <tr>
                <td>Book ID</td>
                <td>Order Number</td>
                <td>Name</td>
                <td># of Chapters</td>
              </tr>
            </thead>
            <tbody>
              {granthState.allBooks &&
                granthState.allBooks.map((book) => {
                  return (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.book_order}</td>
                      <td className='satluj'>
                        <a onClick={() => fetchAllChaptersForBook(book.id)}>
                          {book.title_unicode}
                        </a>
                      </td>
                      <td></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {chapters && (
            <table className='mtop15'>
              <thead>
                <tr>
                  <td>Chapter ID</td>
                  <td>Number</td>
                  <td>Name</td>
                  <td># of Chapters</td>
                </tr>
              </thead>
              <tbody>
                {chapters.map((chapter) => {
                  return (
                    <tr key={chapter.id}>
                      <td>{chapter.id}</td>
                      <td>{chapter.number}</td>
                      <td className='satluj'>{chapter.title_unicode}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default GranthScreen;
