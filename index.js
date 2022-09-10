console.log(window.Redux);

const { createStore } = window.Redux;

const initialState = JSON.parse(localStorage.getItem("hobby")) || "";

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY" : {
      const newList = [...state];
      newList.push(action.payload);

      return newList;
    }  
    default:
      return state;
  }
}

const store = createStore(hobbyReducer);

const renderHobbyList = (hobbyList) => {
  if(!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector('#hobbyListId');
  if (!ulElement) return;

  ulElement.innerHTML ="";

  for (const hobby of hobbyList) {
    const liElement = document.createElement('li');
    if (!hobby) {
      
    }else {
      liElement.textContent = hobby;
    }

    ulElement.appendChild(liElement);
  }
};

const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);

const hobbyFormElemnet = document.querySelector("#hobbyFormId");
if (hobbyFormElemnet) {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const hobbyTextElement = hobbyFormElemnet.querySelector('#hobbyTextId');
    if (!hobbyTextElement) return;
    
    const action = {
      type:"ADD_HOBBY",
      payload: hobbyTextElement.value
    };
    store.dispatch(action);

    hobbyFormElemnet.reset();
  };

  hobbyFormElemnet.addEventListener("submit", handleFormSubmit)
};

store.subscribe(() => {
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);

  localStorage.setItem("hobby", JSON.stringify(newHobbyList));
})