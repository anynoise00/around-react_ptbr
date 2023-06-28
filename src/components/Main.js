import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import PopupWithForm from './PopupWithForm';
import FormInputContainer from './FormInputContainer';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const [cards, setCards] = useState([]);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeCardLikeStatus(card._id, !isLiked).then((newCard) => {
      setCards(cards.map((c) => (c._id === newCard._id ? newCard : c)));
    });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then((res) => {
      setCards(cards.filter((c) => !(c._id === cardId)));
    });
  }

  function handleFormAddPlaceSubmit(data) {
    api.addCard(data).then((res) => {
      setCards([res, ...cards]);
      props.closeAllPopups();
    });
  }

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-container'>
          <div
            className='profile__avatar'
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <div
            className='profile__avatar-overlay'
            onClick={props.onEditAvatarClick}
          />
        </div>
        <div className='profile__info'>
          <h2 className='profile__name'>{currentUser.name || 'Lorem Ipsum'}</h2>
          <p className='profile__description'>
            {currentUser.about || 'Dolor, Sit & Amet'}
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
          <Card
            card={c}
            key={`card-${c._id}`}
            onCardClick={props.onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </ul>

      <PopupWithForm
        title='Novo local'
        name='add-place'
        buttonText='Adicionar'
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.closeAllPopups}
        onSubmit={handleFormAddPlaceSubmit}
      >
        <FormInputContainer name='name'>
          <input
            type='text'
            className='form__field'
            placeholder='Título'
            minLength='2'
            maxLength='30'
            required
          />
        </FormInputContainer>
        <FormInputContainer name='link'>
          <input
            type='url'
            className='form__field'
            placeholder='Link da imagem'
            required
          />
        </FormInputContainer>
      </PopupWithForm>
    </main>
  );
}

export default Main;
