import React from 'react';
import { useField } from '../hooks';

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const { reset: contentReset, ...contentToPass } = content;
  const { reset: authorReset, ...authorToPass } = author;
  const { reset: infoReset, ...infoToPass } = info;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const reset = () => {
    return [content, author, info].forEach((field) => field['reset']());
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentToPass} />
        </div>
        <div>
          author
          <input {...authorToPass} />
        </div>
        <div>
          url for more info
          <input {...infoToPass} />
        </div>
        <button type="submit">create</button>{' '}
        <button type="button" onClick={reset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
