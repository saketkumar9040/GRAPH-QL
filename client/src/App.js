import './App.css';
import { gql, useQuery } from '@apollo/client';


const query = gql`
   query getTodosWithUser {
    getTodos {
      title
      completed
      user {
        name
        email
      }
    }
   }
`

function App() {
  const {data,loading} = useQuery(query)
  
  if(loading){
    return <div>
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="App">
     {JSON.stringify(data)}
    </div>
  );
}

export default App;
