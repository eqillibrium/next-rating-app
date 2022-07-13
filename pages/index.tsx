import { NextPage } from 'next';
import { Rating } from '../components';
import { useState } from 'react';
import { withLayout } from '../layout/Layout';

const Home: NextPage = () => {
  const [rating, setRating] = useState<number>(4);
  return (
    <main>
      <Rating rating={rating} setRating={setRating} isEditable/>
    </main>
  );
};

export default withLayout(Home);
