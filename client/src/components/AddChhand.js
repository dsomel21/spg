import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import * as anvaad from 'anvaad-js';
import { fetchGet } from '../helpers/fetchHelper';
import { CodeBlock, a11yLight } from 'react-code-blocks';

const AddChhand = () => {
  const [chhandTypeOptions, setChhandTypeOptions] = useState(null);
  const [lastChapter, setLastChapter] = useState(null);

  const [unicode, setUnicode] = useState('');
  const [chhandType, setChhandType] = useState('');
  const [english, setEnglish] = useState('');

  const chapterCode = `{
    id: ${lastChapter?.id},
    number: ${lastChapter?.number},
    order_number: ${lastChapter?.order_number},
    title_unicode: "${lastChapter?.title_unicode}"
}`;

  useEffect(() => {
    const fetchAllChhandTypes = async () => {
      const res = await fetchGet('/chhand-types');
      console.log('fetchAllChhandTypes', res);
      setChhandTypeOptions(res.chhand_types);
    };

    const fetchLastChapter = async () => {
      try {
        const res = await fetchGet('/chapters?last=1');
        setLastChapter(res.chapters[0]);
      } catch (error) {
        console.log(`⚠️ Error: ${error}`);
      }
    };
    fetchAllChhandTypes();
    fetchLastChapter();
  }, []);

  return (
    <Grid alignItems='center' justify='center'>
      <Grid sm={12} md={8} lg={8} justify='center'>
        {/* Chapter */}

        <form className='spg-form'>
          <label htmlFor='chapterNumber'>Chapter</label>
          <CodeBlock
            theme={a11yLight}
            text={chapterCode}
            language={'json'}
            showLineNumbers={false}
            wrapLines={false}
            codeBlock
            customStyle={{ borderRadius: 20, marginBottom: 15 }}
          />

          {/* Chapter */}
          <label htmlFor='chhandOrderNumber'>Chapter</label>
          <input
            id='chhandOrderNumber'
            name='chhandOrderNumber'
            readOnly
            type='text'
            placeholder='ਸਿਰਖੰਡੀ ਛੰਦ'
            value={lastChapter?.number}
          />

          {/* Unicode */}
          <label htmlFor='unicode'>Gurmukhi Unicode</label>
          <input
            id='unicode'
            name='unicode'
            type='text'
            placeholder='ਸਿਰਖੰਡੀ ਛੰਦ'
            onChange={(e) => {
              setUnicode(e.target.value);
              setChhandType(anvaad.unicode(e.target.value, true));
            }}
            value={unicode}
          />

          {/* Gurmukhi Script */}
          <label htmlFor='chhandType'>Gurmukhi Script</label>
          <input
            className='gurakhar'
            id='chhandType'
            name='chhandType'
            type='text'
            placeholder='isrKMfI CMd'
            value={chhandType}
          />

          {/* English */}
          <label htmlFor='english'>English</label>
          <input
            id='english'
            name='english'
            type='text'
            placeholder='Sirkhandi Chhand'
            onChange={(e) => {
              setEnglish(e.target.value);
            }}
            value={english}
          />
          <button type='submit' className={`mtop15 `}>
            Submit
          </button>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddChhand;
