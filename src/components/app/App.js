import SearchPanel from "../searchPanel/SearchPanel";
import ContactsLink from "../contactsLink/ContactsLink";
import BackgroundSmooth from "../backgrondSmooth/BackgroundSmooth";
import '../../style/style.scss';

const App = () => {
  return (
    <div className="app">
      <BackgroundSmooth/>
      <SearchPanel />
      <ContactsLink/>
    </div>
  );
}

export default App;
