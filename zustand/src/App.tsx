import React from 'react';

import { create } from 'zustand';

const useStore = create((set) => ({
  first: '',
  last: '',
  setValue: (obj: any) => set((state: any) => ({ ...state, ...obj })),
}));

const TextInput = ({ value }: { value: 'first' | 'last' }) => {
  const store = useStore((store: any) => store);
  console.log({ store });

  return (
    <div className='field'>
      {value}:{' '}
      <input
        value={store[value]}
        onChange={(e) => store.setValue({ [value]: e.target.value || '' })}
      />
    </div>
  );
};

const Display = ({ value }: { value: 'first' | 'last' }) => {
  const v = useStore((store: any) => store[value]);

  return (
    <div className='value'>
      {value}: {v}
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
    <div className='container'>
      <Title />
      <ContentContainer />
    </div>
  );
}

export default App;
