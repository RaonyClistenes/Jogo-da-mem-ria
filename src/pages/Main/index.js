import './style.css';
import cards from '../../cards';
import logo from "./assets/Logo.png"
import congrats from '../../assets/congrats.png'
import backCard from '../../assets/card-back.png'
import { useState } from 'react';
import { useRef } from 'react';

function Main() {
  const [card, setCard] = useState([...cards])
  const arrayCards = [...card]
  const mensagemRef = useRef(null)
  function virar(value) {
    const cardClicado = arrayCards.find(item => item.id === value.id)
    cardClicado.turned = true
    setCard(arrayCards)
  }
  function verificar() {
    const viradas = arrayCards.filter((item) => item.turned);
    if (viradas.length === 2) {
      if (viradas[0].image === viradas[1].image) {
        setTimeout(() => {
          const novasCartas = arrayCards.filter((item) => !item.turned);
          setCard(novasCartas);
          if (novasCartas.length === 0) {
            mensagemRef.current.style.display = 'block'
          }
        }, 1000);
      } else {
        setTimeout(() => {
          const cartasDesviradas = arrayCards.map((item) => {
            item.turned = false;
            return item;
          });
          setCard(cartasDesviradas);
        }, 1000);
      }
    }
  }
  verificar()
  function reset() {
    window.location.reload()
  }
  return (
    <div className='container'>
      <div id='display'>
        <img src={logo} alt='logo' />
        <button onClick={() => reset()}>Reset</button>
      </div>
      <div id='cards'>
        {card.map(item => <div onClick={() => virar(item)} key={item.id} style={{ backgroundImage: item.turned ? `url("${item.image}")` : `url("${backCard}")` }} className='cartao'></div>)}
        <img ref={mensagemRef} className='congrats' src={congrats} alt='congratulations' />
      </div>
    </div>
  );
}
export default Main;
