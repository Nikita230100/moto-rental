import { Outlet } from 'react-router';
import { UserType } from '../entities/user/model';
import Header from '../widgets/Header/Header';
import Footer from '../widgets/Footer/Footer';

type Props = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

export default function Root({ user, setUser }: Props) {
  return (
    <div className="app">
      <Header user={user} setUser={setUser} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
