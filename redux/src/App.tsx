import { createSlice, configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

const titleSlice = createSlice({
  name: 'titleSlice',
  initialState: {
    title: 'App Redux',
  },
  reducers: {

  },
});
const titleReducer = titleSlice.reducer;

const valueSlice = createSlice({
  name: 'valueSlice',
  initialState: {
    first: '',
    last: '',
  },
  reducers: {
    setFirst: (state, action) => {
      state.first = action.payload.first;
    },
    setLast: (state, action) => {
      state.last = action.payload.last;
    },
  },
});

const { setFirst, setLast } = valueSlice.actions;
const valueReducer = valueSlice.reducer;

const store = configureStore({
  reducer: {
    valueReducer,
    titleReducer
  },
});

const TextInput = ({ value }: { value: 'first' | 'last' }) => {
  const dispatch = useDispatch();
  const fieldValue: any = useSelector((state) => state);

  return (
    <div className='field'>
      {value}:{' '}
      <input
        value={fieldValue.valueReducer[value]}
        onChange={(e) => {
          if (value === 'first')
            return dispatch(
              setFirst({
                first: e.target.value,
              })
            );
          dispatch(
            setLast({
              last: e.target.value,
            })
          );
        }}
      />
    </div>
  );
};

const Display = ({ value }: { value: 'first' | 'last' }) => {
  const fieldValue: any = useSelector((state) => state);

  return (
    <div className='value'>
      {value}: {fieldValue.valueReducer[value]}
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
  // render all
  // const title: any = useSelector((state: any) => state);

  // FIx
  const title: any = useSelector((state: any) => state.titleReducer);

  return <h5>{title.title}</h5>
}


function App() {
  return (
    <Provider store={store}>
      <div className='container'>
        <Title />
        <ContentContainer />
      </div>
    </Provider>
  );
}

export default App;
