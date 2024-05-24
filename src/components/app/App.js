import SearchPanel from "../searchPanel/SearchPanel";
import ContactsLink from "../contactsLink/ContactsLink";
import '../../style/style.scss';

const App = () => {
  return (
    <div className="app">
      <SearchPanel />
      <ContactsLink/>
    </div>
  );
}

export default App;
