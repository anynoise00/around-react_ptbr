import api from '../utils/api';
import { useState, useEffect } from 'react';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserData().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });

    api.getInitialCards().then((res) => {
      setCards(res);
    });
  }, []);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-container'>
          <div
            className='profile__avatar'
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <div
            className='profile__avatar-overlay'
            onClick={props.onEditAvatarClick}
          />
        </div>
        <div className='profile__info'>
          <h2 className='profile__name'>
            {userName ? userName : 'Lorem Ipsum'}
          </h2>
          <p className='profile__description'>
            {userDescription ? userDescription : 'Dolor, Sit & Amet'}
          </p>
          <button
            type='button'
            className='button profile__button-edit'
            onClick={props.onEditProfileClick}
          />
        </div>
        <button
          type='button'
          className='button profile__button-add'
          onClick={props.onAddPlaceClick}
        />
      </section>

      <ul className='cards'>
        {cards.map((c) => (
          <Card onCardClick={props.onCardClick} card={c} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
