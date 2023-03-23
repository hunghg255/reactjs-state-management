import React from 'react';
import { atom, RecoilRoot, useRecoilSnapshot, useRecoilState, useRecoilValue } from 'recoil';

const atomValue = atom<any>({
  key: '1',
  default: {
    first: '',
    last: '',
  },
});

const TextInput = ({ value }: { value: 'first' | 'last' }) => {
  const [fieldValue, setValue] = useRecoilState(atomValue);

  return (
    <div className='field'>
      {value}:{' '}
      <input
        value={fieldValue[value]}
        onChange={(e) =>
          setValue({ ...fieldValue, [value]: e.target.value || '' })
        }
      />
    </div>
  );
};

const Display = ({ value }: { value: 'first' | 'last' }) => {
  const fieldValue = useRecoilValue(atomValue);
  console.log(fieldValue);


  return (
    <div className='value'>
      {value}: {fieldValue[value]}
    </div>
  );
};

const FormContainer = () => {
  return (
    <div className='container'>
      <h5>FormContainer</h5>
      <TextInput value='first' />
      <TextInput value='last' />
    </div>
  );
};

const DisplayContainer = () => {
  return (
    <div className='container'>
      <h5>DisplayContainer</h5>
      <Display value='first' />
      <Display value='last' />
    </div>
  );
};

const ContentContainer = () => {
  return (
    <div className='container'>
      <h5>ContentContainer</h5>
      <FormContainer />
      <DisplayContainer />
    </div>
  );
};

const Title = () => {
  return <h5>App</h5>
}

function App() {
  return (
    <RecoilRoot>
      <div className='container'>
        <Title />
        <ContentContainer />
      </div>
    </RecoilRoot>
  );
}

export default App;
