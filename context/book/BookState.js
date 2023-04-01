import React, { useReducer } from "react";
import BookContext from "./bookContext";
import bookReducer from "./bookReducer";
import { initState, book_t} from './init.js';
import storage from '../../lib/storage/storage';
import { Asset } from 'expo-asset';
import { freeBooks } from '../../assets/books/books.js';
import net from '../../lib/net/net'
import translate from '../../lib/translate/translate';


const pageLimit = 3;


const BookState = (props) =>
{
  const [state, dispatch] = useReducer(bookReducer, initState);

  
  async function loadBook(id, free)
  {
    try {
      let book;
      if(!free) {
        book = await storage.getData('book');
      } else {
        book = freeBooks[id];
      }
      const section = await getSection(id);
      const current = book[section];
      const payload = { book, current, section };

      dispatch({ type: book_t.BOOK_LOADED, payload });
      return true;
    } catch(err) {
      dispatch({ type: book_t.BOOK_ERROR, payload: err});
      return false;
    }
  }

  async function translateCurrent()
  {
    try {
      const payload = await translate.translateCurrent(state.current);
      if(!payload) return false;
      dispatch({ type: book_t.BOOK_SUCCESS, payload });
    } catch(e) {
      console.log(e);
      return false;
    }
  }



  function setSection(value)
  {
    const book = state.book;
    book[state.section] = state.current;

    const mode = state.mode;
    const section = getSectionValue(value);
    const length = book.length;
    if(section === value, section < 0 || section > length) return;

    const current = state.book[section];
    const payload = { current, section };

    dispatch({ type: book_t.BOOK_LINE, payload });
  
    storage.setData('section', section); 
  }

  function getSectionValue(v)
  {
    let value = v;
    const section = state.section;
    const mode = state.mode;

    if(mode === 'page')
      value = (v * pageLimit);

    return section + value;
  }

 
  function getPage(index)
  {
    const book = state.book;
    const start = state.section;
    const end = start + pageLimit;
    const page = book.slice(start, end);
    return page;
  }


  async function getSection(id)
  {
    const key = id.concat('-section');
    let section = await storage.getData(key);
    if(!section)
      section = state.section;

    return section;
  }


  return (
    <BookContext.Provider
      value={{
        current: state.current,
        line: state.current.line,
        characters: state.current.characters,
        bookLength: state.book.length,
        section: state.section,
        loadBook,
        setSection,
        translateCurrent,
        getPage,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
