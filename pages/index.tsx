import { NextPage } from 'next';
import { Button } from '../components'

const Home: NextPage = () => {
  return (
    <main>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
    </main>
  );
};

export default Home;
